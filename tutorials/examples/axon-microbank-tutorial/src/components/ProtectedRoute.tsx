/**
 * ProtectedRoute.tsx — Auth guard component
 *
 * Wraps routes that require authentication. Redirects unauthenticated
 * users to the landing page, preserving the intended destination.
 */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
