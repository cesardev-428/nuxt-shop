<template>
  <footer
    id="about"
    class="border-t border-black/5 bg-background-light-secondary dark:border-white/10 dark:bg-background-dark-secondary"
  >
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <!-- About -->
      <div>
        <NuxtLink to="/" class="inline-flex items-center gap-2.5">
          <span
            class="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span
            class="font-display text-lg font-bold tracking-tight text-textColor-light dark:text-textColor-dark"
            >store<span class="text-primary">.</span></span
          >
        </NuxtLink>
        <p
          class="mt-4 max-w-xs text-sm leading-relaxed text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          A tech-minimal store built for modern living. Quality goods, fair
          prices, and no clutter — just the things that matter.
        </p>
      </div>

      <!-- Contact -->
      <div id="contact" class="scroll-mt-24">
        <p class="section-label">Contact</p>
        <ul
          class="mt-4 space-y-2 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          <li>
            <a
              href="mailto:hello@store.example"
              class="transition-colors hover:text-primary"
              >hello@store.example</a
            >
          </li>
          <li>
            <a
              href="tel:+15550100100"
              class="transition-colors hover:text-primary"
              >+1 (555) 010-0100</a
            >
          </li>
          <li>Mon – Fri, 9:00 – 18:00</li>
        </ul>
      </div>

      <!-- Quick links -->
      <div>
        <p class="section-label">Quick links</p>
        <ul
          class="mt-4 space-y-2 text-sm text-textColor-light-secondary dark:text-textColor-dark-secondary"
        >
          <li>
            <NuxtLink to="/" class="transition-colors hover:text-primary"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/products"
              class="transition-colors hover:text-primary"
              >Products</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/#categories"
              class="transition-colors hover:text-primary"
              >Categories</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>

    <div
      class="border-t border-black/5 px-4 py-6 text-center text-xs text-textColor-light-secondary dark:border-white/10 dark:text-textColor-dark-secondary"
    >
      © 2026 store. All rights reserved.
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
