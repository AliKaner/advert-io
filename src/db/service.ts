import { StorageService } from '@/db/db';
import { ProductType } from '@/shared/types';

export type SortType = 'like' | 'date';

function generateUniqueID() {
    return Date.now();
}

const findProducts = async (
    page: number,
    itemPerPage: number,
    sortBy: SortType
) => {
    const data = StorageService.get();

    return {
        product: data
            .sort((a, b) => {
                const aUpdatedAt = new Date(a.updatedAt).getTime();
                const bUpdatedAt = new Date(b.updatedAt).getTime();

                if (sortBy === 'date') {
                    return bUpdatedAt - aUpdatedAt;
                }

                if (a.likes === b.likes) {
                    return bUpdatedAt - aUpdatedAt;
                }

                return b.likes - a.likes;
            })
            .slice((page - 1) * itemPerPage, page * itemPerPage),
        totalProducts: data.length,
    };
};

const updateProduct = async (
    id: number,
    updateData: { isLiked: boolean; likes: number }
) => {
    const data = StorageService.get();

    const product = data.find((item) => item.id === id);

    if (product) {
        product.isLiked = updateData.isLiked;
        product.likes = updateData.likes;
        product.updatedAt = new Date();

        StorageService.set(data);
    }
};

const addProduct = async (addData: {
    name: string;
    imgUrl: string;
    isUrgent: boolean;
}) => {
    const data = StorageService.get();

    const id = generateUniqueID();

    const newProduct: ProductType = {
        id,
        name: addData.name,
        imgUrl: addData.imgUrl,
        likes: 0,
        updatedAt: new Date(),
        isUrgent: addData.isUrgent,
        isLiked: false,
    };

    data.push(newProduct);
    StorageService.set(data);
};

const deleteProduct = async (id: number) => {
    const data = StorageService.get();
    const productIndex = data.findIndex((item) => item.id === id);

    if (productIndex !== -1) {
        data.splice(productIndex, 1);
        StorageService.set(data);
    }
};

export const DatabaseService = {
    product: {
        find: findProducts,
        update: updateProduct,
        delete: deleteProduct,
        add: addProduct,
    },
};
