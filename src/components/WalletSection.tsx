/**
 * WalletSection Component
 * 
 * Handles wallet connection UI.
 * - Disconnected: Shows connect button
 * - Connected: Shows address, network, and disconnect button
 */

import { useCallback } from 'react'
import { useWalletConnect } from '@btc-vision/walletconnect'
import { UNKNOWN_NETWORK } from '../config'
import { InfoRow } from './InfoRow'

export function WalletSection() {
  // Get wallet state and functions from WalletConnect
  const { 
    openConnectModal, 
    disconnect, 
    walletAddress, 
    network 
  } = useWalletConnect()

  // Memoized handlers to prevent unnecessary re-renders
  const handleConnect = useCallback(() => {
    openConnectModal()
  }, [openConnectModal])

  const handleDisconnect = useCallback(async () => {
    await disconnect()
  }, [disconnect])

  return (
    <div className="wallet-section">
      {walletAddress ? (
        // Connected State
        <>
          <h2>Wallet Connected</h2>
          <div className="wallet-info">
            <InfoRow label="Address" value={walletAddress} className="address" />
            <InfoRow label="Network" value={network?.network ?? UNKNOWN_NETWORK} />
          </div>
          <button className="btn btn-disconnect" onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      ) : (
        // Disconnected State
        <>
          <h2>Connect Your Wallet</h2>
          <p className="connect-hint">
            Connect your wallet to view your balance and interact with tokens.
          </p>
          <button className="btn btn-connect" onClick={handleConnect}>
            Connect Wallet
          </button>
        </>
      )}
    </div>
  )
}
