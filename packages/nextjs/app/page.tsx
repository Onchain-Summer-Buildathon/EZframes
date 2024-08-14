"use client";

import type { NextPage } from "next";
import { Banner } from "~~/components/Banner";
import Faq from "~~/components/Faq";

const Home: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10 page">
      <Banner />
      <Faq />
    </div>
  );
};

export default Home;
