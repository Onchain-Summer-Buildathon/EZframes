const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
export const uploadToIPFS = async (file: any, name: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify({ name }));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: formData,
  };
  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", options);
  const data = await response.json();
  const imageUrl = `${GATEWAY_URL}/${data.IpfsHash}`;
  return imageUrl;
};
