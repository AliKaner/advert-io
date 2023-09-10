import { SortType } from '@/db/service';
import { ProductType } from '@/shared/types';

export interface ShowCaseProps {
    items: ProductType[];
    onSelectSort: (sort: SortType) => void;
}

