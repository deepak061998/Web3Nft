import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFavNFT } from "../redux/nft.slice";
import { GET_LENDINGS, GET_NFTS } from "../services/queries";
import {
  formateEthPrice,
  formateNftAddress,
  formateTokenId,
} from "../_utils/comman";
import "./nft.css";

const NftListing = () => {
  const dispatch = useDispatch();

  // Redux States
  const favNFTList = useSelector((state: any) => state?.nfts?.favNFTList);

  // Local States
  const [skip, setSkip] = useState(0);
  const [first, setFirst] = useState(10);
  const [currentPage, setCurrrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);

  //Get Lending data from GraphQL query
  const { loading, data } = useQuery(GET_LENDINGS, {
    variables: { skip, first },
  });

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

  return (
    <>
      <h2>NFT List</h2>
      <table>
        <thead>
          <th>IDs</th>
          <th>NFT Address</th>
          <th>Token Id</th>
          <th>Availability</th>
          <th> Collateral Required (NFT Price)</th>
          <th> Cost of Rent</th>
          <th> Action</th>
        </thead>
        {loading ? (
          "Loading ...."
        ) : (
          <tbody>
            {data?.lendings?.map((nft: any, index: number) => (
              <tr key={index}>
                <td>{nft?.id}</td>
                <td title={nft?.nftAddress}>
                  {formateNftAddress(nft?.nftAddress)}
                </td>
                <td title={nft?.tokenId}>{formateTokenId(nft?.tokenId)}</td>
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
      <button disabled={currentPage <= 0} onClick={handlePreviousPage}>
        Previous
      </button>
      {currentPage}{" "}
      <button disabled={currentPage >= totalPage} onClick={handleNextPage}>
        Next
      </button>
    </>
  );
};

export default NftListing;
