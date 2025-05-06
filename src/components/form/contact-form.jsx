import {useTranslations} from "next-intl";
import {useState} from "react";
import {Header} from "@/components/header/mainHeader";
import {
    BackgroundBlur,
    FormContainer,
    FormGrid,
    PageWrapper
} from "@/components/pages/homepage/quote-request/quote-request-form.styled";
import {ContactSection} from "@/components/pages/homepage/quote-request/components/ContactSection";
import {ServicesSection} from "@/components/pages/homepage/quote-request/components/ServicesSection";
import {PrivacyFooter} from "@/components/pages/homepage/quote-request/components/PrivacyFooter";
import {useForm} from "react-hook-form";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
    } = useForm();

// Get translations
    const t = useTranslations("components.contact-form");

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
            <BackgroundBlur/>

            <FormContainer>
                <Header
                    title={t("title")}
                    titleAs={'h2'}
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

                <PrivacyFooter t={t}/>
            </FormContainer>
        </PageWrapper>
    )
}
