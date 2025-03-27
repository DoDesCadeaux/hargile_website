// OurServices.jsx
import React from "react";
import { useTranslations } from "next-intl";
import ServiceSection from "./ServiceSection";
import SectionHeader from "./SectionHeader";
import { getServiceIcons } from "./serviceIcons";
import { useResponsive } from "./useResponsive";
import { POSITIONS } from "./constants";

/**
 * Main component to display all services
 */
const OurServices = () => {
  const t = useTranslations("pages.homepage.sections.services");
  const { isMobile, isTablet } = useResponsive();

  // Helper function to get translated items
  const getTranslatedItems = (section) =>
    Object.keys(t.raw(`${section}.items`)).map((key) =>
      t(`${section}.items.${key}`)
    );

  // Get section data
  const getServiceData = () => {
    const data = {
      [POSITIONS.TOP_LEFT]: {
        title: t("dev.title"),
        items: getTranslatedItems("dev"),
      },
      [POSITIONS.BOTTOM_LEFT]: {
        title: t("maintenance.title"),
        items: getTranslatedItems("maintenance"),
      },
      [POSITIONS.TOP_RIGHT]: {
        title: t("ai.title"),
        items: getTranslatedItems("ai"),
      },
      [POSITIONS.BOTTOM_RIGHT]: {
        title: t("analysis.title"),
        items: getTranslatedItems("analysis"),
      },
    };

    // Get icons
    const icons = getServiceIcons(isMobile);

    // Create services with icons
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = {
        ...data[key],
        icon: icons[key],
        position: key,
      };
      return acc;
    }, {});
  };

  const services = getServiceData();

  // Render mobile layout
  if (isMobile) {
    return renderMobileLayout(services, t);
  }

  // Render desktop/tablet layout
  return renderDesktopLayout(services, t, isTablet);
};

/**
 * Renders the mobile layout
 */
const renderMobileLayout = (services, t) => (
  <section className="relative w-full py-8 px-4">
    <SectionHeader title={t("title")} subtitle={t("subtitle")} />

    <div
      className="container mx-auto px-4 relative"
      style={{ margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: 0,
          padding: "0 1.25rem",
        }}
      >
        {Object.keys(services).map((key) => (
          <div key={key} style={{ margin: "1rem 0", paddingLeft: "0.5rem" }}>
            <ServiceSection {...services[key]} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Renders the desktop/tablet layout
 */
const renderDesktopLayout = (services, t, isTablet) => (
  <section className="relative w-full">
    <SectionHeader title={t("title")} subtitle={t("subtitle")} />

    <div
      className="container mx-auto px-4 relative"
      style={{ margin: "0 auto" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "5fr 2fr 5fr" : "repeat(3, 1fr)",
          gap: isTablet ? "1rem" : "2rem",
          margin: 0,
        }}
      >
        {/* Left Column */}
        <div
          style={{
            marginTop: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: isTablet ? "45vh" : "62vh",
          }}
        >
          <div style={{ margin: "1rem 0" }}>
            <ServiceSection {...services[POSITIONS.TOP_LEFT]} />
          </div>
          <div style={{ margin: "2rem 0" }}>
            <ServiceSection {...services[POSITIONS.BOTTOM_LEFT]} />
          </div>
        </div>

        {/* Middle Column (Empty) */}
        <div></div>

        {/* Right Column */}
        <div
          style={{
            marginTop: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: isTablet ? "45vh" : "60vh",
          }}
        >
          <div style={{ margin: "2rem 0" }}>
            <ServiceSection {...services[POSITIONS.TOP_RIGHT]} />
          </div>
          <div style={{ margin: "2rem 0" }}>
            <ServiceSection {...services[POSITIONS.BOTTOM_RIGHT]} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OurServices;
