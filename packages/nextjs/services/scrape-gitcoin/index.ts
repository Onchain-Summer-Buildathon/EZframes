"use server";

import { GATEWAY_URL, JWT } from "../svg/uploadToIPFS";
import sharp from "sharp";

export const convertAndUploadSVG = async (svgContent: string) => {
  try {
    const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
    const blob = new Blob([pngBuffer], { type: "image/png" });
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("pinataMetadata", JSON.stringify({ name: "image" + Date.now().toString() }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    };
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", options);
    const data = await response.json();
    const imageUrl = `${GATEWAY_URL}/${data.IpfsHash}`;
    return imageUrl;
  } catch (error) {
    console.error("Error during conversion or upload:", error);
  }
};
