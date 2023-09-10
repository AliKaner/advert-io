import 'src/style/index.scss';
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';
import { ProductProvider } from '@/contexts/useProducts';
import { ToastProvider } from '@/contexts/useToast';

type MyAppProps = AppProps & {
    Component: NextComponentType;
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <ToastProvider>
            <ProductProvider>
                <Component {...pageProps} />
            </ProductProvider>
        </ToastProvider>
    );
}
