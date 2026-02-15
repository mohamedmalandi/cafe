'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { generateWhatsAppURL } from '@/lib/utils';

interface HeroProps {
    heroImage?: string;
    logoUrl?: string;
    name: { ar: string; en: string };
    announcementText?: string;
    whatsappNumber?: string;
}

export default function Hero({ heroImage, logoUrl, name, announcementText, whatsappNumber }: HeroProps) {
    // Provide default values to prevent crashes
    const cafeName = name || { ar: 'مقهى', en: 'Cafe' };

    const handleWhatsAppReservation = () => {
        if (!whatsappNumber) {
            alert('رقم الواتساب غير مُعَدّ / WhatsApp number not configured');
            return;
        }
        const message = `مرحباً! أود حجز طاولة في ${cafeName.ar} / Hello, I would like to book a table at ${cafeName.en}`;
        const url = generateWhatsAppURL(whatsappNumber, message);
        window.open(url, '_blank');
    };

    return (
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            {heroImage ? (
                <div className="absolute inset-0">
                    <Image
                        src={heroImage}
                        alt={name.ar}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
            )}

            {/* Announcement Banner */}
            {announcementText && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="absolute top-0 left-0 right-0 bg-accent text-white py-3 px-4 text-center font-bold z-10 shadow-lg"
                >
                    <div className="animate-pulse">
                        ⚡ {announcementText} ⚡
                    </div>
                </motion.div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                {/* Logo */}
                {logoUrl && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                            <Image
                                src={logoUrl}
                                alt="Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Cafe Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl"
                >
                    {cafeName.ar}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg"
                >
                    {cafeName.en}
                </motion.p>

                {/* WhatsApp Reserve Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppReservation}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                    <span className="text-2xl">💬</span>
                    <span>احجز طاولة / Reserve Table</span>
                </motion.button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-white/60 text-sm"
                >
                    ⬇ Scroll
                </motion.div>
            </motion.div>
        </section>
    );
}
