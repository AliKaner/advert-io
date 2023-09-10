import { useRouter } from 'next/router';
import { NavigateButtonProps } from './types';

export function AppNavigateButton({ path, text }: NavigateButtonProps) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(path)} className='navigate-button'>
            {text}
        </div>
    );
}
