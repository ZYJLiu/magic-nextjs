import React from "react"
// import TableOfContents from "../components/table-of-contents"
import AppHeader from "../app-header"
import Wallet from "../wallet"
import WalletMethods from "../wallet-methods"
// import SigningMethods from "../components/signing"
// import SendTransaction from "../components/send-transaction"
// import Erc20Tokens from "../components/erc20-tokens"
// import SmartContracts from "../components/contracts"
// import NFTs from "../components/nfts"
import Links from "../links"
import Spacer from "../ui/spacer"
import HomePageBackground from "public/main.svg"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Home({ setAccount }: Props) {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${HomePageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={32} />
      <Links />
      <Spacer size={120} />
      {/* <TableOfContents /> */}
      <div className="cards-container">
        <Wallet setAccount={setAccount} />
        <WalletMethods setAccount={setAccount} />
        {/* <SendTransaction /> */}
        {/* <Erc20Tokens /> */}
        {/* <NFTs /> */}
        {/* <SmartContracts /> */}
        {/* <SigningMethods /> */}
        <Spacer size={15} />
        <Links dark />
        <Spacer size={30} />
      </div>
    </div>
  )
}
