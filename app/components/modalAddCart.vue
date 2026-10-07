<template>
  <div
    id="modelConfirm"
    class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-16 backdrop-blur-sm"
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-cart-title"
      class="relative w-full max-w-xl rounded-xl border border-border-light bg-background-light shadow-2xl dark:border-border-dark dark:bg-background-dark-secondary"
    >
      <button
        @click="closeModal"
        type="button"
        aria-label="Close"
        class="absolute right-3 top-3 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-textColor-light dark:hover:bg-neutral-800 dark:hover:text-textColor-dark"
      >
        <svg
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div class="p-6">
        <h1
          id="add-to-cart-title"
          class="font-display text-xl font-bold text-textColor-light dark:text-textColor-dark"
        >
          Add to cart
        </h1>

        <div class="mt-5 flex items-start justify-between gap-4">
          <div class="flex min-w-0 items-center gap-4">
            <div
              class="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-neutral-50 p-2 dark:bg-neutral-900"
            >
              <img
                :src="productImage(product)"
                :alt="product.title"
                class="max-h-full max-w-full object-contain"
              />
            </div>
            <div class="min-w-0 text-start text-textColor-light dark:text-textColor-dark">
              <h2 class="truncate font-semibold">{{ product.title }}</h2>
              <p class="mt-0.5 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                {{ product.description }}
              </p>
            </div>
          </div>
          <div class="flex shrink-0 flex-col items-end gap-2">
            <input
              v-model.number="quantity"
              type="number"
              min="1"
              aria-label="Quantity"
              class="w-16 rounded-lg border border-border-light bg-transparent py-1 text-center text-sm font-semibold text-textColor-light dark:border-border-dark dark:text-textColor-dark"
            />
            <span
              class="font-display min-w-16 font-bold text-textColor-light dark:text-textColor-dark"
              >${{ ((product.price as number) * quantity).toFixed(2) }}</span
            >
          </div>
        </div>

        <hr class="my-5 border-border-light dark:border-border-dark" />
        <div
          class="flex justify-between items-center text-textColor-light dark:text-textColor-dark"
        >
          <span>Subtotal</span>
          <span>${{ ((product.price as number) * quantity).toFixed(2) }}</span>
        </div>
        <div
          class="mt-3 flex justify-between items-center text-textColor-light dark:text-textColor-dark"
        >
          <span>Taxes</span>
          <span>${{ taxes }}.00</span>
        </div>
        <hr class="my-5 border-border-light dark:border-border-dark" />
        <div
          class="flex justify-between items-center text-textColor-light dark:text-textColor-dark"
        >
          <span class="font-bold">Total</span>
          <span class="font-bold">${{ total.toFixed(2) }}</span>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="closeModal"
            type="button"
            class="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold text-textColor-light transition-colors hover:bg-neutral-100 dark:border-border-dark dark:text-textColor-dark dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            @click="addToCart"
            type="button"
            class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const productsStore = useProductStore();
const quantity = ref(1);
const taxes = ref(0);
const props = defineProps<{
  product: Product;
}>();

const total = computed(() => {
  return (props.product.price as number) * quantity.value + taxes.value;
});
const addToCart = () => {
  productsStore.addProductTocart({
    product: props.product,
    quantity: quantity.value,
  });

  closeModal();
};

const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
};
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
