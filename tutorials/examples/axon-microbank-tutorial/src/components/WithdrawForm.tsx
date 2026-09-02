/**
 * WithdrawForm.tsx — Withdraw money from the account
 * Validates positive amounts and rejects insufficient funds.
 */
import { useState, type FormEvent } from 'react'
import { withdraw } from '../lib/db'
import styles from './TransactionForm.module.css'

interface WithdrawFormProps {
  username: string
  onSuccess: () => void
}

export function WithdrawForm({ username, onSuccess }: WithdrawFormProps) {
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
      withdraw(username, parsed)
      setSuccess(`$${parsed.toFixed(2)} withdrawn successfully.`)
      setAmount('')
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Withdrawal failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} id="withdraw-form" noValidate>
      <h3 className={styles.formTitle}>
        <span className={styles.iconWithdraw} aria-hidden="true">↓</span>
        Withdraw
      </h3>

      {error && <p className={`form-error ${styles.message}`} role="alert" id="withdraw-error">{error}</p>}
      {success && <p className={styles.successMessage} role="status" id="withdraw-success">{success}</p>}

      <div className="form-group">
        <label htmlFor="withdraw-amount" className="form-label">Withdrawal Amount (USD)</label>
        <input
          id="withdraw-amount"
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
        className="btn btn-outline"
        id="withdraw-submit-btn"
        disabled={isLoading}
        style={{ width: '100%' }}
      >
        {isLoading ? 'Processing…' : 'Withdraw Funds'}
      </button>
    </form>
  )
}
