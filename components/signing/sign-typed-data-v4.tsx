import React, { useCallback, useState } from "react"
import {
  recoverTypedSignature,
  SignTypedDataVersion,
} from "@metamask/eth-sig-util"
import FormButton from "../ui/form-button"
import CardLabel from "../ui/card-label"
import { signTypedDataV4Payload } from "../../utils/signTypedData-payload"
import { useMagicContext } from "@/context/magic-context"

const SignTypedDataV4 = () => {
  const { magic } = useMagicContext()
  const [disabled, setDisabled] = useState(false)
  const publicAddress = localStorage.getItem("user")

  const signTypedDataV4 = useCallback(async () => {
    if (!magic) return
    try {
      setDisabled(true)
      const params = [publicAddress, signTypedDataV4Payload]
      const method = "eth_signTypedData_v4"
      const signature = await magic.rpcProvider.request({
        method,
        params,
      })
      console.log("signature", signature)
      const recoveredAddress = recoverTypedSignature({
        data: signTypedDataV4Payload as any,
        signature,
        version: SignTypedDataVersion.V4,
      })
      console.log(
        recoveredAddress.toLocaleLowerCase() ===
          publicAddress?.toLocaleLowerCase()
          ? "Signing success!"
          : "Signing failed!"
      )
      setDisabled(false)
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [magic])

  return (
    <div>
      <CardLabel leftHeader="Sign Typed Data v4" />
      <FormButton onClick={signTypedDataV4} disabled={disabled}>
        Sign
      </FormButton>
    </div>
  )
}

export default SignTypedDataV4
