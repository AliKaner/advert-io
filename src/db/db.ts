import { data } from '@/db/data';
import { ProductType } from '@/shared/types';

const DB_KEY = 'db';

type DatabaseType = ProductType[];

export const init = () => {
    const db = localStorage.getItem(DB_KEY);
    if (!db) {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    }
};

const set = (value: DatabaseType) => {
    localStorage.setItem(DB_KEY, JSON.stringify(value));
};

const get = (): DatabaseType => {
    let db = localStorage.getItem(DB_KEY);

    if (!db) {
        init();
        db = localStorage.getItem(DB_KEY) as string;
    }

    return JSON.parse(db);
};

export const StorageService = {
    get,
    set,
};
