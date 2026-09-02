/**
 * Hero.tsx — Full-bleed landing page hero section
 *
 * axon-compose rules applied:
 * - Full-bleed: runs edge-to-edge, no container padding
 * - Hero budget: brand + headline + one sentence + one CTA + hero image only
 * - Hierarchy: brand first → headline → body → CTA
 * - Entrance animation: staggered fade-in (brand → headline → body → CTA)
 * - No hero overlays, no cards, no floating badges
 */
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // Staggered entrance animation — triggered on mount
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    // Small delay to allow browser paint before animation
    const timer = setTimeout(() => {
      el.classList.add(styles.visible)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={styles.hero} ref={heroRef} aria-label="Hero">
      {/* Full-bleed background image */}
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      {/* Inner content — constrained column only */}
      <div className={styles.content}>
        {/* Brand signal — hero-level, not nav text */}
        <p className={styles.brandEyebrow}>MicroBank</p>

        {/* Headline — single job: communicate the promise */}
        <h1 className={styles.headline}>
          Your money,
          <br />
          <span className={styles.accent}>fully in control.</span>
        </h1>

        {/* One short supporting sentence */}
        <p className={styles.subtext}>
          Open an account, make transfers, and track every transaction —
          in one clean, fast interface.
        </p>

        {/* Single CTA group */}
        <div className={styles.cta}>
          <Link to="/signup" className="btn btn-primary" id="hero-cta-btn">
            Get Started — It's Free
          </Link>
          <Link to="/login" className="btn btn-outline" id="hero-login-btn">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}
