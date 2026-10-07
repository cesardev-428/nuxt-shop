export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null);
  const initialized = ref(false);

  async function fetchMe() {
    // useRequestFetch reenvía las cookies del request entrante en SSR
    const requestFetch = useRequestFetch();
    try {
      const res = await requestFetch<{ user: AuthUser }>("/api/auth/me");
      user.value = res.user;
    } catch {
      user.value = null;
    } finally {
      initialized.value = true;
    }
    return user.value;
  }

  async function login(email: string, password: string) {
    const res = await $fetch<{ user: AuthUser }>("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    user.value = res.user;
    initialized.value = true;
  }

  async function logout() {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } finally {
      user.value = null;
      await navigateTo("/dashboard/login");
    }
  }

  const isAuthenticated = computed(() => !!user.value);

  return { user, initialized, fetchMe, login, logout, isAuthenticated };
});
