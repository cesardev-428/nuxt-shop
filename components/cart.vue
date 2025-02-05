<template>
  <div class="cart flex flex-col w-96 z-20 divide-y-2 dark:divide-slate-800 divide-textPrimaryl  shadow-xl  ">
    <div class="flex items-center justify-center h-16 ">
      <h2 class="text-textPrimaryl dark:text-textPrimary text-2xl font-bold my-4">Shopping Cart</h2>
    </div>
    <div class="flex flex-col divide-y dark:divide-slate-800 divide-textPrimaryl max-h-screen overflow-y-auto">
      <div 
        v-for="(product,i) in productsStore.productsFormattedInCart"
        class="product px-4 py-6  " >
        <div class="flex flex-col items-center relative ">
          <div class="bg-slate-200 rounded">
            <img :src="product.product.thumbnail" alt="Product image" class="w-12 h-12 object-cover">
          </div>
          <div class="mt-4 md:mt-0 md:ml-6">
            <h3 class="text-lg font-bold text-textPrimaryl dark:text-textPrimary">{{product.product.title}}</h3>
            <p class="mt-2 text-textPrimaryl dark:text-textPrimary">{{product.product.description}}</p>
          </div>
          <div 
            @click="removeFromCart(product)"
            class="absolute top-0 right-0 ">
            <button class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-800 rounded-lg text-sm p-1.5   ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span class="mr-2 text-textPrimaryl dark:text-textPrimary">Quantity:</span>
          <div class="flex items-center">
            <button @click="quantityEdit(false,i)" class="bg-gray-200 rounded-l-lg px-2 py-1" >-</button>
            <span class="mx-2 text-textPrimaryl dark:text-textPrimary">{{product.quantity}}</span>
            <button @click="quantityEdit(true,i)" class="bg-gray-200 rounded-r-lg px-2 py-1" >+</button>
          </div>
          <span class="ml-auto font-bold text-textPrimaryl dark:text-textPrimary">${{product.total}}</span>
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-between px-4 py-6">
        <span class="text-textPrimaryl dark:text-textPrimary">Total:</span>
        <span class="font-bold text-textPrimaryl dark:text-textPrimary">${{productsStore.totalProductsInCart}}</span>
      </div>
      <div class="flex justify-center">
        <button class="dark:bg-accentPrimary bg-accentPrimaryl dark:text-textPrimary text-white hover:bg-hoverPrimary font-bold py-2 px-4 rounded">Checkout</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

const productsStore = useProductStore()


const quantityEdit = (sum: boolean, index:number ) => {
  if(sum){

    productsStore.editQuantity(index, 1)
  }else{
    productsStore.editQuantity(index, -1)
  }
  
}
const removeFromCart = (product:CartItem) => {
  productsStore.removeProductFromCart(product)
  console.log('Removed from cart')
}


</script>


<style scoped>

img {
  width: 100px;
  height: 100px;
}
</style>