import { useCallback, useRef } from 'react';
import { AppFavButtonProps } from './types';

export function AppFavButton({ isLiked }: AppFavButtonProps) {
    const clickedRef = useRef(false);

    const onClick = useCallback(() => {
        clickedRef.current = true;
    }, []);

    const onMouseLeave  = () => {
        clickedRef.current = false;
    }

    const getClassName = useCallback(() => {
        if (clickedRef.current) {
            return isLiked ? 'animate' : '';
        } else {
            return isLiked ? 'faved' : '';
        }
    }, [isLiked]);

    return <div className={`heart ${getClassName()}`} onMouseLeave={onMouseLeave} onClick={onClick}  />;
}
