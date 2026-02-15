/**
 * Utility Functions for Cafe Menu App
 */

/**
 * Format price with dynamic currency
 */
export const formatPrice = (price: number, currency: string = 'SYP'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(price);
};

/**
 * Generate WhatsApp order URL
 */
export const generateWhatsAppURL = (
    phoneNumber: string,
    message: string
): string => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

/**
 * Check if running on client side
 */
export const isClient = (): boolean => {
    return typeof window !== 'undefined';
};

/**
 * Debounce function for search/input optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Convert Arabic numerals to English
 */
export const arabicToEnglishNumbers = (str: string): string => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = str;
    arabicNumbers.forEach((arabic, index) => {
        result = result.replace(new RegExp(arabic, 'g'), englishNumbers[index]);
    });

    return result;
};
