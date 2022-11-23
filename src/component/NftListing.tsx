import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { saveFavNFT } from "../redux/nft.slice";
import { GET_LENDINGS } from "../services/queries";
import {
  formateEthPrice,
  formateNftAddress,
  formateTokenId,
} from "../_utils/comman";
import "./nft.css";
import { getNFTDetails } from "../services/apiservice";

const NftListing = () => {
  const dispatch = useDispatch();

  // Redux States
  const favNFTList = useSelector((state: any) => state?.nfts?.favNFTList);

  // Local States
  const [skip, setSkip] = useState(0);
  const [first, setFirst] = useState(10);
  const [currentPage, setCurrrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);
  const [lendingData, setLendingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Get Lending data from GraphQL query
  const { loading, data } = useQuery(GET_LENDINGS, {
    variables: { skip, first, where: { collateralClaimed: true } },
  });

  const getNftData = async (lendingData: any) => {
    const nftDataArray: any = [];
    setIsLoading(true);
    for await (const nft of lendingData) {
      const nftInfo = await getNFTDetails(nft.nftAddress, nft.tokenId);
      nftDataArray.push({ ...nft, ...nftInfo });
    }
    setLendingData(nftDataArray);
    setIsLoading(false);
  };

  /**
   *  Favourite and Unfavourite the NFT's and update in local state
   */
  const handleFav = (nft: any) => {
    let favList = [...favNFTList];
    const favIndex = favList.findIndex((doc) => doc === nft.id);
    if (favIndex === -1) {
      favList.push(nft.id);
    } else {
      favList.splice(favIndex, 1);
    }
    dispatch(saveFavNFT(favList));
  };

  const handlePreviousPage = () => {
    setCurrrentPage(currentPage - 1);
    setSkip(currentPage * first);
  };
  const handleNextPage = () => {
    setCurrrentPage(currentPage + 1);
    setSkip(currentPage * first);
  };

  useEffect(() => {
    if (data && data.lendings && data.lendings.length) {
      getNftData(data?.lendings);
    }
  }, [data]);

  return (
    <>
      <h2>NFT List</h2>
      <button disabled={currentPage <= 0} onClick={handlePreviousPage}>
        Previous
      </button>
      {currentPage}{" "}
      <button disabled={currentPage >= totalPage} onClick={handleNextPage}>
        Next
      </button>
      <table>
        <thead>
          <th>IDs</th>
          <th>NFT Address</th>
          <th>Token Id</th>
          <th>NFT Title</th>
          <th>NFT Image</th>
          <th>Availability</th>
          <th> Collateral Required (NFT Price)</th>
          <th> Cost of Rent</th>
          <th> Action</th>
        </thead>
        {isLoading ? (
          "Loading ...."
        ) : (
          <tbody>
            {lendingData?.map((nft: any, index: number) => (
              <tr key={index}>
                <td>{nft?.id}</td>
                <td title={nft?.nftAddress}>
                  {formateNftAddress(nft?.nftAddress)}
                </td>
                <td title={nft?.tokenId}>{formateTokenId(nft?.tokenId)}</td>
                <td>{nft?.name}</td>
                <td>
                  <img className="nftImage" src={nft?.image} alt={nft?.name} />
                </td>

                <td>{nft?.collateralClaimed ? "Avilable" : "Not-Avilable"}</td>
                <td>{formateEthPrice(nft?.nftPrice, 18)} ETH</td>
                <td>{formateEthPrice(nft?.dailyRentPrice, 18)} ETH</td>
                <td>
                  <button type="button" onClick={() => handleFav(nft)}>
                    {favNFTList.find((doc: string) => doc === nft.id)
                      ? "favourite"
                      : "unfavourite"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};

export default NftListing;
