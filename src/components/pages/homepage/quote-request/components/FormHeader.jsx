import {
  HeaderSection,
  PageTitle,
  TitleUnderline,
  SubTitle,
  Description,
} from "../quote-request-form.styled";

export function FormHeader({ t }) {
  return (
    <HeaderSection>
      <PageTitle>{t("title")}</PageTitle>
      <TitleUnderline />

      <SubTitle>
        <span>{t("subtitle.part1")}</span>
        <br /> {t("subtitle.part2")}
      </SubTitle>

      <Description>{t("description")}</Description>
    </HeaderSection>
  );
}
