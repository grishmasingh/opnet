/**
 * Token Type Definitions
 * 
 * token-related data structures.
 * These types ensure type safety when working with token data
 * throughout the application.
 */

/**
 * Token Metadata
 * 
 * Represents the public metadata of an OP_20 token.
 * This data can be fetched without a wallet connection.
 */
export interface TokenMetadata {
  /** Human-readable name of the token (e.g., "Motoswap") */
  name: string
  
  /** Token symbol/ticker (e.g., "MOTO") */
  symbol: string
  
  /** Number of decimal places (usually 18 for OP_20 tokens) */
  decimals: number
  
  /** Maximum supply that can ever exist (in smallest units) */
  maxSupply: bigint
  
  /** Current total supply in circulation (in smallest units) */
  totalSupply: bigint
}

/**
 * Token Metadata State
 * 
 * Represents the state of a token metadata fetch operation.
 * Used by useTokenMetadata hook to communicate loading/error states.
 */
export interface TokenMetadataState {
  /** The fetched token metadata, or null if not yet loaded or on error */
  data: TokenMetadata | null
  
  /** Whether the data is currently being fetched */
  loading: boolean
  
  /** Error message if the fetch failed, or null if successful */
  error: string | null
}
