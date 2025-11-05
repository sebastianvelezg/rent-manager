# 🏠 Rent Manager

### Smart Rental Management Platform — built with **Next.js 16** + **shadcn/ui**

---

## 📖 Overview

**Rent Manager** is a modern web application designed to simplify and streamline the entire property rental process.  
The platform connects **property owners**, **renters**, and **administrators** in one ecosystem — offering transparent management, digital payments, communication, and automated reminders.

The initial version of the project will focus on the **frontend**, built with **Next.js 16** and **shadcn/ui**, providing a clean and efficient interface.  
The backend will be integrated later, depending on scalability, security, and hosting needs.

---

## 🚀 Key Features

### 🧑‍💼 **Admin Dashboard**

For system administrators and the Rent Manager team.

- Manage and monitor all users (owners, renters).
- Oversee **subscriptions**, **billing**, and **transactions**.
- Access a **complete client database** (owners, renters, properties).
- Manage **support tickets**, **contacts**, and **platform-wide settings**.
- Generate **reports and analytics** on revenue, usage, and activity.
- Control permissions and system configurations.

---

### 🏘️ **Property Owner Dashboard**

For landlords or property managers renting out apartments or homes.

- Add, edit, and manage **properties** (with descriptions, images, pricing, and availability).
- Track and manage **invoices** and **payments** from renters.
- Set up **reminders and due dates** for rent and maintenance.
- View and respond to **comments or issues** reported by renters.
- Manage **contracts**, **rental history**, and **payment records**.
- Communicate directly with renters via integrated chat or messaging.
- Receive **notifications** for upcoming payments or expiring contracts.
- **Invite or add renters to properties:**
  - The owner can **create a renter account manually**, or
  - **Send an invitation link** to the renter so they can register and automatically link to the correct property.  
    This ensures a seamless connection between property and tenant.

---

### 👩‍💻 **Renter Dashboard**

For tenants who are renting a property through the platform.

- View property details and current **rental agreement**.
- **Pay rent online** securely via integrated payment methods.
- Access **payment history** and invoices.
- Send **comments**, **maintenance requests**, or **feedback** to the property owner.
- Get **automated reminders** for upcoming due dates.
- Manage **profile**, **documents**, and **contact preferences**.
- If invited by an owner, renters can create their account directly via the **invitation link**, automatically linking their profile to the property they’re renting.

---

## 🌎 Target Market

- **Initial Launch**: Colombia 🇨🇴  
  The system will be adapted for local payment methods and tax regulations.
- **Future Expansion**: Latin America & Global 🌍  
  Multi-currency support, internationalization (i18n), and scalable backend architecture will allow expansion to new markets.

---

## 🧱 Tech Stack

### Frontend

- **Next.js 16** — App Router & Server Actions
- **React 19** — Latest React with improved performance
- **TypeScript 5** — Strong typing for reliability and maintainability
- **shadcn/ui** (New York style) — For accessible, beautiful, reusable components
- **Tailwind CSS v4** — Utility-first styling with PostCSS
- **Lucide Icons** — Clean and minimal icons

### State & Data Management

- **TanStack Query (React Query)** — Server state, caching, and data fetching
- **Zustand** — Lightweight client-side state management
- **React Hook Form** — Performant form handling with minimal re-renders
- **Zod** — TypeScript-first schema validation

### Additional Libraries

- **date-fns** — Modern date utility library
- **class-variance-authority** — Component variant management
- **clsx + tailwind-merge** — Conditional className handling

### Payment Integration (Planned)

- **Stripe** — International payment processing
- **Mercado Pago** — Primary payment gateway for Colombia & LATAM
- **Nequi / Daviplata** — Popular Colombian digital wallets
- **PSE** — Colombia's online bank transfer system

### Backend (Future)

- **Supabase** / **Firebase** / **Custom Node.js API** (TBD)
- **PostgreSQL** — Primary database
- **Prisma** — Type-safe ORM
- **NextAuth.js** — Authentication
- **Resend** / **SendGrid** — Transactional emails

---

## 📁 Project Structure

```
rent-manager/
├── app/                      # Next.js 16 App Router
│   ├── (auth)/              # Authentication routes (login, register)
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── owner/          # Property owner dashboard
│   │   └── renter/         # Renter dashboard
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── forms/              # Reusable form components
│   ├── layouts/            # Layout components
│   └── shared/             # Shared components
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities and configurations
│   ├── utils.ts            # Utility functions
│   ├── validations/        # Zod schemas
│   └── api/                # API client setup
├── types/                   # TypeScript type definitions
├── constants/               # App constants
├── public/                  # Static assets
└── styles/                  # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** / **pnpm** / **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rent-manager.git
   cd rent-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables (API keys, database URL, etc.)

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Add shadcn/ui components as needed**
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   npx shadcn@latest add form
   # etc.
   ```

### Building for Production

```bash
npm run build
npm run start
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (when backend is integrated)
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Payment Gateways
MERCADO_PAGO_PUBLIC_KEY=your_public_key
MERCADO_PAGO_ACCESS_TOKEN=your_access_token
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@rentmanager.com
```

