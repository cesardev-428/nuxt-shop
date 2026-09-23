export default defineEventHandler(event => {
  // Read cart cookie
  let cart = getCookie(event, 'cart')  || 0

 /*  if (!cart) {
    cart = { cartItems: [] }
  } */
  
  // Send JSON response
  return JSON.parse(cart as string)
})