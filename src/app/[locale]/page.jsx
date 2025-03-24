"use client";
import Earth from "@/components/Earth";
import { Navbar } from "@/components/navigation/navbar";

export default function HomePage() {
  return (
    <>
      <Earth>
        <div className="min-h-screen flex flex-col justify-center">
          <div className="container mx-auto px-4">
            <div className="flex">
              {/* Left-aligned text container with extra left padding */}
              <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:pl-20">
                <h2 className="text-xl ">HARGILE</h2>
                <h1 className="text-6xl">
                  Transforms
                  <br />
                  Ideas into
                  <br />
                  Digital Reality
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  We are a digital agency specializing in web development, AI
                  solutions, and marketing strategies to elevate your business
                </p>
                <button className="flex items-center bg-transparent text-white font-bold py-2 border-b-2 border-white hover:opacity-80 transition-opacity">
                  Audit your website
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Earth>
    </>
  );
}
