/**
 * useTokenMetadata Hook
 * 
 * fetches OP_20 token metadata from the blockchain.
 * This works WITHOUT requiring a wallet connection - it reads public data
 * directly from the blockchain via RPC.
 * 
 * Fetches: name, symbol, decimals, maxSupply, totalSupply
 * 
 * @returns {TokenMetadataState} Object containing:
 *   - data: The token metadata (or null if not loaded)
 *   - loading: Whether data is currently being fetched
 *   - error: Error message if fetch failed (or null)
 */

import { useState, useEffect } from 'react'
import { getContract, OP_20_ABI, JSONRpcProvider } from 'opnet'
import type { IOP20Contract } from 'opnet'
import { TOKEN_ADDRESS, RPC_URL, NETWORK } from '../config'
import type { TokenMetadata, TokenMetadataState } from '../types/token'

export function useTokenMetadata(): TokenMetadataState {
  // State to track loading status, data, and any errors
  const [state, setState] = useState<TokenMetadataState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Flag to prevent state updates after component unmounts
    // This prevents the "Can't perform state update on unmounted component" warning
    let isMounted = true

    async function fetchTokenMetadata() {
      // Validate that required environment variables are set
      if (!TOKEN_ADDRESS || !RPC_URL) {
        setState({
          data: null,
          loading: false,
          error: 'Missing TOKEN_ADDRESS or RPC_URL in environment variables',
        })
        return
      }

      try {
        // Set loading state while fetching
        setState(prev => ({ ...prev, loading: true, error: null }))

        // Create an RPC provider to communicate with the blockchain
        // This doesn't require a wallet - it's read-only access
        const provider = new JSONRpcProvider(RPC_URL, NETWORK)

        // Get a typed contract instance for the OP_20 token
        // This gives us access to all OP_20 standard methods
        const contract = getContract<IOP20Contract>(
          TOKEN_ADDRESS,
          OP_20_ABI,
          provider,
          NETWORK,
        )

        // Fetch all metadata in parallel for better performance
        // Promise.all runs all requests simultaneously instead of sequentially
        const [nameResult, symbolResult, decimalsResult, maxSupplyResult, totalSupplyResult] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
          contract.maximumSupply(),
          contract.totalSupply(),
        ])

        // Extract the actual values from the result objects
        const metadata: TokenMetadata = {
          name: nameResult.properties.name,
          symbol: symbolResult.properties.symbol,
          decimals: decimalsResult.properties.decimals,
          maxSupply: maxSupplyResult.properties.maximumSupply,
          totalSupply: totalSupplyResult.properties.totalSupply,
        }

        // Only update state if component is still mounted
        if (isMounted) {
          setState({
            data: metadata,
            loading: false,
            error: null,
          })
        }
      } catch (err) {
        // Log error for debugging
        console.error('Failed to fetch token metadata:', err)
        
        // Update state with error message (only if still mounted)
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch token metadata',
          })
        }
      }
    }

    // Trigger the fetch
    void fetchTokenMetadata()

    // Cleanup function - runs when component unmounts
    // Sets isMounted to false to prevent state updates after unmount
    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array = run once on mount

  return state
}
