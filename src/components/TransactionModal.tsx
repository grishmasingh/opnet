/**
 * TransactionModal Component
 * 
 * Displays transaction result after sending.
 * Shows tx ID and link to OP_SCAN explorer.
 */

import { OPSCAN_TX_URL } from '../config'

interface TransactionModalProps {
  /** Whether the modal is visible */
  isOpen: boolean
  /** Transaction ID (null if error) */
  txId: string | null
  /** Error message (null if success) */
  error: string | null
  /** Function to close the modal */
  onClose: () => void
}

export function TransactionModal({ isOpen, txId, error, onClose }: TransactionModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {txId ? (
          // Success State
          <>
            <div className="modal-icon success">✓</div>
            <h3>Transaction Successful!</h3>
            <div className="tx-id">
              <span className="label">Transaction ID:</span>
              <span className="value">{txId}</span>
            </div>
            <a 
              href={OPSCAN_TX_URL(txId)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on OP_SCAN
            </a>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          // Error State
          <>
            <div className="modal-icon error">✕</div>
            <h3>Transaction Failed</h3>
            <p className="error-message">{error || 'Unknown error occurred'}</p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  )
}
