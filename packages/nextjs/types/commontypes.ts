import { FrameMetadataType } from "@coinbase/onchainkit";

export interface Journey {
  _id: string;
  walletAddress: string;
  name: string;
  desc?: string;
  image?: string;
  frames: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Frame {
  _id: string;
  name: string;
  frameJson: FrameMetadataType;
}
