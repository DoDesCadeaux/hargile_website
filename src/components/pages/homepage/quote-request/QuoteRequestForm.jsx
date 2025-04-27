"use client";
import {BackgroundBlur, PageWrapper,} from "./quote-request-form.styled";
import ContactForm from "@/components/form/contact-form";

export default function QuoteRequestForm() {
    return (
        <PageWrapper>
            <BackgroundBlur/>
            <ContactForm/>
        </PageWrapper>
    );
}
