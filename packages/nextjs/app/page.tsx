"use client";

import type { NextPage } from "next";
import { Banner } from "~~/components/Banner";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center flex-col flex-grow page">
      <Banner />
    </div>
  );
};

export default Home;
