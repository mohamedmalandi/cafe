'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BottomNav() {
    const pathname = usePathname();

    // Don't show on admin or login pages
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
        return null;
    }

    const navItems = [
        {
            name: 'القائمة',
            nameEn: 'Menu',
            href: '/menu',
            icon: '🍽️',
        },
        {
            name: 'عنّا',
            nameEn: 'About',
            href: '/about',
            icon: 'ℹ️',
        },
        {
            name: 'Admin',
            nameEn: 'إدارة',
            href: '/admin',
            icon: '🔒',
            special: true, // Gold styling for admin
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="max-w-screen-xl mx-auto px-4 h-full">
                <div className="flex items-center justify-around h-full">
                    {navItems.map((item) => {
                        // BUG FIX 4: Strict pathname matching for active state
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 min-w-[80px] relative"
                            >
                                {/* Icon */}
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    className="text-2xl"
                                >
                                    {item.icon}
                                </motion.div>

                                {/* Label */}
                                <span
                                    className={`
                                        text-xs font-medium transition-colors
                                        ${isActive
                                            ? item.special
                                                ? 'text-[#f59e0b]' // Gold for admin when active
                                                : 'text-[#f59e0b]'  // Gold for active state
                                            : 'text-white/70'          // White/70 for inactive
                                        }
                                    `}
                                >
                                    {item.name}
                                </span>

                                {/* Active Indicator - YELLOW/GOLD LINE */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-[#f59e0b]"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
