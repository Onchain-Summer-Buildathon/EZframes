"use server";

import { revalidatePath } from "next/cache";
import { GATEWAY_URL, JWT } from "../svg/uploadToIPFS";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import sharp from "sharp";

export const scrapeGitCoinURL = async (url: string) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
    const data1 = await page.evaluate(() => document?.querySelector("*")?.outerHTML);
    const textContent: any = [];
    let title = "";
    let currentFundingRecieved = "";
    let contributors = "";
    let timeLeft = "";
    if (!data1) {
      await browser.close();
      return null;
    }
    const $ = cheerio?.load(data1 as string);
    const image = $("img.h-32.w-full.object-cover.lg\\:h-80.rounded.md\\:rounded-3xl");
    const src = image.attr("src");
    let createdOnText = "";
    $("*").each((index, element) => {
      const text = $(element).text().trim();
      if (text.startsWith("Created on")) {
        createdOnText = text;
        return false; // Break the loop once found
      }
    });
    $("h1, h2, h3, h4, p").each((index, element) => {
      if (index === 0) {
        currentFundingRecieved = $(element).text().trim();
      } else if (index === 1) {
        contributors = $(element).text().trim();
      } else if (index === 2) {
        timeLeft = $(element).text().trim();
      } else if (index === 3) {
        title = $(element).text().trim();
      } else {
        const content = $(element).text().trim();
        textContent.push(content);
      }
    });
    const hrefs: any = [];
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href) {
        hrefs.push(href);
      }
    });
    const filteredHrefs = hrefs.filter((href: string) => href.includes("github.com") || href.includes("twitter.com"));
    const data = {
      title,
      currentFundingRecieved,
      contributors,
      timeLeft,
      textContent,
      src,
      filteredHrefs,
      createdOnText,
    };
    await browser.close();
    revalidatePath("/");
    return { ...data, url };
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
