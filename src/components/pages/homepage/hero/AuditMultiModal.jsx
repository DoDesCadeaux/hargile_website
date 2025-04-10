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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNext = () => setStep((prev) => prev + 1)
    const handleBack = () => setStep((prev) => prev - 1)

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const result = await res.json()
            console.log(result)
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center !p-4">
                <DialogPanel className="w-full max-w-xl rounded !p-6 shadow-xl border border-gray-200 bg-gray-900">
                    <DialogTitle className="text-lg font-semibold text-gray-900 !mb-4">
                        {step === 1 && 'Enter your contact info to proceed the Audit'}
                        {step === 2 && 'Tell us about your website'}
                        {step === 3 && 'Confirm and submit'}
                    </DialogTitle>

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
                        show={step === 3}
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
                </DialogPanel>
            </div>
        </Dialog>
    )
}