export const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://c19.api.kolyaventuri.dev/v1' : 'http://localhost:3000/v1';

export const STATE_RISK_TIMESERIES = `${BASE_URL}/states/risk/timeseries`;
