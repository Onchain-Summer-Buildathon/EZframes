import Link from "next/link";
import { BanknotesIcon, BuildingStorefrontIcon, ChartBarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { PopupButton } from '@typeform/embed-react';
import Image from "next/image";

export const Banner = () => (
  <div className="container max-w-[90%] lg:py-12 py-0 xl:max-w-7xl xl:pl-4 m-auto pt-4 pb-8 flex flex-col lg:flex-col items-center justify-between gap-5 lg:gap-0">
    <div className="space-y-2 lg:max-w-[55%] flex flex-col items-center lg:items-start">
      <div className="relative">
      <Image alt="EZframes logo" width={500} height={150} className="cursor-pointer" src="/ezframes-logo.png" />
      </div>
      <div className="text-center font-spaceMono px-1 max-w-lg lg:max-w-none lg:w-4/5 lg:px-0 lg:text-left space-y-5">
        <div className="bg-base-300 p-4 rounded-2xl">
          <p className="m-0 text-xl md:text-sm lg:text-base">
            Build Farcaster Frames with our 'no-code' Frames Builder. <br></br>  Easily start with pre-built templates. <br></br> Create transaction Frames in seconds.
          </p>
        </div>
        <Link
          href="/dashboard"
          style={{ fontSize: 20 }}
          className="btn btn-primary btn-md border-1 border-black hover:border-black hover:border-1 rounded-2xl px-14 font-bold shadow-none"
        >
          Get Started
        </Link>
        <PopupButton id="oNSMcTf6" style={{ fontSize: 20 }} className="btn btn-primary btn-md border-1 border-black hover:border-black hover:border-1 rounded-2xl px-14 font-bold shadow-none">
      Contact Us
    </PopupButton>
      </div>
    </div>
    <div className="divider"></div>
    <div className="grid grid-cols-4 gap-6">
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <BuildingStorefrontIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Manage your store and products  and <b>attest</b> order receipts using <b>EAS</b></p>
      </div>
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <GlobeAltIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Take your existing store into the web3 world with our <b>shopify integration</b></p>
      </div>
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <BanknotesIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Collect payments for orders using onchain methods for <b>USDC</b> on <b>BASE</b></p>
      </div>
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <ChartBarIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Track how each product is selling and ship changes <b>instantly</b></p>
      </div>
    </div>{" "}
    <div className="divider"></div>
    <div className="grid grid-cols-3 gap-6">
      <Image alt="Farcaster logo" style={{ filter: "grayscale(100%)" }} width={500} height={500} className="cursor-pointer" src="/farcaster-logo.png" />
      {/* <Image alt="Warpcast logo" style={{ filter: "grayscale(100%)" }} width={100} height={100} className="cursor-pointer" src="/warpcast-logo2.png" /> */}
      <Image alt="Base logo" style={{ filter: "grayscale(100%)" }} width={500} height={500} className="cursor-pointer" src="/base-logo.svg" />
      <Image alt="Polygon logo" style={{ filter: "grayscale(100%)" }} width={500} height={500} className="cursor-pointer" src="/polygon-logo.png" />
    </div>{" "}
  </div>
);