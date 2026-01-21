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
 */

import { TokenInfoSection, WalletSection } from './components'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>OP_NET Token Dashboard</h1>
      <TokenInfoSection />
      <WalletSection />
    </div>
  )
}

export default App
