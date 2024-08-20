import { uploadToIPFS } from "../svg/uploadToIPFS";
import { FrameMetadataType } from "@coinbase/onchainkit";
import { APP_URL } from "~~/constants";
import { svgDescriptionTemplate, svgTemplate } from "~~/utils";

//TODO: make svgs betetr
export const GetGitcoinLogoFrame = async (
  journey_id: string,
  frame_id_1: string,
  frame_id_2: string,
  title: string,
  daysToGo: string,
  fundingRecieved: string,
) => {
  const svg = svgTemplate(title, daysToGo, fundingRecieved);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const image_url = await uploadToIPFS(blob, "image1");
  const LOGO_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + frame_id_2,
        label: "Learn More",
      },
    ],
    image: {
      src: image_url,
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id_1,
    },
  };
  return LOGO_FRAME;
};

export const GetGitcoinDescriptionFrame = async (
  journey_id: string,
  frame_id: string,
  targetUrl: string,
  title: string,
  description: string,
) => {
  const descsvg = svgDescriptionTemplate(title, description);
  const blob = new Blob([descsvg], { type: "image/svg+xml" });
  const image_url = await uploadToIPFS(blob, "image2");
  const DESCRIPTION_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post_redirect",
        target: targetUrl,
        label: "Donate",
      },
    ],
    image: {
      src: image_url,
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  };
  return DESCRIPTION_FRAME;
};
