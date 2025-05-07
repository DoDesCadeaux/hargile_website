export function generateOrganizationSchema(domain) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HARGILE',
        url: `https://${domain}`,
        logo: {
            '@type': 'ImageObject',
            url: `https://${domain}/images/brand/brand_large.png`,
            width: '1754',
            height: '815'
        },
        sameAs: [
            // Add your social media URLs here
            'https://www.linkedin.com/company/hargile',
            'https://twitter.com/hargile_agency'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+33-000-000-000', // Replace with your actual phone number
            contactType: 'customer service',
            email: 'contact@hargile.com',
            availableLanguage: ['English', 'French']
        }
    };
}

export function generateWebsiteSchema(domain) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'HARGILE',
        url: `https://${domain}`,
        potentialAction: {
            '@type': 'SearchAction',
            target: `https://${domain}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    };
}

export function generateLocalBusinessSchema(domain) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'HARGILE',
        image: `https://${domain}/images/brand/brand_large.png`,
        '@id': `https://${domain}/#organization`,
        url: `https://${domain}`,
        telephone: '+33-000-000-000', // Replace with your actual phone number
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Digital Avenue', // Replace with your actual address
            addressLocality: 'Paris',
            postalCode: '75000',
            addressCountry: 'FR'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '48.8566', // Replace with your actual coordinates
            longitude: '2.3522'
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday'
            ],
            opens: '09:00',
            closes: '18:00'
        },
        sameAs: [
            'https://www.linkedin.com/company/hargile',
            'https://twitter.com/hargile_agency'
        ]
    };
}

export function generateServiceSchema(serviceName, serviceUrl, domain, description) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceName,
        url: serviceUrl,
        provider: {
            '@type': 'Organization',
            name: 'HARGILE',
            url: `https://${domain}`
        },
        description: description,
        areaServed: {
            '@type': 'Country',
            name: 'France'
        }
    };
}

export function generatePortfolioItemSchema(projectName, projectUrl, domain, imageUrl, description) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: projectName,
        url: projectUrl,
        image: imageUrl,
        description: description,
        author: {
            '@type': 'Organization',
            name: 'HARGILE',
            url: `https://${domain}`
        }
    };
}

export function generateBreadcrumbSchema(breadcrumbs, domain) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: `https://${domain}${breadcrumb.url}`
        }))
    };
}
