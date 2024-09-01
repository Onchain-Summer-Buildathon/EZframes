import React, { useMemo, useState } from "react";
import { queryClient } from "./ScaffoldEthAppWithProviders";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { createJourney } from "~~/services/frames";
import { initJourneyWithFrames } from "~~/services/frames/initScript";
import { notification } from "~~/utils/scaffold-eth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductTemplate: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { address } = useAccount();
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState("");
  const handleClose = () => {
    setProductName("");
    setProductDesc("");
    onClose();
  };

  const initProductJourneyMutation = useMutation({
    mutationFn: async (data: any) => {
      await initJourneyWithFrames(data._id, productImage);
    },
    onSuccess: () => {
      notification.success("Product journey created successfully");
      handleClose();
    },
    onError: () => {
      notification.error("Product journey creation failed");
    },
  });
  const handleJourneyMutation = useMutation({
    mutationFn: async () => {
      const newProduct = await createJourney({
        name: productName,
        desc: productDesc,
        image: productImage,
        walletAddress: address as string,
      });
      return newProduct;
    },
    onSuccess: (data: any) => {
      initProductJourneyMutation.mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ["myFrames"] });
    },
    onError: () => {
      notification.error("Journey Creation failed");
    },
  });

  const isPending = useMemo(() => {
    return initProductJourneyMutation.isPending || handleJourneyMutation.isPending;
  }, [initProductJourneyMutation.isPending, handleJourneyMutation.isPending]);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 overflow-y-auto w-[100%]">
      <DialogTitle className="text-center">Product Template</DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-[600px]">
        <TextField
          label="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Product Description"
          value={productDesc}
          onChange={e => setProductDesc(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Product Image"
          value={productImage}
          onChange={e => setProductImage(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" className="text-gray-500 hover:text-gray-600">
          Cancel
        </Button>
        <Button
          onClick={() => handleJourneyMutation.mutateAsync()}
          disabled={isPending}
          color="primary"
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600"
        >
          {isPending ? <span className="loading loading-spinner loading-lg" /> : "Create Journey"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductTemplate;
