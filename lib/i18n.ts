import type { Locale } from './types/dictionary';
import arDictionary from '@/dictionaries/ar';
import enDictionary from '@/dictionaries/en';

export const defaultLocale: Locale = 'ar'; // Arabic is default
export const locales: Locale[] = ['ar', 'en'];

const dictionaries = {
    ar: arDictionary,
    en: enDictionary,
};

export const getDictionary = (locale: Locale = defaultLocale) => {
    return dictionaries[locale] || dictionaries[defaultLocale];
};

export const getDirection = (locale: Locale) => {
    return locale === 'ar' ? 'rtl' : 'ltr';
};
