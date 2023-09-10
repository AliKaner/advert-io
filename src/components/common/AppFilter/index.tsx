import { useState } from 'react';
import { AppFilterProps } from './types';
import { FaSlidersH } from 'react-icons/fa';
import { SortType } from '@/db/service';

const optionsMap = [
    {
        value: 'like',
        label: 'Sırala (Favori Sayısı)',
    },
    {
        value: 'date',
        label: 'Sırala (Son Eklenen)',
    },
] as const;

export function AppFilter({ onSelect }: AppFilterProps) {
    const [selectedOption, setSelectedOption] = useState<SortType | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOptionClick = (option: SortType) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='filter'>
            <button className='filter-toggle' onClick={toggleFilter}>
                <FaSlidersH />
            </button>
            {isOpen && (
                <ul className='filter-options'>
                    {optionsMap.map(({ label, value }) => (
                        <li
                            className={`filter-option ${
                                selectedOption === value
                                    ? 'filter-option-selected'
                                    : ''
                            }`}
                            key={value}
                            onClick={() => handleOptionClick(value)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
