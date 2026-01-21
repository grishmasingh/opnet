/**
 * useTokenUserData Hook
 * 
 * Fetches user-specific token data when wallet is connected.
 * - balance: User's token balance
 * - allowance: Amount approved for SPENDER to spend
 * 
 * Re-fetches when wallet address changes.
 * Returns null data when wallet is disconnected.
 */

import { useState, useEffect, useCallback } from 'react'
import { useWalletConnect } from '@btc-vision/walletconnect'
import { getContract, OP_20_ABI, JSONRpcProvider } from 'opnet'
import type { IOP20Contract } from 'opnet'
import { Address } from '@btc-vision/transaction'
import { TOKEN_ADDRESS, RPC_URL, NETWORK, SPENDER_ADDRESS } from '../config'
import type { TokenUserData, TokenUserDataState } from '../types/token'

export function useTokenUserData(): TokenUserDataState {
  // address is the Address object (public key), walletAddress is the string
  const { address, walletAddress } = useWalletConnect()
  
  // Counter to trigger refetch
  const [refetchCount, setRefetchCount] = useState(0)
  
  const [state, setState] = useState<Omit<TokenUserDataState, 'refetch'>>({
    data: null,
    loading: false,
    error: null,
  })

  // Refetch function - increments counter to trigger useEffect
  const refetch = useCallback(() => {
    setRefetchCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    // Flag to prevent state updates after unmount
    let isMounted = true

    async function fetchUserData() {
      // Don't fetch if wallet not connected (need both address object and string)
      if (!address || !walletAddress) {
        if (isMounted) {
          setState({ data: null, loading: false, error: null })
        }
        return
      }

      // Validate required config
      if (!TOKEN_ADDRESS || !RPC_URL || !SPENDER_ADDRESS) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: 'Missing configuration (TOKEN_ADDRESS, RPC_URL, or SPENDER_ADDRESS)',
          })
        }
        return
      }

      // Validate SPENDER_ADDRESS is a hex string (0x...)
      if (!SPENDER_ADDRESS.startsWith('0x')) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: 'SPENDER_ADDRESS must be a hex address (0x...). Check your .env file.',
          })
        }
        return
      }

      try {
        if (isMounted) {
          setState(prev => ({ ...prev, loading: true, error: null }))
        }

        // Create RPC provider
        const provider = new JSONRpcProvider(RPC_URL, NETWORK)

        // Get typed contract instance
        const contract = getContract<IOP20Contract>(
          TOKEN_ADDRESS,
          OP_20_ABI,
          provider,
          NETWORK,
        )

        // Convert SPENDER_ADDRESS (hex string) to Address type
        const spenderAddress = Address.fromBigInt(BigInt(SPENDER_ADDRESS))

        // Fetch symbol, decimals, balance, and allowance in parallel
        // address (Address object) is required for contract calls
        const [symbolResult, decimalsResult, balanceResult, allowanceResult] = await Promise.all([
          contract.symbol(),
          contract.decimals(),
          contract.balanceOf(address),
          contract.allowance(address, spenderAddress),
        ])

        const userData: TokenUserData = {
          symbol: symbolResult.properties.symbol,
          decimals: decimalsResult.properties.decimals,
          balance: balanceResult.properties.balance,
          allowance: allowanceResult.properties.remaining, // Note: property is 'remaining' not 'allowance'
        }

        if (isMounted) {
          setState({
            data: userData,
            loading: false,
            error: null,
          })
        }
      } catch (error: unknown) {
        console.error('Failed to fetch user token data:', error)
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch user token data',
          })
        }
      }
    }

    void fetchUserData()

    return () => {
      isMounted = false
    }
  }, [address, walletAddress, refetchCount])

  return {
    ...state,
    refetch,
  }
}
