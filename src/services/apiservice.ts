import axios from "axios";
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}`;

export const getNFTDetails = async (nftAddress: string, tokenId: string) => {
  try {
    const response = await axios.get(
      `${ALCHEMY_URL}/getNFTMetadata?contractAddress=${nftAddress}&tokenId=${tokenId}`
    );
    return response.data.metadata;
  } catch (error) {
    return "";
  }
};
