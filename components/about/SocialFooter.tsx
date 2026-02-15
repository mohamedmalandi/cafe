'use client';

import { motion } from 'framer-motion';

interface SocialFooterProps {
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
    };
    locationUrl?: string;
}

export default function SocialFooter({ socialLinks, locationUrl }: SocialFooterProps) {
    const buttons = [];

    // Facebook Button
    if (socialLinks?.facebook) {
        buttons.push({
            name: 'Facebook',
            url: socialLinks.facebook,
            icon: '👍',
            gradient: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
        });
    }

    // Instagram Button
    if (socialLinks?.instagram) {
        buttons.push({
            name: 'Instagram',
            url: socialLinks.instagram,
            icon: '📸',
            gradient: 'from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700',
        });
    }

    // TikTok Button
    if (socialLinks?.tiktok) {
        buttons.push({
            name: 'TikTok',
            url: socialLinks.tiktok,
            icon: '🎵',
            gradient: 'from-gray-900 to-gray-800 hover:from-black hover:to-gray-900',
        });
    }

    // Google Maps Button
    if (locationUrl) {
        buttons.push({
            name: 'Get Directions',
            url: locationUrl,
            icon: '📍',
            gradient: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
        });
    }

    if (buttons.length === 0) return null;

    return (
        <section className="py-16 px-4 bg-background-secondary">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-foreground mb-2">تواصل معنا / Connect</h2>
                    <p className="text-muted">Follow us on social media</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {buttons.map((button, index) => (
                        <motion.a
                            key={index}
                            href={button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                bg-gradient-to-r ${button.gradient}
                                text-white font-bold text-lg py-6 px-8 rounded-2xl
                                shadow-lg transition-all duration-300
                                flex items-center justify-center gap-3
                            `}
                        >
                            <span className="text-3xl">{button.icon}</span>
                            <span>{button.name}</span>
                        </motion.a>
                    ))}
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center text-muted text-sm"
                >
                    <p>© {new Date().getFullYear()} All rights reserved</p>
                </motion.div>
            </div>
        </section>
    );
}
