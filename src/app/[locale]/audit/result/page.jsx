'use client'

import { useEffect, useState } from 'react'

export default function AuditResultPage() {
    const [formData, setFormData] = useState(null)
    const [auditData, setAuditData] = useState(null)

    useEffect(() => {
        const savedForm = localStorage.getItem('auditFormData')
        const savedAudit = localStorage.getItem('auditResult')

        console.log("Formulaire Sauvegardé : ", savedForm);

        if (savedForm && savedAudit) {
            setFormData(JSON.parse(savedForm))
            setAuditData(JSON.parse(savedAudit))
        }
    }, [])

    if (!formData || !auditData) {
        return <div className="text-center text-white !p-10">Loading audit results...</div>
    }

    const performanceScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.performance?.score * 100);
    const seoScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.seo?.score * 100);
    const accessibilityScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.accessibility?.score * 100);

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-500';
    };

    return (
        <div className="!p-8 max-w-5xl mx-auto text-white ">
            <h1 className="text-3xl font-bold !mb-6">Audit Results</h1>

            <section className="!mb-8">
                <h2 className="text-xl font-semibold !mb-2">Your Informations</h2>
                <ul className="list-disc list-inside text-sm text-gray-300">
                    <li><strong>Name:</strong> {formData.firstName} {formData.lastName}</li>
                    <li><strong>Email:</strong> {formData.email != null ? formData.email : 'N/A'}</li>
                    <li><strong>Company:</strong> {formData.isForOwnCompany}</li>
                    <li><strong>Industry:</strong> {formData.industry}</li>
                    <li><strong>URL:</strong> {formData.url}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold !mb-2">PageSpeed Scores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                    <div className="bg-gray-800 rounded !p-4 text-center">
                        <p className="text-lg">Performance</p>
                        <p className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>
                            {performanceScore}%
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded !p-4 text-center">
                        <p className="text-lg">SEO</p>
                        <p className={`text-2xl font-bold ${getScoreColor(seoScore)}`}>
                            {seoScore}%
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded !p-4 text-center">
                        <p className="text-lg">Accessibility</p>
                        <p className={`text-2xl font-bold ${getScoreColor(accessibilityScore)}`}>
                            {accessibilityScore}%
                        </p>
                    </div>
                </div>
                <section className="mt-6 space-y-8 text-sm text-gray-300">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Performance</h3>
                        <p className="mt-1">A high performance score means your website loads quickly and efficiently. This improves user experience, reduces bounce rates, and positively impacts your SEO ranking.</p>
                        {performanceScore < 90 && (
                            <p className="mt-1 text-yellow-400">🚀 Your performance score could be improved. Let us help you optimize your loading speed, scripts, and assets.</p>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">SEO</h3>
                        <p className="mt-1">A strong SEO score ensures your website is well structured for search engines. It means your pages are crawlable, mobile-friendly, and follow best practices.</p>
                        {seoScore < 90 && (
                            <p className="mt-1 text-yellow-400">📈 Your SEO score can be improved. We can help enhance your visibility and boost your traffic.</p>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">Accessibility</h3>
                        <p className="mt-1">Accessibility ensures that your website can be used by people with disabilities. This not only improves your reach but also shows commitment to inclusion and can be legally important in some regions.</p>
                        {accessibilityScore < 90 && (
                            <p className="mt-1 text-yellow-400">♿ Your accessibility score needs work. We can help make your website more inclusive and compliant.</p>
                        )}
                    </div>
                </section>
            </section>
        </div>
    )
}