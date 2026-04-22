# Coffee Stock

> Clean Arch Management — Inventory management with DDD and Clean Architecture.

A simple inventory ecosystem designed to showcase **Clean Architecture**, **Domain-Driven Design (DDD)**, and **Type-Safe** development with Next.js 16. The application manages coffee products, stores, and stock levels while keeping the business rules fully decoupled from the framework and the database.

## Motivation & Study Goals

This project started as a deep dive into decoupled software design. The goal was to build a scalable React application where the business logic (Core) remains agnostic of the framework (Next.js) or database (Prisma/Postgres). It serves as a laboratory for implementing DDD principles, boundary separation, and Type-Safe development.

## Architecture & Patterns

- **Clean Architecture:** Strict separation of concerns between `core`, `infra`, `app`, and `lib`.
- **Domain-Driven Design (DDD):** Business rules modeled through Entities, Aggregates, Value Objects, and Use Cases.
- **Ports & Adapters:** `core/ports` defines contracts; `infra` provides Prisma/service implementations via factories.
- **Type-Safe end-to-end:** TypeScript strict mode, Zod schemas, and typed Server Actions across the boundary.
- **Immutability & explicit state:** Predictable data flow, no side effects leaking into domain rules.

## 🛠️ Engineering Stack

- **Next.js 16** — React 19, Turbopack, App Router
- **Prisma Postgres** — Type-safe database management
- **Next-Auth v5** — Secure server-side authentication
- **Shadcn UI** — Radix UI & Tailwind CSS 4
- **React Hook Form** — Validated with Zod
- **Jest & React Testing Library** — Unit tests (Vitest also wired for Storybook)
- **next-intl** — Dynamic translations (EN / PT)
- **Storybook** — Component isolation & docs
- **pnpm** — Package manager

## 📂 Project Structure

```text
src/
  ├── app/              # Next.js App Router (UI / framework layer)
  │   ├── actions/      # Type-safe Server Actions
  │   └── api/          # Route handlers
  ├── core/             # THE BRAIN — zero framework dependencies
  │   ├── domain/       # Entities, Aggregates (DDD)
  │   ├── ports/        # Interfaces / Contracts
  │   ├── use-cases/    # Pure business logic
  │   └── utils/        # Domain-level helpers
  ├── infra/            # Implementation details
  │   ├── database/     # Prisma client & adapters
  │   ├── factories/    # Wires use cases to concrete repos
  │   └── services/     # External services
  ├── components/       # React components (Shadcn-based)
  ├── lib/              # Framework-specific utils (Zod, Tailwind, helpers)
  ├── i18n/             # next-intl config
  ├── messages/         # Translation files (en.json, pt.json)
  └── test/             # Testing setup & mocks
```

### Layer highlights

- **`core/`** — The heart. Agnostic to any database or UI framework. TypeScript at its purest form.
- **`infra/`** — Implementation details. Prisma, external services, and factories are mapped here.
- **`lib/`** — Cross-cutting concerns like Shadcn UI config, Zod schemas, and shared utilities.

## 🚦 CI/CD Pipeline

A robust automation workflow using GitHub Actions to ensure code stability and immutable deployments:

1. **Setup & Cache** — Initializes environment and caches pnpm store for ultra-fast builds.
2. **Quality Assurance** — Runs ESLint and Prettier check. Any code style violation breaks the build.
3. **Automated Testing** — Executes Jest suite. High coverage ensures DDD business rules remain intact.
4. **Production Build** — Validates Prisma schemas and Next.js compilation for a type-safe artifact.
5. **Vercel Deployment** — Pre-built strategy: what passes in CI is exactly what goes to production.

## ⚙️ Development

### Prerequisites

- Node.js (v20 or higher)
- pnpm (`npm install -g pnpm`)
- Docker (for the local Postgres instance via `docker-compose.yml`)

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mateuscdomingos/nextjs-clean-architecture-ddd.git
   cd nextjs-clean-architecture-ddd
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Start the database:**
   ```bash
   docker compose up -d
   ```
4. **Apply Prisma migrations:**
   ```bash
   pnpm prisma migrate dev
   ```
5. **Run the development server:**
   ```bash
   pnpm dev
   ```

### Available Scripts

| Script                 | Description                        |
| ---------------------- | ---------------------------------- |
| `pnpm dev`             | Start Next.js in development mode  |
| `pnpm build`           | Build the production bundle        |
| `pnpm start`           | Start the production server        |
| `pnpm test`            | Run Jest unit tests (UTC timezone) |
| `pnpm test:watch`      | Run Jest in watch mode             |
| `pnpm lint`            | Run ESLint                         |
| `pnpm format`          | Format files with Prettier         |
| `pnpm format:check`    | Check formatting without writing   |
| `pnpm storybook`       | Start Storybook on port 6006       |
| `pnpm build-storybook` | Build the static Storybook         |

## 🌐 Internationalization

Translations live in `src/messages/` and are consumed through `next-intl`. Currently supported:

- 🇺🇸 English (`en.json`)
- 🇧🇷 Portuguese (`pt.json`)

## Conventional Commits

This project follows the Conventional Commits specification for a clear and organized commit history. Examples:

- `feat: add budget validation logic to Order entity`
- `fix: correct stock deduction calculation`
- `test: add unit tests for order approval use case`
- `docs: update readme with architectural patterns`
- `chore: configure github actions pipeline`

## About

I am a Software Engineer focused on high-performance web applications and scalable architectures. This project represents my commitment to clean code and continuous learning.
