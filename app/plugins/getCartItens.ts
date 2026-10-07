
export default defineNuxtPlugin(async () => {
  
  
  const { getCookieCart } = await useCart()
  /* console.log("[plugins/auth]--> auth plugin") */
  try{
    await getCookieCart()
  }catch(err){
    console.log("err plugin: ",err)
  }

  
 

})