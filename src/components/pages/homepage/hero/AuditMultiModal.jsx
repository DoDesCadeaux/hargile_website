'use client'

import {Fragment, useState} from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'

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
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNext = () => setStep((prev) => prev + 1)
    const handleBack = () => setStep((prev) => prev - 1)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const result = await res.json()
            console.log(result)

            // Simuler un délai de transition visuelle
            setTimeout(() => {
                setLoading(false)
                setSubmitted(true)
            }, 1500);
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    return (
        //Todo Mettre l'URL de l'audit, une fois l'URL entrée, proceder en arrière plan l'audit. Et pendant ce temps là laisser l'user remplir les inputs
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center !p-4">
                <DialogPanel className="w-full max-w-xl rounded !p-6 shadow-xl border border-gray-200 bg-gray-900">
                    <DialogTitle className="text-lg font-semibold text-gray-900 !mb-4">
                        {step === 1 && 'Enter your contact info to proceed the Audit'}
                        {step === 2 && 'Tell us about your website'}
                        {step === 3 && !loading && !submitted && 'Confirm and submit'}
                    </DialogTitle>

                    {!loading && !submitted && (
                      <>
                        <Transition
                            as="div"
                            show={step === 1}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {step === 1 && (
                                <div className="space-y-4">
                                    <input name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} className="w-full border !px-3 !py-2 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                                    <input name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} className="w-full border !px-3 !py-2 !my-3 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                                    <input name="email" value={formData.email} type="email" placeholder="Email" onChange={handleChange} className="w-full border !px-3 !py-2 !mb-6 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                                    <div className="flex justify-end">
                                        <button onClick={handleNext} className="bg-violet-500 text-white !px-4 !py-2 rounded cursor-pointer hover:bg-violet-800">Next</button>
                                    </div>
                                </div>
                            )}
                        </Transition>

                        <Transition
                            as="div"
                            show={step === 2}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {step === 2 && (
                                <div className="space-y-4">
                                    <input name="url" value={formData.url} placeholder="Website URL" onChange={handleChange} className="w-full border !px-3 !py-2 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                                    <select name="isForOwnCompany" value={formData.isForOwnCompany} onChange={handleChange} className="w-full border !px-3 !py-2 !my-3 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500">
                                        <option value="">Is this for your company?</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <input name="industry" value={formData.industry} placeholder="Industry" onChange={handleChange} className="w-full border !px-3 !py-2 !mb-6 rounded focus:outline-2 focus:outline-offset-2 focus:outline-violet-500" />
                                    <div className="flex justify-between">
                                        <button onClick={handleBack} className="text-white bg-gray-500 !px-4 !py-2 rounded cursor-pointer">Back</button>
                                        <button onClick={handleNext} className="bg-violet-500 text-white !px-4 !py-2 rounded cursor-pointer hover:bg-violet-800">Next</button>
                                    </div>
                                </div>
                            )}
                        </Transition>

                        <Transition
                            as="div"
                            show={step === 3 && !loading}
                            enter="transition-opacity duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {step === 3 && (
                                <div className="space-y-4">
                                    <p className="text-md text-white">Please confirm your information before submitting:</p>
                                    <ul className="text-md text-white space-y-1">
                                        {Object.entries(formData).map(([key, val]) => (
                                            <li key={key}><strong>{key}:</strong> {val}</li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-between">
                                        <button onClick={handleBack} className="text-white bg-gray-500 !px-4 !py-2 rounded cursor-pointer">Back</button>
                                        <button onClick={handleSubmit} className="bg-green-600 text-white !px-4 !py-2 rounded cursor-pointer">Submit</button>
                                    </div>
                                </div>
                            )}
                        </Transition>
                      </>
                    )}

                    <Transition
                        as="div"
                        show={loading}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                      <div className="flex flex-col items-center space-y-4 !py-8">
                        <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <p className="text-white text-md">Audit in progress... Please wait a moment</p>
                          <p className="text-white text-md">Loading may take up to one minute</p>
                      </div>
                    </Transition>

                    <Transition
                        as="div"
                        show={submitted}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="space-y-4 text-center">
                            <h3 className="text-lg text-white font-semibold">Audit completed</h3>
                            <p className="text-white">Your audit results are now available. Click below to view them.</p>
                            <a href="/audit/result" className="inline-block bg-violet-600 text-white !px-4 !py-2 rounded hover:bg-violet-800">
                                View Results
                            </a>
                        </div>
                    </Transition>
                </DialogPanel>
            </div>
        </Dialog>
    )
}