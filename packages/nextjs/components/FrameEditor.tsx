import React, { useEffect, useState } from "react";
import ButtonList from "./ButtonsList";
import InputField from "./InputField";
import { MenuItem, Select, TextField } from "@mui/material";
import { TRIAL_FRAME } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { makeFrogFrame } from "~~/utils/general";

const FrameEditor = () => {
  const { frame, setFrame, currentFrame, setCurrentFrame } = useProductJourney();
  const [imageUrlOption, setImageUrlOption] = useState("url");
  const [htmlInput, setHtmlInput] = useState("");
  // @ts-ignore
  const [imageUrl, setImageUrl] = useState(currentFrame?.image?.src || "");
  const getImageResponse = async (html: string) => {
    const response = await fetch(`/api/imageGeneration`, {
      body: JSON.stringify({ html }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    return data.url;
  };

  const handleImageUrlChange = (value: string) => {
    setImageUrl(value);
    if (!currentFrame) return;
    setCurrentFrame({
      ...currentFrame,
      image: {
        // @ts-ignore
        ...currentFrame?.image,
        src: value,
        aspectRatio: "1:1",
      },
    });
  };

  const handleHtmlToImage = async () => {
    const result = await getImageResponse(htmlInput);
    setImageUrl(result);
    if (!currentFrame) return;
    setCurrentFrame({
      ...currentFrame,
      image: {
        // @ts-ignore
        ...currentFrame.image,
        src: result,
        aspectRatio: "1:1",
      },
    });
  };
  useEffect(() => {
    // @ts-ignore
    setImageUrl(currentFrame?.image?.src || "");
  }, [currentFrame]);
  if (!currentFrame) return null;
  const frogFrame = makeFrogFrame(TRIAL_FRAME);
  const textInput = frogFrame.intents.find(intent => intent.type === "TextInput");
  return (
    <div className="bg-white flex flex-col gap-4 p-4 h-[100%]">
      <label className="block text-sm font-medium text-gray-700">Frame Name</label>
      <TextField
        size="small"
        id="outlined-basic"
        variant="outlined"
        value={frame?.name}
        fullWidth
        onChange={e => {
          if (!frame) return;
          setFrame({
            ...frame,
            name: e.target.value,
          });
        }}
      />
      <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
        Image/Text{" "}
      </label>
      <Select
        id="imageInput"
        value={imageUrlOption}
        onChange={e => {
          setImageUrlOption(e.target.value);
        }}
        variant="outlined"
      >
        <MenuItem value="url">URL</MenuItem>
        <MenuItem value="html">TEXT</MenuItem>
      </Select>{" "}
      {imageUrlOption === "url" ? (
        <InputField
          id="imageUrl"
          label="Enter Image URL"
          value={imageUrl}
          onChange={value => handleImageUrlChange(value)}
          placeholder="Image URL"
        />
      ) : (
        <div className="flex flex-col gap-2">
          <InputField
            id="htmlInput"
            label="Enter Text"
            value={htmlInput}
            onChange={value => setHtmlInput(value)}
            placeholder="HTML Code"
          />
          <button onClick={handleHtmlToImage} className="btn btn-primary">
            Convert Text to Image
          </button>
        </div>
      )}
      {textInput && (
        <>
          <label htmlFor="additionalInput" className="block text-sm font-medium text-gray-700">
            Text Input
          </label>
          <TextField
            size="small"
            id="additionalInput"
            value=""
            onChange={e => {
              setCurrentFrame({
                ...currentFrame,
                input: {
                  ...currentFrame?.input,
                  text: e.target.value,
                },
              });
            }}
            // @ts-ignore
            placeholder={textInput.props.placeholder}
          />
        </>
      )}
      <ButtonList />
    </div>
  );
};

export default FrameEditor;
