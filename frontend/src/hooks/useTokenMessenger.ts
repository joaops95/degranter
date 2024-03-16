import { useCallback } from 'react'


import { TokenMessenger__factory } from 'typechain/index'
// import { addressToBytes32 } from 'utils'
import { ethers } from "ethers";

import { getTokenMessengerContractAddress } from 'utils/addresses'
import { 
  useAccount
 } from "wagmi";


/**
 * Returns a list of methods to call the Token Messenger contract
 * @param chainId the ID of the current connected chain/network
 */
const useTokenMessenger = (chainId) => {
  const { library } = useAccount()

  const TOKEN_MESSENGER_CONTRACT_ADDRESS =
    getTokenMessengerContractAddress(chainId)

  /**
   * Returns transaction response from contract call
   * @param amount the amount to be deposit for burn on source chain
   * @param destinationDomain the Circle defined ID of target chain
   * @param mintRecipient the recipient address on target chain
   * @param burnToken the address of token to burn
   */
  const depositForBurn = useCallback(
    async (
      amount,
      destinationDomain,
      mintRecipient,
      burnToken
    ) => {
      if (!library) return
      const contract = TokenMessenger__factory.connect(
        TOKEN_MESSENGER_CONTRACT_ADDRESS,
        library.getSigner()
      )

      return await contract
        .depositForBurn(
          amount,
          destinationDomain,
          ethers.utils.formatBytes32String(mintRecipient),
          burnToken
        )
        .then((response) => {
          return response
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [TOKEN_MESSENGER_CONTRACT_ADDRESS, library]
  )

  return {
    depositForBurn,
  }
}

export default useTokenMessenger
