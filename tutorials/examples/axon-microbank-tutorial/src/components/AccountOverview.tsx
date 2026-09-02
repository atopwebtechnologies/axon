/**
 * AccountOverview.tsx — Balance display + create account prompt
 *
 * If the user has no account: shows a "Create Account" button.
 * If the user has an account: shows the balance as the hero number.
 * axon-compose (app): balance is the primary workspace signal.
 */
import { useState } from 'react'
import { createAccount } from '../lib/db'
import type { Account } from '../lib/storage'
import styles from './AccountOverview.module.css'

interface AccountOverviewProps {
  username: string
  account: Account | null
  onAccountChange: () => void
}

export function AccountOverview({ username, account, onAccountChange }: AccountOverviewProps) {
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  function handleCreateAccount() {
    setError(null)
    setIsCreating(true)
    try {
      createAccount(username)
      onAccountChange()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account.')
    } finally {
      setIsCreating(false)
    }
  }

  if (!account) {
    return (
      <div className={styles.noAccount} id="create-account-section">
        <div className={styles.noAccountContent}>
          <h2 className={styles.noAccountTitle}>Open your bank account</h2>
          <p className={styles.noAccountText}>
            Your account is free to open and starts at $0.00.
          </p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button
            className="btn btn-primary"
            id="create-account-btn"
            onClick={handleCreateAccount}
            disabled={isCreating}
          >
            {isCreating ? 'Opening…' : 'Open Account'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overview} id="account-overview">
      <p className={styles.balanceLabel}>Available Balance</p>
      <p className={styles.balance} aria-label={`Balance: $${account.balance.toFixed(2)}`}>
        <span className={styles.currency}>$</span>
        <span className={styles.amount} id="account-balance">
          {account.balance.toFixed(2)}
        </span>
      </p>
      <p className={styles.accountMeta}>
        Account holder: <strong>{account.username}</strong>
      </p>
    </div>
  )
}
