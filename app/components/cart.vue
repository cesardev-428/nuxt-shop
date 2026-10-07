<template>
  <div
    class="select-none mx-3 lg:mx-5 shadow-2xl rounded-[2rem] right-0 fixed flex z-50 bg-white/85 dark:bg-background-dark-secondary dark:border dark:border-white/10 cart-button-bezel backdrop-blur-lg overflow-hidden"
  >
    <Transition name="fade" mode="out-in">
      <div
        v-if="productsStore.productsFormattedInCart.length > 0"
        class="flex w-full h-96 max-md:flex-col max-md:max-h-[calc(100vh-92px)] overflow-y-auto"
      >
        <div
          class="w-[calc(100vw-24px)] sm:w-full md:w-80 relative overflow-y-auto"
        >
          <div class="md:absolute h-full w-full overflow-auto">
            <div
              v-for="(product, i) in productsStore.productsFormattedInCart"
              :key="i"
              class="flex bg-black/5 dark:bg-white/10 m-3 p-3 gap-3 rounded-3xl items-center group relative max-md:pr-9 cursor-pointer"
            >
              <img
                :src="product.product.thumbnail"
                class="w-24 h-28 object-cover shadow-md rounded-2xl"
              />
              <div class="flex-1 gap-1 flex flex-col">
                <div
                  class="font-medium text-sm line-clamp-2 overflow-hidden text-ellipsis text-textColor-light dark:text-textColor-dark"
                >
                  {{ product.product.title }}
                </div>
                <div
                  class="font-bold text-textColor-light dark:text-textColor-dark flex"
                >
                  <span>${{ Number(product.product.price).toFixed(2) }}</span>
                  <span class="ml-auto">Qty:{{ product.quantity }}</span>
                </div>
                <div
                  class="flex-wrap text-neutral-600 dark:text-neutral-300 items-baseline text-xs gap-1 flex-row flex"
                >
                  <p class="text-textColor-light dark:text-textColor-dark">
                    Originally: ${{
                      (
                        (product.product.price as number) -
                        ((product.product.price as number) * 20) / 100
                      ).toFixed(2)
                    }}
                  </p>
                </div>
                <span
                  >Total:${{
                    (
                      (product.product.price as number) * product.quantity
                    ).toFixed(2)
                  }}</span
                >
              </div>
              <button
                @click="productsStore.removeProductFromCart(product)"
                class="absolute md:opacity-0 group-hover:opacity-100 top-2 right-2 md:-top-1 md:-right-1 transition bg-red-700 flex p-1 items-center justify-center rounded-full hover:bg-red-500 active:scale-95"
              >
                <Icon
                  :name="'i-iconamoon-trash-light'"
                  size="18"
                  class="text-white"
                />
              </button>
            </div>
          </div>
        </div>
        <!-- checkout -->
        <div class="">
          <div class="flex flex-col justify-between h-full p-3">
            <div class="flex flex-col gap-2">
              <div
                class="text-lg font-semibold text-textColor-light dark:text-textColor-dark"
              >
                Total
              </div>
              <div
                class="text-2xl font-bold text-textColor-light dark:text-textColor-dark"
              >
                ${{ productsStore.totalProductsInCart.toFixed(2) }}
              </div>
            </div>
            <button
              class="bg-alizarin-crimson-700 hover:bg-alizarin-crimson-600 text-white font-bold py-2 px-4 rounded bg-primary hover:bg-primary/90"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div v-else class="w-[calc(100vw-24px)] sm:w-96 h-96 p-3">
        <div
          class="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-white/0 to-white/0 dark:from-primary/40 dark:via-black/0 dark:to-black/0 rounded-3xl w-full h-full flex items-center justify-center"
        >
          <div
            class="flex flex-col items-center justify-center mt-2 mb-4 gap-2"
          >
            <div
              class="bg-alizarin-crimson-500/20 dark:bg-alizarin-crimson-700/20 flex rounded-full p-5 mb-1"
            >
              <Icon
                name="iconamoon:shopping-bag-fill"
                size="46"
                class="text-alizarin-crimson-600 dark:text-alizarin-crimson-700 shadow-md text-textColor-light dark:text-textColor-dark"
              />
            </div>
            <div
              class="text-lg font-semibold text-textColor-light dark:text-textColor-dark"
            >
              Your Cart is Empty
            </div>
            <div class="text-sm text-textColor-light dark:text-textColor-dark">
              You haven't added any items to your cart yet.
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const productsStore = useProductStore();
const cartStore = useCartStore();

const quantityEdit = (sum: boolean, index: number) => {
  if (sum) {
    productsStore.editQuantity(index, 1);
  } else {
    productsStore.editQuantity(index, -1);
  }
};
const removeFromCart = (product: CartItem) => {
  productsStore.removeProductFromCart(product);
  console.log("Removed from cart");
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}

.carr {
  inset-block-start: 64px;
}
</style>
