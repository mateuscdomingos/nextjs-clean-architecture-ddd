/* eslint-disable react/jsx-no-comment-textnodes */
import Link from 'next/link';
import {
  Github,
  Code2,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="py-24 px-6 text-center space-y-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-extrabold tracking-tighter mb-4">
            Coffee Stock
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An advanced inventory ecosystem designed to showcase
            <strong> Clean Architecture</strong>, <strong>DDD</strong>, and{' '}
            <strong>Type-Safe</strong> development with Next.js 15.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 md:px-8 md:py-4 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-transform"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="https://github.com/mateuscdomingos/nextjs-clean-architecture-ddd"
              className="inline-flex items-center gap-2 md:px-8 md:py-4 px-6 py-3 border rounded-full font-bold hover:bg-muted transition-colors"
            >
              <Github size={20} /> GitHub
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/50 border-y">
        <div className="max-w-5xl mx-auto items-center">
          <h2 className="text-3xl text-center font-bold mb-12">
            Motivation & Study Goals
          </h2>
          <p className="text-lg leading-relaxed">
            This project started as a deep dive into decoupled software design.
            The goal was to build a scalable React application where the
            business logic (Core) remains agnostic of the framework (Next.js) or
            database (Prisma/Postgres). It serves as a laboratory for
            implementing SOLID principles, boundary separation, and Type-Safe
            development.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
              <Code2 className="text-primary" /> Clean Architecture Folders
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-950 p-6 rounded-xl font-mono md:text-sm text-xs text-zinc-300 shadow-2xl border border-zinc-800">
              <ul className="space-y-1">
                <li>📂 src</li>
                <li>
                  &nbsp;&nbsp;📂 app{' '}
                  <span className="text-zinc-500">
                    // Next.js App Router (UI/Framework)
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;📂 actions{' '}
                  <span className="text-zinc-500">
                    // Type-safe Server Actions
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;📂 core{' '}
                  <span className="text-zinc-500">
                    // THE BRAIN (Zero Dependencies)
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;📂 domain{' '}
                  <span className="text-zinc-500">
                    // Entities, Aggregates (DDD)
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;📂 ports{' '}
                  <span className="text-zinc-500">
                    // Interfaces / Contracts
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;📂 use-cases{' '}
                  <span className="text-zinc-500">// Pure Business Logic</span>
                </li>
                <li>
                  &nbsp;&nbsp;📂 infra{' '}
                  <span className="text-zinc-500">
                    // Repositories Impl & Factories
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;📂 lib{' '}
                  <span className="text-zinc-500">
                    // Framework-specific Utils (Zod, Tailwind)
                  </span>
                </li>
                <li>
                  &nbsp;&nbsp;📂 test{' '}
                  <span className="text-zinc-500">
                    // Testing Setup & Mocks
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 py-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <p>
                  <span className="font-bold">src/core:</span> The heart.
                  Agnostic to any database or UI framework. TypeScript at its
                  purest form.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <p>
                  <span className="font-bold">src/infra:</span> Implementation
                  details. Prisma, External Services, and Factories are mapped
                  here.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <p>
                  <span className="font-bold">src/lib:</span> Cross-cutting
                  concerns like Shadcn UI config, Zod schemas, and shared
                  utilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/50 border-y">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-3">
            <Cpu className="text-primary" /> Engineering Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Next.js 15', desc: 'React 19, Turbopack, App Router' },
              {
                title: 'Prisma Postgres',
                desc: 'Type-safe Database Management',
              },
              { title: 'Next-Auth (v5)', desc: 'Secure Server-side Auth' },
              { title: 'Shadcn UI', desc: 'Radix UI & Tailwind CSS' },
              { title: 'React Hook Form', desc: 'Validated with Zod' },
              { title: 'Jest & RTL', desc: 'Unit tests' },
              { title: 'i18n', desc: 'Dynamic translations (next-intl)' },
              { title: 'Storybook', desc: 'Component Isolation & Docs' },
            ].map((tech) => (
              <div
                key={tech.title}
                className="p-6 rounded-xl bg-background border hover:border-primary/50 transition-colors shadow-sm"
              >
                <h4 className="font-bold text-lg mb-1">{tech.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">
              CI/CD Pipeline
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A robust automation workflow using GitHub Actions to ensure code
              stability and immutable deployments.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="space-y-6 grid md:grid-cols-2 gap-2">
              {[
                {
                  title: 'Setup & Cache',
                  icon: <Zap size={18} />,
                  desc: 'Initializes environment and caches pnpm store for ultra-fast builds.',
                },
                {
                  title: 'Quality Assurance',
                  icon: <ShieldCheck size={18} />,
                  desc: 'Runs ESLint and Prettier check. Any code style violation breaks the build.',
                },
                {
                  title: 'Automated Testing',
                  icon: <Code2 size={18} />,
                  desc: 'Executes Jest suite. High coverage ensures DDD business rules remain intact.',
                },
                {
                  title: 'Production Build',
                  icon: <Cpu size={18} />,
                  desc: 'Validates Prisma schemas and Next.js compilation for a type-safe artifact.',
                },
                {
                  title: 'Vercel Deployment',
                  icon: <Globe size={18} />,
                  desc: 'Pre-built strategy: what passes in the CI is exactly what goes to production.',
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border mb-2"
                >
                  <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 bg-muted border-t text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            I am a Software Engineer focused on high-performance web
            applications and scalable architectures. This project represents my
            commitment to clean code and continuous learning.
          </p>
          <div className="flex justify-center gap-8">
            <Link
              href="https://www.linkedin.com/in/mateus-cd"
              className="font-bold hover:text-primary transition"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/mateuscdomingos"
              className="font-bold hover:text-primary transition"
            >
              GitHub
            </Link>
          </div>
          <div className="pt-8 text-xs text-muted-foreground/50 font-mono">
            &copy; 2026 NEXTJS-CLEAN-ARCHITECTURE-DDD
          </div>
        </div>
      </footer>
    </main>
  );
}
