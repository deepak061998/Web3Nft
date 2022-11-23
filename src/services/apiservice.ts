import axios from "axios";
const ALCHEMY_API_KEY = "kdXFS8voyZSyViq5j65Y0tCKSCivnqM5";
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
