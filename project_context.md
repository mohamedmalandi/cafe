# Project Context: Cafe Digital Menu (Syria Premium)

## 1. Project Overview
- **Type:** Single-Tenant Cafe Menu & Admin Panel
- **Target:** Syria (Low bandwidth, Mobile-first)
- **Key Features:** WhatsApp Ordering, PWA (Offline), Dynamic Theming.

## 2. Tech Stack Status
- **Framework:** Next.js 14 (App Router) - ✅ **CONFIGURED**
- **Database:** MongoDB + Mongoose - ✅ **CONFIGURED**
  - 4 Models: StoreSettings, Category, Product, AdminUser
  - Bilingual support (ar/en)
  - Password hashing (bcrypt)
  - Seed utilities + API routes
- **Styling:** Tailwind CSS - ✅ **CONFIGURED**
- **Fonts:** Tajawal (Arabic) + Inter (English) - ✅ **CONFIGURED**
- **i18n:** Dictionary-based (ar/en) - ✅ **CONFIGURED**
- **Auth:** NextAuth.js - ✅ **CONFIGURED**
  - Credentials provider with AdminUser model
  - JWT sessions
  - Protected routes via middleware
- **Image Processing:** browser-image-compression - ✅ **CONFIGURED**
  - Client-side compression (max 800px, <500KB)
  - Base64 encoding for MongoDB storage
- **QR Generator:** qrcode - ✅ **CONFIGURED**
  - Generate & download QR codes
  - Customizable size and format
- **Animations:** Framer Motion - ✅ **CONFIGURED**
  - Smooth page transitions
  - Cart interactions
  - Minimal performance impact
- **PWA Support:** Native Web APIs - ✅ **CONFIGURED**
  - Service Worker for offline caching
  - Web App Manifest for installability
  - Cache API with multiple strategies
  - IndexedDB-ready (future expansion)
- **Dynamic Theming:** Database-driven - ✅ **CONFIGURED**
  - Primary color from StoreSettings model
  - CSS variable injection at runtime
  - Auto-generated color variants (dark/light)
- **Rate Limiting:** Custom middleware - ✅ **CONFIGURED**
  - In-memory IP-based limiting
  - Configurable windows and thresholds
  - 429 responses with Retry-After
- **Error Handling:** React Error Boundaries - ✅ **CONFIGURED**
  - Global error boundary with retry
  - User-friendly bilingual messages
  - Console logging for debugging

