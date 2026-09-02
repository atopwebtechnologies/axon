/**
 * FeatureCards.tsx — Landing page feature section
 *
 * axon-compose rules applied:
 * - No cards in the hero (this section follows the hero)
 * - Text-led layout: one title + one sentence per feature
 * - Hover lift: translate-up 4px + accent line thickens
 * - One section, one job: explain the four core features
 */
import styles from './FeatureCards.module.css'

const features = [
  {
    id: 'feature-accounts',
    icon: '◈',
    title: 'Account Management',
    description:
      'Open a personal account in seconds. View your balance and full account history at any time.',
  },
  {
    id: 'feature-transfers',
    icon: '⇄',
    title: 'Fund Transfers',
    description:
      'Move money between accounts quickly and securely, with every transfer recorded instantly.',
  },
  {
    id: 'feature-history',
    icon: '≡',
    title: 'Transaction History',
    description:
      'A complete, timestamped ledger of every deposit and withdrawal — always up to date.',
  },
  {
    id: 'feature-security',
    icon: '◎',
    title: 'Secure by Design',
    description:
      'Your session is protected and your data stays on your device — private by default.',
  },
]

export function FeatureCards() {
  return (
    <section className={styles.section} aria-labelledby="features-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading} id="features-heading">
            Everything you need. Nothing you don't.
          </h2>
          <p className={styles.subtext}>
            Four focused features that cover the full banking experience.
          </p>
        </div>

        <ul className={styles.grid} role="list">
          {features.map((feat) => (
            <li key={feat.id} id={feat.id} className={styles.feature}>
              <span className={styles.icon} aria-hidden="true">
                {feat.icon}
              </span>
              <div className={styles.bar} aria-hidden="true" />
              <h3 className={styles.title}>{feat.title}</h3>
              <p className={styles.description}>{feat.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
