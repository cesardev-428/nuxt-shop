export default defineNuxtRouteMiddleware(async () => {
  const requestFetch = useRequestFetch();
  try {
    await requestFetch("/api/auth/me");
  } catch {
    return navigateTo("/dashboard/login");
  }
});
