export const apiUrl = String(process.env.API_URI);
export const sentryDsn = String(process.env.SENTRY_DSN)
  ? String(process.env.SENTRY_DSN)
  : "https://10b29f35b26b4911a3fa5ff7f6703faf@o647492.ingest.sentry.io/5759703";
export const sentryEnv = String(process.env.SENTRY_ENV);
const sampleRate = parseFloat(String(process.env.SENTRY_APM));
export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;
export const serviceWorkerTimeout =
  parseInt(String(process.env.SERVICE_WORKER_TIMEOUT), 10) || 60 * 1000;
export const demoMode = String(process.env.DEMO_MODE) === "true";
