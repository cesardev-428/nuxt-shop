<template>
  <!-- Hero Section -->
  <section
    class="Hero | bg-background-light dark:bg-background-dark flex items-center justify-center relative h-screen"
  >
    <div class="spotlight top-1/4 left-1/4"></div>
    <div class="spotlight top-3/4 right-1/4" style="animation-delay: -4s"></div>

    <div class="text-center z-10 max-w-4xl mx-auto px-6">
      <h1
        class="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 glow-text dark:text-textColor-dark text-textColor-light"
      >
        Welcome to Shop
      </h1>
      <p
        class="sm:text-base md:text-xl dark:text-textColor-dark text-textColor-light mb-8 max-w-2xl mx-auto"
      >
        Discover the latest trends and exclusive deals on your favorite
        products. From fashion to electronics, we have everything you need to
        elevate your
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <nuxt-link
          to="/products"
          class="bg-primary px-4 py-2 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onclick="showSection('genres')"
        >
          Explore Products
        </nuxt-link>
      </div>
    </div>
    <div
      v-for="(category, index) in categoriesFormatted"
      :key="category.id"
      class="absolute text-4xl floating-animation"
      :class="svgsProducts[category.svgPosition].class"
      style="animation-delay: -1s"
    >
      <nuxt-link :to="'/products?category=' + category.name">
        <div class="tooltip">
          {{ svgsProducts[category.svgPosition].emoji }}
          <span class="tooltip-text text-base delay-100">{{
            category.name
          }}</span>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>
<script lang="ts" setup>
const useCategory = useCategories();
//category store
const categoriesStore = useCategoryStore();

// array svgs products
const svgsProducts = [
  {
    emoji: "🖥️",
    class: "top-[20%] left-[20%] delay-1000",
  },
  {
    emoji: "📷",
    class: "top-[10%] right-[20%] delay-400",
  },
  {
    emoji: "👕",
    class: "top-[30%] right-[50%] delay-800",
  },
  {
    emoji: "🧸",
    class: "bottom-[25%] left-[25%] delay-600",
  },
  {
    emoji: "🛠️",
    class: "bottom-[30%] right-[25%] delay-200",
  },
];
// mounted
onMounted(async () => {
  if (categoriesStore.categories.length > 0) {
    /* console.log("Categories already loaded:", categoriesStore.categories); */
    return;
  }
  try {
    const data = await useCategory.getCategories();
    categoriesStore.setCategories(data);
    /* console.log("Categories fetched:", data); */
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

// computed
const categoriesFormatted = computed(() => {
  // return 5 elements from categoriesStore.categories randomly
  const categories = categoriesStore.categories;
  if (categories.length === 0) return [];
  const shuffled = categories.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5).map((category, i) => ({
    ...category,
    svgPosition: i,
  }));
});
</script>
<style scoped>
.floating-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.spotlight {
  background: radial-gradient(
    circle at center,
    rgba(115, 69, 214, 0.3) 0%,
    transparent 70%
  );
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  pointer-events: none;
  animation: spotlight 8s linear infinite;
}

@keyframes spotlight {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.film-strip {
  background: repeating-linear-gradient(
    90deg,
    #374151 0px,
    #374151 20px,
    #1f2937 20px,
    #1f2937 40px
  );
  height: 8px;
}

.glow-text {
  text-shadow: 0 0 20px rgba(115, 69, 214, 0.5);
}

.rating-stars {
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip .tooltip-text {
  visibility: hidden;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  width: max-content;
}

.tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #000 transparent transparent transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
