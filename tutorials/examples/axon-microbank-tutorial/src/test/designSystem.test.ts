/**
 * Design System Token Tests
 *
 * Validates that the global CSS design tokens are loadable and the
 * stylesheet content contains the expected CSS custom properties.
 * These tests confirm the design system contract before any component
 * relies on it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const globalCSS = readFileSync(
  resolve(__dirname, '../styles/global.css'),
  'utf-8'
)

describe('Design System: CSS Tokens', () => {
  it('defines the brand accent color token', () => {
    expect(globalCSS).toContain('--color-accent: #1ba94c')
  })

  it('defines the background color token', () => {
    expect(globalCSS).toContain('--color-background: #ffffff')
  })

  it('defines the primary text color token', () => {
    expect(globalCSS).toContain('--color-text-primary: #0d1f17')
  })

  it('defines the display font family token', () => {
    expect(globalCSS).toContain('--font-display:')
    expect(globalCSS).toContain('Plus Jakarta Sans')
  })

  it('defines the body font family token', () => {
    expect(globalCSS).toContain('--font-body:')
    expect(globalCSS).toContain('Inter')
  })

  it('defines the monospace font family token', () => {
    expect(globalCSS).toContain('--font-mono:')
    expect(globalCSS).toContain('JetBrains Mono')
  })

  it('defines base spacing unit', () => {
    expect(globalCSS).toContain('--space-unit: 8px')
  })

  it('defines border radius tokens', () => {
    expect(globalCSS).toContain('--radius-sm:')
    expect(globalCSS).toContain('--radius-md:')
    expect(globalCSS).toContain('--radius-lg:')
  })

  it('defines the footer dark color token', () => {
    expect(globalCSS).toContain('--color-footer-dark: #0a1a10')
  })

  it('defines the error color token', () => {
    expect(globalCSS).toContain('--color-error: #dc2626')
  })
})
