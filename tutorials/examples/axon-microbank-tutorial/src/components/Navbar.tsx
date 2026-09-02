/**
 * Navbar.tsx — Site-wide navigation bar
 *
 * Starts transparent over the hero, transitions to solid white on scroll.
 * Logo on the left, CTA buttons on the right.
 * axon-compose: sticky header with glass/solid transition on scroll.
 */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { currentUser, logOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogout() {
    logOut()
    navigate('/')
  }

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <nav className={styles.inner} aria-label="Main navigation">
        <Link to="/" className={styles.logo} aria-label="MicroBank home">
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>MicroBank</span>
        </Link>

        <div className={styles.actions}>
          {currentUser ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" id="nav-logout-btn">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" id="nav-login-btn">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary" id="nav-signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
