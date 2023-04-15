import { useEffect, useState } from "react"
import Divider from "../ui/divider"
import Loading from "public/loading.svg"
import Network from "../network"
import CardLabel from "../ui/card-label"
import Card from "../ui/card"
import CardHeader from "../ui/card-header"
import { useMagic } from "../../libs/magic"
import { Networks } from "../../utils/networks"
import Image from "next/image"

// import { web3 } from "../../libs/web3"
import Web3 from "web3"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const UserInfo = ({ setAccount }: Props) => {
  const magic = useMagic()

  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    if (magic) {
      setWeb3(new Web3((magic as any).rpcProvider))
    }
  }, [magic])

  const [balance, setBalance] = useState("...")
  const [copied, setCopied] = useState("Copy")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const publicAddress = localStorage.getItem("user")
  const network = localStorage.getItem("network")
  const tokenSymbol = network === Networks.Polygon ? "MATIC" : "ETH"

  const disconnect = async () => {
    if (magic) {
      await magic.wallet.disconnect()
      localStorage.removeItem("user")
      setAccount(null)
    }
  }

  const copy = () => {
    if (publicAddress && copied === "Copy") {
      setCopied("Copied!")
      navigator.clipboard.writeText(publicAddress)
      setTimeout(() => {
        setCopied("Copy")
      }, 1000)
    }
  }

  const getBalance = async () => {
    if (publicAddress && web3) {
      const balance = await web3.eth.getBalance(publicAddress)
      setBalance(web3.utils.fromWei(balance))
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  return (
    <Card>
      <CardHeader id="wallet">Wallet</CardHeader>
      <CardLabel
        leftHeader="Status"
        rightAction={<div onClick={disconnect}>Disconnect</div>}
        isDisconnect
      />
      <div className="flex-row">
        <div className="green-dot" />
        <div className="connected">Connected</div>
      </div>
      <Divider />
      <CardLabel leftHeader="Network" />
      <Network />
      <Divider />
      <CardLabel
        leftHeader="Address"
        rightAction={<div onClick={copy}>{copied}</div>}
      />
      <div className="code">{publicAddress}</div>
      <Divider />
      <CardLabel
        style={{ height: "20px" }}
        leftHeader="Balance"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <Image className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsRefreshing(true)
                setTimeout(() => {
                  setIsRefreshing(false)
                }, 500)
                getBalance()
              }}
            >
              Refresh
            </div>
          )
        }
      />
      <div className="code">
        {balance.substring(0, 7)} {tokenSymbol}
      </div>
    </Card>
  )
}

export default UserInfo