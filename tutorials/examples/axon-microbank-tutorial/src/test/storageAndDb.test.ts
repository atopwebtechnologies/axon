/**
 * storageAndDb.test.ts — Data Layer & Domain DB Operations Unit Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { readData, writeData, clearData } from '../lib/storage'
import {
  getUser,
  createUser,
  getAccount,
  createAccount,
  deposit,
  withdraw,
  transfer,
  getSession,
  setSession,
  clearSession,
} from '../lib/db'

describe('Data Layer & DB Operations', () => {
  beforeEach(() => {
    clearData()
    localStorage.clear()
  })

  it('reads default empty data when nothing is stored', () => {
    const data = readData()
    expect(data.users).toEqual([])
    expect(data.accounts).toEqual({})
    expect(data.session).toBeNull()
  })

  it('creates a user and retrieves them', () => {
    const user = createUser('alice', 'password123')
    expect(user.username).toBe('alice')
    expect(getUser('alice')).toEqual(user)
    expect(getUser('bob')).toBeNull()
  })

  it('rejects duplicate usernames', () => {
    createUser('alice', 'password123')
    expect(() => createUser('alice', 'different')).toThrow(
      'Username "alice" is already taken.'
    )
  })

  it('creates an account starting at $0', () => {
    createUser('alice', 'password123')
    const account = createAccount('alice')
    expect(account.balance).toBe(0)
    expect(account.transactions).toEqual([])
    expect(getAccount('alice')).toEqual(account)
  })

  it('rejects creating duplicate account for same user', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    expect(() => createAccount('alice')).toThrow(
      'Account already exists for user "alice".'
    )
  })

  it('deposits valid amounts and updates balance & transaction history', () => {
    createUser('alice', 'password123')
    createAccount('alice')

    const updated = deposit('alice', 150)
    expect(updated.balance).toBe(150)
    expect(updated.transactions).toHaveLength(1)
    expect(updated.transactions[0].type).toBe('deposit')
    expect(updated.transactions[0].amount).toBe(150)
    expect(updated.transactions[0].balance).toBe(150)

    const updatedAgain = deposit('alice', 50)
    expect(updatedAgain.balance).toBe(200)
    expect(updatedAgain.transactions).toHaveLength(2)
    expect(updatedAgain.transactions[0].amount).toBe(50) // newest first
  })

  it('rejects zero or negative deposit amounts', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    expect(() => deposit('alice', 0)).toThrow('Deposit amount must be greater than zero.')
    expect(() => deposit('alice', -50)).toThrow('Deposit amount must be greater than zero.')
  })

  it('withdraws valid amounts and updates balance & transaction history', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    deposit('alice', 200)

    const updated = withdraw('alice', 75)
    expect(updated.balance).toBe(125)
    expect(updated.transactions[0].type).toBe('withdrawal')
    expect(updated.transactions[0].amount).toBe(75)
    expect(updated.transactions[0].balance).toBe(125)
  })

  it('rejects withdrawal if amount exceeds balance (insufficient funds)', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    deposit('alice', 50)

    expect(() => withdraw('alice', 100)).toThrow(
      'Insufficient funds. Your balance is $50.00.'
    )
  })

  it('handles session operations correctly', () => {
    expect(getSession()).toBeNull()
    setSession('alice')
    expect(getSession()).toBe('alice')
    clearSession()
    expect(getSession()).toBeNull()
  })

  it('transfers funds between two user accounts atomically', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    deposit('alice', 300)

    createUser('bob', 'password123')
    createAccount('bob')
    deposit('bob', 50)

    const senderAccount = transfer('alice', 'bob', 100)

    expect(senderAccount.balance).toBe(200)
    expect(senderAccount.transactions[0].type).toBe('transfer_out')
    expect(senderAccount.transactions[0].counterparty).toBe('bob')
    expect(senderAccount.transactions[0].amount).toBe(100)

    const recipientAccount = getAccount('bob')!
    expect(recipientAccount.balance).toBe(150)
    expect(recipientAccount.transactions[0].type).toBe('transfer_in')
    expect(recipientAccount.transactions[0].counterparty).toBe('alice')
    expect(recipientAccount.transactions[0].amount).toBe(100)
  })

  it('rejects self-transfer', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    deposit('alice', 100)

    expect(() => transfer('alice', 'alice', 50)).toThrow(
      'Cannot transfer funds to yourself.'
    )
  })

  it('rejects transfer if recipient does not exist or has no account', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    deposit('alice', 100)

    expect(() => transfer('alice', 'nonexistent', 50)).toThrow(
      'Recipient "nonexistent" does not have an active bank account.'
    )
  })

  it('rejects transfer if sender has insufficient funds', () => {
    createUser('alice', 'password123')
    createAccount('alice')
    deposit('alice', 30)

    createUser('bob', 'password123')
    createAccount('bob')

    expect(() => transfer('alice', 'bob', 100)).toThrow(
      'Insufficient funds. Your balance is $30.00.'
    )
  })
})
