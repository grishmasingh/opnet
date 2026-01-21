/**
 * InfoRow Component
 * 
 * A reusable component for displaying label-value pairs in a consistent format.
 * Used throughout the app to display token metadata, wallet info, etc.
 * 
 * @example
 * <InfoRow label="Name" value="Motoswap" />
 * <InfoRow label="Address" value={walletAddress} className="address" />
 */

/** Props interface for InfoRow component */
interface InfoRowProps {
  /** The label text displayed on the left */
  label: string
  /** The value displayed on the right (can be string or number) */
  value: string | number
  /** Optional additional CSS class for the value element */
  className?: string
}

/**
 * Renders a single row with a label and value
 * Styling is handled by .info-row class in App.css
 */
export function InfoRow({ label, value, className = '' }: InfoRowProps) {
  return (
    <div className="info-row">
      {/* Label on the left side */}
      <span className="label">{label}:</span>
      {/* Value on the right side, with optional custom class */}
      <span className={`value ${className}`.trim()}>{value}</span>
    </div>
  )
}
