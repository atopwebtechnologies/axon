/**
 * LoginPage.tsx — User login screen (route: "/login")
 *
 * Centered auth form. Username + password. Redirects to /dashboard on success.
 * Shows error on invalid credentials.
 */
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AuthPage.module.css'

export function LoginPage() {
  const { logIn } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      logIn(username, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Brand mark */}
        <div className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">M</span>
          <span className={styles.logoText}>MicroBank</span>
        </div>

        <div className={styles.heading}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form} id="login-form">
          {error && (
            <div className={styles.errorBanner} role="alert" id="login-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="login-username" className="form-label">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="login-submit-btn"
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Don't have an account?{' '}
          <Link to="/signup" id="login-to-signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
