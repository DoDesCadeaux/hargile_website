'use client'

import {Fragment, useState, useEffect} from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function AuditMultiModal({ onClose }) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        url: '',
        isForOwnCompany: '',
        industry: '',
    })
    const [loading, setLoading] = useState(false)
    const [isFormComplete, setIsFormComplete] = useState(false)

    useEffect(() => {
        const { firstName, lastName, email, isForOwnCompany, industry } = formData
        setIsFormComplete(!!(firstName && lastName && email && isForOwnCompany && industry))
    }, [formData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleStartAudit = async () => {
        setLoading(true);
        setStep(2);

        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: formData.url }),
            });
            const result = await res.json();

            localStorage.setItem('auditResult', JSON.stringify(result));

            console.log('Audit terminé', result);
            setLoading(false);
        } catch (err) {
            console.error('Erreur Audit', err);
            setLoading(false);
        }
    }

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center !p-4">
                <DialogPanel className="w-full max-w-xl rounded !p-6 shadow-xl border border-gray-200 bg-gray-900">
                    <DialogTitle className="text-lg font-semibold text-gray-900 !mb-4">
                        {step === 1 && 'Enter your website URL to proceed the Audit'}
                        {step === 2 && 'Enter your contact info'}
                    </DialogTitle>

                    <Fragment>
                        {step === 1 && (
                          <div className="space-y-4">
                              <input
                                  name="url"
                                  value={formData.url}
                                  onChange={handleChange}
                                  placeholder="Website URL"
                                  className="w-full border !px-3 !py-2 !mb-4 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500"
                              />
                              <div className="flex justify-end">
                                  <button onClick={handleStartAudit} className="bg-violet-500 text-white !px-4 !py-2 rounded cursor-pointer hover:bg-violet-800">Next</button>
                              </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-4 mt-6">
                            <div className="text-sm text-white flex items-center gap-2 !mb-4">
                              {loading ? (
                                <>
                                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                  </svg>
                                  Audit in progress... You can fill the form while we process the analysis.
                                </>
                              ) : (
                                <span className="text-green-400 font-medium">✅ Audit ready!</span>
                              )}
                            </div>
                            <input name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} className="w-full border !px-3 !py-2 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                            <input name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} className="w-full border !px-3 !py-2 !my-3 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                            <input name="email" value={formData.email} type="email" placeholder="Email" onChange={handleChange} className="w-full border !px-3 !py-2 !mb-6 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                            <select name="isForOwnCompany" value={formData.isForOwnCompany} onChange={handleChange} className="w-full border !px-3 !py-2 !my-3 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500">
                                <option value="">Is this for your company?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <input name="industry" value={formData.industry} placeholder="Industry" onChange={handleChange} className="w-full border !px-3 !py-2 !mb-6 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                            <div className="text-center">
                              <button
                                disabled={!isFormComplete || loading}
                                onClick={() => {
                                  if (!loading && isFormComplete) {
                                    localStorage.setItem('auditFormData', JSON.stringify(formData));
                                    window.location.href = '/audit/result';
                                  }
                                }}
                                className={`!mt-4 !px-6 !py-2 rounded text-white font-semibold ${
                                  !isFormComplete || loading
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                                }`}
                              >
                                Get Audit Results
                              </button>
                              {(!isFormComplete || loading) && (
                                <div className="!mt-4 text-sm text-yellow-300 animate-pulse">
                                  ⚠️ Please wait for the audit to complete before accessing results.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </Fragment>
                </DialogPanel>
            </div>
        </Dialog>
    )
}