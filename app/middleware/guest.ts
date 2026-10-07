export default defineNuxtRouteMiddleware(async () => {
  const requestFetch = useRequestFetch();
  try {
    await requestFetch("/api/auth/me");
    // Ya hay sesión — salir del login
    return navigateTo("/dashboard");
  } catch {
    // No autenticado — permitir mostrar el formulario
  }
});
