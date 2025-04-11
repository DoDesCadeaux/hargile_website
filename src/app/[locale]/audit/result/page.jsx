'use client'

import { useEffect, useState } from 'react'
import GaugeChart from "@/components/pages/homepage/hero/GaugeChart";
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

    return (
        <div className="!p-8 max-w-5xl !mx-auto text-white">
            <h1 className="text-5xl font-bold !mb-6">Audit Results</h1>

            <section className="!mb-14">
                <h2 className="text-2xl font-semibold !mb-2">Your Informations</h2>
                <ul className="list-disc list-inside text-sm text-gray-300">
                    <li><strong>Name:</strong> {formData.firstName} {formData.lastName}</li>
                    <li><strong>Email:</strong> {formData.email != null ? formData.email : 'N/A'}</li>
                    <li><strong>Is it for your Company:</strong> {formData.isForOwnCompany}</li>
                    <li><strong>Industry:</strong> {formData.industry}</li>
                    <li><strong>URL:</strong> {formData.url}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-3xl font-semibold !mb-4">PageSpeed Scores</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <GaugeChart score={performanceScore} label="Performance" />
                    <GaugeChart score={seoScore} label="SEO" />
                    <GaugeChart score={accessibilityScore} label="Accessibility" />
                </div>
                <section className="!mt-6 space-y-8 text-sm text-gray-300">
                    <div>
                        <h3 className="text-2xl font-semibold text-white !mt-14">Performance</h3>
                        <p className="!mt-1">A high performance score means your website loads quickly and efficiently. This improves user experience, reduces bounce rates, and positively impacts your SEO ranking.</p>
                        {performanceScore < 90 && (
                            <p className="!mt-1 text-yellow-400">🚀 Your performance score could be improved. Let us help you optimize your loading speed, scripts, and assets.</p>
                        )}
                        <p className="!mt-1 text-gray-400">
                            Score breakdown:
                            <br /> - <span className="text-green-400">90-100 (Good)</span>: Fast, optimized, efficient. Great UX and SEO impact.
                            <br /> - <span className="text-yellow-400">50-89 (Average)</span>: Some issues affecting user experience or speed.
                            <br /> - <span className="text-red-400">0-49 (Poor)</span>: Critical performance issues that need urgent attention.
                        </p>
                        <p className="!mt-1 text-red-400">
                            A score like 82% may look okay, but it still indicates suboptimal load times or resource usage. On slower connections or mobile devices, this could mean users leave before the page loads.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">SEO</h3>
                        <p className="!mt-1">A strong SEO score ensures your website is well structured for search engines. It means your pages are crawlable, mobile-friendly, and follow best practices.</p>
                        {seoScore < 90 && (
                            <p className="!mt-1 text-yellow-400">📈 Your SEO score can be improved. We can help enhance your visibility and boost your traffic.</p>
                        )}
                        <p className="mt-1 text-gray-400">
                            Score breakdown:
                            <br /> - <span className="text-green-400">90-100 (Good)</span>: Strong structure, metadata, and crawlability.
                            <br /> - <span className="text-yellow-400">50-89 (Average)</span>: Missing tags, slow indexing potential, or weak semantic structure.
                            <br /> - <span className="text-red-400">0-49 (Poor)</span>: Major visibility issues; your site may not rank at all.
                        </p>
                        <p className="mt-1 text-red-400">
                            An SEO score below 90 may hurt your discoverability. Even 85% can mean fewer pages indexed and lost traffic to competitors.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">Accessibility</h3>
                        <p className="!mt-1">Accessibility ensures that your website can be used by people with disabilities. This not only improves your reach but also shows commitment to inclusion and can be legally important in some regions.</p>
                        {accessibilityScore < 90 && (
                            <p className="!mt-1 text-yellow-400">♿ Your accessibility score needs work. We can help make your website more inclusive and compliant.</p>
                        )}
                        <p className="mt-1 text-gray-400">
                            Score breakdown:
                            <br /> - <span className="text-green-400">90-100 (Good)</span>: Accessible for users with disabilities.
                            <br /> - <span className="text-yellow-400">50-89 (Average)</span>: May exclude some users or create poor experience for assistive tools.
                            <br /> - <span className="text-red-400">0-49 (Poor)</span>: Inaccessible, potentially non-compliant with legal standards.
                        </p>
                        <p className="mt-1 text-red-400">
                            A score under 90 often means your site isn’t accessible to everyone. This could be excluding part of your audience and pose compliance risks.
                        </p>
                    </div>
                </section>
            </section>
        </div>
    )
}