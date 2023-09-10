import React, { useEffect, useMemo } from 'react';
import { ToastProps, ToastType } from './types';
import { TOAST_CLOSE_TIMEOUT } from '@/shared/constants';

export function AppToast({ message, onClose, type }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, TOAST_CLOSE_TIMEOUT);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const typeStyle = useMemo(() => {
        if (type === ToastType.SUCCESS) {
            return 'success-toast';
        }
        return 'error-toast';
    }, [type]);

    return (
        <div className={`fixed-toast ${typeStyle}`} onClick={onClose}>
            {message}
        </div>
    );
}
