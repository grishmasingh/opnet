/**
 * App Component
 * 
 * The main layout component for the OP_NET Token Dashboard.
 * Composes the page from smaller, focused components.
 * 
 * Layout:
 * 1. Title
 * 2. TokenInfoSection - Token metadata (always visible)
 * 3. WalletSection - Wallet connection UI
 * 4. BalanceSection - User balance/allowance (when connected)
 * 5. ApproveSection - Approve tokens for spender (when connected)
 */

import { Toaster } from 'react-hot-toast'
import { TokenInfoSection, WalletSection, BalanceSection, ApproveSection } from './components'
import './App.css'

function App() {
  return (
    <div className="app">
      <Toaster 
        position="top-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1a1a2e',
            border: '1px solid #e9ecef',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: { primary: '#28a745', secondary: '#ffffff' },
          },
          error: {
            iconTheme: { primary: '#dc3545', secondary: '#ffffff' },
          },
        }}
      />
      <h1>OP_NET Token Dashboard</h1>
      <TokenInfoSection />
      <WalletSection />
      <BalanceSection />
      <ApproveSection />
    </div>
  )
}

export default App
