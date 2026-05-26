# Architecture

Worth-It is built using a modern full-stack SaaS architecture.

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend
- Supabase database
- Cloud persistence for audit reports

## Core Flow

1. User submits AI tooling stack
2. Audit engine evaluates pricing inefficiencies
3. Savings recommendations are generated
4. Audit report is persisted in Supabase
5. Public shareable report URL is created

## Deployment
- Vercel for hosting
- Supabase for backend infrastructure

## Design Goals
- Fast audit generation
- Simple UX
- Public shareable reports
- Modern SaaS-style interface