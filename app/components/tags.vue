<script setup>
const currentPage = useState("currentPage");
const router = useRouter();
const route = useRoute();
const tagsComposable = useTags();
const tagsStore = useTagStore();
const productStore = useProductStore();

const cardsSlider = ref(null);
const showPrev = ref(false);
const showNext = ref(true);
const isDragging = ref(false);
const dragThreshold = 10;
let startX, scrollLeft;

const seTag = (tag) => {
  currentPage.value = 1; // Reset to the first page when a tag is selected
  if (!isDragging.value && (route.query.tag || "") !== tag) {
    router.push({ query: { ...route.query, tag: tag || undefined } });
    tagsStore.setTagSelected(tag);
  }
};

const initializeDrag = (e) => {
  isDragging.value = false;
  startX = e.pageX - cardsSlider.value.getBoundingClientRect().left;
  scrollLeft = cardsSlider.value.scrollLeft;
  document.addEventListener("mousemove", handleDragging);
  document.addEventListener("mouseup", endDrag);
};

const handleDragging = (e) => {
  const xPos = e.pageX - cardsSlider.value.getBoundingClientRect().left;
  const walk = (xPos - startX) * 1.5;
  cardsSlider.value.scrollLeft = scrollLeft - walk;
  isDragging.value = Math.abs(walk) > dragThreshold;
};

const endDrag = () => {
  document.removeEventListener("mousemove", handleDragging);
  document.removeEventListener("mouseup", endDrag);
};

const updateButtonVisibility = () => {
  const { scrollLeft, scrollWidth, clientWidth } = cardsSlider.value;
  showPrev.value = scrollLeft > 16;
  showNext.value = scrollLeft < scrollWidth - clientWidth - 16;
};

onMounted(async () => {
  cardsSlider.value.addEventListener("mousedown", initializeDrag);
  updateButtonVisibility();
});

const initializeTags = async () => {
  if (productStore.products.length < 0) {
    return;
  }

  const IdTagsProducts = productStore.products.map((p) => p.tag_id).flat();

  //remove duplicates
  const uniqueIdTagsProducts = [...new Set(IdTagsProducts)];
  if (uniqueIdTagsProducts.length === 0) {
    return;
  }

  try {
    const data = await tagsComposable.getTagsFromProducts(uniqueIdTagsProducts);

    if (data && data.length > 0) {
      tagsStore.setTags(data);
    }
  } catch (e) {
    console.error("Error fetching categories:", e);
  }
};
// watch for changes in the products store
watch(
  () => productStore.products,
  async (newProducts) => {
    if (newProducts.length > 0) {
      await initializeTags();
    }
  },
  { deep: true }
);

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", handleDragging);
  document.removeEventListener("mouseup", endDrag);
});
</script>

<template>
  <div class="slider-container p-4 w-full">
    <div v-if="showPrev" class="slider-btn prev-btn"></div>
    <div class="slider-wrapper">
      <div
        ref="cardsSlider"
        class="cards-slider"
        @scroll="updateButtonVisibility"
      >
        <button
          v-for="(tag, i) in tagsStore.getTagsFromProducts"
          :key="tag.id"
          type="button"
          @click="seTag(tag.name)"
          :class="[
            'card min-w-max rounded-full border px-3.5 py-1.5 text-sm font-semibold',
            tagsStore.tagSelected === tag.name
              ? 'border-primary bg-primary text-white'
              : 'border-border-light dark:border-border-dark bg-white dark:bg-background-dark-secondary text-textColor-light dark:text-textColor-dark hover:border-primary hover:text-primary',
          ]"
        >
          {{ tag.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  pointer-events: none;
}

.slider-container {
  /* @apply flex relative overflow-hidden items-center; */
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: center;
}

.slider-wrapper {
  /* @apply relative w-full overflow-hidden; */
  position: relative;
  width: 100%;
  overflow: hidden;
}

.cards-slider {
  /* @apply flex cursor-grab w-full overflow-auto gap-2 lg:gap-4 pr-3 lg:pr-4; */
  display: flex;
  cursor: grab;
  width: 100%;
  overflow: auto;
  gap: 0.5rem; /* gap-2 */
  padding-right: 0.75rem; /* pr-3 */
  -ms-overflow-style: none; /* For IE/Edge */
  scrollbar-width: none; /* For Firefox */
}
@media (min-width: 1024px) {
  .cards-slider {
    gap: 1rem; /* lg:gap-4 */
    padding-right: 1rem; /* lg:pr-4 */
  }
}

.cards-slider::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, Opera */
}

.cards-slider:active {
  cursor: grabbing;
}

.card {
  /* @apply cursor-pointer min-w-max select-none box-border flex items-center rounded-full p-1.5 transition-all; */
  cursor: pointer;

  -webkit-user-select: none; /* For Webkit browsers */
  -moz-user-select: none; /* For Firefox */
  -ms-user-select: none; /* For IE/Edge */
  user-select: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 9999px; /* rounded-full */

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.card:active {
  /* @apply cursor-grab scale-95; */
  cursor: grab;
  transform: scale(0.95);
}

.slider-btn {
  height: 100%;
  width: 3.5rem; /* w-14 (56px) */
  cursor: pointer;
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.slider-wrapper::before,
.slider-wrapper::after {
  /* @apply absolute h-full top-0 w-2 lg:w-4 z-10; */
  position: absolute;
  height: 100%;
  top: 0;
  width: 0.5rem; /* w-2 (8px) */
  z-index: 10;
  content: "";
  pointer-events: none;
}
@media (min-width: 1024px) {
  .slider-wrapper::before,
  .slider-wrapper::after {
    width: 1rem; /* lg:w-4 */
  }
}
</style>
