'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="fixed top-0 left-0 right-0 bg-warning text-background py-2 px-4 text-center z-50"
                >
                    <span className="font-medium">
                        📡 غير متصل | You're viewing offline version
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
