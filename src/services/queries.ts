import { gql } from "@apollo/client";

// export const GET_NFTS = gql`
//   query GetNFTs($skip: Int, $first: Int) {
//     nfts(skip: $skip, first: $first) {
//       id
//       lending {
//         nftAddress
//         tokenId
//         nftPrice
//       }
//       renting {
//         cursor
//         renterAddress
//         rentDuration
//         rentedAt
//       }
//     }
//   }
// `;

export const GET_LENDINGS = gql`
  query GetLending($skip: Int, $first: Int, $where: Lending_filter) {
    lendings(skip: $skip, first: $first, where: $where) {
      id
      collateralClaimed
      dailyRentPrice
      lentAmount
      nftAddress
      nftPrice
      tokenId
    }
  }
`;
