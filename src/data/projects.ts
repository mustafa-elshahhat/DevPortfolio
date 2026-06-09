export interface Project {
  id:          string
  title:       string
  description: string
  stack:       string[]
  liveUrl?:    string
  githubUrl?:  string
  imageBg:     string
  imageUrl:    string
  gallery?:    string[]
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
    details: {
      problem:      'Shoppers wanted to either buy individual accessories or build personalized gift boxes, while the shop needed timely order notifications and admin control.',
      solution:     'Implemented a custom gift-box builder with category-based pricing, an admin dashboard for catalog and order management, and automated WhatsApp updates on order and payment status.',
      architecture: 'Angular 21 + TypeScript front-end calling an ASP.NET Core (.NET 8) backend with Entity Framework Core over SQL Server; JWT auth with CSRF protection, and a dedicated Node.js WhatsApp microservice for notifications.',
      performance:  'Uses background services for the notification queue and order expiry, output caching with tag-based invalidation, and health checks for the database and media storage.',
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
    githubUrl:   'https://github.com/mustafa-elshahhat/E-Library-WebApp',
    imageBg:     'linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #0f2060 100%)',
    imageUrl:    '/images/projects/booknest-cover.webp',
    gallery: [
      '/images/projects/booknest-cover.webp',
      '/images/projects/booknest-books.webp',
      '/images/projects/booknest-categories.webp',
      '/images/projects/booknest-book-detail.webp',
    ],
    details: {
      problem:      'A clean, dependency-free way to browse and discover books was needed as an exercise in front-end fundamentals.',
      solution:     'A static catalog where users browse books across categories and filter by title, author or category entirely on the client side.',
      architecture: 'Vanilla HTML, CSS (Grid/Flexbox, custom properties) and JavaScript with data held in a static JS module and client-side routing via URL query parameters — no backend or frameworks.',
      performance:  'Mobile-first responsive Grid breakpoints, fluid typography with clamp(), dynamic SVG placeholders for missing covers, and semantic, accessible markup.',
    },
  },
]
