<template>
  <div
    class="w-full min-h-[100vh]"
    :class="{ 'flex flex-col items-center justify-center': props.loading }"
  >
    <!-- <div class="text-sm flex flex-wrap gap-1 overflow-hidden py-3 max-h-[100px]" >
      <span class="bg-primary px-2 py-1 rounded hover:bg-white hover:text-indigo-600 text-white text-sm">Cooking</span>
    </div> -->
    <div
      v-if="!props.loading"
      class="cardDiv grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="(product, i) in productsStore.productsFormatted.slice(
          (currentPage - 1) * 6,
          currentPage * 6
        )"
        class="product aspect-square rounded-lg shadow-lg dark:bg-background-dark-secondary bg-background-light cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 bounce"
      >
        <img
          class="p-2 rounded-lg w-full h-3/4 object-contain"
          alt="product image"
          :src="product.thumbnail"
        />
        <div class="px-5 pb-5 text-gray-900 dark:text-white">
          <h5 class="text-xl font-semibold tracking-tight">
            {{ product.title }}
          </h5>
          <p>{{ product.description }}</p>

          <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
              <svg
                class="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              <svg
                class="w-4 h-4 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
            </div>
            <span
              class="text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 ms-3"
              >5.0</span
            >
          </div>
          <div class="flex items-center justify-between">
            <span
              class="text-3xl font-bold text-gray-900 dark:text-white hover:text"
              >${{ product.price }}</span
            >
            <button
              @click="open(product)"
              class="button bg-primary dark:hover:bg-primary/50 hover:bg-primary-dark text-textColor-dark px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <span class="label">Add to card</span>
              <span class="gradient-container">
                <span class="gradient"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loader"></div>
  </div>

  <modalAddCart
    v-if="openModal && productSelected"
    @close="openModal = false"
    :product="productSelected"
  />
</template>
<script setup lang="ts">
import modalAddCart from "./modalAddCart.vue";

const currentPage = useState<number>("currentPage");

const productsStore = useProductStore();
const openModal = ref(false);
const productSelected = ref<Product>();

const props = defineProps({
  page: { type: Number, default: 1 },
  loading: { type: Boolean, default: true },
});

const open = (product: Product) => {
  if (!product) return;

  productSelected.value = product;
  openModal.value = true;
};
</script>

<style>
.cardDiv {
  transition: all 0.3s ease;
}
/* .product{
  height: 5%;
} */

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

:root {
  --bg-loader: #000;
  --bg-loader-f: #0002;
}
.dark-mode {
  --bg-loader: #777;
  --bg-loader-f: #7772;
}

.loader {
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
  0% {
    box-shadow: 40px 0 var(--bg-loader), -40px 0 var(--bg-loader-f);
    background: var(--bg-loader);
  }
  33% {
    box-shadow: 40px 0 var(--bg-loader), -40px 0 var(--bg-loader-f);
    background: var(--bg-loader-f);
  }
  66% {
    box-shadow: 40px 0 var(--bg-loader-f), -40px 0 var(--bg-loader);
    background: var(--bg-loader-f);
  }
  100% {
    box-shadow: 40px 0 var(--bg-loader-f), -40px 0 var(--bg-loader);
    background: var(--bg-loader);
  }
}

.CardContent_Container__LsOdx {
  width: 100%;
  height: calc(100% - 105px);
  aspect-ratio: 1/1;
}

/* img {
  width: 500px;
  height: 300px;
} */
</style>
