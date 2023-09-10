import { AppPagination } from '@/components/common/AppPagination';
import { AppShowCase } from '@/components/common/AppShowCase';
import { AppLogo } from '@/components/common/AppLogo';
import { Body } from '@/components/layout/Body';
import { Header } from '@/components/layout/Header';
import { SortType } from '@/db/service';
import { AppPlaceholder } from '@/components/common/AppPlaceholder';
import { AppNavigateButton } from '@/components/common/AppNavigateButton';
import { useProducts } from '@/contexts/useProducts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{
    page: number;
}> = async (context) => {
    const { page } = context.params as { page: string };
    const pageAsNumber = Number(page?.[1] ?? 1);

    return {
        props: { page: pageAsNumber },
    };
};

function HomePage({ page }: { page: number }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { push } = useRouter();

    const {
        products: data,
        totalItems,
        getProducts,
        selectedSort,
    } = useProducts();

    const handleSortSelect = (selectedSortInput: SortType) => {
        getProducts(1, selectedSortInput);
    };

    const handlePageChange = (newPage: number) => {
        getProducts(newPage, selectedSort);
        void push(`/page/${newPage}`);
    };

    useEffect(() => {
        void getProducts(page, 'like');
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header>
                <AppLogo />
                <AppNavigateButton path='add' text='Yeni İlan Ekle' />
            </Header>
            <Body>
                {totalItems < 1 && !isLoading ? (
                    <AppPlaceholder text='There are no products listed' />
                ) : (
                    data.length && (
                        <>
                            <AppShowCase
                                items={data}
                                onSelectSort={handleSortSelect}
                            />
                            <AppPagination
                                totalItems={totalItems}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )
                )}
            </Body>
        </>
    );
}

export default HomePage;
