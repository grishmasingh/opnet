/**
 * BurnSection Component
 * 
 * Form to burn (permanently destroy) user's tokens.
 * Reduces user's balance and total circulating supply.
 */

import { useState, useCallback } from 'react'
import { useWalletConnect } from '@btc-vision/walletconnect'
import { getContract, OP_20_ABI } from 'opnet'
import type { IOP20Contract } from 'opnet'
import toast from 'react-hot-toast'
import { TOKEN_ADDRESS, DEFAULT_MAX_SATS_TO_SPEND } from '../config'
import { useTokenMetadata } from '../hooks/useTokenMetadata'
import { TransactionModal } from './TransactionModal'

export function BurnSection() {
  const { address, walletAddress, network, provider } = useWalletConnect()
  const { data: tokenMetadata } = useTokenMetadata()
  
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

  const handleBurn = useCallback(async () => {
    // Validate inputs
    if (!amount || Number(amount) <= 0) {
      setInputError('Please enter an amount greater than 0')
      return
    }

    if (!address || !walletAddress || !provider || !network) {
      setInputError('Wallet not connected')
      return
    }

    setIsLoading(true)
    setInputError(null)

    // Show pending toast
    const pendingToastId = toast.loading('Submitting burn transaction...')

    try {
      // Convert amount to bigint (assuming 18 decimals)
      const amountBigInt = BigInt(Math.floor(Number(amount) * 10 ** 18))

      // Get contract instance with sender's address
      const contract = getContract<IOP20Contract>(
        TOKEN_ADDRESS,
        OP_20_ABI,
        provider,
        network,
        address // Sender's public key
      )

      // Simulate the burn transaction first
      const burnCall = await contract.burn(amountBigInt)
      
      if (!burnCall) {
        throw new Error('Burn simulation failed')
      }

      // Update toast - waiting for wallet confirmation
      toast.loading('Waiting for wallet confirmation...', { id: pendingToastId })

      // Send the transaction
      const tx = await burnCall.sendTransaction({
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
      toast.success(`${tokenMetadata?.symbol ?? 'Tokens'} burned successfully!`, { id: pendingToastId })

      // Success - show modal with details
      setTxId(tx.transactionId)
      setTxError(null)
      setModalOpen(true)
      setAmount('') // Clear the form

    } catch (error: unknown) {
      console.error('Burn transaction failed:', error)
      
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
  }, [amount, address, walletAddress, provider, network, tokenMetadata?.symbol])

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
      <div className="burn-section">
        <h2>Burn {tokenMetadata?.symbol ?? 'Tokens'}</h2>
        <p className="section-description">
          Permanently burn {tokenMetadata?.symbol ?? 'tokens'} from your balance. This reduces the total circulating supply.
        </p>

        <div className="form-group">
          <label htmlFor="burn-amount">Amount</label>
          <input
            id="burn-amount"
            type="number"
            placeholder={`Enter ${tokenMetadata?.symbol ?? 'amount'} to burn`}
            value={amount}
            onChange={handleAmountChange}
            disabled={isLoading}
            min="0"
            step="any"
          />
          {inputError && <span className="input-error">{inputError}</span>}
        </div>

        <button 
          className="btn btn-burn" 
          onClick={handleBurn}
          disabled={isLoading || !amount || !!inputError}
        >
          {isLoading ? 'Burning...' : `Burn ${tokenMetadata?.symbol ?? ''}`}
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
