import React, { useEffect } from 'react';
import { ToastProps } from './types';

export function AppToast({ message, onClose, isError }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);
 
    return (
        <div className={`fixed-toast ${isError ? 'error-toast' : 'success-toast'}`}>
            <div className='toast-content'>
                <div onClick={onClose}></div>
            </div>
            {message}
        </div>
    );
}
