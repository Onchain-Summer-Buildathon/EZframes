import { TRIAL_FRAME } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { makeFrogFrame } from "~~/utils/general";

function FrameRender() {
  const { currentFrame } = useProductJourney();
  if (!currentFrame) return null;
  const frame = makeFrogFrame(TRIAL_FRAME);
  const textInput = frame.intents.find((intent: any) => intent.type === "TextInput");
  const buttons = frame.intents.filter((intent: any) => intent.type.includes("Button"));
  return (
    <>
      {/*@ts-ignore */}
      {frame.image.type === "html" && <div style={frame.image.props.style}>{frame.image.content}</div>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {frame.image.type === "src" && <img src={frame.image.src} alt="Product" />}
      {textInput && (
        <input
          className="w-full p-2 border mt-1 border-gray-400 rounded bg-white" // Set background color to white
          type="text"
          placeholder={textInput?.props?.placeholder}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "4px",
          gap: "4px",
        }}
      >
        {buttons.map((intent: any, index: number) => {
          return (
            <button
              type="button"
              className="btn bg-black rounded-md text-white px-4 py-2"
              style={{
                flex: "1 1 0px",
                cursor: "pointer",
              }}
              key={index}
            >
              {intent.content}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default FrameRender;
