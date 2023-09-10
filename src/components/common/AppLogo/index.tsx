import { APP_LOGO } from '@/shared/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function AppLogo() {
    const router = useRouter();
    return (
        <Image
            className='logo'
            onClick={() => router.push('/')}
            src={APP_LOGO}
            height={40}
            width={130}
            alt='logo'
        />
    );
}
