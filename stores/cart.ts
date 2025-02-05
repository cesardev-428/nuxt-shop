export const useCartStore = defineStore('cart', () => {
  const sidebarOn = ref(false)
  const length = ref(0)
  function setSidebar(l:boolean) {
    sidebarOn.value =  !l
  }
  

  const getLength = computed(() => {
    const prod = useProductStore()
    return prod.productsInCart.length
    
  })
  return { sidebarOn, setSidebar, length, getLength}
})