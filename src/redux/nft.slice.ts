import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  favNFTList: [],
};

export const nftSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    saveFavNFT: (state: any, action: PayloadAction<any>) => {
      state.favNFTList = [...action.payload];
    },
  },
});

export const { saveFavNFT } = nftSlice.actions;
