'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface WiFiCardProps {
    settings: {
        wifiName: string;
        wifiPassword: string;
    };
}

export default function WiFiCard({ settings }: WiFiCardProps) {
    const [copied, setCopied] = useState(false);

    const copyPassword = async () => {
        try {
            await navigator.clipboard.writeText(settings.wifiPassword);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    if (!settings.wifiName) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-background-secondary border border-border rounded-xl p-4 mb-6"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">📶</span>
                    <div>
                        <p className="text-sm text-muted">WiFi</p>
                        <p className="font-bold text-foreground">{settings.wifiName}</p>
                    </div>
                </div>

                <button
                    onClick={copyPassword}
                    className="bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    {copied ? (
                        <>
                            <span>✓</span>
                            <span>تم النسخ</span>
                        </>
                    ) : (
                        <>
                            <span>📋</span>
                            <span>نسخ كلمة المرور</span>
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
