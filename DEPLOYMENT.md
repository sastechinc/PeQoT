# PeQoT Deployment Guide (Vercel & Cloud Run)

This document outlines deployment preparation for **Vercel** and containerized environments.

## Vercel Deployment

### 1. Connect Repository
1. Push your changes to the dedicated GitHub repository: `PeQoT`.
2. In the Vercel Dashboard, select **Add New Project** and import the `PeQoT` repository.

### 2. Build & Output Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Environment Variables in Vercel
In the project settings, add:
- `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://<project-ref>.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous API key

### 4. Rewrites & Routing
Since PeQoT is a single page application (SPA), ensure single-page route rewrites are active. The included `vercel.json` ensures all paths route to `index.html`.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 5. Production Domain
Connect your verified domain (e.g. `peqot.com` or custom SAS Tech Inc. domain) once authorized.
