import React from 'react';
import { AppBadge } from '../AppBadge';
import { FaFire,FaRegHeart } from 'react-icons/fa';
import { GoTrash, GoCalendar } from 'react-icons/go';
import { CardProps } from './types';
import { BadgeType } from '../AppBadge/types';
import { useProducts } from '@/contexts/useProducts';
import { formatDate, isImage } from '@/shared/utils';
import Image from 'next/image';
import { PLACE_HOLDER_IMAGE } from '@/shared/constants';
import { useToast } from '@/contexts/useToast';
import { ToastType } from '../AppToast/types';
import { AppFavButton } from '../AppFavButton';

export function AppCard({ item }: CardProps) {
    const { showToast } = useToast();
    
    const { deleteProduct, likeProduct } = useProducts();

    const handleDeleteOnClick = () => {
        deleteProduct(item.id);

        showToast({
            message:
                'İlan başarıyla silindi.',
            type: ToastType.SUCCESS,
        });
    };

    const handleLikeOnClick = () => {
        likeProduct(item.id);
    };

    return (
        <div className='item-card'>
            {item.isUrgent && (
                <AppBadge
                    badgeType={BadgeType.URGENT}
                    text='Acil'
                    icon={<FaFire />}
                />
            )}
            <Image
                className='item-card-image'
                src={isImage(item.imgUrl) ? item.imgUrl : PLACE_HOLDER_IMAGE}
                alt={item.name}
                width={300}
                height={240}
            />
            <div className='item-detail'>
                <div className='item-detail-title'>{item.name}</div>
                <div className='item-detail-row'>
                    <div className='item-detail-icon'>
                        <FaRegHeart />
                    </div>
                    <span>Toplam Favori Sayısı: {item.likes}</span>
                </div>  
                <div className='item-detail-row'>
                    <div className='item-detail-icon'>
                        <GoCalendar />
                    </div>
                    <span>Son Güncellenme: {formatDate(item.updatedAt)}</span>
                </div>
            </div>
            <div className='item-card-buttons'>
                <button
                    onClick={handleLikeOnClick}
                    className='item-card-button'
                >
                    <div className='button-icon'>
                        <AppFavButton isLiked={item.isLiked}/>
                    </div>
                </button>
                <button
                    onClick={handleDeleteOnClick}
                    className='item-card-button hover-button'
                >
                    <div className='button-icon'>
                        <GoTrash className='trash-icon' />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default AppCard;
