import type { Dictionary } from '@/lib/types/dictionary';

const arDictionary: Dictionary = {
    common: {
        appName: 'قائمة المقهى',
        loading: 'جاري التحميل...',
        error: 'حدث خطأ',
        success: 'تم بنجاح',
        cancel: 'إلغاء',
        save: 'حفظ',
        edit: 'تعديل',
        delete: 'حذف',
        back: 'رجوع',
        next: 'التالي',
    },

    nav: {
        home: 'الرئيسية',
        menu: 'القائمة',
        about: 'عن المقهى',
        contact: 'اتصل بنا',
        admin: 'لوحة التحكم',
    },

    menu: {
        title: 'قائمة الطعام',
        categories: 'التصنيفات',
        search: 'البحث عن منتج...',
        orderNow: 'اطلب الآن',
        addToCart: 'أضف للسلة',
        price: 'السعر',
        available: 'متوفر',
        unavailable: 'غير متوفر',
    },

    order: {
        sendOrder: 'إرسال الطلب عبر واتساب',
        whatsappMessage: 'مرحباً، أود طلب التالي:',
        total: 'المجموع',
        items: 'العناصر',
    },

    admin: {
        dashboard: 'لوحة التحكم',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
    },
};

export default arDictionary;
