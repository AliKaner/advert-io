import { BadgeProps } from './types';

export function AppBadge({ text, icon }: BadgeProps) {
    return (
        <div className='badge-hot'>
            <div className='badge-content'>
                {icon ? <span className='badge-icon'>{icon}</span> : null}
                {text ? <span className='badge-text'>{text}</span> : null}
            </div>
        </div>
    );
}
