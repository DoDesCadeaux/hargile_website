"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import { ContactSection } from "./components/ContactSection";
import { ServicesSection } from "./components/ServicesSection";
import { PrivacyFooter } from "./components/PrivacyFooter";
import { Header } from "@/components/header/mainHeader";
import {
  FormContainer,
  PageWrapper,
  BackgroundBlur,
  FormGrid,
} from "./quote-request-form.styled";

export default function QuoteRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Get translations
  const t = useTranslations("pages.homepage.sections.quote-request");

  const [serviceTypes, setServiceTypes] = useState({
    webDevelopment: false,
    mobileApps: false,
    ai: false,
    cloud: false,
  });

  const toggleService = (service) => {
    setServiceTypes((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      serviceTypes: Object.keys(serviceTypes).filter(
        (key) => serviceTypes[key]
      ),
    };

  };

  return (
    <PageWrapper>
      <BackgroundBlur />

      <FormContainer>
        <Header
          title={t("title")}
          description={t("description")}
          showUnderline={true}
          showBackgroundBlur={false}
        />

        <FormGrid onSubmit={handleSubmit(onSubmit)}>
          <ContactSection
            t={t}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <ServicesSection
            t={t}
            serviceTypes={serviceTypes}
            toggleService={toggleService}
          />
        </FormGrid>

        <PrivacyFooter t={t} />
      </FormContainer>
    </PageWrapper>
  );
}
