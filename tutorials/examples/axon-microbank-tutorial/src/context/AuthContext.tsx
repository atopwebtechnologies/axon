/**
 * AuthContext.tsx — Global authentication state
 *
 * Provides the current user session and auth actions (signUp, logIn, logOut)
 * to the entire component tree. Reads the initial session from localStorage
 * on mount so auth persists across page refreshes.
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { signUp as authSignUp, logIn as authLogIn, logOut as authLogOut } from '../lib/auth'
import { getSession } from '../lib/db'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  /** The username of the currently logged-in user, or null if logged out. */
  currentUser: string | null
  /** Registers a new user and logs them in. Throws on failure. */
  signUp: (username: string, password: string) => void
  /** Logs in an existing user. Throws on failure. */
  logIn: (username: string, password: string) => void
  /** Logs out the current user. */
  logOut: () => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialise from persisted session so state survives page refresh
  const [currentUser, setCurrentUser] = useState<string | null>(() => getSession())

  const signUp = useCallback((username: string, password: string) => {
    authSignUp(username, password)
    setCurrentUser(username.trim())
  }, [])

  const logIn = useCallback((username: string, password: string) => {
    authLogIn(username, password)
    setCurrentUser(username.trim())
  }, [])

  const logOut = useCallback(() => {
    authLogOut()
    setCurrentUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useAuth — returns the auth context value.
 * Must be used inside an <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
