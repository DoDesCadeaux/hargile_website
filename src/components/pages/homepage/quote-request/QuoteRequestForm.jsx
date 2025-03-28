"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import { Transition } from "@headlessui/react";
import { useTranslations, useLocale } from "next-intl";
import {
  FormContainer,
  PageWrapper,
  HeaderSection,
  PageTitle,
  TitleUnderline,
  SubTitle,
  Description,
  FormGrid,
  ContactInfoColumn,
  SectionTitle,
  FormGroup,
  InputLabel,
  RequiredMark,
  Input,
  TextArea,
  SelectButton,
  DropdownContainer,
  DropdownItem,
  ServiceTypesColumn,
  ServiceDescription,
  CheckboxContainer,
  Checkbox,
  CheckMark,
  CheckboxLabel,
  SubmitButton,
  PrivacyNote,
  PrivacyLink,
  RequiredNote,
  BackgroundBlur,
  LanguageSwitcher,
} from "./quote-request-form.styled";

export default function QuoteRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Get current locale and translations
  const locale = useLocale();
  const t = useTranslations("pages.homepage.sections.quote-request");

  const [serviceTypes, setServiceTypes] = useState({
    webDevelopment: false,
    mobileApps: false,
    ai: false,
    cloud: false,
  });

  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      serviceTypes: Object.keys(serviceTypes).filter(
        (key) => serviceTypes[key]
      ),
    };

    console.log("Form submitted:", formData);
    // Here you would normally send this data to your API
  };

  const toggleService = (service) => {
    setServiceTypes((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  const toggleBudgetDropdown = () => {
    setIsBudgetOpen(!isBudgetOpen);
  };

  const toggleTimelineDropdown = () => {
    setIsTimelineOpen(!isTimelineOpen);
  };

  return (
    <PageWrapper>
      <BackgroundBlur />

      <FormContainer>
        {/* Header */}
        <HeaderSection>
          <PageTitle>{t("title")}</PageTitle>
          <TitleUnderline />

          <SubTitle>
            <span>{t("subtitle.part1")}</span>
            <br /> {t("subtitle.part2")}
          </SubTitle>

          <Description>{t("description")}</Description>
        </HeaderSection>

        {/* Form */}
        <FormGrid onSubmit={handleSubmit(onSubmit)}>
          {/* Left Column - Contact Information */}
          <ContactInfoColumn>
            <SectionTitle>{t("contact.title")}</SectionTitle>

            <FormGroup>
              <InputLabel htmlFor="name">
                {t("contact.name")} <RequiredMark>*</RequiredMark>
              </InputLabel>
              <Input
                id="name"
                type="text"
                hasError={errors.name}
                {...register("name", { required: true })}
              />
            </FormGroup>

            <FormGroup>
              <InputLabel htmlFor="email">
                {t("contact.email")} <RequiredMark>*</RequiredMark>
              </InputLabel>
              <Input
                id="email"
                type="email"
                hasError={errors.email}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
            </FormGroup>

            <FormGroup>
              <InputLabel htmlFor="phone">{t("contact.phone")}</InputLabel>
              <Input id="phone" type="tel" {...register("phone")} />
            </FormGroup>

            <FormGroup>
              <InputLabel htmlFor="description">
                {t("contact.projectDescription")} <RequiredMark>*</RequiredMark>
              </InputLabel>
              <TextArea
                id="description"
                rows={5}
                hasError={errors.description}
                {...register("description", { required: true })}
              />
            </FormGroup>

            <FormGroup className="grid-cols-2">
              <div>
                <InputLabel htmlFor="budget">
                  {t("contact.budget.label")}
                </InputLabel>
                <div className="relative">
                  <SelectButton
                    type="button"
                    hasError={errors.budget}
                    onClick={toggleBudgetDropdown}
                  >
                    <span className="text-content">
                      {watch("budget")
                        ? getBudgetLabel(watch("budget"), t)
                        : t("contact.budget.select")}
                    </span>

                    <span className="icon">
                      {isBudgetOpen ? (
                        <ChevronUp className="icon-up" />
                      ) : (
                        <ChevronDown className="icon-down" />
                      )}
                    </span>
                  </SelectButton>

                  <Transition
                    show={isBudgetOpen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <DropdownContainer>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "< 5000");
                          toggleBudgetDropdown();
                        }}
                      >
                        {t("contact.budget.less5k")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "5000-10000");
                          toggleBudgetDropdown();
                        }}
                      >
                        {t("contact.budget.5kTo10k")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "10000-25000");
                          toggleBudgetDropdown();
                        }}
                      >
                        {t("contact.budget.10kTo25k")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "25000-50000");
                          toggleBudgetDropdown();
                        }}
                      >
                        {t("contact.budget.25kTo50k")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "> 50000");
                          toggleBudgetDropdown();
                        }}
                      >
                        {t("contact.budget.more50k")}
                      </DropdownItem>
                    </DropdownContainer>
                  </Transition>
                  <input
                    type="hidden"
                    {...register("budget", { required: "Budget is required" })}
                  />
                </div>
                {errors.budget && (
                  <p className="error-message">{errors.budget.message}</p>
                )}
              </div>

              <div>
                <InputLabel htmlFor="timeline">
                  {t("contact.timeline.label")}
                </InputLabel>
                <div className="relative">
                  <SelectButton
                    type="button"
                    hasError={errors.timeline}
                    onClick={toggleTimelineDropdown}
                  >
                    <span className="text-content">
                      {watch("timeline")
                        ? getTimelineLabel(watch("timeline"), t)
                        : t("contact.timeline.select")}
                    </span>
                    <span className="icon">
                      {isTimelineOpen ? (
                        <ChevronUp className="icon-up" />
                      ) : (
                        <ChevronDown className="icon-down" />
                      )}
                    </span>
                  </SelectButton>

                  <Transition
                    show={isTimelineOpen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <DropdownContainer>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "< 1month");
                          toggleTimelineDropdown();
                        }}
                      >
                        {t("contact.timeline.less1month")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "1-3months");
                          toggleTimelineDropdown();
                        }}
                      >
                        {t("contact.timeline.1To3months")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "3-6months");
                          toggleTimelineDropdown();
                        }}
                      >
                        {t("contact.timeline.3To6months")}
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "> 6months");
                          toggleTimelineDropdown();
                        }}
                      >
                        {t("contact.timeline.more6months")}
                      </DropdownItem>
                    </DropdownContainer>
                  </Transition>
                  <input
                    type="hidden"
                    {...register("timeline", {
                      required: "Timeline is required",
                    })}
                  />
                </div>
                {errors.timeline && (
                  <p className="error-message">{errors.timeline.message}</p>
                )}
              </div>
            </FormGroup>
          </ContactInfoColumn>

          {/* Right Column - Service Types */}
          <ServiceTypesColumn>
            <SectionTitle>{t("services.title")}</SectionTitle>
            <ServiceDescription>{t("services.description")}</ServiceDescription>

            <div className="service-options">
              <CheckboxContainer
                style={{
                  "--bg-color": serviceTypes.webDevelopment
                    ? "rgba(59, 130, 246, 0.1)"
                    : "transparent",
                  "--bg-hover-color": "rgba(59, 130, 246, 0.15)",
                }}
                onClick={() => toggleService("webDevelopment")}
              >
                <Checkbox
                  type="button"
                  checked={serviceTypes.webDevelopment}
                  color="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleService("webDevelopment");
                  }}
                >
                  {serviceTypes.webDevelopment && (
                    <CheckMark
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </CheckMark>
                  )}
                </Checkbox>
                <CheckboxLabel>{t("services.webDevelopment")}</CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer
                style={{
                  "--bg-color": serviceTypes.mobileApps
                    ? "rgba(139, 92, 246, 0.1)"
                    : "transparent",
                  "--bg-hover-color": "rgba(139, 92, 246, 0.15)",
                }}
                onClick={() => toggleService("mobileApps")}
              >
                <Checkbox
                  type="button"
                  checked={serviceTypes.mobileApps}
                  color="purple"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleService("mobileApps");
                  }}
                >
                  {serviceTypes.mobileApps && (
                    <CheckMark
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </CheckMark>
                  )}
                </Checkbox>
                <CheckboxLabel>{t("services.mobileApps")}</CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer
                style={{
                  "--bg-color": serviceTypes.ai
                    ? "rgba(236, 72, 153, 0.1)"
                    : "transparent",
                  "--bg-hover-color": "rgba(236, 72, 153, 0.15)",
                }}
                onClick={() => toggleService("ai")}
              >
                <Checkbox
                  type="button"
                  checked={serviceTypes.ai}
                  color="pink"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleService("ai");
                  }}
                >
                  {serviceTypes.ai && (
                    <CheckMark
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </CheckMark>
                  )}
                </Checkbox>
                <CheckboxLabel>{t("services.ai")}</CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer
                style={{
                  "--bg-color": serviceTypes.cloud
                    ? "rgba(20, 184, 166, 0.1)"
                    : "transparent",
                  "--bg-hover-color": "rgba(20, 184, 166, 0.15)",
                }}
                onClick={() => toggleService("cloud")}
              >
                <Checkbox
                  type="button"
                  checked={serviceTypes.cloud}
                  color="teal"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleService("cloud");
                  }}
                >
                  {serviceTypes.cloud && (
                    <CheckMark
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </CheckMark>
                  )}
                </Checkbox>
                <CheckboxLabel>{t("services.cloud")}</CheckboxLabel>
              </CheckboxContainer>
            </div>

            <SubmitButton type="submit">{t("submit")}</SubmitButton>
          </ServiceTypesColumn>
        </FormGrid>

        {/* Privacy Policy Note */}
        <PrivacyNote>
          <p>
            {t("privacy.text")}{" "}
            <PrivacyLink href="#">{t("privacy.link")}</PrivacyLink>.
          </p>
          <RequiredNote>
            <RequiredMark>*</RequiredMark> {t("privacy.requiredFields")}
          </RequiredNote>
        </PrivacyNote>
      </FormContainer>
    </PageWrapper>
  );
}

// Helper functions for dropdown labels
function getBudgetLabel(value, t) {
  const budgetMap = {
    "< 5000": t("contact.budget.less5k"),
    "5000-10000": t("contact.budget.5kTo10k"),
    "10000-25000": t("contact.budget.10kTo25k"),
    "25000-50000": t("contact.budget.25kTo50k"),
    "> 50000": t("contact.budget.more50k"),
  };
  return budgetMap[value] || t("contact.budget.select");
}

function getTimelineLabel(value, t) {
  const timelineMap = {
    "< 1month": t("contact.timeline.less1month"),
    "1-3months": t("contact.timeline.1To3months"),
    "3-6months": t("contact.timeline.3To6months"),
    "> 6months": t("contact.timeline.more6months"),
  };
  return timelineMap[value] || t("contact.timeline.select");
}
