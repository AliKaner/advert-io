import { SortType } from '@/db/service';

export interface PaginationProps {
    totalItems: number;
    onPageChange: (page: number, sortType: SortType) => void;
}
