export type Locale = 'ar' | 'en';

export interface Dictionary {
    // Common
    common: {
        appName: string;
        loading: string;
        error: string;
        success: string;
        cancel: string;
        save: string;
        edit: string;
        delete: string;
        back: string;
        next: string;
    };

    // Navigation
    nav: {
        home: string;
        menu: string;
        about: string;
        contact: string;
        admin: string;
    };

    // Menu Page
    menu: {
        title: string;
        categories: string;
        search: string;
        orderNow: string;
        addToCart: string;
        price: string;
        available: string;
        unavailable: string;
    };

    // Order/WhatsApp
    order: {
        sendOrder: string;
        whatsappMessage: string;
        total: string;
        items: string;
    };

    // Admin (to be expanded in Phase 3)
    admin: {
        dashboard: string;
        login: string;
        logout: string;
    };
}
