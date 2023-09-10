import { SortType } from '@/db/service';

export interface AppFilterProps {
    onSelect: (selectedOption: SortType) => void;
}
