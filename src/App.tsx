import { useWalletConnect } from '@btc-vision/walletconnect'
import { useTokenMetadata } from './hooks/useTokenMetadata'
import './App.css'

// Format large numbers with commas
function formatNumber(value: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals)
  const wholePart = value / divisor
  const fractionalPart = value % divisor
  
  const wholeStr = wholePart.toLocaleString()
  
  if (fractionalPart === 0n) {
    return wholeStr
  }
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0').replace(/0+$/, '')
  return fractionalStr ? `${wholeStr}.${fractionalStr}` : wholeStr
}

function App() {
  const { 
    openConnectModal, 
    disconnect, 
    walletAddress, 
    network 
  } = useWalletConnect()

  const { data: tokenMetadata, loading: tokenLoading, error: tokenError } = useTokenMetadata()

  return (
    <div className="app">
      <h1>OP_NET Token Dashboard</h1>
      
      {/* Token Metadata Section - Always visible */}
      <div className="token-section">
        <h2>Token Information</h2>
        
        {tokenLoading && (
          <div className="loading">Loading token data...</div>
        )}
        
        {tokenError && (
          <div className="error">
            <p>Error: {tokenError}</p>
          </div>
        )}
        
        {tokenMetadata && !tokenLoading && (
          <div className="token-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{tokenMetadata.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Symbol:</span>
              <span className="value">{tokenMetadata.symbol}</span>
            </div>
            <div className="info-row">
              <span className="label">Decimals:</span>
              <span className="value">{tokenMetadata.decimals}</span>
            </div>
            <div className="info-row">
              <span className="label">Max Supply:</span>
              <span className="value">{formatNumber(tokenMetadata.maxSupply, tokenMetadata.decimals)}</span>
            </div>
            <div className="info-row">
              <span className="label">Total Supply:</span>
              <span className="value">{formatNumber(tokenMetadata.totalSupply, tokenMetadata.decimals)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Wallet Section */}
      <div className="wallet-section">
        {walletAddress ? (
          <>
            <h2>Wallet Connected</h2>
            <div className="wallet-info">
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value address">{walletAddress}</span>
              </div>
              <div className="info-row">
                <span className="label">Network:</span>
                <span className="value">{network?.network ?? 'Unknown'}</span>
              </div>
            </div>
            <button className="btn btn-disconnect" onClick={async () => { await disconnect() }}>
              Disconnect
            </button>
          </>
        ) : (
          <>
            <h2>Connect Your Wallet</h2>
            <p className="connect-hint">Connect your wallet to view your balance and interact with tokens.</p>
            <button className="btn btn-connect" onClick={() => { openConnectModal() }}>
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
