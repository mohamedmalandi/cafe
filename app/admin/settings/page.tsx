'use client';

import { useState, useEffect } from 'react';
import Tabs from '@/components/admin/Tabs';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

export default function StoreSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        name: { ar: '', en: '' },
        wifiName: '',
        wifiPassword: '',
        currency: 'SYP',
        primaryColor: '#f59e0b',
        logoUrl: '',
        whatsappNumber: '',
        heroImage: '',
        description: '',
        galleryImages: [] as string[],
        workingHours: '',
        locationUrl: '',
        socialLinks: {
            facebook: '',
            instagram: '',
            tiktok: '',
        },
        announcementText: '',
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            if (data.success) {
                setSettings(data.settings);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            const data = await res.json();
            if (data.success) {
                alert('تم الحفظ بنجاح!');
                window.location.reload();
            } else {
                alert('حدث خطأ في الحفظ');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('حدث خطأ في الحفظ');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-foreground">جاري التحميل...</div>
            </div>
        );
    }

    const tabs = [
        { name: 'عام / General', icon: '⚙️' },
        { name: 'العلامة / Brand', icon: '🎨' },
        { name: 'المحتوى / Content', icon: '📝' },
        { name: 'المعرض / Gallery', icon: '🖼️' },
        { name: 'الروابط / Links', icon: '🔗' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-foreground">إعدادات المتجر / Store Settings</h1>

            <form onSubmit={handleSubmit}>
                <Tabs tabs={tabs}>
                    {/* Tab 1: General Settings */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-foreground mb-4">الإعدادات العامة</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    اسم المقهى (عربي)
                                </label>
                                <input
                                    type="text"
                                    value={settings.name.ar}
                                    onChange={(e) =>
                                        setSettings({ ...settings, name: { ...settings.name, ar: e.target.value } })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Cafe Name (English)
                                </label>
                                <input
                                    type="text"
                                    value={settings.name.en}
                                    onChange={(e) =>
                                        setSettings({ ...settings, name: { ...settings.name, en: e.target.value } })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    اسم الواي فاي / WiFi Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.wifiName}
                                    onChange={(e) => setSettings({ ...settings, wifiName: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    كلمة مرور الواي فاي / WiFi Password
                                </label>
                                <input
                                    type="text"
                                    value={settings.wifiPassword}
                                    onChange={(e) => setSettings({ ...settings, wifiPassword: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    رمز العملة / Currency
                                </label>
                                <input
                                    type="text"
                                    value={settings.currency}
                                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    رقم الواتساب / WhatsApp Number
                                </label>
                                <input
                                    type="text"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                    placeholder="963xxxxxxxxx"
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                />
                                <p className="text-xs text-muted mt-1">
                                    أدخل الرقم بدون + أو مسافات (مثال: 963991234567)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    اللون الأساسي / Primary Color
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={settings.primaryColor}
                                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                        className="w-16 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.primaryColor}
                                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                        className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab 2: Branding */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-foreground mb-4">العلامة التجارية</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <ImageUpload
                                    label="الشعار / Logo"
                                    value={settings.logoUrl}
                                    onChange={(url) => setSettings({ ...settings, logoUrl: url })}
                                    maxWidth={500}
                                />
                            </div>

                            <div>
                                <ImageUpload
                                    label="صورة البطل / Hero Image"
                                    value={settings.heroImage}
                                    onChange={(url) => setSettings({ ...settings, heroImage: url })}
                                    maxWidth={1920}
                                />
                                <p className="text-xs text-muted mt-2">Recommended: 1920x600px for best results</p>
                            </div>
                        </div>
                    </div>

                    {/* Tab 3: Content */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-foreground mb-4">المحتوى</h2>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                نبذة عنّا / About Us
                            </label>
                            <textarea
                                value={settings.description}
                                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                placeholder="Write a compelling description of your cafe..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    ساعات العمل / Working Hours
                                </label>
                                <input
                                    type="text"
                                    value={settings.workingHours}
                                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    placeholder="e.g., Daily: 9am - 12pm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    نص الإعلان / Announcement
                                </label>
                                <input
                                    type="text"
                                    value={settings.announcementText}
                                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    placeholder="e.g., Live Music Tonight! 🎵"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tab 4: Gallery */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-foreground mb-4">معرض الصور</h2>

                        <MultiImageUpload
                            images={settings.galleryImages}
                            onChange={(images) => setSettings({ ...settings, galleryImages: images })}
                        />
                    </div>

                    {/* Tab 5: Links */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-foreground mb-4">الروابط</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    🔵 Facebook URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialLinks.facebook}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    placeholder="https://facebook.com/your-page"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    📸 Instagram URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialLinks.instagram}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    placeholder="https://instagram.com/your-page"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    🎵 TikTok URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialLinks.tiktok}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            socialLinks: { ...settings.socialLinks, tiktok: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    placeholder="https://tiktok.com/@your-page"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    📍 Google Maps URL
                                </label>
                                <input
                                    type="url"
                                    value={settings.locationUrl}
                                    onChange={(e) => setSettings({ ...settings, locationUrl: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground"
                                    placeholder="https://maps.google.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </Tabs>

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات / Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
