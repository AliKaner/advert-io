import { StorageService } from '@/db/db';
import { ProductType } from '@/shared/types';

export enum SortType {
    LESS_LIKE = 'lessLike',
    MOST_LIKE = 'mostLike',
    MOST_DATE = 'mostDate',
    LESS_DATE ='lessDate',
}

function generateUniqueID() {
    return Date.now();
}

const findProducts = (page: number, itemPerPage: number, sortBy: SortType) => {
    const data = StorageService.get();

    return {
        product: data
            .sort((a, b) => {
                const aUpdatedAt = new Date(a.updatedAt).getTime();
                const bUpdatedAt = new Date(b.updatedAt).getTime();

                switch(sortBy) {
                    case 'lessLike':
                        return a.likes - b.likes;
                    case 'mostDate':
                        return bUpdatedAt - aUpdatedAt;
                    case 'mostLike':
                        return b.likes - a.likes;
                    case 'lessDate':
                        return aUpdatedAt - bUpdatedAt;
                    default:
                        return 0;
                }
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
