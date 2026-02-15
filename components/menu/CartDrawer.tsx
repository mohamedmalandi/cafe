'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/lib/contexts/CartContext';
import { formatPrice, generateWhatsAppURL } from '@/lib/utils';

interface CartDrawerProps {
    onClose: () => void;
    whatsappNumber?: string;
}

export default function CartDrawer({ onClose, whatsappNumber }: CartDrawerProps) {
    const { items, updateQuantity, removeItem, clearCart, total } = useCart();

    const handleSendOrder = () => {
        if (!whatsappNumber) {
            alert('رقم الواتساب غير مُعَدّ / WhatsApp number not configured');
            return;
        }

        const orderDetails = items.map(
            (item) => `• ${item.name.ar} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
        ).join('\n');

        const message = `🍽️ طلب جديد\n\n📝 الطلبات:\n${orderDetails}\n\n💰 المجموع: ${formatPrice(total)}\n\nشكراً لكم!`;

        const whatsappURL = generateWhatsAppURL(whatsappNumber, message);
        window.open(whatsappURL, '_blank');
        clearCart();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full md:w-96 bg-background-secondary border-l border-border z-50 flex flex-col"
            >
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">سلة الطلبات</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl text-muted hover:text-foreground"
                    >
                        ✕
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-background border border-border rounded-lg p-3 flex gap-3"
                        >
                            {item.image && (
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name.ar}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className="font-bold text-foreground">{item.name.ar}</h3>
                                <p className="text-sm text-muted mb-2">{item.name.en}</p>
                                <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-error hover:text-error/80"
                                >
                                    🗑️
                                </button>

                                <div className="flex items-center gap-2 bg-background border border-border rounded-lg">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 hover:bg-border"
                                    >
                                        -
                                    </button>
                                    <span className="px-2 font-bold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 hover:bg-border"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border space-y-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span className="text-foreground">المجموع:</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                    </div>

                    <button
                        onClick={handleSendOrder}
                        className="w-full bg-accent hover:bg-accent/90 text-background font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <span>📱</span>
                        <span>إرسال الطلب عبر واتساب</span>
                    </button>

                    <button
                        onClick={clearCart}
                        className="w-full bg-error/20 hover:bg-error/30 text-error font-medium py-2 rounded-lg transition-colors"
                    >
                        مسح السلة
                    </button>
                </div>
            </motion.div>
        </>
    );
}
