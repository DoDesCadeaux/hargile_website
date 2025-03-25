// OurServices.jsx
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const ServiceSection = ({ icon, title, items, position }) => {
  const dotColor = {
    topLeft: "#3B82F6", // blue
    bottomLeft: "#EC4899", // red/orange
    topRight: "#10B981", // teal
    bottomRight: "#A855F7", // purple
  }[position];

  const isRight = position.includes("right");

  return (
    <div className={isRight ? "text-right" : "text-left"}>
      <div
        className="flex items-center mb-6"
        style={{ margin: "0 0 1.5rem 0" }}
      >
        <div className="mr-4" style={{ margin: "0 1rem 0 0" }}>
          {icon}
        </div>
        <h3
          className="text-xl md:text-2xl font-bold text-white"
          style={{ margin: 0 }}
        >
          {title}
        </h3>
      </div>
      <div>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-4"
            style={{ margin: "0 0 1rem 0" }}
          >
            <div
              className="w-3 h-3 rounded-full mr-4"
              style={{
                backgroundColor: dotColor,
                margin: "0 1rem 0 0",
                width: "0.75rem",
                height: "0.75rem",
              }}
            ></div>
            <span
              className="text-white text-base md:text-lg"
              style={{ margin: 0 }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OurServices = () => {
  const t = useTranslations("Services");
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Converting object items to arrays for rendering
  const devItems = Object.keys(t.raw("dev.items")).map((key) =>
    t(`dev.items.${key}`)
  );
  const maintenanceItems = Object.keys(t.raw("maintenance.items")).map((key) =>
    t(`maintenance.items.${key}`)
  );
  const aiItems = Object.keys(t.raw("ai.items")).map((key) =>
    t(`ai.items.${key}`)
  );
  const analysisItems = Object.keys(t.raw("analysis.items")).map((key) =>
    t(`analysis.items.${key}`)
  );

  const services = {
    topLeft: {
      icon: (
        <img
          src="/icons/services/globe.svg"
          alt={t("dev.title")}
          width={isMobile ? 32 : 48}
          height={isMobile ? 32 : 48}
          style={{
            filter:
              "invert(43%) sepia(98%) saturate(1677%) hue-rotate(202deg) brightness(102%) contrast(96%)",
          }}
        />
      ),
      title: t("dev.title"),
      items: devItems,
    },
    bottomLeft: {
      icon: (
        <svg
          width={isMobile ? "32" : "48"}
          height={isMobile ? "32" : "48"}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 24H12L18 6L30 42L36 24H42"
            stroke="#EC4899"
            strokeWidth="2"
          />
        </svg>
      ),
      title: t("maintenance.title"),
      items: maintenanceItems,
    },
    topRight: {
      icon: (
        <svg
          width={isMobile ? "32" : "48"}
          height={isMobile ? "32" : "48"}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="8" stroke="#10B981" strokeWidth="2" />
          <path
            d="M24 8V2M24 46V40M8 24H2M46 24H40M12 12L8 8M36 36L40 40M12 36L8 40M36 12L40 8"
            stroke="#10B981"
            strokeWidth="2"
          />
        </svg>
      ),
      title: t("ai.title"),
      items: aiItems,
    },
    bottomRight: {
      icon: (
        <svg
          width={isMobile ? "32" : "48"}
          height={isMobile ? "32" : "48"}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 6V42H42" stroke="#A855F7" strokeWidth="2" />
          <path d="M14 30V34" stroke="#A855F7" strokeWidth="2" />
          <path d="M22 26V34" stroke="#A855F7" strokeWidth="2" />
          <path d="M30 18V34" stroke="#A855F7" strokeWidth="2" />
          <path d="M38 10V34" stroke="#A855F7" strokeWidth="2" />
        </svg>
      ),
      title: t("analysis.title"),
      items: analysisItems,
    },
  };

  // Continue with the rest of your component for responsive rendering...
  // Mobile layout renders all services in a single column
  if (isMobile) {
    return (
      <section className="relative w-full py-8 px-4">
        {/* Header */}
        <div
          className="container mx-auto px-4 text-center mb-8"
          style={{ margin: "0 auto", marginBottom: "2rem" }}
        >
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ margin: "0 0 1rem 0" }}
          >
            {t("title")}
          </h2>
          <p className="text-white text-base" style={{ margin: 0 }}>
            {t("subtitle")}
          </p>
        </div>

        {/* Mobile Services Layout */}
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
            {/* Top Left */}
            <div style={{ margin: "1rem 0", paddingLeft: "0.5rem" }}>
              <ServiceSection
                icon={services.topLeft.icon}
                title={services.topLeft.title}
                items={services.topLeft.items}
                position="topLeft"
              />
            </div>

            {/* Top Right */}
            <div style={{ margin: "1rem 0", paddingLeft: "0.5rem" }}>
              <ServiceSection
                icon={services.topRight.icon}
                title={services.topRight.title}
                items={services.topRight.items}
                position="topRight"
              />
            </div>

            {/* Bottom Left */}
            <div style={{ margin: "1rem 0", paddingLeft: "0.5rem" }}>
              <ServiceSection
                icon={services.bottomLeft.icon}
                title={services.bottomLeft.title}
                items={services.bottomLeft.items}
                position="bottomLeft"
              />
            </div>

            {/* Bottom Right */}
            <div style={{ margin: "1rem 0", paddingLeft: "0.5rem" }}>
              <ServiceSection
                icon={services.bottomRight.icon}
                title={services.bottomRight.title}
                items={services.bottomRight.items}
                position="bottomRight"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tablet layout - adjust heights and spacing
  const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <section className="relative w-full">
      {/* Header */}
      <div
        className="container mx-auto px-4 text-center mb-8"
        style={{ margin: "0 auto", marginBottom: "2rem" }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ margin: "0 0 1rem 0" }}
        >
          {t("title")}
        </h2>
        <p className="text-white text-lg" style={{ margin: 0 }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Services Layout - Desktop and Tablet */}
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
              height: isTablet ? "60vh" : "68vh",
            }}
          >
            {/* Top Left */}
            <div style={{ margin: "1rem 0" }}>
              <ServiceSection
                icon={services.topLeft.icon}
                title={services.topLeft.title}
                items={services.topLeft.items}
                position="topLeft"
              />
            </div>

            {/* Bottom Left */}
            <div style={{ margin: "2rem 0" }}>
              <ServiceSection
                icon={services.bottomLeft.icon}
                title={services.bottomLeft.title}
                items={services.bottomLeft.items}
                position="bottomLeft"
              />
            </div>
          </div>

          {/* Middle Column for Earth (Empty) */}
          <div></div>

          {/* Right Column */}
          <div
            style={{
              marginTop: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: isTablet ? "52vh" : "60vh",
            }}
          >
            {/* Top Right */}
            <div style={{ margin: "2rem 0" }}>
              <ServiceSection
                icon={services.topRight.icon}
                title={services.topRight.title}
                items={services.topRight.items}
                position="topRight"
              />
            </div>

            {/* Bottom Right */}
            <div style={{ margin: "2rem 0" }}>
              <ServiceSection
                icon={services.bottomRight.icon}
                title={services.bottomRight.title}
                items={services.bottomRight.items}
                position="bottomRight"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
