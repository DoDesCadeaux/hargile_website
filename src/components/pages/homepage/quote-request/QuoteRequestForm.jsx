// QuoteRequestForm.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import both ChevronDown and ChevronUp
import { Transition } from "@headlessui/react"; // Import Transition for animation

export default function QuoteRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch, // Import the watch function
  } = useForm();
  const [serviceTypes, setServiceTypes] = useState({
    webDevelopment: false,
    mobileApps: false,
    ai: false,
    cloud: false,
  });

  // State to track dropdown open/close state
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const onSubmit = (data) => {
    // Combine form data with service types
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

  // Function to toggle dropdown visibility
  const toggleBudgetDropdown = () => {
    setIsBudgetOpen(!isBudgetOpen);
  };

  const toggleTimelineDropdown = () => {
    setIsTimelineOpen(!isTimelineOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden contain-content">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 px-4">
          <h1 className="text-4xl font-bold text-white mb-2">
            Demande de Devis
          </h1>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">
            Obtenez une estimation gratuite pour votre projet
          </h2>
          <p className="text-white">
            Complétez le formulaire ci-dessous pour recevoir une estimation
            personnalisée.
            <br />
            Notre équipe d'experts analysera vos besoins et vous contactera dans
            les 48 heures.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4"
          style={{ padding: 2 + "px" }}
        >
          {/* Left Column - Contact Information */}
          <div
            style={{ padding: 2 + "rem" }}
            className="lg:col-span-2 bg-[#1b133d]/40 border border-purple-900/20 rounded-lg px-2.5 p-10 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Informations de contact
            </h3>

            <div className="mb-6">
              <label
                style={{ paddingTop: 1 + "rem" }}
                htmlFor="name"
                className="block text-white mb-2"
              >
                Nom et prénom <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`w-full bg-[#19103b] text-white rounded-md p-4 outline-none  ${
                  errors.name
                    ? "border border-red-500"
                    : "border border-purple-800/10"
                }`}
                {...register("name", { required: true })}
              />
            </div>

            <div className="mb-6">
              <label
                style={{ paddingTop: 1 + "rem" }}
                htmlFor="email"
                className="block text-white mb-2"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`w-full bg-[#19103b] text-white rounded-md p-4 outline-none  ${
                  errors.email
                    ? "border border-red-500"
                    : "border border-purple-800/10"
                }`}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
            </div>

            <div className="mb-6">
              <label
                style={{ paddingTop: 1 + "rem" }}
                htmlFor="phone"
                className="block text-white mb-2"
              >
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full bg-[#19103b] text-white rounded-md p-4 outline-none  border border-purple-800/10"
                {...register("phone")}
              />
            </div>

            <div className="mb-6">
              <label
                style={{ paddingTop: 1 + "rem" }}
                htmlFor="description"
                className="block text-white mb-2"
              >
                Description du projet <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                rows={5}
                className={`w-full bg-[#19103b] text-white rounded-md p-4 outline-none  ${
                  errors.description
                    ? "border border-red-500"
                    : "border border-purple-800/10"
                }`}
                {...register("description", { required: true })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  style={{ paddingTop: 1 + "rem" }}
                  htmlFor="budget"
                  className="block text-white mb-2"
                >
                  Budget estimé
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className={`relative appearance-none w-full bg-[#19103b] text-white rounded-md p-4 pr-10 outline-none border border-purple-800/10 flex items-center justify-between ${
                      errors.budget ? "border-red-500" : ""
                    }`}
                    onClick={toggleBudgetDropdown}
                  >
                    {/* Selected value display */}
                    <span className="text-center w-full">
                      {watch("budget") || "Sélectionner"}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white transition transform">
                      {isBudgetOpen ? (
                        <ChevronUp className="h-5 w-5 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                      )}
                    </span>
                  </button>

                  <Transition
                    show={isBudgetOpen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-[#19103b] ring-1 ring-purple-900/20 focus:outline-none">
                      <div className="py-1">
                        <button
                          type="button"
                          value="< 5000"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("budget", "< 5000");
                            toggleBudgetDropdown();
                          }}
                        >
                          Moins de 5 000 €
                        </button>
                        <button
                          type="button"
                          value="5000-10000"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("budget", "5000-10000");
                            toggleBudgetDropdown();
                          }}
                        >
                          5 000 € - 10 000 €
                        </button>
                        <button
                          type="button"
                          value="10000-25000"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("budget", "10000-25000");
                            toggleBudgetDropdown();
                          }}
                        >
                          10 000 € - 25 000 €
                        </button>
                        <button
                          type="button"
                          value="25000-50000"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("budget", "25000-50000");
                            toggleBudgetDropdown();
                          }}
                        >
                          25 000 € - 50 000 €
                        </button>
                        <button
                          type="button"
                          value="> 50000"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("budget", "> 50000");
                            toggleBudgetDropdown();
                          }}
                        >
                          Plus de 50 000 €
                        </button>
                      </div>
                    </div>
                  </Transition>
                  <input
                    type="hidden"
                    {...register("budget", { required: "Budget is required" })}
                  />
                </div>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{ paddingTop: 1 + "rem" }}
                  htmlFor="timeline"
                  className="block text-white mb-2 mx-auto"
                >
                  Échéance souhaitée
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className={`relative appearance-none w-full bg-[#190f3a] text-white rounded-md p-4 pr-10 outline-none border border-purple-800/10 flex items-center justify-between ${
                      errors.timeline ? "border-red-500" : ""
                    }`}
                    onClick={toggleTimelineDropdown}
                  >
                    <span className="text-center w-full">
                      {watch("timeline") || "Sélectionner"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white transition transform">
                      {isTimelineOpen ? (
                        <ChevronUp className="h-5 w-5 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-5 w-5 transition-transform duration-200" />
                      )}
                    </span>
                  </button>

                  <Transition
                    show={isTimelineOpen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-[#190f3a] ring-1 ring-purple-900/20 focus:outline-none">
                      <div className="py-1">
                        <button
                          type="button"
                          value="< 1month"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("timeline", "< 1month");
                            toggleTimelineDropdown();
                          }}
                        >
                          Moins d'un mois
                        </button>
                        <button
                          type="button"
                          value="1-3months"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("timeline", "1-3months");
                            toggleTimelineDropdown();
                          }}
                        >
                          1 - 3 mois
                        </button>
                        <button
                          type="button"
                          value="3-6months"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("timeline", "3-6months");
                            toggleTimelineDropdown();
                          }}
                        >
                          3 - 6 mois
                        </button>
                        <button
                          type="button"
                          value="> 6months"
                          className="block py-2 px-4 text-sm text-white hover:bg-purple-700 hover:text-white cursor-pointer w-full text-center"
                          onClick={() => {
                            setValue("timeline", "> 6months");
                            toggleTimelineDropdown();
                          }}
                        >
                          Plus de 6 mois
                        </button>
                      </div>
                    </div>
                  </Transition>
                  <input
                    type="hidden"
                    {...register("timeline", {
                      required: "Timeline is required",
                    })}
                  />
                </div>
                {errors.timeline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.timeline.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Service Types */}
          <div
            style={{ padding: 2 + "rem" }}
            className="bg-[#151035]/65 border border-purple-900/10 rounded-lg p-10 shadow-xl flex flex-col"
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              Type de service
            </h3>
            <p className="text-white mb-4">
              Sélectionnez une ou plusieurs options
            </p>

            <div className="space-y-5 flex-grow">
              <div className="flex items-center">
                <button
                  type="button"
                  className={`w-6 h-6 rounded flex items-center justify-center mr-3 ${
                    serviceTypes.webDevelopment
                      ? "bg-blue-500"
                      : "bg-[#190f3a] border border-blue-500"
                  }`}
                  onClick={() => toggleService("webDevelopment")}
                >
                  {serviceTypes.webDevelopment && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <label
                  style={{ paddingLeft: 1 + "rem" }}
                  className="text-white cursor-pointer"
                  onClick={() => toggleService("webDevelopment")}
                >
                  Développement Web
                </label>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  className={`w-6 h-6 rounded flex items-center justify-center mr-3 ${
                    serviceTypes.mobileApps
                      ? "bg-purple-500"
                      : "bg-[#190f3a] border border-purple-500"
                  }`}
                  onClick={() => toggleService("mobileApps")}
                >
                  {serviceTypes.mobileApps && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <label
                  className="text-white cursor-pointer"
                  style={{ paddingLeft: 1 + "rem" }}
                  onClick={() => toggleService("mobileApps")}
                >
                  Applications Mobiles
                </label>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  className={`w-6 h-6 rounded flex items-center justify-center mr-3 ${
                    serviceTypes.ai
                      ? "bg-pink-500"
                      : "bg-[#190f3a] border border-pink-500"
                  }`}
                  onClick={() => toggleService("ai")}
                >
                  {serviceTypes.ai && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <label
                  className="text-white cursor-pointer"
                  style={{ paddingLeft: 1 + "rem" }}
                  onClick={() => toggleService("ai")}
                >
                  Intelligence Artificielle
                </label>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  className={`w-6 h-6 rounded flex items-center justify-center mr-3 ${
                    serviceTypes.cloud
                      ? "bg-teal-500"
                      : "bg-[#190f3a] border border-teal-500"
                  }`}
                  onClick={() => toggleService("cloud")}
                >
                  {serviceTypes.cloud && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <label
                  style={{ paddingLeft: 1 + "rem" }}
                  className="text-white cursor-pointer"
                  onClick={() => toggleService("cloud")}
                >
                  Solutions Cloud
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out w-full"
            >
              Soumettre
            </button>
          </div>
        </form>

        {/* Privacy Policy Note */}
        <div className="mt-6 text-white text-sm px-4">
          <p>
            En soumettant ce formulaire, vous acceptez notre{" "}
            <a href="#" className="text-blue-400 hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
          <p className="mt-3">
            <span className="text-red-400">*</span> Champs obligatoires
          </p>
        </div>
      </div>
    </div>
  );
}
