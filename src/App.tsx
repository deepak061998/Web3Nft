import React, { useEffect } from "react";
import "./App.css";
import NftListing from "./component/NftListing";
import { useQuery } from "@apollo/client";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 NFT </h1>
      </header>
      <NftListing />
    </div>
  );
}

export default App;
