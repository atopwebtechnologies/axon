/**
 * DashboardPage.tsx — Authenticated Banking Dashboard
 * Shows user header, account overview, deposit/withdraw forms, and transaction ledger.
 */
import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { getAccount } from '../lib/db'
import { AccountOverview } from '../components/AccountOverview'
import { DepositForm } from '../components/DepositForm'
import { WithdrawForm } from '../components/WithdrawForm'
import { TransferForm } from '../components/TransferForm'
import { TransactionHistory } from '../components/TransactionHistory'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { currentUser, logOut } = useAuth()
  const username = currentUser || ''

  const [account, setAccount] = useState(() => getAccount(username))

  const refreshAccount = useCallback(() => {
    setAccount(getAccount(username))
  }, [username])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.brand}>
            <span className={styles.logoMark}>M</span>
            <span className={styles.logoText}>MicroBank</span>
          </div>

          <div className={styles.userActions}>
            <span className={styles.welcomeText}>
              User: <strong id="current-user-name">{username}</strong>
            </span>
            <button
              onClick={logOut}
              className="btn btn-outline"
              id="dashboard-logout-btn"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className={`container ${styles.main}`}>
        <AccountOverview
          username={username}
          account={account}
          onAccountChange={refreshAccount}
        />

        {account && (
          <>
            <section className={styles.actionsGrid} aria-label="Account actions">
              <DepositForm username={username} onSuccess={refreshAccount} />
              <WithdrawForm username={username} onSuccess={refreshAccount} />
              <TransferForm username={username} onSuccess={refreshAccount} />
            </section>

            <section aria-label="Transaction ledger">
              <TransactionHistory transactions={account.transactions} />
            </section>
          </>
        )}
      </main>
    </div>
  )
}