## 3. Current Folder Structure
```
cafe/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Homepage
│   ├── globals.css         # CSS variables & theming (smooth scroll) ✅
│   ├── login/
│   │   └── page.tsx        # Login page ✅
│   ├── error.tsx           # Global error boundary ✅
│   ├── sitemap.ts          # SEO sitemap generation ✅
│   ├── menu/               # Public menu ✅
│   │   └── page.tsx        # Menu page (Server Component)
│   ├── offline/            # PWA offline page ✅
│   │   └── page.tsx        # Offline fallback
│   ├── admin/              # Admin panel ✅
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   ├── page.tsx        # Dashboard with stats
│   │   ├── settings/
│   │   │   └── page.tsx    # Store settings management
│   │   ├── qr-code/
│   │   │   └── page.tsx    # QR code generator
│   │   └── menu/
│   │       ├── categories/
│   │       │   └── page.tsx  # Category CRUD
│   │       └── products/
│   │           └── page.tsx  # Product CRUD
│   └── api/                # API routes
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts  # NextAuth handler ✅
│       ├── seed/           # Database seeding
│       ├── menu/           # Public menu API ✅
│       │   └── route.ts    # GET menu data
│       └── admin/          # Admin API routes ✅
│           ├── settings/
│           │   └── route.ts  # GET/PUT settings
│           ├── categories/
│           │   ├── route.ts  # GET/POST categories
│           │   └── [id]/
│           │       └── route.ts  # PUT/DELETE category
│           └── products/
│               ├── route.ts  # GET/POST products
│               └── [id]/
│                   └── route.ts  # PUT/DELETE product
├── components/
│   ├── AuthProvider.tsx    # NextAuth SessionProvider ✅
│   ├── LoadingSkeleton.tsx # Loading states component ✅
│   ├── OfflineIndicator.tsx # Network status indicator ✅
│   ├── InstallPrompt.tsx   # PWA install banner ✅
│   ├── index.ts
│   ├── menu/               # Public menu components ✅
│   │   ├── Hero.tsx        # Hero section with logo
│   │   ├── WiFiCard.tsx    # WiFi info with copy button
│   │   ├── CategoryNav.tsx # Sticky category navigation
│   │   ├── CategorySection.tsx  # Category + products
│   │   ├── ProductCard.tsx # Product display + add to cart
│   │   ├── CartButton.tsx  # Floating cart button
│   │   ├── CartDrawer.tsx  # Cart drawer with WhatsApp
│   │   └── CallWaiterButton.tsx  # Call waiter via WhatsApp
│   └── admin/              # Admin components ✅
│       └── ImageUpload.tsx # Image compression component
├── dictionaries/
│   ├── ar.ts               # Arabic translations
│   └── en.ts               # English translations
├── lib/
│   ├── auth.ts             # NextAuth configuration ✅
│   ├── db.ts               # MongoDB connection
│   ├── seed.ts             # Database seeding utilities
│   ├── i18n.ts             # i18n utilities
│   ├── utils.ts            # Helper functions (WhatsApp, price format)
│   ├── theme.ts            # Dynamic theme color utilities ✅
│   ├── rateLimit.ts        # Rate limiting middleware ✅
│   ├── registerServiceWorker.ts # Service worker registration ✅
│   ├── contexts/           # React contexts ✅
│   │   └── CartContext.tsx # Cart state with localStorage
│   ├── models/             # Mongoose models
│   │   ├── StoreSettings.ts
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   ├── AdminUser.ts
│   │   └── index.ts
│   └── types/
│       ├── dictionary.ts   # i18n types
│       └── models.ts       # Database model types
├── public/                 # Static assets & PWA ✅
│   ├── manifest.json       # Web app manifest
│   ├── sw.js               # Service worker
│   ├── robots.txt          # SEO robots file ✅
│   ├── icon-192.png        # PWA icon
│   ├── icon-512.png        # PWA splash screen
│   └── apple-touch-icon.png # iOS icon
├── middleware.ts           # Route protection ✅
├── .env                    # Environment variables ✅
├── .env.example            # Environment template ✅
├── README.md               # Documentation ✅
└── [config files]          # next, tailwind, ts configs
```

## 4. Design System Tokens

### CSS Variables (in globals.css)
**Colors:**
- `--primary`: #f59e0b (Amber)
- `--secondary`: #8b5cf6 (Purple)
- `--accent`: #10b981 (Green)
- `--background`: #0a0a0a (Dark mode default)
- `--foreground`: #f9fafb
- `--muted`, `--border`, semantic colors

**Fonts:**
- `--font-tajawal`: Arabic (weights: 300-800)
- `--font-inter`: English (weights: 300-700)

**Theme:** Dark mode enabled by default
**Direction:** RTL for Arabic (default), LTR for English

## 5. Database Schema

### Models (MongoDB + Mongoose)

