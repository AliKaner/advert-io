import { FaSadCry } from 'react-icons/fa';
import { PlaceholderProps } from './types';

export function AppPlaceholder({ text }: PlaceholderProps) {
    return (
        <div className='empty'>
            <div className='empty-icon'>
                <FaSadCry />
            </div>
            <div className='empty-text'>{text}</div>
        </div>
    );
}
