# Cafe Digital Menu - Syria Premium 🇸🇾

A lightweight, mobile-first digital menu application built for Syrian cafes with WhatsApp ordering integration and PWA support.

## 🚀 Features

- ✅ **Bilingual Support**: Arabic (default) & English
- ✅ **Dark Mode**: Enabled by default for better UX
- ✅ **WhatsApp Ordering**: Direct integration for orders
- ✅ **PWA Ready**: Offline support (Phase 5)
- ✅ **Mobile-First**: Optimized for low bandwidth
- ✅ **Dynamic Theming**: CSS variables for easy customization

## 📁 Project Structure

```
cafe/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles & CSS variables
├── components/             # Reusable components
├── dictionaries/           # i18n translations
│   ├── ar.ts              # Arabic (default)
│   └── en.ts              # English
├── lib/                    # Utilities & helpers
│   ├── i18n.ts            # i18n utilities
│   └── types/             # TypeScript types
├── public/                 # Static assets
└── config files           # Next, Tailwind, TypeScript configs
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with CSS Variables
- **Fonts**: Tajawal (Arabic) & Inter (English) via next/font
- **Database**: MongoDB + Mongoose (Phase 2)
- **Auth**: NextAuth.js (Phase 3)
- **i18n**: Lightweight dictionary structure

## 🎨 Design System

### CSS Variables (in `globals.css`)

#### Colors
- `--primary`: Main brand color (Amber)
- `--secondary`: Accent color (Purple)
- `--accent`: CTA/Success (Green)
- `--background`: Main background
- `--foreground`: Text color
- `--muted`: Muted text
- `--border`: Border color

#### Fonts
- `--font-tajawal`: Arabic font
- `--font-inter`: English font

### Tailwind Classes
Use semantic classes like `bg-primary`, `text-foreground`, etc.

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your settings.

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Development Phases

- [x] **Phase 1**: Foundation & Design System ✅
- [ ] **Phase 2**: Database Schema (MongoDB + Mongoose)
- [ ] **Phase 3**: Admin Panel (NextAuth + CRUD)
- [ ] **Phase 4**: Public Menu (Categories, Items, Search)
- [ ] **Phase 5**: PWA (Offline Support, Install Prompt)
- [ ] **Phase 6**: Polish (Performance, SEO, Final Testing)

## 🌍 i18n (Internationalization)

The app uses a simple dictionary-based approach:

```typescript
import { getDictionary } from '@/lib/i18n';

const dict = getDictionary('ar'); // or 'en'
console.log(dict.common.appName); // "قائمة المقهى"
```

Default locale is **Arabic** with RTL support.

## 🎨 Theming

To customize colors, edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary: #f59e0b;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  /* ... */
}
```

Tailwind will automatically use these variables.

## 📱 Mobile Optimization

- Touch-friendly UI
- Optimized for low bandwidth
- Responsive design (mobile-first)
- Fast loading times
- PWA support (coming in Phase 5)

## 📝 License

Private project for cafe use.

## 🤝 Contributing

This is a single-tenant application. For customization requests, contact the developer.

---

**Made with ❤️ for Syria** 🇸🇾
