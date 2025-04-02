"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Menu, X, FileText, Printer } from "lucide-react";

// Main page container with background
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0a051a;
  color: white;
  position: relative;
  overflow: hidden;
`;

// Background globe effect

// Main content wrapper
const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 10;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
  }
`;

// Header section
const Header = styled.header`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    grid-column: 1 / 3;
  }
`;

const Title = styled.h1.attrs({
  className: "fluid-type-5",
})`
  font-weight: bold;
  color: white;
  margin: 0;
`;

const TitleUnderline = styled.div`
  width: 80%;
  height: 4px;
  background-color: var(--color-accent-mihai);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
`;

const LastUpdate = styled.p.attrs({
  className: "fluid-type--1",
})`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

// Sidebar navigation
// Fix: Use CSS for showing/hiding instead of passing isOpen as a prop
const Sidebar = styled.aside`
  background-color: #0f0927;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: ${(props) => (props.$menuOpen ? "block" : "none")};

  @media (min-width: 768px) {
    display: block !important;
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }
`;

const SidebarTitle = styled.h2.attrs({
  className: "fluid-type-0",
})`
  color: white;
  margin-bottom: 1rem;
`;

// Using data-active instead of active prop
const NavItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props["data-active"] === "true"
      ? "rgba(124, 58, 237, 0.2)"
      : "transparent"};
  border-left: ${(props) =>
    props["data-active"] === "true"
      ? "3px solid var(--color-accent-mihai)"
      : "3px solid transparent"};

  &:hover {
    background-color: rgba(124, 58, 237, 0.1);
  }
`;

// Main content section
const MainContent = styled.main``;

const Section = styled.section`
  background-color: #0f0927;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2.attrs({
  className: "fluid-type-2",
})`
  color: white;
  margin-bottom: 1.5rem;
`;

const SubSectionTitle = styled.h3.attrs({
  className: "fluid-type-1",
})`
  color: #9d4edd;
  margin: 1.5rem 0 1rem 0;
`;

const Paragraph = styled.p.attrs({
  className: "fluid-type-0",
})`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BulletList = styled.ul`
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const BulletItem = styled.li.attrs({
  className: "fluid-type-0",
})`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 0.5rem;

  &::before {
    content: "• ";
    color: var(--color-accent-mihai);
  }
