'use client';

import { motion } from 'framer-motion';
import { generateWhatsAppURL } from '@/lib/utils';

interface CallWaiterButtonProps {
    whatsappNumber?: string;
}

export default function CallWaiterButton({ whatsappNumber }: CallWaiterButtonProps) {
    const handleCallWaiter = () => {
        if (!whatsappNumber) {
            alert('رقم الواتساب غير مُعَدّ / WhatsApp number not configured');
            return;
        }
        const message = '👋 مرحباً! أحتاج إلى المساعدة من فضلك';
        const url = generateWhatsAppURL(whatsappNumber, message);
        window.open(url, '_blank');
    };

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCallWaiter}
            className="fixed bottom-6 right-6 bg-secondary hover:bg-secondary/90 text-white p-4 rounded-full shadow-lg flex items-center gap-2 z-20"
        >
            <span className="text-2xl">🛎️</span>
            <span className="font-bold hidden md:inline">نداء النادل</span>
        </motion.button>
    );
}
