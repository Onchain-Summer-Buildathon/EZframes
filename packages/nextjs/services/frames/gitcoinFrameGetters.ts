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
        target: frame_id_2,
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
  const jpegBuffer = await convertSvgBlobToJpegBuffer(blob);
  const file = new Blob([jpegBuffer], { type: "image/jpeg" });
  const image_url = await uploadToIPFS(file, "image2");
  console.log("image_url", image_url);

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
      src: image_url,
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  };
  return DESCRIPTION_FRAME;
};

// Function to convert SVG Blob to JPEG Buffer
function convertSvgBlobToJpegBuffer(svgBlob: Blob, width = 1200, height = 600): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    img.onload = () => {
      try {
        // Draw the SVG onto the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas to a Blob (JPEG format)
        canvas.toBlob(jpegBlob => {
          if (jpegBlob) {
            // Read the Blob into a memory buffer
            const reader = new FileReader();
            reader.onload = function () {
              const arrayBuffer = reader.result as ArrayBuffer; // Type assertion
              const jpegBuffer = new Uint8Array(arrayBuffer);
              resolve(jpegBuffer); // Resolve with the JPEG buffer
            };
            reader.onerror = () => reject(new Error("Failed to read Blob as ArrayBuffer"));
            reader.readAsArrayBuffer(jpegBlob);
          } else {
            reject(new Error("Canvas conversion to Blob failed"));
          }
        }, "image/jpeg"); // Change MIME type to image/jpeg
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = reject;

    // Convert the SVG Blob to a data URL and set it as the image source
    const svgUrl = URL.createObjectURL(svgBlob);
    img.src = svgUrl;

    // Clean up the object URL after it's used
    img.onload = () => {
      URL.revokeObjectURL(svgUrl);
    };
  });
}
