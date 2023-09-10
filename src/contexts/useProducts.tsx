import { useState, createContext, useContext } from 'react';
import { DatabaseService, SortType } from '@/db/service';
import { ProductType } from '@/shared/types';
import { useRouter } from 'next/router';
import { ITEM_PER_PAGE } from '@/shared/constants';
import { useToast } from './useToast';
import { ToastType } from '@/components/common/AppToast/types';

type GetProductsReturnType = {
    product: ProductType[];
    totalProducts: number;
};

type ProductContextType = {
    products: ProductType[];
    totalItems: number;
    addProduct: (addData: {
        name: string;
        imgUrl: string;
        isUrgent: boolean;
    }) => void;
    deleteProduct: (id: number) => void;
    likeProduct: (id: number) => void;
    getProducts: (
        page: number,
        sortBy: SortType,
        itemPerPage?: number
    ) => GetProductsReturnType | undefined;
    currentPage: number;
    selectedSort: SortType;
    isLoading:boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductProviderProps = {
    children: React.ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({
    children,
}) => {
    const { push } = useRouter();
    const { showToast } = useToast();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedSort, setSelectedSort] = useState<SortType>(SortType.MOST_DATE);
    const [isLoading, setIsLoading] = useState(true);

    const addProduct = async (addData: {
        name: string;
        imgUrl: string;
        isUrgent: boolean;
    }) => {
        try {
            await DatabaseService.product.add(addData);
            void getProducts(currentPage, selectedSort);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const likeProduct = async (id: number) => {
        try {
            const product = products.find((product) => product.id === id);

            if (!product) return;

            await DatabaseService.product.update(id, {
                isLiked: !product.isLiked,
                likes: product.isLiked ? product.likes - 1 : product.likes + 1,
            });
            void getProducts(currentPage, selectedSort);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await DatabaseService.product.delete(id);
            const newProducts = await getProducts(currentPage, selectedSort);

            if (!newProducts) {
                return;
            }

            if (newProducts.product.length < 1) {
                const previousPage = currentPage - 1;
                const newPage = previousPage < 1 ? 1 : previousPage;

                showToast({
                    message: 'Ürün başarı ile silindi.',
                    type: ToastType.SUCCESS,
                });
                await getProducts(newPage, selectedSort);
                void push(`/page/${newPage}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const getProducts = (
        page: number,
        sortBy: SortType,
        itemPerPage: number = ITEM_PER_PAGE
    ) => {
        try {
            const productsResult = DatabaseService.product.find(
                page,
                itemPerPage,
                sortBy
            );

            setProducts(productsResult.product);
            setTotalItems(productsResult.totalProducts);
            setCurrentPage(page);
            setSelectedSort(sortBy);
            setIsLoading(false);

            return productsResult;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const productContextValue: ProductContextType = {
        isLoading,
        products,
        totalItems,
        addProduct,
        deleteProduct,
        likeProduct,
        getProducts,
        currentPage,
        selectedSort,
    };

    return (
        <ProductContext.Provider value={productContextValue}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            'useProductContext must be used within a ProductProvider'
        );
    }
    return context;
};
