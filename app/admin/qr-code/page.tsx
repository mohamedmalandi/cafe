'use client';

import { useState } from 'react';
import QRCode from 'qrcode';

export default function QRCodePage() {
    const [qrCodeDataURL, setQrCodeDataURL] = useState('');
    const menuURL = 'http://localhost:3000/menu'; // Change to your production URL

    const generateQR = async () => {
        try {
            const dataURL = await QRCode.toDataURL(menuURL, {
                width: 400,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
            });
            setQrCodeDataURL(dataURL);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const downloadQR = () => {
        const link = document.createElement('a');
        link.href = qrCodeDataURL;
        link.download = 'menu-qr-code.png';
        link.click();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-foreground mb-6">
                مولد رمز QR
            </h1>

            <div className="bg-background-secondary border border-border rounded-xl p-6 max-w-2xl">
                <p className="text-muted mb-4">
                    قم بإنشاء رمز QR لقائمة المقهى. يمكن للعملاء مسح الرمز للوصول إلى القائمة.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Menu URL
                        </label>
                        <input
                            type="text"
                            value={menuURL}
                            readOnly
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-muted"
                        />
                    </div>

                    <button
                        onClick={generateQR}
                        className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        إنشاء رمز QR
                    </button>

                    {qrCodeDataURL && (
                        <div className="mt-6 text-center">
                            <div className="inline-block p-4 bg-white rounded-lg">
                                <img src={qrCodeDataURL} alt="QR Code" className="w-80 h-80" />
                            </div>

                            <button
                                onClick={downloadQR}
                                className="mt-4 bg-accent hover:bg-accent/90 text-background font-bold py-2 px-6 rounded-lg transition-colors"
                            >
                                تحميل الصورة
                            </button>

                            <p className="text-sm text-muted mt-4">
                                اطبع هذا الرمز وضعه على طاولات المقهى
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
