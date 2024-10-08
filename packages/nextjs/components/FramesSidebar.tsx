import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TRIAL_FRAME } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame, InternalFrameJSON } from "~~/types/commontypes";

const thumbnailImageStyle = {
  width: "100%",
  maxWidth: "100px",
  height: "auto",
  maxHeight: "50px",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const sidebarStyle = {
  height: "90%",
  padding: "10px",
  overflowY: "auto",
  boxSizing: "border-box",
};

const thumbnailStyle = {
  padding: "10px",
  height: "150px",
  marginBottom: "10px",
  boxShadow: "2px 2px 2px grey",
  cursor: "pointer",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "black",
  borderRadius: "15px",
  transition: "background-color 0.3s",
};
const thumbnailActiveStyle = {
  ...thumbnailStyle,
  backgroundColor: "#c0c0c0",
};
function FrameSidebar() {
  const { productQuery, frame, setFrame, setCurrentFrame, createFrame } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);
  const [currentFrameId, setCurrentFrameId] = useState<string>(frame?._id as string);

  const framesQuery = useQuery({
    queryKey: ["frames", productQuery.data], // Query key
    queryFn: () => {
      if (!productQuery.data) return;
      return Promise.all(productQuery?.data?.frames.map(frame => getFrameById(frame)));
    },
  });
  useEffect(() => {
    if (framesQuery.data) {
      setFrames(framesQuery?.data);
    }
  }, [framesQuery.data]);

  useEffect(() => {
    setCurrentFrameId(frame?._id as string);
  }, [frame]);

  const onCreate = async () => {
    await createFrame.mutateAsync({
      name: "Frame",
      frameJson: TRIAL_FRAME as InternalFrameJSON,
      connectedTo: [],
    });
  };

  if (!frames) return null;
  return (
    <div className="bg-white flex flex-col p-4 h-[100%]">
      <div style={sidebarStyle as React.CSSProperties}>
        {frames.map(slide => (
          <div
            key={slide._id}
            style={slide._id === currentFrameId ? thumbnailActiveStyle : thumbnailStyle}
            onClick={() => {
              setCurrentFrameId(slide._id as string);
              setFrame(slide);
              setCurrentFrame(slide.frameJson);
            }}
          >
            {slide.frameJson.image.type === "html" && (
              <div style={thumbnailImageStyle}>{slide.frameJson.image.content}</div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {slide.frameJson.image.type === "src" && <img src={slide.frameJson.image.src} alt="Product" />}
            <div style={{ alignItems: "center", justifyContent: "center", display: "flex", marginTop: "-0px" }}>
              {slide.name}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-center w-full">
        <button onClick={onCreate} className="btn btn-primary w-full">
          Create
        </button>
      </div>
    </div>
  );
}

export default FrameSidebar;
