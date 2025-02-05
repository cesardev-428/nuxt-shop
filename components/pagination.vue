<template>
  <nav class="inline-flex items-center p-1 rounded  space-x-2 mt-2 w-full justify-center">
    <button 
      @click="getNextPage(false)"
      class="p-1 rounded border dark:bg-accentPrimary bg-accentPrimaryl dark:text-textPrimary text-white hover:bg-hoverPrimary" href="#">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </button>
    <p class="dark:text-textPrimary text-textPrimaryl">
      Page {{ currentPage }} of {{ pages }}
    </p>
    <button
      @click="getNextPage(true)" 
      class="p-1 rounded border dark:bg-accentPrimary bg-accentPrimaryl dark:text-textPrimary text-white hover:bg-hoverPrimary" href="#">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
  </nav>
</template>
<script setup lang="ts">
  const productsStore = useProductStore()
  const totalProducts = 30
  const currentPage = ref(1)
  const limit = ref(6)
  const pages = ref(totalProducts / limit.value)
  const emit = defineEmits<{
    (e: 'sendCurrentPage', page: number): void
    (e: 'loading', loading: boolean): void
  }>()
  onMounted(() => {
    fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=0`)
    .then(res => res.json())
    .then((res) => {
      console.log('Data fetched',res)
      const products:Product[] = res.products.map((product: any) => {
        return {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          tags: product.tags,
          thumbnail: product.thumbnail,
        }
      })
      productsStore.setProducts(products)
    })
  })

  const getNextPage = (next: boolean) => {
    console.log('Next page', next)

    if (next && currentPage.value >= pages.value || !next && currentPage.value <= 1) return
    next ? currentPage.value++ : currentPage.value--
    emit('sendCurrentPage', currentPage.value)
    if (productsStore.products.length >= (currentPage.value * 6) ) return
    emit('loading', true)
    

    fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=${currentPage.value * 6}`)
    .then(res => res.json())
    .then((res) => {
      console.log('Data fetched',res)
      const products:Product[] = res.products.map((product: any) => {
        return {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          tags: product.tags,
          thumbnail: product.thumbnail,
        }
      })
      productsStore.setProducts(products)
    }).finally(() => {
      emit('loading', false)
    })


  }
</script>