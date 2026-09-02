/**
 * TransferForm.tsx — Transfer money to another account
 * Validates recipient existence, positive amounts, and self-transfer rules.
 */
import { useState, type FormEvent } from 'react'
import { transfer } from '../lib/db'
import styles from './TransactionForm.module.css'

interface TransferFormProps {
  username: string
  onSuccess: () => void
}

export function TransferForm({ username, onSuccess }: TransferFormProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const cleanRecipient = recipient.trim()
    if (!cleanRecipient) {
      setError('Please enter a recipient username.')
      return
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than zero.')
      return
    }

    setIsLoading(true)
    try {
      transfer(username, cleanRecipient, parsedAmount)
      setSuccess(`$${parsedAmount.toFixed(2)} transferred to @${cleanRecipient} successfully.`)
      setRecipient('')
      setAmount('')
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} id="transfer-form" noValidate>
      <h3 className={styles.formTitle}>
        <span className={styles.iconTransfer} aria-hidden="true">⇄</span>
        Transfer
      </h3>

      {error && <p className={`form-error ${styles.message}`} role="alert" id="transfer-error">{error}</p>}
      {success && <p className={styles.successMessage} role="status" id="transfer-success">{success}</p>}

      <div className="form-group">
        <label htmlFor="transfer-recipient" className="form-label">Recipient Username</label>
        <input
          id="transfer-recipient"
          type="text"
          className={`form-input ${error ? 'error' : ''}`}
          placeholder="e.g. bob"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="transfer-amount" className="form-label">Transfer Amount (USD)</label>
        <input
          id="transfer-amount"
          type="number"
          min="0.01"
          step="0.01"
          className={`form-input ${error ? 'error' : ''}`}
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        id="transfer-submit-btn"
        disabled={isLoading}
        style={{ width: '100%' }}
      >
        {isLoading ? 'Processing…' : 'Transfer Funds'}
      </button>
    </form>
  )
}
