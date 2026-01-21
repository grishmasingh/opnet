export interface TokenMetadata {
  name: string
  symbol: string
  decimals: number
  maxSupply: bigint
  totalSupply: bigint
}

export interface TokenMetadataState {
  data: TokenMetadata | null
  loading: boolean
  error: string | null
}
