export interface ToastProps {
    message: string;
    onClose: () => void;
    isError: boolean;
  }