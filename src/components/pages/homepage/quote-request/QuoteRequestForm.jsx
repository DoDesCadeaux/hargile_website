"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Transition } from "@headlessui/react";
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
} from "./quote-request-form.styled";

export default function QuoteRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

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
          <PageTitle>Demande de Devis</PageTitle>
          <TitleUnderline />

          <SubTitle>
            <span>Obtenez une estimation</span>
            <br /> gratuite pour votre projet
          </SubTitle>

          <Description>
            Complétez le formulaire ci-dessous pour recevoir une estimation
            personnalisée.
            <br />
            Notre équipe d'experts analysera vos besoins et vous contactera dans
            les 48 heures.
          </Description>
        </HeaderSection>

        {/* Form */}
        <FormGrid onSubmit={handleSubmit(onSubmit)}>
          {/* Left Column - Contact Information */}
          <ContactInfoColumn>
            <SectionTitle>Informations de contact</SectionTitle>

            <FormGroup>
              <InputLabel htmlFor="name">
                Nom et prénom <RequiredMark>*</RequiredMark>
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
                Email <RequiredMark>*</RequiredMark>
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
              <InputLabel htmlFor="phone">Téléphone</InputLabel>
              <Input id="phone" type="tel" {...register("phone")} />
            </FormGroup>

            <FormGroup>
              <InputLabel htmlFor="description">
                Description du projet <RequiredMark>*</RequiredMark>
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
                <InputLabel htmlFor="budget">Budget estimé</InputLabel>
                <div className="relative">
                  <SelectButton
                    type="button"
                    hasError={errors.budget}
                    onClick={toggleBudgetDropdown}
                  >
                    <span>{watch("budget") || "Sélectionner"}</span>

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
                        Moins de 5 000 €
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "5000-10000");
                          toggleBudgetDropdown();
                        }}
                      >
                        5 000 € - 10 000 €
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "10000-25000");
                          toggleBudgetDropdown();
                        }}
                      >
                        10 000 € - 25 000 €
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "25000-50000");
                          toggleBudgetDropdown();
                        }}
                      >
                        25 000 € - 50 000 €
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("budget", "> 50000");
                          toggleBudgetDropdown();
                        }}
                      >
                        Plus de 50 000 €
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
                <InputLabel htmlFor="timeline">Échéance souhaitée</InputLabel>
                <div className="relative">
                  <SelectButton
                    type="button"
                    hasError={errors.timeline}
                    onClick={toggleTimelineDropdown}
                  >
                    <span>{watch("timeline") || "Sélectionner"}</span>
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
                        Moins d'un mois
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "1-3months");
                          toggleTimelineDropdown();
                        }}
                      >
                        1 - 3 mois
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "3-6months");
                          toggleTimelineDropdown();
                        }}
                      >
                        3 - 6 mois
                      </DropdownItem>
                      <DropdownItem
                        type="button"
                        onClick={() => {
                          setValue("timeline", "> 6months");
                          toggleTimelineDropdown();
                        }}
                      >
                        Plus de 6 mois
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
            <SectionTitle>Type de service</SectionTitle>
            <ServiceDescription>
              Sélectionnez une ou plusieurs options
            </ServiceDescription>

            <div className="service-options">
              <CheckboxContainer
                color="blue"
                isActive={serviceTypes.webDevelopment}
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
                <CheckboxLabel>Développement Web</CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer
                color="purple"
                isActive={serviceTypes.mobileApps}
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
                <CheckboxLabel>Applications Mobiles</CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer
                color="pink"
                isActive={serviceTypes.ai}
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
                <CheckboxLabel>Intelligence Artificielle</CheckboxLabel>
              </CheckboxContainer>

              <CheckboxContainer
                color="teal"
                isActive={serviceTypes.cloud}
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
                <CheckboxLabel>Solutions Cloud</CheckboxLabel>
              </CheckboxContainer>
            </div>

            <SubmitButton type="submit">Soumettre</SubmitButton>
          </ServiceTypesColumn>
        </FormGrid>

        {/* Privacy Policy Note */}
        <PrivacyNote>
          <p>
            En soumettant ce formulaire, vous acceptez notre{" "}
            <PrivacyLink href="#">politique de confidentialité</PrivacyLink>.
          </p>
          <RequiredNote>
            <RequiredMark>*</RequiredMark> Champs obligatoires
          </RequiredNote>
        </PrivacyNote>
      </FormContainer>
    </PageWrapper>
  );
}
