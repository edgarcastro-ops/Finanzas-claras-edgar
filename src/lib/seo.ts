export const SITE_URL = "https://finanzasatubolsillo.com";
export const absoluteUrl = (path: string) => (path === "/" ? SITE_URL + "/" : SITE_URL + path);
