import React, { useState } from "react"
import FormButton from "../ui/form-button"
import { getTestTokenContract } from "../../utils/contracts"
import { useMagicContext } from "@/context/magic-context"

const MintToken = () => {
  const { web3 } = useMagicContext()
  const publicAddress = localStorage.getItem("user")
  const [disabled, setDisabled] = useState(false)
  const contract = getTestTokenContract(web3!)

  const mintTestTokens = () => {
    setDisabled(true)
    contract.methods
      .mint(web3?.utils.toWei("10"))
      .send({ from: publicAddress })
      .on("transactionHash", (hash: string) => {
        console.log("Transaction hash:", hash)
      })
      .then((receipt: any) => {
        setDisabled(false)
        console.log("Transaction receipt:", receipt)
      })
      .catch((error: any) => {
        setDisabled(false)
        console.error(error)
      })
  }

  return (
    <FormButton onClick={mintTestTokens} disabled={disabled}>
      Mint 10 Magic Test Tokens
    </FormButton>
  )
}

export default MintToken
