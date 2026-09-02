/**
 * TransactionHistory.tsx — Ledger displaying transaction history
 * Shows newest-first list of deposits, withdrawals, and transfers with dates,
 * amounts, type badges, counterparty description, and running balance.
 */
import type { Transaction } from '../lib/storage'
import styles from './TransactionHistory.module.css'

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className={styles.emptyState} id="transaction-history-empty">
        <p className={styles.emptyText}>No transactions yet.</p>
        <p className={styles.emptySubtext}>
          Make a deposit, withdrawal, or transfer to see your ledger activity here.
        </p>
      </div>
    )
  }

  function formatDate(isoString: string): string {
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoString
    }
  }

  function renderBadge(tx: Transaction) {
    switch (tx.type) {
      case 'deposit':
        return <span className={`${styles.badge} ${styles.badgeDeposit}`}>↑ Deposit</span>
      case 'withdrawal':
        return <span className={`${styles.badge} ${styles.badgeWithdrawal}`}>↓ Withdrawal</span>
      case 'transfer_out':
        return <span className={`${styles.badge} ${styles.badgeTransferOut}`}>→ Transfer Out</span>
      case 'transfer_in':
        return <span className={`${styles.badge} ${styles.badgeTransferIn}`}>← Transfer In</span>
    }
  }

  function renderDescription(tx: Transaction) {
    if (tx.description) return tx.description
    if (tx.type === 'transfer_out') return `Transfer to @${tx.counterparty}`
    if (tx.type === 'transfer_in') return `Transfer from @${tx.counterparty}`
    return tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'
  }

  const isPositive = (type: Transaction['type']) => type === 'deposit' || type === 'transfer_in'

  return (
    <div className={styles.container} id="transaction-history">
      <h3 className={styles.title}>Transaction Ledger</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Date & Time</th>
              <th scope="col" className={styles.alignRight}>Amount</th>
              <th scope="col" className={styles.alignRight}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className={styles.row}>
                <td>{renderBadge(tx)}</td>
                <td className={styles.descCell}>{renderDescription(tx)}</td>
                <td className={styles.dateCell}>{formatDate(tx.timestamp)}</td>
                <td
                  className={`${styles.alignRight} ${styles.amountCell} ${
                    isPositive(tx.type) ? styles.positive : styles.negative
                  }`}
                >
                  {isPositive(tx.type) ? '+' : '-'}${tx.amount.toFixed(2)}
                </td>
                <td className={`${styles.alignRight} ${styles.balanceCell}`}>
                  ${tx.balance.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
