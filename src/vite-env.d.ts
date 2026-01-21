/**
 * Vite Environment Type Declarations
 * 
 * Extends Vite's client types and declares custom module aliases.
 */

/// <reference types="vite/client" />

// CSS alias for @btc-vision/walletconnect modal styles
declare module '@walletconnect-css' {
  const content: string
  export default content
}
