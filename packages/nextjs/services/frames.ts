import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Wallet, ethers } from "ethers";
import { APP_URL, myAddress } from "~~/constants";
import Order from "~~/model/order";
import { Frame, Journey } from "~~/types/commontypes";

export const getFrameById = async (id: string) => {
  try {
    const response = await fetch(`/api/frame/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getFrameAtServer = async (id: string) => {
  try {
    const response = await fetch(`${APP_URL}/api/frame/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const removeUrl = (url: string) => {
  if (!url) return "";
  return url.replace(`${APP_URL}/api/orchestrator/`, "");
};

export const createFrame = async (frame: Omit<Frame, "_id">) => {
  try {
    const response = await fetch(`/api/frame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createJourney = async (journey: Partial<Journey>) => {
  try {
    const response = await fetch(`/api/journey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journey),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // const newJourney = await initJourneyWithFrames(
    //   data._id as string,
    //   journey.price as string,
    //   journey.desc as string,
    //   journey.image as string,
    // );
    return;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const createGitcoinJourney = async (journey: Parial<Journey>) => {
  try {
    const response = await fetch(`/api/journey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journey),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const newJourney = await initJourneyWithGitcoinFrames(
      data._id as string,
      journey.price as string,
      journey.desc as string,
      journey.image as string,
    );
    return;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}

export const saveFrame = async (frame: Frame) => {
  try {
    const response = await fetch(`/api/frame/${frame._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const saveJourney = async (journey: Partial<Journey>) => {
  try {
    const response = await fetch(`/api/journey/${journey._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journey),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getJourneyById = async (id: string) => {
  if (id === "") return;
  try {
    const response = await fetch(`${APP_URL}/api/journey/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getAllTemplates = async () => {
  try {
    const response = await fetch(`/api/journey`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
