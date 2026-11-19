# Meta Ads Dashboard

Dashboard de métricas de Meta Ads construido con Next.js 14, Recharts y Tailwind CSS.

## Configuración local

```bash
npm install
cp .env.local.example .env.local
# Rellena las variables en .env.local
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `META_APP_ID` | ID de la aplicación de Meta |
| `META_APP_SECRET` | Secreto de la aplicación |
| `META_ACCESS_TOKEN` | Token de acceso de larga duración |
| `META_AD_ACCOUNT_ID` | ID de la cuenta publicitaria (formato `act_XXXXXXXXX`) |

## Despliegue en Vercel

1. Importa el repo en [vercel.com/new](https://vercel.com/new)
2. En **Settings → Environment Variables** agrega las 4 variables
3. Vercel detecta Next.js automáticamente y despliega

## Estructura

```
src/
  app/
    api/meta/
      insights/route.ts   # GET /api/meta/insights
      campaigns/route.ts  # GET /api/meta/campaigns
    globals.css
    layout.tsx
    page.tsx
  components/
    Dashboard.tsx
    MetricCard.tsx
    SpendChart.tsx
    ClicksChart.tsx
    CampaignTable.tsx
    DateFilter.tsx
  lib/
    meta-api.ts           # Cliente Meta Graph API v20.0
  types/
    meta.ts
```
