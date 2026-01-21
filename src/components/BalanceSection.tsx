/**
 * BalanceSection Component
 * 
 * Displays user's token balance and allowance when wallet is connected.
 * Only renders when wallet is connected.
 */

import { useWalletConnect } from '@btc-vision/walletconnect'
import { useTokenUserData } from '../hooks/useTokenUserData'
import { formatTokenAmount } from '../utils'
import { SPENDER_ADDRESS } from '../config'
import { InfoRow } from './InfoRow'

export function BalanceSection() {
  const { walletAddress } = useWalletConnect()
  const { data: userData, loading, error, refetch } = useTokenUserData()

  // Don't render if wallet not connected
  if (!walletAddress) {
    return null
  }

  return (
    <div className="balance-section">
      <div className="section-header">
        <h2>Your Token Balance</h2>
        <button 
          className="btn-refresh" 
          onClick={refetch}
          disabled={loading}
          title="Refresh balance"
        >
          ↻
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading">Loading balance...</div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button className="btn btn-retry" onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      {/* Success State */}
      {userData && !loading && (
        <div className="balance-info">
          <InfoRow label="Token" value={userData.symbol} />
          <InfoRow 
            label="Balance" 
            value={`${formatTokenAmount(userData.balance, userData.decimals)} ${userData.symbol}`}
          />
          <InfoRow 
            label="Allowance" 
            value={`${formatTokenAmount(userData.allowance, userData.decimals)} ${userData.symbol}`}
          />
          <div className="spender-info">
            <span className="label">Spender:</span>
            <span className="value address">{SPENDER_ADDRESS}</span>
          </div>
        </div>
      )}
    </div>
  )
}
