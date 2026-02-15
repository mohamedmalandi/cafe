import Link from 'next/link';
import { Coffee, Info, Settings } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-black">
            <div className="max-w-md w-full space-y-8">
                {/* Logo/Title Section */}
                <div className="text-center mb-12">
                    <div className="mb-4">
                        <Coffee className="w-20 h-20 mx-auto text-[#f59e0b]" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        مرحبا بكم
                    </h1>
                    <p className="text-white/70">
                        القائمة الرقمية
                    </p>
                </div>

                {/* Grid Layout for Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Menu Button - Full Width (spans 2 columns) */}
                    <Link
                        href="/menu"
                        className="col-span-2 group relative overflow-hidden rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] transition-all duration-300 p-8 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                    >
                        <Coffee className="w-12 h-12 text-black" />
                        <span className="text-2xl font-bold text-black">
                            القائمة
                        </span>
                        <span className="text-sm text-black/70">
                            Menu
                        </span>
                    </Link>

                    {/* About Button - Half Width */}
                    <Link
                        href="/about"
                        className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2d2d2d] hover:border-[#f59e0b]/50 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                    >
                        <Info className="w-10 h-10 text-[#f59e0b]" />
                        <span className="text-lg font-bold text-white">
                            عن المقهى
                        </span>
                        <span className="text-xs text-white/60">
                            About
                        </span>
                    </Link>

                    {/* Admin Button - Half Width */}
                    <Link
                        href="/admin"
                        className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2d2d2d] hover:border-[#f59e0b]/50 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                    >
                        <Settings className="w-10 h-10 text-[#f59e0b]" />
                        <span className="text-lg font-bold text-white">
                            الإدارة
                        </span>
                        <span className="text-xs text-white/60">
                            Admin
                        </span>
                    </Link>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-8">
                    <p className="text-white/40 text-sm">
                        اضغط على القائمة لعرض المنتجات
                    </p>
                </div>
            </div>
        </main>
    );
}
