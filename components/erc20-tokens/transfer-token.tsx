import React, { useCallback, useEffect, useState } from "react"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import { getTestTokenContract } from "../../utils/contracts"
import ErrorText from "../ui/error"
import { useMagicContext } from "@/context/magic-context"

const TransferToken = () => {
  const { web3 } = useMagicContext()
  const [toAddress, setToAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [disabled, setDisabled] = useState(!toAddress || !amount)
  const [toAddressError, setToAddressError] = useState(false)
  const [amountError, setAmountError] = useState(false)
  const publicAddress = localStorage.getItem("user")
  const contract = getTestTokenContract(web3!)

  useEffect(() => {
    setDisabled(!toAddress || !amount)
    setAmountError(false)
    setToAddressError(false)
  }, [amount, toAddress])

  const transferTestTokens = useCallback(() => {
    if (!web3?.utils.isAddress(toAddress)) {
      return setToAddressError(true)
    }
    if (isNaN(Number(amount))) {
      return setAmountError(true)
    }
    setDisabled(true)
    contract.methods
      .transfer(toAddress, web3.utils.toWei(amount))
      .send({ from: publicAddress })
      .on("transactionHash", (hash: string) => {
        console.log("Transaction hash:", hash)
      })
      .then((receipt: any) => {
        setToAddress("")
        setAmount("")
        console.log("Transaction receipt:", receipt)
      })
      .catch((error: any) => {
        setDisabled(false)
        console.error(error)
      })
  }, [web3, amount])

  return (
    <div>
      <CardLabel leftHeader="Send ERC20" />
      <FormInput
        value={toAddress}
        onChange={(e: any) => setToAddress(e.target.value)}
        placeholder="Receiving Address"
      />
      {toAddressError ? <ErrorText>Invalid address</ErrorText> : null}
      <FormInput
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
        placeholder="Amount of MTT"
      />
      {amountError ? (
        <ErrorText className="error">Invalid amount</ErrorText>
      ) : null}
      <FormButton
        onClick={transferTestTokens}
        disabled={!toAddress || !amount || disabled}
      >
        Transfer Tokens
      </FormButton>
    </div>
  )
}

export default TransferToken
