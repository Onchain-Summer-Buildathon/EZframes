export const makeFrogFrame = (frame: { image: any; intents: any }) => {
  const frogFrame: any = {};

  if (frame.image.type === "html") {
    frogFrame.image = {
      type: "div",
      props: { style: frame.image.style },
      content: frame.image.content,
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
