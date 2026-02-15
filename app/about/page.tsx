import { Metadata } from 'next';
import connectDB from '@/lib/db';
import StoreSettings from '@/lib/models/StoreSettings';
import Hero from '@/components/about/Hero';
import Bio from '@/components/about/Bio';
import Gallery from '@/components/about/Gallery';
import SocialFooter from '@/components/about/SocialFooter';

export const metadata: Metadata = {
    title: 'About Us | Cafe',
    description: 'Learn more about our cafe',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getSettings() {
    await connectDB();
    const settings = await StoreSettings.findOne().lean();
    return JSON.parse(JSON.stringify(settings));
}

export default async function AboutPage() {
    const settings = await getSettings();

    // Provide defaults if settings is null or missing fields
    const safeSettings = {
        name: settings?.name || { ar: 'مقهى', en: 'Cafe' },
        heroImage: settings?.heroImage || '',
        logoUrl: settings?.logoUrl || '',
        announcementText: settings?.announcementText || '',
        whatsappNumber: settings?.whatsappNumber || '',
        description: settings?.description || '',
        workingHours: settings?.workingHours || '',
        galleryImages: settings?.galleryImages || [],
        socialLinks: settings?.socialLinks || {},
        locationUrl: settings?.locationUrl || '',
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <Hero
                heroImage={safeSettings.heroImage}
                logoUrl={safeSettings.logoUrl}
                name={safeSettings.name}
                announcementText={safeSettings.announcementText}
                whatsappNumber={safeSettings.whatsappNumber}
            />

            {/* Bio & Info Section */}
            <Bio
                description={safeSettings.description}
                workingHours={safeSettings.workingHours}
            />

            {/* Gallery Section */}
            {safeSettings.galleryImages && safeSettings.galleryImages.length > 0 && (
                <Gallery images={safeSettings.galleryImages} />
            )}

            {/* Social Footer */}
            <SocialFooter
                socialLinks={safeSettings.socialLinks}
                locationUrl={safeSettings.locationUrl}
            />
        </main>
    );
}
