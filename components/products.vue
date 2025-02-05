<template>
  <div class="flex justify-center flex-col items-center w-full h-screen"> 
    <!-- <div class="text-sm flex flex-wrap gap-1 overflow-hidden py-3 max-h-[100px]" >
      <span class="bg-primary px-2 py-1 rounded hover:bg-white hover:text-indigo-600 text-white text-sm">Cooking</span>
    </div> -->
    <div 
      v-if="!props.loading"
      class="cardDiv grid grid-cols-3 gap-4 w-full   ">
      <div 
        v-for="(product,i) in  productsStore.productsFormatted.slice((props.page-1)*6, props.page*6)"
        :key="i"
        class="card shadow-xl max-h-[425px] group/cart flex flex-col  rounded-lg px-6 py-4 cursor-pointer hover:scale-105 duration-200 ">
        
        <div class="w-full h-[400px] bg-slate-200 rounded-lg relative">
          <div class=" justify-center flex  ">
            <img :src="product.thumbnail" alt="">
          </div>
          <div 
            @click="open(product) "
            class="absolute w-12 h-12 rounded-full bg-gray-600 bottom-3 right-2 group/cartI  hover:bg-black invisible group-hover/cart:visible">
            <div class="flex items-center justify-center h-full ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 group-hover/cartI:fill-slate-300">
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start mt-auto py-4 ">
          <h4 class="text-xl font-semibold dark:text-textPrimary text-textPrimaryl">{{product.title }}</h4>
          <p class="text-sm dark:text-textPrimary text-textPrimaryl ">${{product.description }}</p>
          <div>
            <span class="text-2xl dark:text-textPrimary text-textPrimaryl">${{product.price}}</span>
            <span class="text-2xl dark:text-textPrimary text-textPrimaryl">/</span>
            <span class=" text-xl text-red-800 dark:text-red-400 line-through ">{{ (product.price as number + ((product.price as number*30)/100)).toFixed(2) }}</span>
            <span class=" text-xl text-red-800 dark:text-red-400  ">   30% desc</span>
          </div>
        </div>
      </div>
      
    </div >
    <div v-else class="loader "></div>
  </div>
  
  <Transition name="bounce">
    <modalAddCart v-if="openModal && productSelected " @close="openModal = false" :product="productSelected"  />
  </Transition>
</template>
<script setup lang="ts">
  import modalAddCart from './modalAddCart.vue';
  const productsStore = useProductStore()
  const openModal = ref(false)
  const productSelected = ref<Product>()
  
  const props = defineProps({
    page: { type: Number, default: 1 },
    loading: { type: Boolean, default: false }
  })

  
  const open = (product: Product ) => {
    if(!product) return
    productSelected.value = product
    openModal.value = true
  }

</script>

<style>
.cardDiv{
  transition: all 0.3s ease;
}


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


/* HTML: <div class="loader"></div> */
.loader {
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
    0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000 }
    33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002}
    66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002}
    100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000 }
}
</style>