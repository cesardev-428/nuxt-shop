export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const toasts = ref<Toast[]>([]);
let seq = 0;

export function useToast() {
  function push(
    message: string,
    type: Toast["type"] = "success",
    duration = 3500
  ) {
    const id = ++seq;
    toasts.value.push({ id, message, type });
    setTimeout(() => dismiss(id), duration);
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return { toasts, push, dismiss };
}
