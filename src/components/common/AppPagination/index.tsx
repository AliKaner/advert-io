import { ITEM_PER_PAGE } from '@/shared/constants';
import React from 'react';
import { PaginationProps } from './types';
import { useProducts } from '@/contexts/useProducts';

export function AppPagination({ totalItems, onPageChange }: PaginationProps) {
    const { currentPage, selectedSort } = useProducts();

    const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);
    const canGoToPreviousPage = currentPage > 1;
    const canGoToNextPage = currentPage < totalPages;

    function generateRenderingNumbers(current: number, total: number): number[] {
        if (current < 0 || total < 0 || current > total || !Number.isInteger(current) || !Number.isInteger(total)) {
            throw new Error('Invalid input');
        }
        
        const renderingNumbers: Record<number, boolean> = {};
        
        renderingNumbers[1] = true;
        renderingNumbers[total] = true;

        for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
             renderingNumbers[i] = true;
        }
        
        [current - 10, current, current + 10, current + 20].forEach(num => {
             if (num >= 1 && num <= total) {
                 renderingNumbers[num] = true;
             }
        });

        const result = Object.keys(renderingNumbers).map(Number).sort((a, b) => a - b);
    
        return result;
    }
    

    const renderingPageNumbers = generateRenderingNumbers(
        currentPage,
        totalPages
    );
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage, selectedSort);
        }
    };

    return (
        <div className='pagination'>
            <div className='pagination-buttons'>
                {canGoToPreviousPage && (
                    <button
                        className='pagination-button-control'
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!canGoToPreviousPage}
                    >
                        Geri
                    </button>
                )}

                {renderingPageNumbers.map((pageNumber) => (
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
                {canGoToNextPage && (
                    <button
                        className='pagination-button-control'
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        İleri
                    </button>
                )}
            </div>
            <span className='pagination-info'>
                Sayfa {currentPage} / {totalPages}
            </span>
        </div>
    );
}
