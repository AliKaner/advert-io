import { AppToast } from '@/components/common/AppToast';
import React, {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';

interface ToastContextProps {
    showToast: (message: string, isError:boolean) => void;
}

interface ToastProviderProps {
    children: ReactNode;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => {} });

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const showToast = (message: string, isError:boolean) => {
        setToastMessage(message);
        setIsError(isError);
    };

    const closeToast = () => {
        setToastMessage(null);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {toastMessage && (
                <AppToast message={toastMessage} onClose={closeToast} isError={isError} />
            )}
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    return context;
};
