"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ContactSection } from "@/components/pages/contact/components/ContactSection";
import { ServicesSection } from "@/components/pages/contact/components/ServicesSection";
import { PrivacyFooter } from "@/components/pages/contact/components/PrivacyFooter";
import { SocialMedia } from "@/components/pages/contact/components/SocialMedia";
import { Header } from "@/components/header/mainHeader";
import styled from "styled-components";
import {
  FormContainer,
  PageWrapper,
  BackgroundBlur,
} from "@/components/pages/homepage/quote-request/quote-request-form.styled";

// Create a new grid component that doesn't use a form element
const ContactFormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 70% 30%;
  }
`;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get translations from the contact page section
  const t = useTranslations("pages.contact");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add your form submission logic here
  };

  return (
    <PageWrapper>
      <BackgroundBlur />
      <FormContainer>
        <Header
          title={t("title")}
          subtitleRegular={t("subtitle.part1")}
          subtitleHighlight={t("subtitle.part2")}
          description={t("description")}
          showUnderline={true}
          showBackgroundBlur={false}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContactFormGrid>
            <ContactSection t={t} register={register} errors={errors} />
            <ServicesSection t={t} />
          </ContactFormGrid>
          <PrivacyFooter t={t} />
        </form>

        {/* Social Media section */}
        <SocialMedia />
      </FormContainer>
    </PageWrapper>
  );
}
