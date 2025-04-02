import {
  ServiceTypesColumn,
  SectionTitle,
  ServiceDescription,
  CheckboxContainer,
  Checkbox,
  CheckMark,
  CheckboxLabel,
  SubmitButton,
} from "../quote-request-form.styled";

export function ServicesSection({ t, serviceTypes, toggleService }) {
  // Service configuration with colors
  const services = [
    {
      id: "webDevelopment",
      color: "blue",
      bgColor: "rgba(59, 130, 246, 0.1)",
      hoverColor: "rgba(59, 130, 246, 0.15)",
    },
    {
      id: "mobileApps",
      color: "purple",
      bgColor: "rgba(139, 92, 246, 0.1)",
      hoverColor: "rgba(139, 92, 246, 0.15)",
    },
    {
      id: "ai",
      color: "pink",
      bgColor: "rgba(236, 72, 153, 0.1)",
      hoverColor: "rgba(236, 72, 153, 0.15)",
    },
    {
      id: "cloud",
      color: "teal",
      bgColor: "rgba(20, 184, 166, 0.1)",
      hoverColor: "rgba(20, 184, 166, 0.15)",
    },
  ];

  return (
    <ServiceTypesColumn>
      <SectionTitle>{t("services.title")}</SectionTitle>
      <ServiceDescription>{t("services.description")}</ServiceDescription>

      <div className="service-options">
        {services.map((service) => (
          <ServiceCheckbox
            key={service.id}
            id={service.id}
            label={t(`services.${service.id}`)}
            isChecked={serviceTypes[service.id]}
            color={service.color}
            bgColor={serviceTypes[service.id] ? service.bgColor : "transparent"}
            hoverColor={service.hoverColor}
            onClick={() => toggleService(service.id)}
          />
        ))}
      </div>

      <SubmitButton type="submit">{t("submit")}</SubmitButton>
    </ServiceTypesColumn>
  );
}

function ServiceCheckbox({
  id,
  label,
  isChecked,
  color,
  bgColor,
  hoverColor,
  onClick,
}) {
  return (
    <CheckboxContainer
      style={{
        "--bg-color": bgColor,
        "--bg-hover-color": hoverColor,
      }}
      onClick={onClick}
    >
      <Checkbox
        type="button"
        checked={isChecked}
        color={color}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {isChecked && (
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
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
}
