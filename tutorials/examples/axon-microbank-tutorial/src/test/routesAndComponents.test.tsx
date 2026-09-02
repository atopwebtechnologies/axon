/**
 * routesAndComponents.test.tsx — React Component & Navigation Integration Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { clearData } from '../lib/storage'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { ProtectedRoute } from '../components/ProtectedRoute'

function renderWithRouter(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  )
}

describe('Routing & Component Integration', () => {
  beforeEach(() => {
    clearData()
    localStorage.clear()
  })

  it('renders Landing Page on root route "/"', () => {
    renderWithRouter(['/'])
    expect(screen.getAllByText('MicroBank')[0]).toBeInTheDocument()
    expect(screen.getByText(/Your money,/i)).toBeInTheDocument()
    expect(screen.getByText(/fully in control/i)).toBeInTheDocument()
    expect(screen.getByText('Account Management')).toBeInTheDocument()
    expect(screen.getByText('Fund Transfers')).toBeInTheDocument()
    expect(screen.getByText('Transaction History')).toBeInTheDocument()
    expect(screen.getByText('Secure by Design')).toBeInTheDocument()
  })

  it('redirects unauthenticated users from "/dashboard" to "/"', () => {
    renderWithRouter(['/dashboard'])
    // Should be redirected to landing page
    expect(screen.getByText(/Your money,/i)).toBeInTheDocument()
  })

  it('allows user to sign up and navigate to dashboard', async () => {
    const user = userEvent.setup()
    renderWithRouter(['/signup'])

    expect(screen.getByRole('heading', { name: /Create your account/i })).toBeInTheDocument()

    const usernameInput = screen.getByLabelText(/Username/i)
    const passwordInput = screen.getByLabelText(/Password/i)
    const submitBtn = screen.getByRole('button', { name: /Create Account/i })

    await user.type(usernameInput, 'david')
    await user.type(passwordInput, 'secret123')
    await user.click(submitBtn)

    // Should now be on Dashboard
    expect(screen.getByText(/Open your bank account/i)).toBeInTheDocument()
    expect(screen.getByText('david')).toBeInTheDocument()
  })

  it('allows user to open account, deposit, withdraw, and view transaction history', async () => {
    const user = userEvent.setup()
    renderWithRouter(['/signup'])

    // Sign up
    await user.type(screen.getByLabelText(/Username/i), 'eva')
    await user.type(screen.getByLabelText(/Password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /Create Account/i }))

    // Open account
    const openAccountBtn = screen.getByRole('button', { name: /Open Account/i })
    await user.click(openAccountBtn)

    // Verify initial balance $0.00
    expect(screen.getByText('0.00')).toBeInTheDocument()

    // Deposit $500
    const depositInput = screen.getByLabelText(/Deposit Amount \(USD\)/i)
    const depositBtn = screen.getByRole('button', { name: /Deposit Funds/i })

    await user.type(depositInput, '500')
    await user.click(depositBtn)

    // Verify updated balance $500.00
    expect(screen.getByText('500.00')).toBeInTheDocument()

    // Withdraw $150
    const withdrawInput = screen.getByLabelText(/Withdrawal Amount \(USD\)/i)
    const withdrawBtn = screen.getByRole('button', { name: /Withdraw Funds/i })

    await user.type(withdrawInput, '150')
    await user.click(withdrawBtn)

    // Verify updated balance $350.00
    expect(screen.getByText('350.00')).toBeInTheDocument()

    // Check transaction history table
    expect(screen.getByText(/Transaction Ledger/i)).toBeInTheDocument()
    expect(screen.getByText(/↑ Deposit/i)).toBeInTheDocument()
    expect(screen.getByText(/↓ Withdrawal/i)).toBeInTheDocument()
    expect(screen.getByText('+$500.00')).toBeInTheDocument()
    expect(screen.getByText('-$150.00')).toBeInTheDocument()
  })

  it('displays error when attempting to withdraw more than available balance', async () => {
    const user = userEvent.setup()
    renderWithRouter(['/signup'])

    await user.type(screen.getByLabelText(/Username/i), 'frank')
    await user.type(screen.getByLabelText(/Password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /Create Account/i }))
    await user.click(screen.getByRole('button', { name: /Open Account/i }))

    // Deposit $50
    const depositInput = screen.getByLabelText(/Deposit Amount \(USD\)/i)
    await user.type(depositInput, '50')
    await user.click(screen.getByRole('button', { name: /Deposit Funds/i }))

    // Attempt to withdraw $100
    const withdrawInput = screen.getByLabelText(/Withdrawal Amount \(USD\)/i)
    await user.type(withdrawInput, '100')
    await user.click(screen.getByRole('button', { name: /Withdraw Funds/i }))

    // Insufficient funds error message
    expect(screen.getByText(/Insufficient funds. Your balance is \$50.00./i)).toBeInTheDocument()
  })

  it('allows sender to transfer funds to another user and records in ledger', async () => {
    const user = userEvent.setup()

    // 1. Create recipient "bob"
    renderWithRouter(['/signup'])
    await user.type(screen.getByLabelText(/Username/i), 'bob')
    await user.type(screen.getByLabelText(/Password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /Create Account/i }))
    await user.click(screen.getByRole('button', { name: /Open Account/i }))
    await user.click(screen.getByRole('button', { name: /Log Out/i }))

    // 2. Create sender "alice" and deposit $200
    await user.click(screen.getByRole('link', { name: /Sign Up/i }))
    await user.type(screen.getByLabelText(/Username/i), 'alice')
    await user.type(screen.getByLabelText(/Password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /Create Account/i }))
    await user.click(screen.getByRole('button', { name: /Open Account/i }))
    await user.type(screen.getByLabelText(/Deposit Amount \(USD\)/i), '200')
    await user.click(screen.getByRole('button', { name: /Deposit Funds/i }))

    // 3. Transfer $75 from alice to bob
    await user.type(screen.getByLabelText(/Recipient Username/i), 'bob')
    await user.type(screen.getByLabelText(/Transfer Amount \(USD\)/i), '75')
    await user.click(screen.getByRole('button', { name: /Transfer Funds/i }))

    // Verify sender balance is now $125.00
    expect(screen.getByText('125.00')).toBeInTheDocument()
    expect(screen.getByText(/→ Transfer Out/i)).toBeInTheDocument()
    expect(screen.getByText(/Transfer to @bob/i)).toBeInTheDocument()
    expect(screen.getByText('-$75.00')).toBeInTheDocument()
  })

  it('rejects self-transfer in the UI with an error message', async () => {
    const user = userEvent.setup()
    renderWithRouter(['/signup'])

    await user.type(screen.getByLabelText(/Username/i), 'grace')
    await user.type(screen.getByLabelText(/Password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /Create Account/i }))
    await user.click(screen.getByRole('button', { name: /Open Account/i }))

    await user.type(screen.getByLabelText(/Recipient Username/i), 'grace')
    await user.type(screen.getByLabelText(/Transfer Amount \(USD\)/i), '10')
    await user.click(screen.getByRole('button', { name: /Transfer Funds/i }))

    expect(screen.getByText(/Cannot transfer funds to yourself./i)).toBeInTheDocument()
  })
})
