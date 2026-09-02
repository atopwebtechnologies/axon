/**
 * SignUpPage.tsx — User registration screen (route: "/signup")
 *
 * Centered auth form. Username + password. Redirects to /dashboard on success.
 * Rejects duplicate usernames with an inline error message.
 */
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AuthPage.module.css'

export function SignUpPage() {
  const { signUp } = useAuth()
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
      signUp(username, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.')
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
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>Free to open. Takes 30 seconds.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={styles.form} id="signup-form">
          {error && (
            <div className={styles.errorBanner} role="alert" id="signup-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="signup-username" className="form-label">
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="e.g. alex_smith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-password" className="form-label">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="signup-submit-btn"
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Already have an account?{' '}
          <Link to="/login" id="signup-to-login-link">Log in</Link>
        </p>
      </div>
    </div>
  )
}
