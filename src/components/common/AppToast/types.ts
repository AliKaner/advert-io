export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface ToastProps {
    message: string;
    onClose: () => void;
    type: ToastType;
}
