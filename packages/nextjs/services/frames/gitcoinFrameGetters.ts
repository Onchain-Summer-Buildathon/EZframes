import { FrameMetadataType } from "@coinbase/onchainkit";
import { APP_URL } from "~~/constants";
import { svgDescriptionTemplate, svgTemplate } from "~~/utils";

//TODO: make svgs betetr
export const GetGitcoinLogoFrame = (
  journey_id: string,
  frame_id_1: string,
  frame_id_2: string,
  title: string,
  daysToGo: string,
  fundingRecieved: string,
) => {
  const svg = svgTemplate(title, daysToGo, fundingRecieved);
  // TODO: Get Pinata URL from API and place in image below
  const LOGO_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + frame_id_2,
        label: "Learn More",
      },
    ],
    image: {
      src: "https://picsum.photos/id/237/200/300",
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id_1,
    },
  };
  return LOGO_FRAME;
};

export const GetGitcoinDescriptionFrame = (
  journey_id: string,
  frame_id: string,
  next_frame_id: string,
  title: string,
  description: string,
) => {
  const descsvg = svgDescriptionTemplate(title, description);
  // TODO: get PINATA URL and place in image below
  const DESCRIPTION_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + next_frame_id,
        label: "Donate",
      },
    ],
    image: {
      src: "https://via.placeholder.com/150",
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  };
  return DESCRIPTION_FRAME;
};
