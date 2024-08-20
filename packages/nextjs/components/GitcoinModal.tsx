import React, { useState } from "react";
import { queryClient } from "./ScaffoldEthAppWithProviders";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { createJourney } from "~~/services/frames";
import { initGitcoinJourney } from "~~/services/frames/initScript";
import { scrapeGitCoinURL } from "~~/services/scrape-gitcoin";
import { notification } from "~~/utils/scaffold-eth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GitCoinTemplate: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { address } = useAccount();
  const [gitcoinUrl, setGitcoinUrl] = useState("");

  const handleClose = () => {
    setGitcoinUrl("");
    onClose();
  };

  const handleGitCoinJourney = useMutation({
    mutationFn: async (data: any) => {
      const newProduct = await createJourney({
        name: "Gitcoin Project",
        desc: "Gitcoin Project",
        image: data.src as string,
        walletAddress: address as string,
      });
      return {
        journey: newProduct,
        gitcoinData: data,
      };
    },
    onSuccess: (data: any) => {
      console.log(data);
      initGitcoinJourney(data.journey._id, data.gitcoinData);
      queryClient.invalidateQueries({ queryKey: ["myFrames"] });
    },
    onError: () => {
      notification.error("Gitcoin fetching failed");
    },
  });

  const handleGitCoin = useMutation({
    mutationFn: async (url: string) => {
      const data = await scrapeGitCoinURL(url);
      return data;
    },
    onSuccess: (data: any) => {
      handleGitCoinJourney.mutateAsync(data);
      console.log(data);
    },
    onError: () => {
      notification.error("Gitcoin fetching failed");
    },
  });
  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 overflow-y-auto w-[100%]">
      <DialogTitle className="text-center">Gitcoin Project</DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-[600px]">
        <TextField
          label="Gitcoin URL"
          value={gitcoinUrl}
          onChange={e => setGitcoinUrl(e.target.value)}
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
          onClick={() => handleGitCoin.mutateAsync(gitcoinUrl)}
          color="primary"
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GitCoinTemplate;
