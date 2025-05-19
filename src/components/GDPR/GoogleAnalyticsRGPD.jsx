'use client'

import { useEffect } from 'react'
import { useGDPR } from './GDPRManager'

export default function GoogleAnalyticsRGPD({ gaId = "G-X6GHW8D74X" }) {
    const { isConsentGiven } = useGDPR()
    const analyticsConsent = isConsentGiven('analytics')

    useEffect(() => {
        if (!analyticsConsent) return

        const loadGA = () => {
            const script = document.createElement('script')
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
            script.async = true
            document.head.appendChild(script)

            window.dataLayer = window.dataLayer || []

            function gtag() {
                window.dataLayer.push(arguments)
            }

            gtag('js', new Date())

            gtag('config', gaId, {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                cookie_expires: 2592000,
                cookie_domain: window.location.hostname,
                cookie_flags: 'SameSite=None;Secure'
            })
        }

        loadGA()

        return () => {
            window.dataLayer = undefined
            const scripts = document.querySelectorAll(`script[src*="googletagmanager.com/gtag"]`)
            scripts.forEach(script => script.remove())
        }
    }, [analyticsConsent, gaId])

    return null
}
