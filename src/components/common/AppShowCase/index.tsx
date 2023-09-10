import AppCard from '../AppCard';
import { AppFilter } from '../AppFilter';
import { AppTitle } from '../AppTitle';
import { ShowCaseProps } from './types';

export function AppShowCase({ items, onSelectSort }: ShowCaseProps) {
    return (
        <div className='showcase'>
            <div className='showcase-header'>
                <div className='header-left'>
                    <AppTitle title='ANA SAYFA' subtitle='VİTRİNİ' />
                </div>
                <div className='header-right'>
                    <AppFilter onSelect={onSelectSort} />
                </div>
            </div>
            <div className='showcase-items'>
                {items.map((item) => (
                    <AppCard item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}
