'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/contexts/CartContext';
import CartDrawer from './CartDrawer';

interface CartButtonProps {
    whatsappNumber?: string;
}

export default function CartButton({ whatsappNumber }: CartButtonProps) {
    const { itemCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    if (itemCount === 0) return null;

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 bg-primary hover:bg-primary-dark text-primary-foreground p-4 rounded-full shadow-lg flex items-center gap-2 z-20"
            >
                <span className="text-2xl">🛒</span>
                <span className="font-bold">{itemCount}</span>

                <motion.span
                    key={itemCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-error text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                >
                    {itemCount}
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isOpen && <CartDrawer onClose={() => setIsOpen(false)} whatsappNumber={whatsappNumber} />}
            </AnimatePresence>
        </>
    );
}
