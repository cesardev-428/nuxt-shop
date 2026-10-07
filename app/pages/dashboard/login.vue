<template>
  <div
    class="flex min-h-screen items-center justify-center bg-background-light p-4 text-textColor-light dark:bg-background-dark dark:text-textColor-dark"
  >
    <div class="w-full max-w-sm">
      <!-- Marca -->
      <div class="mb-8 flex flex-col items-center text-center">
        <span
          class="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white"
        >
          <Icon name="iconamoon:box" class="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 class="mt-4 font-display text-2xl font-bold tracking-tight">
          store<span class="text-primary">.</span>
        </h1>
        <p class="section-label mt-1.5">Backoffice</p>
        <p
          class="mt-3 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          Sign in to manage products and categories.
        </p>
      </div>

      <form
        class="rounded-2xl border border-border-light bg-background-light-secondary p-6 dark:border-border-dark dark:bg-background-dark-secondary"
        @submit.prevent="onSubmit"
      >
        <div class="space-y-4">
          <div>
            <label for="email" class="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              required
              autocomplete="username"
              placeholder="admin@store.example"
              class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
            />
          </div>
          <div>
            <label for="password" class="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              name="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full rounded-lg border border-border-light bg-background-light px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-background-dark"
            />
          </div>
        </div>

        <p
          v-if="error"
          role="alert"
          class="mt-4 rounded-lg border border-red-600/30 bg-red-600/10 px-3 py-2 text-sm text-red-600 dark:text-red-400"
        >
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-background-dark"
        >
          {{ loading ? "Signing in…" : "Sign in" }}
        </button>
      </form>

      <p
        class="mt-6 text-center text-xs text-textColor-light-secondary dark:text-textColor-dark-secondary"
      >
        JWT session · 7-day expiry · httpOnly cookie
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: "guest" });

useHead({ title: "Sign in — store. admin" });

const auth = useAuthStore();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function onSubmit() {
  loading.value = true;
  error.value = "";
  try {
    await auth.login(email.value.trim(), password.value);
    await navigateTo("/dashboard");
  } catch (e: unknown) {
    const status = (e as { statusCode?: number })?.statusCode;
    error.value =
      status === 401
        ? "Invalid email or password."
        : "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>
