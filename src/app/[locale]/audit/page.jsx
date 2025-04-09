"use client"

import { useState } from "react";

export default function Audit() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        url: "",
        isForOwnCompany: "",
        industry: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <div className="!p-8 space-y-8">
                <h1 className="text-12xl font-bold !mb-4">Start Your Digital Audit</h1>

                <section className="!p-6 rounded shadow">
                    <h2 className="text-4xl font-semibold !mb-8">Why Perform a Digital Audit?</h2>
                    <p className="!mb-8 text-2xl">A digital audit helps identify weaknesses in your website and provides a roadmap to improve technical performance, accessibility, security, and search engine optimization (SEO).</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li className="text-xl !mb-5"><strong>Performance:</strong> A slow-loading website increases bounce rate and frustrates users. It also negatively impacts SEO rankings. Faster websites deliver better user experience and conversions.</li>
                        <li className="text-xl !mb-5"><strong>Visibility (SEO):</strong> An optimized website structure makes it easier for search engines to crawl and index your content. This means higher rankings on Google and more traffic to your site.</li>
                        <li className="text-xl !mb-5"><strong>Security:</strong> A website lacking proper security measures is vulnerable to cyberattacks and can lose user trust, especially in e-commerce. Ensuring SSL, secure headers, and proper protection mechanisms is vital.</li>
                        <li className="text-xl !mb-5"><strong>Accessibility:</strong> An accessible website ensures everyone, including users with disabilities, can interact with your content. It's not only ethical, but also increases your potential audience and improves compliance.</li>
                        <li className="text-xl !mb-5"><strong>Mobile Optimization:</strong> More than 50% of internet traffic comes from mobile devices. A site that isn't mobile-friendly provides poor UX and is penalized by search engines.</li>
                    </ul>
                    <p className="!mt-24 text-2xl">This audit will give you a clear view of your current website status and the concrete actions needed to enhance its digital presence.</p>
                </section>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            const res = await fetch("/api/audit", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(formData),
                            });

                            const result = await res.json();

                            if (res.ok) {
                                // TODO rajouter une page, ou afficher un modal pour le resultat
                                console.log("Audit successful:", result);
                            } else {
                                console.error("Erreur:", result.message);
                            }
                        } catch (err) {
                            console.error("Erreur lors de l’appel API :", err);
                        }
                    }}
                    className="max-w-2xl mx-auto !p-6 rounded shadow space-y-4"
                >
                    <div className="!mb-6">
                        <label className="block !mb-2 text-xl">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border !px-3 !py-2 rounded"
                            required
                        />
                    </div>

                    <div className="!mb-6">
                        <label className="block !mb-2 text-xl">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border !px-3 !py-2 rounded"
                            required
                        />
                    </div>

                    <div className="!mb-6">
                        <label className="block !mb-2 text-xl">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border !px-3 !py-2 rounded"
                            required
                        />
                    </div>

                    <div className="!mb-6">
                        <label className="block !mb-2 text-xl">Website URL</label>
                        <input
                            type="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full border !px-3 !py-2 rounded"
                            placeholder="https://yoursite.com"
                            required
                        />
                    </div>

                    <div className="!mb-6">
                        <label className="block !mb-2 text-xl">Is this for your own company?</label>
                        <select
                            name="isForOwnCompany"
                            value={formData.isForOwnCompany}
                            onChange={handleChange}
                            className="w-full border !px-3 !py-2 rounded"
                            required
                        >
                            <option value="">-- Select --</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="!mb-6">
                        <label className="block !mb-2 text-xl">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="e.g., E-commerce, Education..."
                            required
                        />
                    </div>

                    <button type="submit" className="bg-green-600 text-white !px-6 !py-3 rounded !mt-4">
                        Start Audit
                    </button>
                </form>
            </div>
            <hr/>
            <br/>
        </div>
    );
}