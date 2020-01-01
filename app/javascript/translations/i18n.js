import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translations.json";
import translationFR from "./locales/fr/translations.json";

const detectionOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true
}

const resources = {
  en: {
    translations: translationEN
  },
  fr: {
    translations: translationFR
  }
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: detectionOptions,
    // we init with resources
    resources,
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
