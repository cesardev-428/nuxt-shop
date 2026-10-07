<template>
  <section class="relative overflow-hidden">
    <!-- Fondo: retícula sutil + halos azules -->
    <div class="hero-grid" aria-hidden="true"></div>
    <div
      class="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-56 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
      aria-hidden="true"
    ></div>

    <div
      class="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28 lg:px-8 lg:pt-36"
    >
      <div class="max-w-3xl">
        <!-- Badge -->
        <p
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-background-light-secondary/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-textColor-light-secondary backdrop-blur dark:border-white/10 dark:bg-background-dark-secondary/70 dark:text-textColor-dark-secondary"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Free shipping over $50
        </p>

        <!-- Título -->
        <h1
          class="font-display text-4xl font-bold leading-[1.05] tracking-tight text-textColor-light sm:text-6xl lg:text-7xl dark:text-textColor-dark"
        >
          Everything you need,
          <span class="block text-gray-400 dark:text-gray-500"
            >nothing you don't.</span
          >
        </h1>

        <!-- Mensaje de bienvenida -->
        <p
          class="mt-6 max-w-xl text-base leading-relaxed text-textColor-light-secondary dark:text-textColor-dark-secondary sm:text-lg"
        >
          Welcome to <span class="font-semibold text-textColor-light dark:text-textColor-dark">store.</span>
          Curated tech, home and everyday essentials — thoughtfully picked,
          fairly priced, and shipped to your door.
        </p>

        <!-- CTAs -->
        <div class="mt-9 flex flex-wrap items-center gap-4">
          <NuxtLink
            to="/products"
            class="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            Shop products
            <svg
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10" />
              <path d="m9 4 4 4-4 4" />
            </svg>
          </NuxtLink>

          <!-- Texto animado: cicla hasta 5 tags y enlaza a /products?tag= -->
          <NuxtLink
            v-if="cycleTags.length > 0"
            :to="tagHref"
            class="group inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-background-light-secondary/70 py-3 pl-5 pr-4 text-sm text-textColor-light-secondary backdrop-blur transition-colors duration-300 hover:border-primary/50 hover:text-textColor-light dark:border-white/15 dark:bg-background-dark-secondary/70 dark:text-textColor-dark-secondary dark:hover:text-textColor-dark"
          >
            <span class="shrink-0">Shop</span>
            <span
              class="relative inline-flex h-5 min-w-[6.5rem] overflow-hidden text-left sm:min-w-[7.5rem]"
              aria-live="polite"
            >
              <Transition name="cycle" mode="out-in">
                <span
                  :key="currentIndex"
                  class="whitespace-nowrap font-display text-sm font-semibold text-primary"
                >
                  {{ currentTag?.name }}
                </span>
              </Transition>
            </span>
            <svg
              class="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10" />
              <path d="m9 4 4 4-4 4" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Franja de confianza -->
      <div
        class="mt-16 grid max-w-3xl grid-cols-1 gap-5 border-t border-black/5 pt-8 text-sm sm:grid-cols-3 dark:border-white/10"
      >
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex items-center gap-3 text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          <span
            class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"
          >
            <component :is="feature.icon" class="h-4 w-4" />
          </span>
          <span class="font-medium">{{ feature.title }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const cycleTags = ref<Tag[]>([]);
const currentIndex = ref(0);
let cycleTimer: ReturnType<typeof setInterval> | null = null;

const currentTag = computed<Tag | null>(() => {
  if (cycleTags.value.length === 0) return null;
  return cycleTags.value[currentIndex.value % cycleTags.value.length] ?? null;
});

const tagHref = computed(() =>
  currentTag.value
    ? `/products?tag=${encodeURIComponent(currentTag.value.name)}`
    : "/products"
);

onMounted(async () => {
  try {
    const data = await $fetch<Tag[]>("/api/tags/getAll");
    cycleTags.value = data.slice(0, 5);
  } catch (err) {
    console.error("Error fetching tags for hero:", err);
    cycleTags.value = [];
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (!reduceMotion && cycleTags.value.length > 1) {
    cycleTimer = setInterval(() => {
      currentIndex.value += 1;
    }, 2600);
  }
});

onBeforeUnmount(() => {
  if (cycleTimer) clearInterval(cycleTimer);
});

const features = [
  {
    title: "Free shipping over $50",
    icon: defineComponent({
      template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 17H9m10 0a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5L11 4H5a1 1 0 0 0-1 1v12"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>`,
    }),
  },
  {
    title: "30-day free returns",
    icon: defineComponent({
      template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>`,
    }),
  },
  {
    title: "Secure checkout",
    icon: defineComponent({
      template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>`,
    }),
  },
];
</script>

<style scoped>
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(
    ellipse 90% 80% at 50% 0%,
    #000 30%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 90% 80% at 50% 0%,
    #000 30%,
    transparent 100%
  );
  pointer-events: none;
}

.cycle-enter-active,
.cycle-leave-active {
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease;
}
.cycle-enter-from {
  opacity: 0;
  transform: translateY(0.75rem);
}
.cycle-leave-to {
  opacity: 0;
  transform: translateY(-0.75rem);
}
</style>
