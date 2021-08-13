export const GEO_URL_STATES =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
export const GEO_URL_COUNTIES =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://c19.api.blagl.xyz/v1'
    : 'http://localhost:3000/v1';

export const STATE_RISK_TIMESERIES = `${BASE_URL}/states/risk/timeseries`;
export const COUNTY_RISK_TIMESERIES = `${BASE_URL}/counties/risk/timeseries`;
