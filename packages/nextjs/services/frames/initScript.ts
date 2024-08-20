import { createFrame, saveFrame, saveJourney } from "../frames";
import { GetBuyFrame, GetDescriptionFrame, GetEmailFrame, GetProductFrame, GetSuccessFrame } from "./frameGetters";
import { GetGitcoinDescriptionFrame, GetGitcoinLogoFrame } from "./gitcoinFrameGetters";
import { FrameMetadataType } from "@coinbase/onchainkit";

export const initJourneyWithFrames = async (
  journeyId: string,
  productPrice: string,
  productDesc: string,
  productImage: string,
) => {
  const Frames = [];
  for (let i = 0; i <= 4; i++) {
    const frameBody: FrameMetadataType = {
      image: "https://via.placeholder.com/150",
    };
    const Frame = await createFrame({
      name: "Frame",
      frameJson: frameBody,
    });
    Frames.push(Frame._id);
  }
  // First Frame
  const ProductFrameJson = await GetProductFrame(journeyId, Frames[0], Frames[1], Frames[2], productImage);
  const status = await saveFrame({
    _id: Frames[0],
    name: "Product Frame",
    frameJson: ProductFrameJson,
  });
  console.log("Product Frame Status", status);
  // Second Frame
  const DescriptionFrameJson = await GetDescriptionFrame(journeyId, Frames[1], Frames[2], productDesc);
  const desStatus = await saveFrame({
    _id: Frames[1],
    name: "Description Frame",
    frameJson: DescriptionFrameJson,
  });
  console.log("Description Frame Status", desStatus);
  // Third Frame
  const emailFrameJson = await GetEmailFrame(journeyId, Frames[2], Frames[3], productImage);
  const emailFrameStatus = await saveFrame({
    _id: Frames[2],
    name: "Email Frame",
    frameJson: emailFrameJson,
  });
  console.log("Email Frame Status", emailFrameStatus);
  // Fourth Frame
  const BuyFrameJson = await GetBuyFrame(journeyId, Frames[3], Frames[4]);
  const buyStatus = await saveFrame({
    _id: Frames[3],
    name: "Buy Frame",
    frameJson: BuyFrameJson,
  });
  console.log("Buy Frame Status", buyStatus);
  //Fifth Frame
  const SuccessFrameJson = await GetSuccessFrame(journeyId, Frames[4]);
  const sucStatus = await saveFrame({
    _id: Frames[4],
    name: "Success Frame",
    frameJson: SuccessFrameJson,
  });
  console.log("Success Frame Status", sucStatus);
  // Saving to journey
  const journey = await saveJourney({
    _id: journeyId,
    frames: Frames,
  });
  return journey;
};

export const initGitcoinJourney = async (journeyId: string, data: any) => {
  const Frames = [];
  for (let i = 0; i <= 1; i++) {
    const frameBody: FrameMetadataType = {
      image: "https://via.placeholder.com/150",
    };
    const Frame = await createFrame({
      name: "Frame",
      frameJson: frameBody,
    });
    Frames.push(Frame._id);
  }
  // First Frame Logo Frame
  const LogoFrameJson = await GetGitcoinLogoFrame(
    journeyId,
    Frames[0]._id,
    Frames[1]._id,
    data.title,
    data.timeLeft,
    data.currentFundingRecieved,
  );
  await saveFrame({
    _id: Frames[0],
    name: "Gitcoin Logo Frame",
    frameJson: LogoFrameJson,
  });

  const DescriptionFrameJson = await GetGitcoinDescriptionFrame(
    journeyId,
    Frames[1]._id,
    data.url,
    data.title,
    data.textContent[3],
  );
  await saveFrame({
    _id: Frames[1],
    name: "Gitcoin Description Frame",
    frameJson: DescriptionFrameJson,
  });
  const journey = await saveJourney({
    _id: journeyId,
    frames: Frames,
  });
  return journey;
};
