import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translations.json";
import translationFR from "./locales/fr/translations.json";

const detectionOptions = {
  // order and from where user language should be detected
  order: ['subdomain'],
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
    whitelist: ["fr", "en"],
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
