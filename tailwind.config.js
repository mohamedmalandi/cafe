/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Use CSS variables for dynamic theming
                primary: 'var(--primary)',
                'primary-dark': 'var(--primary-dark)',
                'primary-light': 'var(--primary-light)',
                'primary-foreground': 'var(--primary-foreground)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                background: 'var(--background)',
                'background-secondary': 'var(--background-secondary)',
                foreground: 'var(--foreground)',
                muted: 'var(--muted)',
                border: 'var(--border)',
                success: 'var(--success)',
                warning: 'var(--warning)',
                error: 'var(--error)',
                info: 'var(--info)',
            },
            fontFamily: {
                arabic: ['var(--font-tajawal)', 'sans-serif'],
                english: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
