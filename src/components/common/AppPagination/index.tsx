import { ITEM_PER_PAGE } from '@/shared/constants';
import React from 'react';
import { PaginationProps } from './types';
import { useProducts } from '@/contexts/useProducts';

export function AppPagination({ totalItems, onPageChange }: PaginationProps) {
    const { currentPage, selectedSort } = useProducts();

    const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);
    const canGoToPreviousPage = currentPage > 1;
    const canGoToNextPage = currentPage < totalPages;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage, selectedSort);
        }
    };

    return (
        <div className='pagination'>
            <div className='pagination-buttons'>
                <button
                    className='pagination-button'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!canGoToPreviousPage}
                >
                    Prev
                </button>

                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`pagination-button ${
                            currentPage === pageNumber ? 'active' : ''
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    className='pagination-button'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!canGoToNextPage}
                >
                    Next
                </button>
            </div>
            <span className='pagination-info'>
                Page {currentPage} of {totalPages}
            </span>
        </div>
    );
}
