import type { Dictionary } from '@/lib/types/dictionary';

const enDictionary: Dictionary = {
    common: {
        appName: 'Cafe Menu',
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        back: 'Back',
        next: 'Next',
    },

    nav: {
        home: 'Home',
        menu: 'Menu',
        about: 'About',
        contact: 'Contact',
        admin: 'Admin',
    },

    menu: {
        title: 'Menu',
        categories: 'Categories',
        search: 'Search for item...',
        orderNow: 'Order Now',
        addToCart: 'Add to Cart',
        price: 'Price',
        available: 'Available',
        unavailable: 'Unavailable',
    },

    order: {
        sendOrder: 'Send Order via WhatsApp',
        whatsappMessage: 'Hello, I would like to order:',
        total: 'Total',
        items: 'Items',
    },

    admin: {
        dashboard: 'Dashboard',
        login: 'Login',
        logout: 'Logout',
    },
};

export default enDictionary;
