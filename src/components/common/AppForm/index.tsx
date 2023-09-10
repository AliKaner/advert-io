import React, { useState } from 'react';
import { AppTitle } from '../AppTitle';
import { useProducts } from '@/contexts/useProducts';
import { useRouter } from 'next/router';
import { isUrl } from '@/shared/utils';
import { useToast } from '@/contexts/useToast';

export function AppForm() {
    const [name, setName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [isUrgent, setIsUrgent] = useState<boolean>(false);

    const { showToast } = useToast();
    const router = useRouter();
    const { addProduct } = useProducts();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImgUrl(e.target.value);
    };

    const handleIsUrgentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUrgent(e.target.checked);
    };

    const handleSave = () => {
        if (name === '' || !isUrl(imgUrl)) {
            showToast(
                'İlan Kaydedilemedi. Lüften Bilgilerinizi Kontrol Ediniz.',
                true
            );
            return;
        }
        showToast('İlan Kaydedildi. Anasayfaya Yönlendirildiniz.', false);
        addProduct({ name: name, imgUrl: imgUrl, isUrgent: isUrgent });
        router.push('/');
    };

    return (
        <div className='add-form'>
            <div className='add-form-title'>
                <AppTitle title='YENİ İLAN' subtitle='EKLE' />
            </div>
            <div className='form-field'>
                <label htmlFor='name'>Name of Advert</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={handleNameChange}
                    className='form-field-input'
                />
            </div>
            <div className='form-field'>
                <label htmlFor='imgUrl'>Image of Advert</label>
                <input
                    type='text'
                    id='imgUrl'
                    value={imgUrl}
                    onChange={handleImgUrlChange}
                    className='form-field-input'
                />
            </div>
            <div className='form-field-checkbox'>
                <label htmlFor='isUrgent'>Is It Urgent?</label>
                <input
                    type='checkbox'
                    id='isUrgent'
                    checked={isUrgent}
                    onChange={handleIsUrgentChange}
                    className='form-field-checkbox-box'
                />
            </div>
            <div className='add-form-button'>
                <button className='save-button' onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}
