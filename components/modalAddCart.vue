<template>
  <div id="modelConfirm" class="fixed  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
    <div class="relative top-40 mx-auto bg-transparent">
      <div class="p-6 pt-0 text-center">
        <div class="flex flex-col justify-center items-center ">
          <div class="bg-gray-100 rounded-lg shadow-lg p-6 relative">
            <div class="ml-auto absolute top-2 right-2">
              <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex ">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                  </path>
                </svg>
              </button>
            </div>
            <h1 class="text-2xl font-bold mb-6 dark:text-textPrimary text-textPrimaryl">Shopping Cart</h1>
            <div class="flex justify-between mb-4">
              <div class="flex items-center">
                <img :src="product.thumbnail" alt="Product Image" class="mr-4" > 
                <div>
                  <h2 class="font-bold">{{product.title}}</h2>
                  <p class="text-gray-700 max-w-96 max-h-96 overflow-hidden">{{product.description}}</p>
                </div>
              </div>
              <div class="flex items-center">
                <button class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                <div class="mx-4">
                  <input v-model="quantity" type="number"  class="w-16 text-center">
                </div>
                <span class="font-bold">${{product.price*quantity}}</span>
              </div>
            </div>
            <hr class="my-4">
            <div class="flex justify-between items-center">
              <span class="font-bold">Subtotal:</span>
              <span class="font-bold">${{(product.price as number) * quantity}}</span>
            </div>
            <div class="flex justify-between items-center mt-4">
              <span>Taxes:</span>
              <span>${{taxes}}.00</span>
            </div>
            <hr class="my-4">
            <div class="flex justify-between items-center">
              <span class="font-bold">Total:</span>
              <span class="font-bold">${{total}}</span>
            </div>
            <div class="flex justify-center mt-6 gap-3">
              <button @click="addToCart" class="dark:bg-accentPrimary bg-accentPrimaryl dark:text-textPrimary text-white hover:bg-hoverPrimary font-bold py-2 px-4 rounded">Checkout</button>
              <button @click="closeModal" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Cancel </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const productsStore = useProductStore()
  const quantity = ref(1)
  const taxes = ref(0)
  const props = defineProps<{
    product: Product
  }>()

  const total = computed(() => {
    return ((props.product.price as number) * quantity.value) + taxes.value
  })
  const addToCart = () => {


    productsStore.addProductTocart({product:props.product,quantity:quantity.value})
    console.log('Added to cart')

    
    closeModal()
  }

  const emit = defineEmits(['close'])
  const closeModal = () => {
    emit('close')
  }
</script>

<style scoped>
img{
  width: 200px;
  height: 200px;
}
</style>
