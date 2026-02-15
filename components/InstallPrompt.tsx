'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Check if already dismissed
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (dismissed) {
            const dismissedDate = new Date(dismissed);
            const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSince < 7) {
                return; // Don't show if dismissed within last 7 days
            }
        }

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return; // Already installed
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted install');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString());
        setShowPrompt(false);
    };

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-background-secondary border border-border rounded-xl p-4 shadow-xl z-50"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">📱</span>
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">
                                تثبيت التطبيق
                            </h3>
                            <p className="text-sm text-muted mb-3">
                                ثبت التطبيق على جهازك للوصول السريع وإمكانية العمل بلا إنترنت
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleInstall}
                                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    تثبيت
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="px-4 py-2 text-muted hover:text-foreground transition-colors"
                                >
                                    ليس الآن
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
