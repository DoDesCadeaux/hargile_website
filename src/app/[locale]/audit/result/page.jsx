'use client'

import {useEffect, useState} from 'react'
import GaugeChart from "@/components/pages/homepage/hero/GaugeChart";

export default function AuditResultPage() {
    const [showCalendar, setShowCalendar] = useState(false);
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
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900/70">
                <div className="flex flex-col items-center space-y-4">
                    <div
                        className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white text-xl font-medium">Loading audit results...</p>
                </div>
            </div>
        )
    }

    const performanceScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.performance?.score * 100);
    const seoScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.seo?.score * 100);
    const accessibilityScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.accessibility?.score * 100);
    const bestPracticeScore = Math.round(auditData.auditResults.lighthouseResult?.categories?.["best-practices"]?.score * 100);

    return (
        <div className="min-h-screen bg-gradient-to-b text-white container !mx-auto">
            <div className="max-w-6xl mx-auto !px-4 !py-12 sm:!px-6 lg:!px-8 container">
                {/* Header with glass effect */}
                <div
                    className="backdrop-blur-md bg-gray-900/70 rounded-xl !p-8 !mb-10 border border-gray-800 shadow-xl">
                    <div className="flex items-center !mb-6">
                        <div className="!mr-4 h-12 w-12 rounded-full  flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold  text-transparent bg-clip-text">Audit Results</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div className="space-y-3 container !mx-auto">
                            <h2 className="text-xl font-semibold text-violet-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 !mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Your Information
                            </h2>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center">
                                    <span className="w-32 text-gray-400">Name:</span>
                                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-32 text-gray-400">Email:</span>
                                    <span
                                        className="font-medium">{formData.email != null ? formData.email : 'N/A'}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-32 text-gray-400">For Company:</span>
                                    <span className="font-medium">{formData.isForOwnCompany}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-32 text-gray-400">Industry:</span>
                                    <span className="font-medium">{formData.industry}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-xl font-semibold text-violet-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 !mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                </svg>
                                Website
                            </h2>
                            <div className="flex items-center">
                                <span className="w-32 text-gray-400">URL:</span>
                                <a href={formData.url} target="_blank" rel="noopener noreferrer"
                                   className="font-medium text-violet-400 hover:text-violet-300 transition-colors truncate">
                                    {formData.url}
                                </a>
                            </div>
                            <div className="!mt-6 flex">
                                <button
                                    className="flex items-center bg-violet-600 hover:bg-violet-700 !px-4 !py-2 rounded-md transition-colors text-sm font-medium cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 !mr-2 !my-1" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                    </svg>
                                    Download Full Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Cards */}
                <div className="!mb-12">
                    <div className="flex items-center !mb-6">
                        <h2 className="text-3xl font-bold">Audit Scores</h2>
                        <div
                            className="!ml-4 !px-3 !py-1 !mb-3 bg-violet-600/20 rounded-full border border-violet-600 text-violet-400 text-sm font-medium">
                            Lighthouse v7
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {score: performanceScore, label: "Performance", icon: "M13 10V3L4 14h7v7l9-11h-7z"},
                            {score: seoScore, label: "SEO", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"},
                            {
                                score: accessibilityScore,
                                label: "Accessibility",
                                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            },
                            {
                                score: bestPracticeScore,
                                label: "Best Practices",
                                icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            },
                        ].map((item, index) => (
                            <div key={index}
                                 className="backdrop-blur-md bg-gray-900/60 rounded-xl !p-6 border border-gray-800 shadow-lg transition-transform hover:transform hover:scale-105">
                                <div className="flex justify-between items-center !mb-4">
                                    <div className="flex items-center content-center">
                                        <div
                                            className="!mr-3 h-8 w-8 rounded-md bg-violet-600/20 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400"
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d={item.icon}/>
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white !pt-5">{item.label}</h3>
                                    </div>
                                    <div className={`text-sm font-medium !px-3 !py-2 rounded-full border ${
                                        item.score >= 90 ? 'bg-green-500/20 text-green-400' :
                                            item.score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                    }`}>
                                        {item.score >= 90 ? 'Good' : item.score >= 50 ? 'Average' : 'Poor'}
                                    </div>
                                </div>

                                <div className="flex justify-center !my-4">
                                    <GaugeChart score={item.score} label={item.label}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Analysis */}
                <div className="space-y-8">
                    {[
                        {
                            title: "Performance",
                            score: performanceScore,
                            description: "A high performance score means your website loads quickly and efficiently. This improves user experience, reduces bounce rates, and positively impacts your SEO ranking.",
                            warning: performanceScore < 90 && "🚀 Your performance score could be improved. Let us help you optimize your loading speed, scripts, and assets.",
                            icon: "M13 10V3L4 14h7v7l9-11h-7z"
                        },
                        {
                            title: "SEO",
                            score: seoScore,
                            description: "A strong SEO score ensures your website is well structured for search engines. It means your pages are crawlable, mobile-friendly, and follow best practices.",
                            warning: seoScore < 90 && "📈 Your SEO score can be improved. We can help enhance your visibility and boost your traffic.",
                            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        },
                        {
                            title: "Accessibility",
                            score: accessibilityScore,
                            description: "Accessibility ensures that your website can be used by people with disabilities. This not only improves your reach but also shows commitment to inclusion and can be legally important in some regions.",
                            warning: accessibilityScore < 90 && "♿ Your accessibility score needs work. We can help make your website more inclusive and compliant.",
                            icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        },
                        {
                            title: "Best Practices",
                            score: bestPracticeScore,
                            description: "Best Practices refer to modern web development techniques that ensure your site runs reliably and securely. This includes avoiding deprecated APIs, using HTTPS, ensuring correct image aspect ratios, and more.",
                            warning: bestPracticeScore < 90 && "🛡️ Your site doesn't follow all best practices. Let's address outdated code, insecure endpoints, or minor implementation flaws.",
                            icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        }
                    ].map((section, index) => (
                        <div key={index}
                             className="backdrop-blur-md bg-gray-900/60 rounded-xl !p-6 border border-gray-800 shadow-lg !my-5">
                            <div className="flex items-center !mb-4">
                                <div
                                    className="!mr-3 h-10 w-10 rounded-md bg-violet-600/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-400"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d={section.icon}/>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold !my-2">{section.title}</h3>
                                <div className={`!ml-auto text-lg font-bold ${
                                    section.score >= 90 ? 'text-green-400' :
                                        section.score >= 50 ? 'text-yellow-400' :
                                            'text-red-400'
                                }`}>
                                    {section.score}%
                                </div>
                            </div>

                            <p className="text-gray-300 !mb-4">{section.description}</p>

                            {section.warning && (
                                <div className="!mb-4 !p-3 rounded-md bg-yellow-900/20 border border-yellow-800">
                                    <p className="text-yellow-400 !my-2">{section.warning}</p>
                                </div>
                            )}

                            <div className="bg-gray-800/50 rounded-md !p-4 text-sm space-y-4">
                                <p className="text-gray-400 font-medium !mb-2">Score breakdown:</p>

                                {section.title === "Performance" && (
                                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                        <li>90-100 (Good): Your site loads extremely fast, with optimized assets,
                                            minimal main-thread work, and reduced TTI.
                                        </li>
                                        <li>50-89 (Average): Room for improvement in script execution time, image
                                            optimization, or render-blocking resources.
                                        </li>
                                        <li>0-49 (Poor): Users likely face long load times, jank, or unresponsive pages
                                            — especially on mobile.
                                        </li>
                                    </ul>
                                )}

                                {section.title === "SEO" && (
                                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                        <li>90-100 (Good): Well-structured HTML, mobile-friendly design, meta tags
                                            correctly used, good crawlability.
                                        </li>
                                        <li>50-89 (Average): Minor issues like missing meta tags or some mobile
                                            usability flaws.
                                        </li>
                                        <li>0-49 (Poor): Major problems like missing titles, broken links, or poor
                                            mobile optimization.
                                        </li>
                                    </ul>
                                )}

                                {section.title === "Accessibility" && (
                                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                        <li>90-100 (Good): Complies with WCAG guidelines, keyboard navigation works,
                                            color contrast is appropriate.
                                        </li>
                                        <li>50-89 (Average): Some elements are inaccessible (e.g. missing labels, poor
                                            contrast, etc.).
                                        </li>
                                        <li>0-49 (Poor): Major issues preventing use by people with disabilities. Legal
                                            compliance risks.
                                        </li>
                                    </ul>
                                )}

                                {section.title === "Best Practices" && (
                                    <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                        <li>90-100 (Good): Secure HTTPS setup, no deprecated APIs, good coding
                                            practices.
                                        </li>
                                        <li>50-89 (Average): Some deprecated methods, inefficient resource loading,
                                            minor security flags.
                                        </li>
                                        <li>0-49 (Poor): Usage of insecure libraries, unoptimized code, or unsafe
                                            requests.
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <div className="!mt-4 !p-3 rounded-md bg-red-900/20 border border-red-800">
                                <p className="text-red-400 text-sm !my-2">
                                    A score like {section.score < 90 ? section.score : 82}% may look okay, but it still
                                    indicates
                                    {section.title === "Performance" ? " suboptimal load times or resource usage. On slower connections or mobile devices, this could mean users leave before the page loads." :
                                        section.title === "SEO" ? " fewer pages indexed and lost traffic to competitors." :
                                            " your site isn't accessible to everyone. This could be excluding part of your audience and pose compliance risks."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div
                    className="!mt-12 backdrop-blur-md bg-violet-600/10 rounded-xl !p-8 border border-violet-800/50 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="!mb-6 md:!mb-0">
                            <h3 className="text-2xl font-bold text-white !mb-2">Want to improve your scores?</h3>
                            <p className="text-violet-300">Our team of experts can help optimize your website for better
                                performance, SEO, and accessibility.</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowCalendar(true)}
                                className="bg-white text-violet-900 hover:bg-gray-100 !px-6 !py-3 !mx-2 rounded-md font-medium transition-colors cursor-pointer"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showCalendar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                     onClick={() => setShowCalendar(false)}>
                    <div
                        className="bg-violet-600/10 border border-violet-800/50 rounded-lg shadow-xl max-w-3xl w-full !mx-4 !p-4"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center !mb-4">
                            <h3 className="text-xl font-semibold text-violet-900">Book a meeting with our team</h3>
                            <button onClick={() => setShowCalendar(false)}
                                    className="text-gray-400 text-lg cursor-pointer">✕
                            </button>
                        </div>
                        <iframe
                            src={`https://calendly.com/worldwidenine/digital-audit-meeting?hide_event_type_details=1&hide_gdpr_banner=1&background_color=403749&text_color=ffffff&primary_color=C183EB&name=${encodeURIComponent(`${formData.firstName} ${formData.lastName}`)}&email=${encodeURIComponent(formData.email || '')}&a1=${encodeURIComponent(formData.url)}&a2=${encodeURIComponent(performanceScore)}%25&a3=${encodeURIComponent(accessibilityScore)}%25&a4=${encodeURIComponent(seoScore)}%25&a5=${encodeURIComponent(bestPracticeScore)}%25`}
                            width="100%"
                            height="475"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}