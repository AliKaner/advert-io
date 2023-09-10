import { AppTitleProps } from './types';

export function AppTitle({ title, subtitle }: AppTitleProps) {
    return (
        <h1 className='title'>
            {title}
            <span className='subtitle'> {subtitle}</span>
        </h1>
    );
}
