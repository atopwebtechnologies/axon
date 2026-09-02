# Specification: Account-to-Account Transfers

**Pathway ID:** account_transfers_20260810  
**Type:** Feature  
**Status:** Approved  

---

## 1. Overview & Purpose
Enable authenticated MicroBank users to transfer funds directly from their bank account to another registered user's bank account in real-time.

## 2. Functional Requirements
1. **Transfer Form**:
   - Recipient username input field with existence validation.
   - Transfer amount field (USD) with positive value validation.
   - Immediate feedback (inline error/success messages).
2. **Domain & DB Business Logic**:
   - `transfer(senderUsername, recipientUsername, amount)` operation in `db.ts`.
   - Validate `amount > 0`.
   - Validate sender has an active account with sufficient balance (`balance >= amount`).
   - Validate recipient user exists and has an active account.
   - Prevent self-transfers (`senderUsername !== recipientUsername`).
   - Atomically debit sender's balance and credit recipient's balance in `localStorage`.
   - Record dual ledger entries:
     - Sender transaction: type `'transfer_out'`, description `"Transfer to @recipient"`, counterparty `recipient`.
     - Recipient transaction: type `'transfer_in'`, description `"Transfer from @sender"`, counterparty `sender`.
3. **UI Integration**:
   - Add `TransferForm` component in `src/components/TransferForm.tsx`.
   - Update `DashboardPage.tsx` action grid to 3 columns (Deposit, Withdraw, Transfer).
   - Update `TransactionHistory.tsx` to handle `'transfer_out'` and `'transfer_in'` badges and counterparty details.

## 3. Non-Functional Requirements
- **Atomicity**: Both debit and credit occur in a single `localStorage` update operation.
- **Accessibility**: Form field labels, ARIA error alerts, keyboard navigation support.
- **Type Safety**: Expand `Transaction` interface in `storage.ts` to support transfer types and metadata.

## 4. Acceptance Criteria
- [ ] User can input a valid recipient username and positive amount to execute a transfer.
- [ ] Transfer updates sender's balance immediately on screen and in `localStorage`.
- [ ] Transfer updates recipient's balance in `localStorage`.
- [ ] Both sender and recipient transaction history ledgers record the transfer.
- [ ] Error shown if recipient does not exist or has no bank account.
- [ ] Error shown if sender attempts to transfer to themselves.
- [ ] Error shown if sender has insufficient funds.
- [ ] 100% unit and integration test pass rate.

## 5. Out of Scope
- Inter-bank external transfers (wire/ACH/routing numbers).
- Scheduled or recurring transfers.
- Currency conversions.
