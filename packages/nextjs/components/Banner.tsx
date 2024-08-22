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
            type: "circle",
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
            speed: 0.3,
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
    <>
      {/* Particles.js container */}
      <div
        id="particles-js"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      ></div>

      {/* Main content */}
      <div className="relative">
        <div className="container max-w-[90%] lg:py-12 py-0 xl:max-w-7xl xl:pl-4 m-auto pt-4 pb-8 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0 relative z-10">
          <div className="space-y-2 lg:max-w-[55%] flex flex-col items-center lg:items-start">
            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-relaxed mb-4">
                Design Frames →<span className="block leading-relaxed">no coding needed</span>
                <span className="text-purple-500 leading-normal">🖼️ EzFrames</span>
              </h1>
            </div>
            <div className="text-center font-spaceMono px-1 max-w-lg lg:max-w-none lg:w-4/5 lg:px-0 lg:text-left space-y-5 gap-4">
              <div className=" p-4 rounded-2xl">
                <p className="m-0 text-xs md:text-sm lg:text-base">
                  Onboard your store ⚡ to Web3 🌐{" "}
                  <span className="block leading-relaxed">
                    through <b> multiframe journeys 🚀 </b>{" "}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="bg-black text-white px-6 py-3  hover:bg-gray-800 transition-all">
                  Sign up with email
                </Link>
                <PopupButton id="oNSMcTf6" className="bg-black text-white px-6 py-3  hover:bg-gray-800 transition-all">
                  Contact Us
                </PopupButton>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <BuildingStorefrontIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Manage your store and <b>attest</b> receipts using <b>EAS</b>
                </p>
              </div>
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <GlobeAltIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Bring your store to Web3 with our <b>shopify integration</b>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <BanknotesIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Collect payments onchain using <b>USDC</b> on <b>BASE</b>
                </p>
              </div>
              <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
                <ChartBarIcon className="h-6 w-6 fill-secondary mb-2" />
                <p className="text-sm">
                  Track sales and ship changes <b>instantly</b>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            {/* Insert FRAME CODE here */}
            <div className="flex flex-col bg-base-100 p-4 items-center text-center border border-black">
              <BanknotesIcon className="h-6 w-6 fill-secondary mb-2" />
              <p className="text-sm">Frame code comes in here </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