`;

// Action buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:first-child {
    background-color: #9d4edd;
    color: white;
    border: none;

    &:hover {
      background-color: #8e2de2;
    }
  }

  &:last-child {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;

export default function PrivacyPolicyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("termsConditions");

  const t = useTranslations("pages.privacy-policy");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <div>
            <Title>{t("title")}</Title>
            <TitleUnderline />
            <LastUpdate>
              {t("lastUpdate")}: {t("lastUpdateDate")}
            </LastUpdate>
          </div>
          <MenuButton onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>
        </Header>

        {/* Fix: Use $menuOpen with $ prefix, which styled-components will handle properly */}
        <Sidebar $menuOpen={menuOpen}>
          <SidebarTitle>{t("inThisPage")}</SidebarTitle>

          <NavItem
            href="#terms"
            data-active={(activeSection === "termsConditions").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("termsConditions");
            }}
          >
            1. {t("sections.termsConditions.title")}
          </NavItem>

          <NavItem
            href="#privacy"
            data-active={(activeSection === "privacyPolicy").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("privacyPolicy");
            }}
          >
            2. {t("sections.privacyPolicy.title")}
          </NavItem>

          <NavItem
            href="#cookies"
            data-active={(activeSection === "cookies").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("cookies");
            }}
          >
            3. {t("sections.cookies.title")}
          </NavItem>

          <NavItem
            href="#rights"
            data-active={(activeSection === "userRights").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("userRights");
            }}
          >
            4. {t("sections.userRights.title")}
          </NavItem>

          <NavItem
            href="#other"
            data-active={(activeSection === "other").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("other");
            }}
          >
            5. {t("sections.other.title")}
          </NavItem>

          <NavItem
            href="#contact"
            data-active={(activeSection === "contactUs").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contactUs");
            }}
          >
            6. {t("sections.contactUs.title")}
          </NavItem>

          <NavItem
            href="#international"
            data-active={(activeSection === "international").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("international");
            }}
          >
            7. {t("sections.international.title")}
          </NavItem>

          <NavItem
            href="#contact-us"
            data-active={(activeSection === "contactSupport").toString()}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contactSupport");
            }}
          >
            8. {t("sections.contactSupport.title")}
          </NavItem>
        </Sidebar>

        <MainContent>
          {activeSection === "termsConditions" && (
            <Section id="terms">
              <SectionTitle>
                1. {t("sections.termsConditions.title")}
              </SectionTitle>
              <Paragraph>{t("sections.termsConditions.welcome")}</Paragraph>

              <SubSectionTitle>
                1.1 {t("sections.termsConditions.intellectualProperty.title")}
              </SubSectionTitle>
              <Paragraph>
                {t("sections.termsConditions.intellectualProperty.content")}
              </Paragraph>

              <SubSectionTitle>
                1.2 {t("sections.termsConditions.liability.title")}
              </SubSectionTitle>
              <Paragraph>
                {t("sections.termsConditions.liability.content")}
              </Paragraph>
            </Section>
          )}

          {activeSection === "privacyPolicy" && (
            <Section id="privacy">
              <SectionTitle>
                2. {t("sections.privacyPolicy.title")}
              </SectionTitle>
              <Paragraph>{t("sections.privacyPolicy.introduction")}</Paragraph>

              <SubSectionTitle>
                2.1 {t("sections.privacyPolicy.dataCollection.title")}
              </SubSectionTitle>
              <Paragraph>
                {t("sections.privacyPolicy.dataCollection.content")}
              </Paragraph>

              <SubSectionTitle>
                2.2 {t("sections.privacyPolicy.dataUsage.title")}
              </SubSectionTitle>
              <Paragraph>
                {t("sections.privacyPolicy.dataUsage.content")}
              </Paragraph>
              <BulletList>
                <BulletItem>
                  {t("sections.privacyPolicy.dataUsage.purposes.services")}
                </BulletItem>
                <BulletItem>
                  {t("sections.privacyPolicy.dataUsage.purposes.transactions")}
                </BulletItem>
                <BulletItem>
                  {t("sections.privacyPolicy.dataUsage.purposes.responses")}
                </BulletItem>
              </BulletList>
            </Section>
          )}

          {activeSection === "cookies" && (
            <Section id="cookies">
              <SectionTitle>3. {t("sections.cookies.title")}</SectionTitle>
              <Paragraph>{t("sections.cookies.introduction")}</Paragraph>

              <SubSectionTitle>
                3.1 {t("sections.cookies.types.title")}
              </SubSectionTitle>
              <BulletList>
                <BulletItem>{t("sections.cookies.types.essential")}</BulletItem>
                <BulletItem>{t("sections.cookies.types.analytics")}</BulletItem>
                <BulletItem>
                  {t("sections.cookies.types.functional")}
                </BulletItem>
                <BulletItem>
                  {t("sections.cookies.types.advertising")}
                </BulletItem>
              </BulletList>

              <SubSectionTitle>
                3.2 {t("sections.cookies.control.title")}
              </SubSectionTitle>
              <Paragraph>{t("sections.cookies.control.content")}</Paragraph>
            </Section>
          )}

          {activeSection === "userRights" && (
            <Section id="rights">
              <SectionTitle>4. {t("sections.userRights.title")}</SectionTitle>
              <Paragraph>{t("sections.userRights.introduction")}</Paragraph>
              <BulletList>
                <BulletItem>
                  {t("sections.userRights.rights.access")}
                </BulletItem>
                <BulletItem>
                  {t("sections.userRights.rights.rectification")}
                </BulletItem>
                <BulletItem>
                  {t("sections.userRights.rights.erasure")}
                </BulletItem>
                <BulletItem>
                  {t("sections.userRights.rights.restriction")}
                </BulletItem>
                <BulletItem>
                  {t("sections.userRights.rights.portability")}
                </BulletItem>
                <BulletItem>
                  {t("sections.userRights.rights.objection")}
                </BulletItem>
              </BulletList>
            </Section>
          )}

          {activeSection === "other" && (
            <Section id="other">
              <SectionTitle>5. {t("sections.other.title")}</SectionTitle>
              <Paragraph>{t("sections.other.content")}</Paragraph>
            </Section>
          )}

          {activeSection === "contactUs" && (
            <Section id="contact">
              <SectionTitle>6. {t("sections.contactUs.title")}</SectionTitle>
              <Paragraph>{t("sections.contactUs.content")}</Paragraph>
            </Section>
          )}

          {activeSection === "international" && (
            <Section id="international">
              <SectionTitle>
                7. {t("sections.international.title")}
              </SectionTitle>
              <Paragraph>{t("sections.international.content")}</Paragraph>
            </Section>
          )}

          {activeSection === "contactSupport" && (
            <Section id="contact-us">
              <SectionTitle>
                8. {t("sections.contactSupport.title")}
              </SectionTitle>
              <Paragraph>{t("sections.contactSupport.content")}</Paragraph>
            </Section>
          )}

          <ActionButtons>
            <ActionButton>
              <FileText size={18} />
              {t("downloadPDF")}
            </ActionButton>
            <ActionButton>
              <Printer size={18} />
              {t("print")}
            </ActionButton>
          </ActionButtons>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
}
