# PeQoT Installation & Setup Guide

This guide describes how to run and configure PeQoT locally and in development environments.

## Prerequisites
- Node.js 20+ or 22+
- npm or bun or yarn
- A Supabase account (free or paid) at [supabase.com](https://supabase.com)

## Step 1: Clone or Open Repository
```bash
git clone https://github.com/YourOrg/PeQoT.git
cd PeQoT
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key-here"
```

*Note: PeQoT also features an in-app Supabase Connection Manager in the navigation header, allowing you to connect and test credentials directly inside the interface without manual restarts.*

## Step 4: Run Database Migrations
In your Supabase project's SQL Editor, execute the migration script located at:
`/supabase/migrations/20261102000001_peqot_core_schema.sql`

## Step 5: Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

## Step 6: Build for Production
```bash
npm run build
```
This generates the optimized production build in `/dist`.
