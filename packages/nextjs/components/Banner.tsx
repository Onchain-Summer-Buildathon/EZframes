import { useEffect } from "react";
import Link from "next/link";
import { PopupButton } from "@typeform/embed-react";
import { BanknotesIcon, BuildingStorefrontIcon, ChartBarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const Banner = () => {
  useEffect(() => {
    // Load the particles.js script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#B0E0E6",
          },
          shape: {
            type: "polygon",
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.7,
            random: true,
          },
          size: {
            value: 7,
            random: true,
          },
          move: {
            direction: "top",
            out_mode: "out",
            speed: 1,
            random: false,
            straight: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: false,
            },
          },
        },
        retina_detect: true,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative">
      <div id="particles-js" className="absolute inset-0 z-0"></div>
      <div className="container max-w-[90%] lg:py-12 py-0 xl:max-w-7xl xl:pl-4 m-auto pt-4 pb-8 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0 relative z-10">
        <div className="space-y-2 lg:max-w-[55%] flex flex-col items-center lg:items-start">
          <div className="relative">
            {/* <img src="/EzFramesPnG.png" alt="EZ_Frames Logo" className="w-auto h-24 lg:h-32" /> */}
            <h2 className="text-3xl md:text-4xl lg:leading-[1.2] text-center lg:text-left font-bold">
              EZ_Frames
              <div className="flex items-center gap-2 text-lg md:text-xl font-normal">
                The best <p className="font-bold">no-code</p> frames builder
              </div>
            </h2>
          </div>
          <div className="text-center font-spaceMono px-1 max-w-lg lg:max-w-none lg:w-4/5 lg:px-0 lg:text-left space-y-5 gap-4">
            <div className="bg-base-300 p-4 rounded-2xl">
              <p className="m-0 text-xs md:text-sm lg:text-base">
                Explore growth opportunities in the Web3 World by creating multiframe product journeys allowing your
                store
                <b> to go onchain </b>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
              >
                Sign up with email
              </Link>
              <PopupButton
                id="oNSMcTf6"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
              >
                Contact Us
              </PopupButton>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
            <div className="flex flex-col bg-base-100 p-4 rounded-lg items-center text-center">
              <BuildingStorefrontIcon className="h-6 w-6 fill-secondary mb-2" />
              <p className="text-sm">
                Manage your store and products and <b>attest</b> order receipts using <b>EAS</b>
              </p>
            </div>
            <div className="flex flex-col bg-base-100 p-4 rounded-lg items-center text-center">
              <GlobeAltIcon className="h-6 w-6 fill-secondary mb-2" />
              <p className="text-sm">
                Take your existing store into the web3 world with our <b>shopify integration</b>
              </p>
            </div>
            <div className="flex flex-col bg-base-100 p-4 rounded-lg items-center text-center">
              <BanknotesIcon className="h-6 w-6 fill-secondary mb-2" />
              <p className="text-sm">
                Collect payments for orders using onchain methods for <b>USDC</b> on <b>BASE</b>
              </p>
            </div>
            <div className="flex flex-col bg-base-100 p-4 rounded-lg items-center text-center">
              <ChartBarIcon className="h-6 w-6 fill-secondary mb-2" />
              <p className="text-sm">
                Track how each product is selling and ship changes <b>instantly</b>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 p-4">
          {/* Insert FRAME CODE here */}
          <div className="flex flex-col bg-base-100 p-4 rounded-lg items-center text-center">
            <BanknotesIcon className="h-6 w-6 fill-secondary mb-2" />
            <p className="text-sm">Frame code comes in here </p>
          </div>
        </div>
      </div>
    </div>
  );
};
