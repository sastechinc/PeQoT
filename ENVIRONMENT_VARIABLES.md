# PeQoT Environment Variables Reference

PeQoT follows zero-secret client exposure rules.

| Variable Name | Required | Context | Description |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Yes (in Prod) | Client | The HTTPS URL of your Supabase project instance (e.g. `https://xyzcompany.supabase.co`). |
| `VITE_SUPABASE_ANON_KEY` | Yes (in Prod) | Client | The public anonymous key for client-side queries, protected by Row Level Security. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Backend Server Only | **NEVER EXPOSE IN FRONTEND CODE**. Used only in trusted server scripts or migrations. |
| `RESEND_API_KEY` | Optional | Backend Server Only | Email delivery API key for transactional email and verification notices. |
| `SENTRY_DSN` | Optional | Client/Server | Error monitoring and crash reporting token. |

### Dynamic In-App Fallback
If environment variables are not yet provided during evaluation or staging, PeQoT includes a live **Supabase Connection Manager** in the application interface to test and configure connections on the fly without breaking the user experience.
