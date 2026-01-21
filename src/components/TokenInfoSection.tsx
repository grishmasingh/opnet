/**
 * TokenInfoSection Component
 * 
 * Displays token metadata fetched from the opnet blockchain.
 * Works WITHOUT requiring a wallet connection.
 * 
 * Shows: name, symbol, decimals, max supply, total supply
 */

import { useTokenMetadata } from '../hooks/useTokenMetadata'
import { formatTokenAmount } from '../utils'
import { InfoRow } from './InfoRow'

export function TokenInfoSection() {
  // Fetch token metadata from blockchain (no wallet needed)
  const { data: tokenMetadata, loading, error } = useTokenMetadata()

  return (
    <div className="token-section">
      <h2>Token Information</h2>
      
      {/* Loading State */}
      {loading && (
        <div className="loading">Loading token data...</div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}
      
      {/* Success State - Display token metadata */}
      {tokenMetadata && !loading && (
        <div className="token-info">
          <InfoRow label="Name" value={tokenMetadata.name} />
          <InfoRow label="Symbol" value={tokenMetadata.symbol} />
          <InfoRow label="Decimals" value={tokenMetadata.decimals} />
          <InfoRow 
            label="Max Supply" 
            value={formatTokenAmount(tokenMetadata.maxSupply, tokenMetadata.decimals)} 
          />
          <InfoRow 
            label="Total Supply" 
            value={formatTokenAmount(tokenMetadata.totalSupply, tokenMetadata.decimals)} 
          />
        </div>
      )}
    </div>
  )
}
