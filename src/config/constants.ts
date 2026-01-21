/**
 * Application Constants & Configuration
 * 
 * Centralizes all configuration values, environment variables, and constants.
 * This makes it easy to:
 * - Change values in one place
 * - See all configuration at a glance
 * - Avoid magic strings/numbers scattered throughout the codebase
 */

import { networks } from '@btc-vision/bitcoin'

// =============================================================================
// Environment Variables
// =============================================================================

/** The OP_20 token contract address (from .env) */
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS as string

/** The RPC URL for connecting to OP_NET (from .env) */
export const RPC_URL = import.meta.env.VITE_RPC_URL as string

/** The spender address for allowance checks (from .env) */
export const SPENDER_ADDRESS = import.meta.env.VITE_SPENDER_ADDRESS as string

// =============================================================================
// Network Configuration
// =============================================================================

/** Network name from environment (mainnet, testnet, or regtest) */
const NETWORK_NAME = import.meta.env.VITE_NETWORK as string | undefined

/**
 * Bitcoin network configuration object
 * Determines which network to connect to based on VITE_NETWORK env variable
 * Defaults to regtest if not specified
 */
export const NETWORK = NETWORK_NAME === 'mainnet'
  ? networks.bitcoin    // Mainnet
  : NETWORK_NAME === 'testnet'
    ? networks.testnet  // Testnet
    : networks.regtest  // Regtest (default for development)

// =============================================================================
// Explorer URLs
// =============================================================================

/** Base URL for OP_SCAN block explorer */
export const OPSCAN_URL = 'https://opscan.org'

/** 
 * Generate a transaction URL for OP_SCAN
 * @param txId - The transaction ID
 * @returns Full URL to view transaction on OP_SCAN
 */
export const OPSCAN_TX_URL = (txId: string) => `${OPSCAN_URL}/tx/${txId}`

// =============================================================================
// UI Constants
// =============================================================================

/** Default text shown when network is unknown */
export const UNKNOWN_NETWORK = 'Unknown'

/** Default maximum satoshis allowed to spend on a transaction */
export const DEFAULT_MAX_SATS_TO_SPEND = 100_000n
