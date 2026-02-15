import connectDB from './db';
import { StoreSettings } from './models';

export async function getThemeColor(): Promise<string> {
    try {
        await connectDB();
        const settings = await StoreSettings.getSettings();
        return settings.primaryColor || '#f59e0b';
    } catch (error) {
        console.error('Error fetching theme color:', error);
        return '#f59e0b'; // Fallback to default amber
    }
}
