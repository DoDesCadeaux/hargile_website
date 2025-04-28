"use client";

import {BackgroundBlur, PageWrapper} from "@/components/pages/homepage/quote-request/quote-request-form.styled";
import ContactForm from "@/components/form/contact-form";

export default function ContactPage() {
    return (
        <PageWrapper>
            <BackgroundBlur/>
            <ContactForm/>
        </PageWrapper>
    );
}
