import { AppToast } from '@/components/common/AppToast';
import { ToastType } from '@/components/common/AppToast/types';
import React, {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';

interface ShowToastProps {
    message: string;
    type: ToastType;
}

interface ToastContextProps {
    showToast: (params: ShowToastProps) => void;
}

interface ToastProviderProps {
    children: ReactNode;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => {} });

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<ToastType>(ToastType.SUCCESS);

    const showToast = (params: ShowToastProps) => {
        setToastMessage(params.message);
        setToastType(params.type);
    };

    const closeToast = () => {
        setToastMessage(null);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {toastMessage && (
                <AppToast
                    message={toastMessage}
                    onClose={closeToast}
                    type={toastType}
                />
            )}
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    return context;
};
