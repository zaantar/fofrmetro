import initialData from '../data/initialData.json';

const STORAGE_KEY = 'fofrmetro_data_v1';

export const getStoredData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse stored data', e);
        }
    }
    return initialData;
};

export const saveStoredData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save data', e);
    }
};

export const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    return initialData;
};