#### 🏪 StoreSettings (Singleton)
- `storeName`: { ar, en } - Bilingual store name
- `wifiSSID`: WiFi network name
- `wifiPassword`: WiFi password
- `whatsappNumber`: WhatsApp for ordering
- `primaryColor`: Theme color (default: #f59e0b)
- `logoUrl`: Optional logo image
- `currency`: Default: 'SYP'
- **Pattern:** Only one document allowed

#### 📁 Category
- `name`: { ar, en } - Bilingual category name
- `order`: Number for sorting
- `icon`: Emoji or icon name
- **Indexed by:** order

#### 🍽️ Product
- `name`: { ar, en } - Bilingual product name
- `description`: { ar, en } - Bilingual description
- `price`: Number (required, min: 0)
- `discountPrice`: Optional discount price
- `image`: Optional image URL
- `categoryId`: Reference to Category
- `isAvailable`: Boolean (default: true)
- `isNew`: Boolean (default: false)
- **Virtual:** `effectivePrice` - Returns discountPrice if set, else price
- **Indexed by:** categoryId, isAvailable, isNew

#### 👤 AdminUser
- `email`: Unique, validated email
- `password`: Hashed with bcrypt (10 rounds)
- `name`: Optional admin name
- **Methods:** `comparePassword(candidate)` - Verify password
- **Indexed by:** email

### API Routes

**Public:**
- `GET /api/seed` - Seed database with sample data
- `GET /api/menu` - Fetch menu data (settings, categories, products)
- `POST /api/auth/signin` - NextAuth login
- `POST /api/auth/signout` - NextAuth logout

**Admin (Protected):**
- `GET /api/admin/settings` - Fetch store settings
- `PUT /api/admin/settings` - Update store settings
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

## 6. Completed Phases
- [x] **Phase 1: Foundation & Design System** ✅
  - Next.js App Router configured
  - Tailwind CSS with CSS variables
  - Fonts: Tajawal & Inter via next/font
  - i18n: Arabic (default) / English
  - Dark mode by default
  - Project structure established
- [x] **Phase 2: Database Schema** ✅
  - MongoDB + Mongoose configured
  - StoreSettings (singleton), Category, Product, AdminUser models
  - Bilingual fields (ar/en)
  - Secure password hashing
  - Seed utilities & API routes
- [x] **Phase 3: Admin Panel** ✅
  - NextAuth.js authentication
  - Admin dashboard with stats
  - Store settings management
  - QR code generator
  - Category & Product CRUD
  - Image compression (<500KB, max 800px)
- [x] **Phase 4: Public Menu** ✅
  - Hero section with animations
  - WiFi card with copy functionality
  - Sticky category navigation
  - Product cards with cart integration
  - Shopping cart drawer (localStorage)
  - WhatsApp ordering (Arabic format)
  - Call waiter button
  - Framer Motion animations
  - Mobile-first responsive design
- [x] **Phase 5: PWA (Progressive Web App)** ✅
  - Web app manifest (installable)
  - Service worker with caching strategies
  - Offline support (menu works offline)
  - Cache-first for images/static assets
  - Network-first for API calls
  - Install prompt component (7-day dismissal)
  - Offline indicator (real-time)
  - Custom PWA icons (192, 512, Apple)
  - iOS & Android support
- [x] **Phase 6: Polish & Optimization** ✅
  - Dynamic theme color from database
  - CSS variable injection with variants
  - Rate limiting middleware (configurable)
  - Global error boundary with retry
  - Loading skeleton component
  - SEO: sitemap.xml & robots.txt
  - Production documentation (.env.example, README)
  - Color adjustment helpers
  - Install prompt component (7-day dismissal)
  - Offline indicator (real-time)
  - Custom PWA icons (192, 512, Apple)
  - iOS & Android support
- [x] **Phase 7: WhatsApp Integration & Security Updates** ✅
  - Dynamic WhatsApp number management from admin panel
  - WhatsApp integration for:
    - Book Table button (About page)
    - Send Order button (Cart)
    - Call Waiter button (Menu page)
  - Environment-based admin authentication (ADMIN_EMAIL, ADMIN_PASSWORD)
  - Removed hardcoded credentials from login UI
  - Updated .env.example with admin credentials template
  - Removed BottomNav component completely
  - Redesigned home page with 3-button grid layout (Menu, About, Admin)
  - Fixed Next.js caching issues:
    - Added `dynamic = 'force-dynamic'` to all public pages
    - Added `revalidate = 0` to menu and about pages
    - Implemented cache revalidation in settings API
  - Fixed component field name mismatches (root cause of stale data):
    - Menu Hero: `storeName` → `name` (matches DB schema)
    - WiFiCard: `wifiSSID` → `wifiName` (matches DB schema)
  - Database schema field names documented:
    - Cafe name: `name.ar` and `name.en`
    - WiFi: `wifiName` and `wifiPassword`
    - WhatsApp: `whatsappNumber`
  - All settings updates now reflect immediately across the app