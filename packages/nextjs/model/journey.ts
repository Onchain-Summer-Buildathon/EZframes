import mongoose, { Document, Schema } from "mongoose";

interface JourneyDocument extends Document {
  walletAddress: string;
  name: string;
  desc?: string;
  image?: string;
  frames: string[];
}

// Define the Journey schema
const JourneySchema: Schema<JourneyDocument> = new Schema<JourneyDocument>(
  {
    walletAddress: String,
    name: String,
    desc: String,
    image: String,
    frames: [String],
  },
  {
    timestamps: true,
  },
);

// Define and export the Journey model
const Journey = mongoose.models.Journey || mongoose.model<JourneyDocument>("Journey", JourneySchema);

export default Journey;
