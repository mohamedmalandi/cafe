'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
    settings: {
        name: { ar: string; en: string };
        logoUrl?: string;
        primaryColor?: string;
    };
}

export default function Hero({ settings }: HeroProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-background-secondary to-background border-b border-border"
        >
            <div className="container mx-auto px-4 py-12 text-center">
                {settings.logoUrl && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6"
                    >
                        <Image
                            src={settings.logoUrl}
                            alt={settings.name.ar}
                            width={120}
                            height={120}
                            className="mx-auto rounded-full"
                        />
                    </motion.div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {settings.name.ar}
                </h1>
                <p className="text-lg text-muted mb-6">{settings.name.en}</p>

                <div className="flex items-center justify-center gap-2 text-accent">
                    <span className="text-2xl">🍽️</span>
                    <p className="text-lg">أهلاً وسهلاً | Welcome</p>
                </div>
            </div>
        </motion.div>
    );
}
