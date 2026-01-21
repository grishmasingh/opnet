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

/**
 * Token User Data
 * 
 * Represents user-specific token data (requires wallet connection).
 * Fetched using the connected wallet's address.
 */
export interface TokenUserData {
  /** Token symbol for display */
  symbol: string
  
  /** Number of decimals for formatting */
  decimals: number
  
  /** User's token balance (in smallest units) */
  balance: bigint
  
  /** Allowance granted to the configured SPENDER (in smallest units) */
  allowance: bigint
}

/**
 * Token User Data State
 * 
 * Represents the state of a user data fetch operation.
 * Used by useTokenUserData hook to communicate loading/error states.
 */
export interface TokenUserDataState {
  /** The fetched user data, or null if not loaded or on error */
  data: TokenUserData | null
  
  /** Whether the data is currently being fetched */
  loading: boolean
  
  /** Error message if the fetch failed, or null if successful */
  error: string | null
  
  /** Function to manually refresh the data */
  refetch: () => void
}
