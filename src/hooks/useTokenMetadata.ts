import { useState, useEffect } from 'react'
import { getContract, OP_20_ABI, JSONRpcProvider } from 'opnet'
import type { IOP20Contract } from 'opnet'
import { networks } from '@btc-vision/bitcoin'
import type { TokenMetadata, TokenMetadataState } from '../types/token'

const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS as string
const RPC_URL = import.meta.env.VITE_RPC_URL as string

export function useTokenMetadata(): TokenMetadataState {
  const [state, setState] = useState<TokenMetadataState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function fetchTokenMetadata() {
      if (!TOKEN_ADDRESS || !RPC_URL) {
        setState({
          data: null,
          loading: false,
          error: 'Missing TOKEN_ADDRESS or RPC_URL in environment variables',
        })
        return
      }

      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        // Create RPC provider for read-only calls
        const provider = new JSONRpcProvider(RPC_URL, networks.regtest)

        // Get contract instance (no sender needed for read-only)
        const contract = getContract<IOP20Contract>(
          TOKEN_ADDRESS,
          OP_20_ABI,
          provider,
          networks.regtest,
        )

        // Fetch all metadata in parallel
        const [nameResult, symbolResult, decimalsResult, maxSupplyResult, totalSupplyResult] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
          contract.maximumSupply(),
          contract.totalSupply(),
        ])

        const metadata: TokenMetadata = {
          name: nameResult.properties.name,
          symbol: symbolResult.properties.symbol,
          decimals: decimalsResult.properties.decimals,
          maxSupply: maxSupplyResult.properties.maximumSupply,
          totalSupply: totalSupplyResult.properties.totalSupply,
        }

        setState({
          data: metadata,
          loading: false,
          error: null,
        })
      } catch (err) {
        console.error('Failed to fetch token metadata:', err)
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch token metadata',
        })
      }
    }

    void fetchTokenMetadata()
  }, [])

  return state
}
