/**
 * auth.test.ts — Auth Logic Unit Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { clearData } from '../lib/storage'
import { signUp, logIn, logOut } from '../lib/auth'
import { getSession, getUser } from '../lib/db'

describe('Auth Layer', () => {
  beforeEach(() => {
    clearData()
    localStorage.clear()
  })

  it('registers a new user and sets session', () => {
    signUp('charlie', 'secret123')
    expect(getUser('charlie')).not.toBeNull()
    expect(getSession()).toBe('charlie')
  })

  it('validates username minimum length', () => {
    expect(() => signUp('ab', 'secret123')).toThrow(
      'Username must be at least 3 characters.'
    )
  })

  it('validates password minimum length', () => {
    expect(() => signUp('charlie', '12345')).toThrow(
      'Password must be at least 6 characters.'
    )
  })

  it('logs in an existing user with correct credentials', () => {
    signUp('charlie', 'secret123')
    logOut()
    expect(getSession()).toBeNull()

    logIn('charlie', 'secret123')
    expect(getSession()).toBe('charlie')
  })

  it('rejects login with wrong password', () => {
    signUp('charlie', 'secret123')
    logOut()

    expect(() => logIn('charlie', 'wrongpass')).toThrow(
      'Invalid username or password.'
    )
  })

  it('rejects login with non-existent username', () => {
    expect(() => logIn('ghost', 'secret123')).toThrow(
      'Invalid username or password.'
    )
  })

  it('logs out and clears active session', () => {
    signUp('charlie', 'secret123')
    expect(getSession()).toBe('charlie')
    logOut()
    expect(getSession()).toBeNull()
  })
})
