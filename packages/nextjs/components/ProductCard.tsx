"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PencilIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  name: string;
  image: string;
  id: string;
}
const ProductCard: React.FC<ProductCardProps> = ({ name, image, id }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div className="card bg-base-100 w-full md:w-[20vw] h-[200px] md:h-[150px] rounded-2xl relative">
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="Image Alt Text" className="object-cover w-full h-full rounded-2xl" />
      </figure>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/40 rounded-t-2xl"></div>
      <div className="card-body absolute bottom-0 w-full text-white">
        <h3 className="card-title text-lg md:text-3xl font-bold">{name}</h3>
        <div className="card-actions flex justify-end mt-2 space-x-2">
          <button className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200">
            <PencilIcon className="h-4 w-4 text-gray-700" />
          </button>
          <button
            className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={handleCardClick}
          >
            <ArrowRightIcon className="h-4 w-4 text-gray-700 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
