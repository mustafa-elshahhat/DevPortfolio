export interface Project {
  id:          string
  title:       string
  description: string
  shortDescription?: string
  category?:    string
  discipline?:  string
  stack:       string[]
  liveUrl?:    string
  githubUrl?:  string
  imageBg:     string
  imageUrl:    string
  imageAlt?:   string
  gallery?:    string[]
  galleryAlts?: string[]
  galleryCaptions?: string[]
  portfolioPriority: number
  details: {
    problem:       string
    solution:      string
    architecture:  string
    performance:   string
  }
}

export const projects: Project[] = [
  {
    id:          'dr-mirror',
    title:       'Dr Mirror',
    description: 'Full-stack e-commerce platform for medical scrubs and uniforms, built on an ASP.NET Core (.NET) minimal-API backend with Entity Framework Core and SQL Server, and a React + TypeScript front-end. Includes JWT authentication, an order lifecycle with payment-proof verification, inventory with size/color variants, and a role-based admin dashboard. Supports Arabic (RTL) and English.',
    stack:       ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'React', 'TypeScript'],
    liveUrl:     'https://www.drmirrorscrubs.store/',
    githubUrl:   'https://github.com/mustafa-elshahhat/Dr_Mirror',
    imageBg:     'linear-gradient(135deg, #03363d 0%, #0a5c66 50%, #11808f 100%)',
    imageUrl:    '/images/projects/dr-mirror-cover.webp',
    gallery: [
      '/images/projects/dr-mirror-cover.webp',
      '/images/projects/dr-mirror-products.webp',
      '/images/projects/dr-mirror-product-detail.webp',
      '/images/projects/dr-mirror-admin-dashboard.webp',
      '/images/projects/dr-mirror-cart.webp',
    ],
    portfolioPriority: 1,
    details: {
      problem:      'Customers needed a localized online store for medical apparel, while the business needed to manage manual payment confirmation and stock variants reliably.',
      solution:     'Built a complete order lifecycle with payment-proof upload and verification, a role-based admin dashboard, and bilingual (Arabic RTL / English) storefront.',
      architecture: 'ASP.NET Core minimal APIs in a vertical-slice structure, Entity Framework Core over SQL Server, JWT + ASP.NET Identity authentication, Cloudinary media storage, and a React + TypeScript (Vite) front-end.',
      performance:  'Hardened with rate limiting, secure headers, structured logging, and health checks; emails sent through a durable outbox pattern.',
    },
  },
  {
    id:          'soulmate-store',
    title:       'Soulmate Accessories Store',
    description: 'Full-stack accessories e-commerce site with an Angular + TypeScript front-end and an ASP.NET Core (.NET) backend using Entity Framework Core and SQL Server. Customers buy products or assemble custom gift boxes; features JWT auth, an admin dashboard for products, orders and inventory, and automated WhatsApp order notifications via a separate microservice.',
    stack:       ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'Angular', 'TypeScript'],
    liveUrl:     'https://soulmate-accessories-store.vercel.app/',
    githubUrl:   'https://github.com/mustafa-elshahhat/Soulmate-Accessories-Store',
    imageBg:     'linear-gradient(135deg, #4a0018 0%, #800020 50%, #b3003b 100%)',
    imageUrl:    '/images/projects/soulmate-builder.webp',
    gallery: [
      '/images/projects/soulmate-builder.webp',
      '/images/projects/soulmate-cover.webp',
      '/images/projects/soulmate-products.webp',
      '/images/projects/soulmate-cart.webp',
      '/images/projects/soulmate-admin-dashboard.webp',
    ],
    portfolioPriority: 2,
    details: {
      problem:      'Shoppers wanted to either buy individual accessories or build personalized gift boxes, while the shop needed timely order notifications and admin control.',
      solution:     'Implemented a custom gift-box builder with category-based pricing, an admin dashboard for catalog and order management, and automated WhatsApp updates on order and payment status.',
      architecture: 'Angular 21 + TypeScript front-end calling an ASP.NET Core (.NET 8) backend with Entity Framework Core over SQL Server; JWT auth with CSRF protection, and a dedicated Node.js WhatsApp microservice for notifications.',
      performance:  'Uses background services for the notification queue and order expiry, output caching with tag-based invalidation, and health checks for the database and media storage.',
    },
  },
  {
    id:          'dermiva',
    title:       'Dermiva',
    description: 'Bilingual skincare e-commerce storefront built with Next.js App Router, React and TypeScript. Includes English/Arabic locale routing, RTL/LTR layout support, cart and wishlist persistence, checkout UI flows, SEO metadata, structured data, and API-ready services backed by mock data for frontend-only deployment.',
    stack:       ['Next.js', 'React', 'TypeScript', 'next-intl', 'CSS'],
    liveUrl:     'https://dermiva-eg.vercel.app/en',
    githubUrl:   'https://github.com/mustafa-elshahhat/dermiva',
    imageBg:     'linear-gradient(135deg, #331a24 0%, #7a3a53 48%, #d08a98 100%)',
    imageUrl:    '/images/projects/dermiva-homepage.webp',
    imageAlt:    'Dermiva skincare e-commerce homepage',
    gallery: [
      '/images/projects/dermiva-homepage.webp',
      '/images/projects/dermiva-products-page.webp',
      '/images/projects/dermiva-product-details.webp',
    ],
    galleryAlts: [
      'Dermiva skincare e-commerce homepage',
      'Dermiva all products shopping page',
      'Dermiva product details page',
    ],
    portfolioPriority: 4,
    details: {
      problem:      'A skincare storefront needed bilingual English and Arabic shopping flows, locale-aware layout direction, and a frontend foundation ready for a future backend/API integration.',
      solution:     'Built a responsive storefront with localized routes, RTL/LTR support, persistent cart and wishlist state, checkout screens, account mock flows, and accessible navigation and form states.',
      architecture: 'Next.js App Router with locale segments, React 19 and TypeScript; next-intl message files power UI strings, while async service layers currently read mock data and can be swapped for API adapters later.',
      performance:  'Uses route metadata, sitemap and robots output, JSON-LD structured data, local fonts, responsive utilities, and vendor-neutral analytics readiness with no third-party tracking enabled by default.',
    },
  },
  {
    id:               'saad-logistics-website',
    title:            'Saad Logistics Website',
    shortDescription: 'A bilingual logistics company website with SEO landing pages, contact workflows, WhatsApp access, and a live serverless news feed.',
    description:      'Saad Logistics Website is a bilingual Arabic/English corporate website for a Saudi logistics and customs-clearance company. Built with React, TypeScript, Vite, and Tailwind CSS, it includes responsive company pages, RTL/LTR localization, SEO-focused service landing pages, EmailJS contact workflows, WhatsApp and Google Maps integrations, plus a serverless logistics news feed powered by Google News RSS.',
    category:         'Bilingual Business Website',
    discipline:       'Frontend Engineering + SEO Architecture',
    stack:            ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'i18next', 'Serverless Functions', 'React Router', 'EmailJS'],
    liveUrl:          'https://www.saadlogistic.com/',
    githubUrl:        'https://github.com/Yousef-elbazz/SAAD-LOGITSTICS-COMPANY',
    imageBg:          'linear-gradient(135deg, #082f49 0%, #0f766e 50%, #22c55e 100%)',
    imageUrl:         '/images/projects/saad-logistics/saad-logistics-homepage.webp',
    imageAlt:         'Saad Logistics Arabic homepage presenting international freight and logistics services',
    gallery: [
      '/images/projects/saad-logistics/saad-logistics-homepage.webp',
      '/images/projects/saad-logistics/saad-logistics-services.webp',
    ],
    galleryAlts: [
      'Saad Logistics Arabic homepage presenting international freight and logistics services',
      'Saad Logistics services page displaying freight, warehousing, customs clearance, and tracking services',
    ],
    galleryCaptions: [
      'Arabic-first responsive homepage with global freight visuals, service calls to action, and RTL navigation.',
      'Responsive services overview covering sea freight, air freight, land transport, warehousing, customs clearance, and tracking-related content.',
    ],
    portfolioPriority: 3,
    details: {
      problem:      'A logistics company needed a public-facing website that could communicate its services across Arabic and English audiences, support Saudi-market search visibility, and convert visitors into qualified leads. The site also required practical contact paths through WhatsApp, email, phone, and location discovery without requiring a full logistics management backend.',
      solution:     'The solution is a responsive bilingual website with localized company pages, reusable SEO service landing pages, contact and quote workflows, WhatsApp shortcuts, Google Maps, and a logistics news section. A serverless endpoint aggregates Google News RSS content, while EmailJS handles contact submissions when the required environment variables are configured.',
      architecture: 'The project is a feature-oriented Vite React SPA built with TypeScript, React Router, Tailwind CSS, i18next, shared UI components, localized resources, and centralized SEO utilities. Primary and SEO routes are lazy-loaded, while Vercel and Netlify serverless functions expose the news endpoint and EmailJS provides environment-based lead delivery.',
      performance:  'The implementation uses route-level code splitting, route prefetching, responsive WebP assets, lazy loading, preload hints, CSS code splitting, and manual Vite vendor chunks. No verified numeric Lighthouse benchmark is available, so the case study presents the implemented optimization techniques without claiming an unsupported performance score.',
    },
  },
  {
    id:          'whatsapp-service',
    title:       'WhatsApp Service Template',
    description: 'Standalone WhatsApp messaging microservice in Node.js and Express, using the Baileys WhatsApp Web client with MongoDB-backed sessions. Exposes a REST API (health, status, pairing, send, session) any backend can call to send notifications, with API-key auth, request validation, rate limiting, and a circuit breaker for resilience.',
    stack:       ['Node.js', 'Express', 'JavaScript', 'MongoDB', 'REST API'],
    githubUrl:   'https://github.com/mustafa-elshahhat/whatsapp-service-template',
    imageBg:     'linear-gradient(135deg, #04361f 0%, #0a5c2e 50%, #128c3e 100%)',
    imageUrl:    '/images/projects/whatsapp-service-cover.webp',
    gallery: [
      '/images/projects/whatsapp-service-cover.webp',
    ],
    portfolioPriority: 6,
    details: {
      problem:      'Embedding WhatsApp messaging directly inside an application couples it tightly to one stack and complicates session management.',
      solution:     'Built a reusable, framework-agnostic HTTP service that owns its own Baileys sessions and exposes simple REST endpoints any backend can call to send messages.',
      architecture: 'Express server organized into config, middleware, services, repositories, templates and utilities; MongoDB stores session data and API-key auth guards the endpoints.',
      performance:  'Resilience via a circuit breaker on message sending, a send rate limiter, 64KB payload validation, and non-fatal startup so client failures never stop the server.',
    },
  },
  {
    id:          'moonwatch',
    title:       'MoonWatch',
    description: 'Synchronized IPTV watch-party app: a Flutter/Dart client (BLoC state, media_kit playback) paired with an ASP.NET Core (.NET) SignalR backend that keeps every viewer’s playhead in sync via room codes. Integrates the Xtream Codes API for live, on-demand and series content, and stores IPTV credentials securely on-device.',
    stack:       ['Flutter', 'Dart', 'ASP.NET Core', 'C#', 'SignalR'],
    githubUrl:   'https://github.com/mustafa-elshahhat/MoonWatch',
    imageBg:     'linear-gradient(135deg, #001833 0%, #003366 50%, #00488a 100%)',
    imageUrl:    '/images/projects/moonwatch-cover.webp',
    gallery: [
      '/images/projects/moonwatch-cover.webp',
      '/images/projects/moonwatch-catalog.webp',
      '/images/projects/moonwatch-room.webp',
    ],
    portfolioPriority: 7,
    details: {
      problem:      'Watching IPTV streams together remotely is hard because each viewer drifts out of sync with no shared playback control.',
      solution:     'A host shares a six-letter room code and the server keeps all clients’ playheads aligned, with host-driven pause/seek and tolerance for brief disconnections.',
      architecture: 'Flutter/Dart client using the BLoC pattern and media_kit, communicating over SignalR with an ASP.NET Core (.NET 10) backend; protocol types are shared between Dart and C#.',
      performance:  'Maintains tight playback synchronization, allows a 30-second reconnection window, and stores IPTV credentials with secure on-device storage rather than hardcoding them.',
    },
  },
  {
    id:          'lap-service-pos',
    title:       'Lap Service POS',
    description: 'Windows desktop point-of-sale and service-management system for laptop and printer repair workshops, built in C# with WPF (.NET) over a layered architecture and a local SQLite database. Combines POS sales, repair work-order tracking, spare-parts inventory, customer credit, returns, expenses, and financial reporting with role-based access.',
    stack:       ['C#', 'WPF', '.NET', 'SQLite'],
    githubUrl:   'https://github.com/mustafa-elshahhat/Lap_Service_POS',
    imageBg:     'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
    imageUrl:    '/images/projects/lap-service-pos-reports.webp',
    gallery: [
      '/images/projects/lap-service-pos-reports.webp',
      '/images/projects/lap-service-pos-sales.webp',
      '/images/projects/lap-service-pos-users.webp',
    ],
    portfolioPriority: 8,
    details: {
      problem:      'Repair workshops juggle sales, repair jobs, parts stock and customer balances across disconnected tools.',
      solution:     'A single desktop app unifying POS transactions, staged repair work orders, spare-parts inventory, customer credit, returns and expense tracking.',
      architecture: 'C# WPF on .NET 10 with a layered structure (Domain → Application → Infrastructure → Presentation) and a local SQLite database that initializes automatically.',
      performance:  'Role-based access control, daily and period-based profit reporting, returns that auto-adjust stock, and local data backup/restore.',
    },
  },
  {
    id:          'autoparts-pos',
    title:       'AutoParts POS',
    description: 'Windows desktop inventory and point-of-sale system for auto-parts retail shops, built in C# with WPF (.NET) and SQLite using a layered (Domain/Application/Infrastructure/Presentation) architecture. Handles inventory with purchase costs and suppliers, cash and credit sales, customer credit accounts, returns with stock adjustment, expense tracking, and profitability reporting.',
    stack:       ['C#', 'WPF', '.NET', 'SQLite'],
    githubUrl:   'https://github.com/mustafa-elshahhat/AutoParts-POS',
    imageBg:     'linear-gradient(135deg, #3d1b04 0%, #7a3608 50%, #bd530d 100%)',
    imageUrl:    '/images/projects/autoparts-pos-sales.webp',
    gallery: [
      '/images/projects/autoparts-pos-sales.webp',
      '/images/projects/autoparts-pos-suppliers.webp',
      '/images/projects/autoparts-pos-invoices.webp',
      '/images/projects/autoparts-pos-expenses.webp',
    ],
    portfolioPriority: 9,
    details: {
      problem:      'Small auto-parts shops need to track inventory costs, suppliers, credit customers and daily profit without heavyweight software.',
      solution:     'A desktop POS and inventory system covering sales, customer credit with payment history, returns, and categorized expense tracking.',
      architecture: 'C# WPF on .NET 10 in a layered (Domain/Application/Infrastructure/Presentation) architecture backed by a local SQLite database initialized on first launch.',
      performance:  'Inventory carries purchase pricing and supplier links, returns automatically adjust stock, and daily summaries plus profit analysis support decision-making.',
    },
  },
  {
    id:          'booknest',
    title:       'BookNest E-Library',
    description: 'Static digital-library web app built with vanilla HTML, CSS and JavaScript (no frameworks). Browse and search a catalog by title, author or category with client-side filtering, dynamic book-detail rendering with SVG cover fallbacks, query-parameter routing, and a mobile-first responsive CSS Grid layout.',
    stack:       ['HTML', 'CSS', 'JavaScript'],
    liveUrl:     'https://e-library-flame-omega.vercel.app/',
    githubUrl:   'https://github.com/mustafa-elshahhat/E-Library-WebApp',
    imageBg:     'linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0f2060 100%)',
    imageUrl:    '/images/projects/booknest-cover.webp',
    gallery: [
      '/images/projects/booknest-cover.webp',
      '/images/projects/booknest-books.webp',
      '/images/projects/booknest-categories.webp',
      '/images/projects/booknest-book-detail.webp',
    ],
    portfolioPriority: 5,
    details: {
      problem:      'A clean, dependency-free way to browse and discover books was needed as an exercise in front-end fundamentals.',
      solution:     'A static catalog where users browse books across categories and filter by title, author or category entirely on the client side.',
      architecture: 'Vanilla HTML, CSS (Grid/Flexbox, custom properties) and JavaScript with data held in a static JS module and client-side routing via URL query parameters — no backend or frameworks.',
      performance:  'Mobile-first responsive Grid breakpoints, fluid typography with clamp(), dynamic SVG placeholders for missing covers, and semantic, accessible markup.',
    },
  },
]

projects.sort((a, b) => a.portfolioPriority - b.portfolioPriority)
