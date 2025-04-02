"use client";

import Earth from '@/components/Earth';
import Services from "@/components/pages/services/services";
import ServicesHeader from "@/components/pages/services/service-header";

export default function ServicesPage() {
    return (
        <Earth>
            <ServicesHeader/>
            <Services/>
        </Earth>
    );
}
