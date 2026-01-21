/**
 * Application Entry Point
 * 
 * Renders the React app with required providers:
 * - WalletConnectProvider: Manages wallet connectivity via @btc-vision/walletconnect
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WalletConnectProvider } from '@btc-vision/walletconnect'
import '@walletconnect-css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletConnectProvider theme='dark'>
      <App />
    </WalletConnectProvider>
  </StrictMode>,
)
