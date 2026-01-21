/**
 * ApproveSection Component
 * 
 * Form to approve SPENDER to spend user's tokens.
 * Includes amount input, approve button, and transaction handling.
 */

import { useState, useCallback } from 'react'
import { useWalletConnect } from '@btc-vision/walletconnect'
import { getContract, OP_20_ABI } from 'opnet'
import type { IOP20Contract } from 'opnet'
import { Address } from '@btc-vision/transaction'
import toast from 'react-hot-toast'
import { TOKEN_ADDRESS, SPENDER_ADDRESS, DEFAULT_MAX_SATS_TO_SPEND } from '../config'
import { TransactionModal } from './TransactionModal'

export function ApproveSection() {
  const { address, walletAddress, network, provider } = useWalletConnect()
  
  // Form state
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState<string | null>(null)
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [txId, setTxId] = useState<string | null>(null)
  const [txError, setTxError] = useState<string | null>(null)

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    setInputError(null)
    
    // Basic validation
    if (value && (isNaN(Number(value)) || Number(value) < 0)) {
      setInputError('Please enter a valid positive number')
    }
  }, [])

  const handleApprove = useCallback(async () => {
    // Validate inputs
    if (!amount || Number(amount) <= 0) {
      setInputError('Please enter an amount greater than 0')
      return
    }

    if (!address || !walletAddress || !provider || !network) {
      setInputError('Wallet not connected')
      return
    }

    if (!SPENDER_ADDRESS.startsWith('0x')) {
      setInputError('Invalid SPENDER_ADDRESS configuration')
      return
    }

    setIsLoading(true)
    setInputError(null)

    // Show pending toast
    const pendingToastId = toast.loading('Submitting transaction...')

    try {
      // Convert amount to bigint (assuming 18 decimals)
      const amountBigInt = BigInt(Math.floor(Number(amount) * 10 ** 18))
      
      // Convert SPENDER_ADDRESS to Address type
      const spenderAddress = Address.fromBigInt(BigInt(SPENDER_ADDRESS))

      // Get contract instance with sender's address
      const contract = getContract<IOP20Contract>(
        TOKEN_ADDRESS,
        OP_20_ABI,
        provider,
        network,
        address // Sender's public key
      )

      // Simulate the transaction first
      const approveCall = await contract.increaseAllowance(spenderAddress, amountBigInt)
      
      if (!approveCall) {
        throw new Error('Approve simulation failed')
      }

      // Update toast - waiting for wallet confirmation
      toast.loading('Waiting for wallet confirmation...', { id: pendingToastId })

      // Send the transaction
      const tx = await approveCall.sendTransaction({
        signer: null,        // OP_WALLET doesn't need a signer
        mldsaSigner: null,   // No MLDSA signer needed
        maximumAllowedSatToSpend: DEFAULT_MAX_SATS_TO_SPEND,
        network: network,
        refundTo: walletAddress,
      })

      if (!tx.transactionId) {
        throw new Error('Transaction failed - no transaction ID returned')
      }

      // Success toast!
      toast.success('Transaction confirmed!', { id: pendingToastId })

      // Success - show modal with details
      setTxId(tx.transactionId)
      setTxError(null)
      setModalOpen(true)
      setAmount('') // Clear the form

    } catch (error: unknown) {
      console.error('Approve transaction failed:', error)
      
      // Handle user rejection
      const errorMessage = error instanceof Error ? error.message : 'Transaction failed'
      const isUserRejection = errorMessage.toLowerCase().includes('reject') || 
                              errorMessage.toLowerCase().includes('denied') ||
                              errorMessage.toLowerCase().includes('cancel')
      
      const displayError = isUserRejection ? 'Transaction rejected by user' : errorMessage

      // Failed toast
      toast.error(displayError, { id: pendingToastId })
      
      setTxId(null)
      setTxError(displayError)
      setModalOpen(true)
    } finally {
      setIsLoading(false)
    }
  }, [amount, address, walletAddress, provider, network])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setTxId(null)
    setTxError(null)
  }, [])

  // Don't render if wallet not connected
  if (!walletAddress) {
    return null
  }

  return (
    <>
      <div className="approve-section">
        <h2>Approve Tokens</h2>
        <p className="section-description">
          Allow the spender to use your tokens on your behalf.
        </p>

        <div className="form-group">
          <label htmlFor="approve-amount">Amount</label>
          <input
            id="approve-amount"
            type="number"
            placeholder="Enter amount to approve"
            value={amount}
            onChange={handleAmountChange}
            disabled={isLoading}
            min="0"
            step="any"
          />
          {inputError && <span className="input-error">{inputError}</span>}
        </div>

        <div className="spender-display">
          <span className="label">Spender:</span>
          <span className="value">{SPENDER_ADDRESS}</span>
        </div>

        <button 
          className="btn btn-approve" 
          onClick={handleApprove}
          disabled={isLoading || !amount || !!inputError}
        >
          {isLoading ? 'Approving...' : 'Approve'}
        </button>
      </div>

      <TransactionModal
        isOpen={modalOpen}
        txId={txId}
        error={txError}
        onClose={closeModal}
      />
    </>
  )
}
