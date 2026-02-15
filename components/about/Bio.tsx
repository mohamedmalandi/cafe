'use client';

import { motion } from 'framer-motion';

interface BioProps {
    description?: string;
    workingHours?: string;
}

export default function Bio({ description, workingHours }: BioProps) {
    if (!description && !workingHours) return null;

    return (
        <section className="py-16 px-4 bg-background-secondary">
            <div className="max-w-4xl mx-auto">
                {/* Description */}
                {description && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-6">عنّا / About Us</h2>
                        <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    </motion.div>
                )}

                {/* Working Hours Card */}
                {workingHours && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-background border border-border rounded-2xl p-8 shadow-lg"
                    >
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="text-4xl">🕐</span>
                            <h3 className="text-2xl font-bold text-foreground">ساعات العمل / Working Hours</h3>
                        </div>
                        <p className="text-xl text-center text-primary font-medium">
                            {workingHours}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
