/**
 * DepositForm.tsx — Deposit money into the account
 * Validates positive amounts and rejects zero/negative inputs.
 */
import { useState, type FormEvent } from 'react'
import { deposit } from '../lib/db'
import styles from './TransactionForm.module.css'

interface DepositFormProps {
  username: string
  onSuccess: () => void
}

export function DepositForm({ username, onSuccess }: DepositFormProps) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const parsed = parseFloat(amount)
    if (isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid amount greater than zero.')
      return
    }
    setIsLoading(true)
    try {
      deposit(username, parsed)
      setSuccess(`$${parsed.toFixed(2)} deposited successfully.`)
      setAmount('')
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deposit failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} id="deposit-form" noValidate>
      <h3 className={styles.formTitle}>
        <span className={styles.iconDeposit} aria-hidden="true">↑</span>
        Deposit
      </h3>

      {error && <p className={`form-error ${styles.message}`} role="alert" id="deposit-error">{error}</p>}
      {success && <p className={styles.successMessage} role="status" id="deposit-success">{success}</p>}

      <div className="form-group">
        <label htmlFor="deposit-amount" className="form-label">Deposit Amount (USD)</label>
        <input
          id="deposit-amount"
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
        id="deposit-submit-btn"
        disabled={isLoading}
        style={{ width: '100%' }}
      >
        {isLoading ? 'Processing…' : 'Deposit Funds'}
      </button>
    </form>
  )
}
