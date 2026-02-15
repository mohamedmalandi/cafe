'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/lib/i18n';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dict = getDictionary('ar');

const navItems = [
    { href: '/admin', label: 'لوحة التحكم', icon: '📊' },
    { href: '/admin/settings', label: 'إعدادات المتجر', icon: '⚙️' },
    { href: '/admin/menu/categories', label: 'التصنيفات', icon: '📁' },
    { href: '/admin/menu/products', label: 'المنتجات', icon: '🍽️' },
    { href: '/admin/qr-code', label: 'رمز QR', icon: '📱' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Header - Only visible on mobile */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background-secondary border-b border-border z-50 flex items-center px-4">
                {/* Hamburger Menu Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-background rounded-lg transition-colors"
                >
                    <svg
                        className="w-6 h-6 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <h1 className="text-lg font-bold text-foreground ml-4">
                    {dict.common.appName}
                </h1>
            </div>

            {/* Backdrop - Mobile only */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen w-64 bg-background-secondary border-r border-border flex flex-col z-50
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                {/* Header */}
                <div className="p-6 border-b border-border mt-16 lg:mt-0">
                    <h1 className="text-xl font-bold text-foreground">
                        {dict.common.appName}
                    </h1>
                    <p className="text-sm text-muted">لوحة التحكم</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-primary text-primary-foreground font-medium'
                                            : 'text-foreground hover:bg-background'
                                            }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                {session?.user?.email}
                            </p>
                            <p className="text-xs text-muted">Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-full bg-error hover:bg-error/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full lg:w-auto mt-16 lg:mt-0">
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
