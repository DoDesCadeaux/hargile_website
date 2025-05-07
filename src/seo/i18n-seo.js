// src/utils/i18n-seo.js

/**
 * Generates hreflang tags for all supported languages
 * @param {string} currentPath - Current page path without locale prefix
 * @param {string[]} locales - All supported locales
 * @param {string} domain - Website domain name
 * @returns {Object} - Object with alternates properties for Next.js metadata
 */
export function generateHreflangTags(currentPath, locales, domain) {
    const alternates = {
        canonical: `https://${domain}${currentPath}`,
        languages: {}
    };

    locales.forEach(locale => {
        alternates.languages[locale] = `https://${domain}/${locale}${currentPath}`;
    });

    return alternates;
}

/**
 * Gets the translated URL for the current page
 * @param {string} locale - Target locale
 * @param {string} currentPath - Current path without locale prefix
 * @param {Object} translations - Object with translations for page paths
 * @returns {string} - Translated path
 */
export function getTranslatedPath(locale, currentPath, translations) {
    // Example translations object:
    // {
    //   'about-us': {
    //     'en': 'about-us',
    //     'fr': 'a-propos'
    //   }
    // }

    // Find which path key corresponds to the current path
    const pathKey = Object.keys(translations).find(key => {
        return Object.values(translations[key]).includes(currentPath);
    });

    if (pathKey && translations[pathKey][locale]) {
        return translations[pathKey][locale];
    }

    // If no translation found, return original path
    return currentPath;
}

/**
 * Formats date for SEO purposes in the target locale
 * @param {Date} date - Date object to format
 * @param {string} locale - Target locale
 * @returns {string} - Formatted date string
 */
export function formatSeoDate(date, locale) {
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