---

## 🚢 Deployment

### Recommended Hosting Platforms

- **Vercel** — Optimized for Next.js, zero-config deployment
- **Netlify** — Alternative with good Next.js support
- **Railway** / **Render** — For full-stack deployment with backend
- **AWS Amplify** / **Google Cloud Run** — Enterprise options

### Deployment Checklist

- [ ] Set all environment variables in hosting platform
- [ ] Configure custom domain
- [ ] Set up SSL certificates (usually automatic)
- [ ] Configure database connection (when backend is ready)
- [ ] Set up payment gateway webhooks
- [ ] Enable analytics and monitoring
- [ ] Configure email service for transactional emails

---

## 📋 Development Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup with Next.js 16 + shadcn/ui
- [x] Tech stack definition
- [ ] Add core shadcn/ui components
- [ ] Set up project folder structure
- [ ] Create basic landing page
- [ ] Design system and theme configuration

### Phase 2: Authentication & User Management
- [ ] Implement authentication (NextAuth.js or similar)
- [ ] User registration and login flows
- [ ] Role-based access control (Admin, Owner, Renter)
- [ ] Profile management pages
- [ ] Password reset functionality

### Phase 3: Core Features - Property Owner
- [ ] Property CRUD operations
- [ ] Property listing with images
- [ ] Invoice generation
- [ ] Payment tracking dashboard
- [ ] Renter invitation system
- [ ] Communication/messaging interface

### Phase 4: Core Features - Renter
- [ ] View rental agreement and property details
- [ ] Payment interface
- [ ] Payment history
- [ ] Maintenance request forms
- [ ] Profile and document management

### Phase 5: Core Features - Admin
- [ ] User management dashboard
- [ ] Subscription and billing oversight
- [ ] Platform analytics and reports
- [ ] Support ticket system
- [ ] System configuration panel

### Phase 6: Payment Integration
- [ ] Mercado Pago integration
- [ ] Stripe integration (for international expansion)
- [ ] Colombian payment methods (PSE, Nequi, Daviplata)
- [ ] Payment webhooks and confirmation flows
- [ ] Receipt generation

### Phase 7: Notifications & Automation
- [ ] Email notification system
- [ ] Automated rent reminders
- [ ] Contract expiration alerts
- [ ] SMS notifications (optional)
- [ ] In-app notification center

### Phase 8: Backend Integration
- [ ] Choose and set up backend (Supabase/Firebase/Custom API)
- [ ] Database schema design
- [ ] API endpoints
- [ ] Data migration tools
- [ ] Backup and security measures

### Phase 9: Testing & Optimization
- [ ] Unit and integration tests
- [ ] E2E testing (Playwright or Cypress)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Accessibility audit (WCAG compliance)

### Phase 10: Launch & Scale
- [ ] Beta testing with select users in Colombia
- [ ] Bug fixes and feedback implementation
- [ ] Marketing website and documentation
- [ ] Official launch in Colombia
- [ ] Plan for LATAM expansion

---

## 🇨🇴 Colombia-Specific Considerations

As the platform targets Colombia initially, these features and compliance items are essential:

### Legal & Compliance
- **Rental contract templates** compliant with Colombian law
- **DIAN tax compliance** for rental income reporting
- **Data protection** according to Colombian data privacy laws (Ley 1581 de 2012)
- **Electronic invoicing** (Factura Electrónica)

### Payment Methods
- **Mercado Pago** — Most popular in Colombia
- **PSE** — Direct bank transfers (Pagos Seguros en Línea)
- **Nequi** — Digital wallet widely used
- **Daviplata** — Davivienda's digital payment platform
- **Bancolombia** integration
- **Cash payment tracking** (manual recording)

### Currency & Localization
- **Colombian Peso (COP)** as primary currency
- Date format: DD/MM/YYYY
- Spanish language interface (with English option)
- Colombian phone number format (+57)
- Colombian address format (includes "Estrato" socioeconomic level)

### Cultural Considerations
- **"Fiador" (guarantor)** support in contracts
- **Security deposit** ("Depósito de garantía") handling
- **"Arriendo" vs "Alquiler"** terminology (Colombian Spanish)
- Support for **monthly** and **bi-monthly** payment cycles

---

## 🧠 Vision

Rent Manager aims to become the **go-to rental management solution** for property owners and tenants — combining **automation**, **transparency**, and **ease of use**.
Our mission is to make renting simple, digital, and stress-free for everyone.

---

## 🤝 Contributing

This is currently a private project in early development. Contributions are welcome once the project reaches a stable foundation.

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write clean, self-documenting code
- Use meaningful commit messages
- Test your changes thoroughly
- Follow the existing code style

---

## 📄 License

This project is currently private and proprietary. License information will be updated as the project evolves.

---

## 📞 Contact & Support

For questions, feedback, or support:

- **Email**: sebastianvelezg42@gmail.com
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/sebastianvelezg/rent-manager/issues)

---

**Built with ❤️ for property owners and renters**
