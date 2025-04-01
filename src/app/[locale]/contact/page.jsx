"use client";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { ContactSection } from "@/components/pages/contact/components/ContactSection";
import { ServicesSection } from "@/components/pages/contact/components/ServicesSection";
import { PrivacyFooter } from "@/components/pages/contact/components/PrivacyFooter";
import { Header } from "@/components/header/mainHeader";
import {
  FormContainer,
  PageWrapper,
  BackgroundBlur,
  FormGrid,
} from "@/components/pages/homepage/quote-request/quote-request-form.styled";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
          <FormGrid>
            <ContactSection
              t={t}
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
            <ServicesSection t={t} />
          </FormGrid>
          <PrivacyFooter t={t} />
        </form>
      </FormContainer>
    </PageWrapper>
  );
}
