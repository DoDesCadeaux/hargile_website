'use client'

import GDPRManager from "./GDPRManager";
import GoogleAnalyticsRGPD from "./GoogleAnalyticsRGPD";

export default function ClientGDPRWrapper() {
    return (
        <GDPRManager>
            <GoogleAnalyticsRGPD gaId="G-X6GHW8D74X"/>
        </GDPRManager>
    );
}
