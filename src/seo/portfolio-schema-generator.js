/**
 * Generates schema.org structured data for portfolio items
 *
 * @param {object} project - The portfolio project object
 * @param {object} options - Additional options (locale, domain, etc.)
 * @returns {object} - Schema.org structured data object
 */
export function generatePortfolioItemSchema(project, options) {
    const {locale, domain} = options;

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": project.title,
        "description": project.description,
        "url": project.actionUrl,
        "image": `https://${domain}${project.image}`,
        "inLanguage": locale,
        "publisher": {
            "@type": "Organization",
            "name": "HARGILE",
            "url": `https://${domain}/${locale}`,
            "logo": {
                "@type": "ImageObject",
                "url": `https://${domain}/images/brand/brand_large.png`
            }
        },
        "isPartOf": {
            "@type": "CollectionPage",
            "name": "HARGILE Portfolio",
            "url": `https://${domain}/${locale}/portfolio`
        }
    };
}

/**
 * Generates schema.org structured data for the portfolio page
 * (Collection of items)
 *
 * @param {Array} projects - The portfolio projects array
 * @param {object} options - Additional options (locale, domain, etc.)
 * @param {string} pageTitle - The portfolio page title
 * @param {string} pageDescription - The portfolio page description
 * @returns {object} - Schema.org structured data object
 */
export function generatePortfolioCollectionSchema(projects, options, pageTitle, pageDescription) {
    const {locale, domain} = options;

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": `https://${domain}/${locale}/portfolio`,
        "inLanguage": locale,
        "publisher": {
            "@type": "Organization",
            "name": "HARGILE",
            "url": `https://${domain}/${locale}`,
            "logo": {
                "@type": "ImageObject",
                "url": `https://${domain}/images/brand/brand_large.png`
            }
        },
        "hasPart": projects.map(project => ({
            "@type": "WebSite",
            "name": project.title,
            "description": project.description,
            "url": project.actionUrl,
            "image": `https://${domain}${project.image}`
        }))
    };
}
