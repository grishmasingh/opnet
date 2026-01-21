/**
 * Formatting Utilities
 * 
 * Helper functions for formatting data for display.
 * Keeps formatting logic separate from components for:
 * - Reusability across the app
 * - Easier testing
 * - Cleaner component code
 */

/**
 * Format a bigint token amount with decimals for human-readable display
 * 
 * Token amounts on blockchain are stored as integers (bigint).
 * For example, 1 MOTO with 18 decimals is stored as 1000000000000000000n
 * This function converts it to "1" for display.
 * 
 * @param value - The raw token amount as bigint (e.g., 1000000000000000000n)
 * @param decimals - Number of decimal places the token uses (e.g., 18)
 * @returns Formatted string with commas and decimal point (e.g., "1,000,000.5")
 * 
 * @example
 * formatTokenAmount(1000000000000000000n, 18) // Returns "1"
 * formatTokenAmount(1500000000000000000n, 18) // Returns "1.5"
 * formatTokenAmount(1000000000n, 18)          // Returns "0.000000001"
 */
export function formatTokenAmount(value: bigint, decimals: number): string {
  // Calculate the divisor (10^decimals)
  // For 18 decimals: divisor = 1000000000000000000n
  const divisor = BigInt(10 ** decimals)
  
  // Split into whole and fractional parts using integer division
  const wholePart = value / divisor      // Integer division (floors the result)
  const fractionalPart = value % divisor // Remainder (the decimal portion)

  // Format the whole part with locale-specific thousands separators
  // e.g., 1000000 becomes "1,000,000"
  const wholeStr = wholePart.toLocaleString()

  // If there's no fractional part, just return the whole number
  if (fractionalPart === 0n) {
    return wholeStr
  }

  // Format the fractional part:
  // 1. Convert to string
  // 2. Pad with leading zeros to match decimal places
  // 3. Remove trailing zeros for cleaner display
  const fractionalStr = fractionalPart
    .toString()
    .padStart(decimals, '0')  // Ensure leading zeros (e.g., "001" not "1")
    .replace(/0+$/, '')       // Remove trailing zeros (e.g., "100" becomes "1")

  // Combine whole and fractional parts
  return fractionalStr ? `${wholeStr}.${fractionalStr}` : wholeStr
}

/**
 * Truncate a long address for display
 * 
 * Blockchain addresses are long and hard to read. This function shortens them
 * while keeping the start and end visible for verification.
 * 
 * @param address - Full address string
 * @param startChars - Number of characters to show at start (default 6)
 * @param endChars - Number of characters to show at end (default 4)
 * @returns Truncated address with ellipsis (e.g., "bcrt1p...al9q")
 * 
 * @example
 * truncateAddress("bcrt1p435dk70u0zwjzsdtyjk2y6xzd8ystn9rsq458h970vkfhuvv72dqr9al9q")
 * // Returns "bcrt1p...al9q"
 */
export function truncateAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  // If address is already short enough, return as-is
  if (address.length <= startChars + endChars) {
    return address
  }
  
  // Take first N chars + "..." + last N chars
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}
