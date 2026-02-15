import type { Metadata } from 'next';
import { Tajawal, Inter } from 'next/font/google';
import './globals.css';
import { defaultLocale, getDirection } from '@/lib/i18n';
import AuthProvider from '@/components/AuthProvider';
import Script from 'next/script';
import { getThemeColor } from '@/lib/theme';
import { Toaster } from 'react-hot-toast';

// Configure Tajawal font (Arabic)
const tajawal = Tajawal({
    weight: ['300', '400', '500', '700', '800'],
    subsets: ['arabic'],
    variable: '--font-tajawal',
    display: 'swap',
});

// Configure Inter font (English)
const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'قائمة المقهى | Cafe Menu',
    description: 'قائمة رقمية للمقهى مع إمكانية الطلب عبر واتساب | Digital cafe menu with WhatsApp ordering',
    keywords: 'cafe, menu, Syria, قائمة, مقهى, سوريا',
    authors: [{ name: 'Cafe Digital Menu' }],
    themeColor: '#f59e0b',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'مقهى سوريا',
    },
    icons: {
        icon: '/icon-192.png',
        apple: '/apple-touch-icon.png',
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = defaultLocale;
    const dir = getDirection(locale);

    // Get theme color from database
    const primaryColor = await getThemeColor();

    // Calculate contrast color for text on primary background
    const getContrastColor = (hexColor: string): string => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
    };

    const primaryForeground = getContrastColor(primaryColor);

    return (
        <html lang={locale} dir={dir} className={`${tajawal.variable} ${inter.variable}`}>
            <head>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            :root {
                                --primary: ${primaryColor};
                                --primary-foreground: ${primaryForeground};
                            }
                        `,
                    }}
                />
            </head>
            <body>
                <AuthProvider>
                    {children}

                    {/* Toast notifications */}
                    <Toaster position="top-center" />
                </AuthProvider>

                {/* Service Worker Registration */}
                <Script id="register-sw" strategy="afterInteractive">
                    {`
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', function() {
                                navigator.serviceWorker.register('/sw.js').then(
                                    function(registration) {
                                        console.log('SW registered: ', registration);
                                    },
                                    function(err) {
                                        console.log('SW registration failed: ', err);
                                    }
                                );
                            });
                        }
                    `}
                </Script>
            </body>
        </html>
    );
}
