import {
  ServiceTypesColumn,
  SectionTitle,
  ServiceDescription,
  SubmitButton,

} from "../../homepage/quote-request/quote-request-form.styled";

export function ServicesSection({ t }) {
  return (
    <ServiceTypesColumn>
      <SectionTitle>{t("services.title")}</SectionTitle>
      <ServiceDescription>{t("services.description")}</ServiceDescription>
      <div className="service-options">

      </div>
      <SubmitButton type="submit">{t("submit")}</SubmitButton>
    </ServiceTypesColumn>
  );
}
