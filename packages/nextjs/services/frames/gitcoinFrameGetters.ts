import { convertAndUploadSVG } from "../scrape-gitcoin";
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
  const image_url = await convertAndUploadSVG(svg);
  const LOGO_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: frame_id_2,
        label: "Learn More",
      },
    ],
    image: {
      src: image_url as string,
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
  const image_url = await convertAndUploadSVG(descsvg);
  const DESCRIPTION_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "link",
        target: targetUrl,
        label: "Donate & Learn More",
      },
      {
        action: "link",
        target: `${APP_URL}`,
        label: "Checkout the builder",
      },
    ],
    image: {
      src: image_url as string,
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  };
  return DESCRIPTION_FRAME;
};
