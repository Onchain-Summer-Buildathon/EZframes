import { InternalFrameJSON } from "~~/types/commontypes";

export const makeFrogFrame = (frame: { image: any; intents: any }) => {
  const frogFrame: InternalFrameJSON = {
    // @ts-ignore
    image: {},
    intents: [],
  };

  if (frame.image.type === "html") {
    frogFrame.image = {
      type: "html",
      props: { style: frame.image.style },
      content: frame.image.content,
    };
  }

  if (frame.image.type === "src") {
    frogFrame.image = {
      type: "src",
      src: frame.image.src,
    };
  }

  frogFrame.intents = frame.intents.map((intent: any) => {
    return {
      type: intent.type,
      props: {
        value: intent.value,
        action: intent?.action,
        placeholder: intent?.placeholder,
        target: intent?.target,
        href: intent?.href,
        location: intent?.location,
      },
      content: intent.label,
    };
  });

  return frogFrame;
};
