"use client";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Left-aligned text container with extra left padding */}
          <div
            className="w-full md:w-1/2 lg:w-3/5 p-8 pl-20"
            style={{ paddingLeft: 4 + "rem" }}
          >
            <h2 className="text-lg ">HARGILE</h2>
            <h1 className="text-6xl">
              Transforms
              <br />
              Ideas into
              <br />
              Digital Reality
            </h1>
            <p
              className="text-xl mb-8 text-gray-200 w-full md:w-1/2 lg:w-3/5 "
              style={{ fontWeight: "200" }}
            >
              We are a digital agency specializing in web development, AI
              solutions, and marketing strategies to elevate your business
            </p>
            <button className="flex items-center bg-transparent text-white font-bold">
              <p className="fluid-type-2">Audit your website</p>
              <Image
                src="/icons/arrows/maximize 01.svg"
                alt="Arrow"
                width={30}
                height={30}
                className="ml-2 mb-3"
                style={{marginBottom: 3 + "rem", marginLeft: 1 + "rem"}}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
