"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const t = useTranslations("pages.homepage.sections.hero");

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Left-aligned text container with extra left padding */}
          <div
            className="w-full md:w-1/2 lg:w-3/5 p-8 pl-20"
            style={{ paddingLeft: 4 + "rem" }}
          >
            <h2 className="text-lg ">{t("companyName")}</h2>
            <h1 className="text-6xl">
              {t("headline.line1")}
              <br />
              {t("headline.line2")}
              <br />
              {t("headline.line3")}
            </h1>
            <p
              className="text-xl mb-8 text-gray-200 w-full md:w-1/2 lg:w-3/5 "
              style={{ fontWeight: "200" }}
            >
              {t("description")}
            </p>
            <button className="flex items-center bg-transparent text-white font-bold">
              <p className="fluid-type-2">{t("ctaButton")}</p>
              <Image
                src="/icons/arrows/maximize 01.svg"
                alt={t("arrowAlt")}
                width={30}
                height={30}
                className="ml-2 mb-3"
                style={{ marginBottom: 3 + "rem", marginLeft: 1 + "rem" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
