/**
 * Footer.tsx — Site footer with dark-to-green gradient
 *
 * axon-compose: dark footer grounds the page. Gradient runs from
 * near-black (#0a1a10) to brand green (#1ba94c).
 */
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">M</span>
          <span className={styles.logoText}>MicroBank</span>
          <p className={styles.tagline}>
            Banking built for the way you live.
          </p>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/signup" id="footer-signup-link">Open Account</Link>
          <Link to="/login" id="footer-login-link">Sign In</Link>
          <Link to="/dashboard" id="footer-dashboard-link">Dashboard</Link>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} MicroBank Tutorial Project. Built with React + Vite.
        </p>
      </div>
    </footer>
  )
}
