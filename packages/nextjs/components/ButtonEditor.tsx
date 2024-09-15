import { useEffect, useState } from "react";
import CustomButton from "./Button/CustomButton";
import { FrameButtonMetadata } from "@coinbase/onchainkit";
import { MenuItem, Select, TextField } from "@mui/material";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById, removeUrl } from "~~/services/frames";
import { Frame, Intent } from "~~/types/commontypes";

interface ButtonEditorProps {
  button: Intent;
  onSave: (button: FrameButtonMetadata) => void;
  onDelete: () => void;
}

const ButtonEditor = ({ button, onSave, onDelete }: ButtonEditorProps) => {
  console.log({ onSave });
  const { frames: dbFrames, frame } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>();

  useEffect(() => {
    if (dbFrames) {
      Promise.all(dbFrames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [dbFrames]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
        Button Label
      </label>
      <TextField id="buttonLabel" size="small" value={button.content as string} />
      <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
        Button Type
      </label>
      <Select id="buttonType" value={button.type} variant="outlined" size="small">
        <MenuItem value="Button">Button</MenuItem>
        <MenuItem value="Button.Link">Link</MenuItem>
        <MenuItem value="Button.Mint">Mint</MenuItem>
        <MenuItem value="Button.Reset">Reset</MenuItem>
        <MenuItem value="Button.Location">Location</MenuItem>
        <MenuItem value="Button.Transaction">Transaction</MenuItem>
      </Select>
      {button.type === "Button" && (
        <>
          <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
            Button Value
          </label>
          <TextField id="buttonValue" size="small" value={button.props.value as string} />
          <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
            Next Frame
          </label>
          <Select id="post" size="small" value={removeUrl(button.props.action as string)} variant="outlined">
            {frames?.map(
              (f, index) =>
                f._id !== frame?._id && (
                  <MenuItem key={index} value={f._id}>
                    {f.name}
                  </MenuItem>
                ),
            )}
          </Select>
        </>
      )}
      {button.type === "Button.Link" && (
        <>
          <label htmlFor="buttonHref" className="block text-sm font-medium text-gray-700 mb-1">
            Button href
          </label>
          <TextField id="buttonHref" size="small" value={button.props.href as string} />
        </>
      )}
      {button.type === "Button.Mint" && (
        <>
          <label htmlFor="buttonMint" className="block text-sm font-medium text-gray-700 mb-1">
            Mint Target
          </label>
          <TextField id="buttonMint" size="small" value={button.props.target as string} />
        </>
      )}
      {button.type === "Button.Location" && (
        <>
          <label htmlFor="buttonLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Button Location
          </label>
          <TextField id="buttonLocation" size="small" value={button.props.location as string} />
        </>
      )}
      {button.type === "Button.Transaction" && (
        <>
          <label htmlFor="buttonTx" className="block text-sm font-medium text-gray-700 mb-1">
            Tx Success
          </label>
          <Select id="post" size="small" value={removeUrl(button.props.action as string)} variant="outlined">
            {frames?.map(
              (f, index) =>
                f._id !== frame?._id && (
                  <MenuItem key={index} value={f._id}>
                    {f.name}
                  </MenuItem>
                ),
            )}
          </Select>
        </>
      )}
      <CustomButton buttonType="delete" variant="contained" onClick={onDelete} size="small">
        Delete Button
      </CustomButton>
    </div>
  );
};

export default ButtonEditor;
