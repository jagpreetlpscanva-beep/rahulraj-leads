import { useState } from 'react';
import Head from 'next/head';

const ZODIAC = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const ZODIAC_NAMES = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    });
    const data = await res.json();

    if (res.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(data.error || 'Something went wrong.');
    }
  }

  return (
    <>
      <Head>
        <title>Learn Vedic Astrology — Rahul Raj</title>
        <meta name="description" content="Master Vedic Astrology with Pt. Rahul Raj. Live classes, personal guidance, and a proven curriculum for beginners to advanced students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={styles.page}>

        {/* ── NAV ── */}
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <div style={styles.logo}>
              <span style={styles.logoSymbol}>☽</span>
              <div>
                <div style={styles.logoName}>RAHUL RAJ</div>
                <div style={styles.logoSub}>VEDIC ASTROLOGER</div>
              </div>
            </div>
            <a href="#enroll" style={styles.navCta}>Enroll Now</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={styles.hero}>
          {/* Decorative zodiac wheel */}
          <div style={styles.wheelWrap} aria-hidden="true">
            <svg viewBox="0 0 400 400" style={styles.wheelSvg}>
              {/* outer ring */}
              <circle cx="200" cy="200" r="185" fill="none" stroke="#C8922A" strokeWidth="1" strokeDasharray="4 6" opacity="0.35"/>
              <circle cx="200" cy="200" r="155" fill="none" stroke="#C8922A" strokeWidth="0.5" opacity="0.2"/>
              <circle cx="200" cy="200" r="110" fill="none" stroke="#C8922A" strokeWidth="0.5" opacity="0.15"/>
              {/* zodiac signs around ring */}
              {ZODIAC.map((sym, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x = 200 + 168 * Math.cos(angle);
                const y = 200 + 168 * Math.sin(angle);
                const labelAngle = (i * 30 - 75) * (Math.PI / 180);
                const lx = 200 + 145 * Math.cos(labelAngle);
                const ly = 200 + 145 * Math.sin(labelAngle);
                return (
                  <g key={i}>
                    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                      fontSize="18" fill="#C8922A" opacity="0.7">{sym}</text>
                    <text x={lx} y={ly + 14} textAnchor="middle" dominantBaseline="middle"
                      fontSize="7" fill="#7A6545" opacity="0.5" letterSpacing="1"
                      transform={`rotate(${i*30}, ${lx}, ${ly+14})`}>
                      {ZODIAC_NAMES[i].toUpperCase()}
                    </text>
                  </g>
                );
              })}
              {/* center medallion */}
              <circle cx="200" cy="200" r="95" fill="#FFF8EC" stroke="#C8922A" strokeWidth="1.5" opacity="0.9"/>
              <circle cx="200" cy="200" r="78" fill="none" stroke="#C8922A" strokeWidth="0.5" opacity="0.4"/>
              <text x="200" y="188" textAnchor="middle" fontSize="11" fill="#C8922A" letterSpacing="3" fontFamily="'Cormorant Garamond',serif">VEDIC</text>
              <text x="200" y="204" textAnchor="middle" fontSize="11" fill="#C8922A" letterSpacing="3" fontFamily="'Cormorant Garamond',serif">ASTROLOGY</text>
              <text x="200" y="220" textAnchor="middle" fontSize="9" fill="#7A6545" letterSpacing="2" fontFamily="'Cormorant Garamond',serif">COURSE</text>
              {/* dividers */}
              {[0,60,120,180,240,300].map(deg => {
                const r1 = 110, r2 = 185;
                const rad = (deg - 90) * Math.PI / 180;
                return <line key={deg}
                  x1={200 + r1*Math.cos(rad)} y1={200 + r1*Math.sin(rad)}
                  x2={200 + r2*Math.cos(rad)} y2={200 + r2*Math.sin(rad)}
                  stroke="#C8922A" strokeWidth="0.5" opacity="0.2"/>
              })}
            </svg>
          </div>

          {/* Hero copy */}
          <div style={styles.heroCopy}>
            <div style={styles.pill}>✦ Live Classes &nbsp;·&nbsp; Hindi &amp; English &nbsp;·&nbsp; Certificate</div>
            <h1 style={styles.h1}>
              Read the Stars.<br/>
              <em style={styles.h1em}>Transform Lives.</em>
            </h1>
            <p style={styles.heroSub}>
              Learn authentic Vedic Jyotish directly from Pt. Rahul Raj —
              trusted by <strong>10,000+</strong> students across India.
              From birth chart basics to advanced prediction.
            </p>

            {/* Social proof row */}
            <div style={styles.proofRow}>
              {[['10K+','Students'],['15+','Years Teaching'],['4.9★','Rated']].map(([val, label]) => (
                <div key={label} style={styles.proofItem}>
                  <span style={styles.proofVal}>{val}</span>
                  <span style={styles.proofLabel}>{label}</span>
                </div>
              ))}
            </div>

            {/* ── LEAD FORM ── */}
            <div style={styles.formCard} id="enroll">
              {status === 'success' ? (
                <div style={styles.successBox}>
                  <div style={styles.successIcon}>🙏</div>
                  <h3 style={styles.successTitle}>Namaste, {name}!</h3>
                  <p style={styles.successText}>
                    Our team will call you on <strong>{phone}</strong> within 24 hours
                    to share course details &amp; fees.
                  </p>
                </div>
              ) : (
                <>
                  <div style={styles.formHeader}>
                    <span style={styles.formEyebrow}>FREE COUNSELLING SESSION</span>
                    <h2 style={styles.formTitle}>Get Course Details on WhatsApp</h2>
                  </div>

                  <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.fieldWrap}>
                      <label style={styles.label}>Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.fieldWrap}>
                      <label style={styles.label}>WhatsApp Number</label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        maxLength={15}
                        required
                        style={styles.input}
                      />
                    </div>

                    {errorMsg && <p style={styles.errorMsg}>⚠ {errorMsg}</p>}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={status === 'loading' ? {...styles.btn, ...styles.btnLoading} : styles.btn}
                    >
                      {status === 'loading' ? 'Sending...' : '✦ Get Free Counselling →'}
                    </button>

                    <p style={styles.privacy}>🔒 We never share your details. No spam.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU LEARN ── */}
        <section style={styles.section}>
          <div style={styles.sectionInner}>
            <p style={styles.eyebrow}>CURRICULUM HIGHLIGHTS</p>
            <h2 style={styles.sectionTitle}>What You Will Master</h2>
            <div style={styles.grid3}>
              {[
                ['☿','Birth Chart Reading','Decode any Kundali with accuracy — planets, houses, aspects, and their life meanings.'],
                ['♃','Planetary Transits','Predict events using Gochar (transit) of Jupiter, Saturn, Rahu, and Ketu.'],
                ['☉','Dasha System','Master Vimshottari Dasha to time career, marriage, health, and wealth precisely.'],
                ['☽','Nakshatra Wisdom','26 Nakshatras in depth — personality, compatibility, and remedial astrology.'],
                ['♀','Relationship Astrology','Match horoscopes, spot compatibility, guide clients on love and marriage.'],
                ['⚹','Remedies & Gemstones','Prescribe authentic Vedic remedies: mantras, gemstones, and rituals.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={styles.card}>
                  <div style={styles.cardIcon}>{icon}</div>
                  <h3 style={styles.cardTitle}>{title}</h3>
                  <p style={styles.cardDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={styles.aboutSection}>
          <div style={styles.sectionInner}>
            <div style={styles.aboutGrid}>
              <div style={styles.aboutVisual}>
                <div style={styles.aboutInitial}>RR</div>
                <div style={styles.aboutDecor}>
                  <span>☿</span><span>♃</span><span>☉</span><span>☽</span>
                </div>
              </div>
              <div style={styles.aboutCopy}>
                <p style={styles.eyebrow}>YOUR GURU</p>
                <h2 style={styles.sectionTitle}>Pt. Rahul Raj</h2>
                <p style={styles.aboutDesc}>
                  With over 15 years of practice in Vedic Jyotish, Pt. Rahul Raj has guided
                  more than 10,000 students from across India. His teaching blends ancient
                  shastra with practical, real-world prediction — so you learn to actually
                  read charts, not just memorise theory.
                </p>
                <div style={styles.aboutStats}>
                  {[['15+','Years Experience'],['50K+','Consultations'],['10K+','Students Taught'],['4.9/5','Student Rating']].map(([v,l])=>(
                    <div key={l} style={styles.statBox}>
                      <div style={styles.statVal}>{v}</div>
                      <div style={styles.statLabel}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={styles.section}>
          <div style={styles.sectionInner}>
            <p style={styles.eyebrow}>STUDENT STORIES</p>
            <h2 style={styles.sectionTitle}>Real Results, Real Students</h2>
            <div style={styles.grid3}>
              {[
                ['Ananya Mishra', 'Delhi', '⭐⭐⭐⭐⭐', 'I went from knowing nothing to doing paid consultations in 6 months. Rahul sir explains in such simple Hindi — even complex dashas become clear.'],
                ['Rohit Verma', 'Lucknow', '⭐⭐⭐⭐⭐', 'The Nakshatra module alone was worth the full fee. My prediction accuracy jumped dramatically after applying what I learned here.'],
                ['Sneha Patel', 'Ahmedabad', '⭐⭐⭐⭐⭐', 'Best investment I made in 2024. The live Q&A sessions with Rahul sir are incredibly valuable — he corrects your charts in real time.'],
              ].map(([name, city, stars, quote]) => (
                <div key={name} style={styles.testimonialCard}>
                  <div style={styles.tStars}>{stars}</div>
                  <p style={styles.tQuote}>"{quote}"</p>
                  <div style={styles.tAuthor}>
                    <div style={styles.tAvatar}>{name[0]}</div>
                    <div>
                      <div style={styles.tName}>{name}</div>
                      <div style={styles.tCity}>{city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaInner}>
            <p style={styles.ctaEyebrow}>LIMITED SEATS</p>
            <h2 style={styles.ctaTitle}>Start Your Astrology Journey Today</h2>
            <p style={styles.ctaSub}>Talk to our team for free. No pressure, no obligation.</p>
            <a href="#enroll" style={styles.ctaBtn}>
              ✦ Claim Free Counselling Session
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerLogo}>
              <span style={styles.logoSymbol}>☽</span>
              <span style={styles.footerBrand}>RAHUL RAJ — VEDIC ASTROLOGER</span>
            </div>
            <p style={styles.footerText}>© 2024 Rahul Raj. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}

/* ─── STYLES ─────────────────────────────────────────────── */
const styles = {
  page: { background: 'var(--cream)', minHeight: '100vh' },

  /* NAV */
  nav: {
    background: 'var(--warm-white)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 16px rgba(200,146,42,0.08)',
  },
  navInner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  logoSymbol: { fontSize: 24, color: 'var(--gold)' },
  logoName: { fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 18, color: 'var(--text-dark)', letterSpacing: 3 },
  logoSub: { fontSize: 9, color: 'var(--text-light)', letterSpacing: 4, marginTop: -2 },
  navCta: {
    background: 'var(--gold)', color: '#fff',
    padding: '8px 20px', borderRadius: 4,
    textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
  },

  /* HERO */
  hero: {
    maxWidth: 1200, margin: '0 auto',
    padding: '60px 24px 80px',
    display: 'flex', alignItems: 'center',
    gap: 48, flexWrap: 'wrap',
    position: 'relative',
  },
  wheelWrap: {
    flex: '0 0 380px', maxWidth: '100%',
    order: 2,
  },
  wheelSvg: { width: '100%', height: 'auto' },
  heroCopy: { flex: '1 1 380px', order: 1 },

  pill: {
    display: 'inline-block',
    border: '1px solid var(--gold)',
    color: 'var(--gold)',
    borderRadius: 100,
    padding: '5px 16px',
    fontSize: 12, letterSpacing: 1,
    marginBottom: 20,
  },
  h1: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 'clamp(40px,5vw,64px)',
    fontWeight: 700,
    lineHeight: 1.15,
    color: 'var(--text-dark)',
    marginBottom: 20,
  },
  h1em: {
    fontStyle: 'italic',
    color: 'var(--gold)',
  },
  heroSub: {
    fontSize: 16, lineHeight: 1.7,
    color: 'var(--text-mid)',
    maxWidth: 480,
    marginBottom: 28,
  },
  proofRow: {
    display: 'flex', gap: 32, marginBottom: 36,
    flexWrap: 'wrap',
  },
  proofItem: { display: 'flex', flexDirection: 'column', gap: 2 },
  proofVal: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 26, fontWeight: 700,
    color: 'var(--gold)',
  },
  proofLabel: { fontSize: 12, color: 'var(--text-light)', letterSpacing: 0.5 },

  /* FORM CARD */
  formCard: {
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '32px',
    boxShadow: '0 8px 40px rgba(200,146,42,0.12)',
    maxWidth: 480,
  },
  formHeader: { marginBottom: 24 },
  formEyebrow: {
    fontSize: 11, letterSpacing: 2,
    color: 'var(--gold)', fontWeight: 600,
    display: 'block', marginBottom: 6,
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 24, fontWeight: 700,
    color: 'var(--text-dark)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 500, color: 'var(--text-mid)' },
  input: {
    border: '1.5px solid var(--border)',
    borderRadius: 6,
    padding: '12px 14px',
    fontSize: 15,
    outline: 'none',
    fontFamily: 'Inter,sans-serif',
    color: 'var(--text-dark)',
    background: 'var(--warm-white)',
    transition: 'border-color 0.2s',
  },
  errorMsg: { fontSize: 13, color: '#c0392b' },
  btn: {
    background: 'var(--gold)',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '14px 20px',
    fontSize: 15, fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: 0.3,
    marginTop: 4,
    transition: 'background 0.2s',
  },
  btnLoading: { background: '#b8832a', cursor: 'not-allowed' },
  privacy: { fontSize: 12, color: 'var(--text-light)', textAlign: 'center' },

  /* SUCCESS */
  successBox: { textAlign: 'center', padding: '16px 0' },
  successIcon: { fontSize: 48, marginBottom: 12 },
  successTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 26, fontWeight: 700,
    color: 'var(--gold)', marginBottom: 10,
  },
  successText: { fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7 },

  /* SECTIONS */
  section: {
    background: 'var(--ivory)',
    padding: '80px 24px',
  },
  sectionInner: { maxWidth: 1200, margin: '0 auto' },
  eyebrow: {
    fontSize: 11, letterSpacing: 3,
    color: 'var(--gold)', fontWeight: 600,
    marginBottom: 10, display: 'block',
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 'clamp(28px,4vw,44px)',
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginBottom: 48,
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 24,
  },
  card: {
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '28px 24px',
  },
  cardIcon: { fontSize: 28, marginBottom: 14, color: 'var(--gold)' },
  cardTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 20, fontWeight: 700,
    color: 'var(--text-dark)', marginBottom: 10,
  },
  cardDesc: { fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 },

  /* ABOUT */
  aboutSection: { background: '#fff', padding: '80px 24px' },
  aboutGrid: {
    display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap',
  },
  aboutVisual: {
    flex: '0 0 220px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
  },
  aboutInitial: {
    width: 160, height: 160,
    borderRadius: '50%',
    background: 'var(--gold-pale)',
    border: '3px solid var(--gold)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 52, fontWeight: 700,
    color: 'var(--gold)',
  },
  aboutDecor: {
    display: 'flex', gap: 12,
    fontSize: 22, color: 'var(--gold)', opacity: 0.6,
  },
  aboutCopy: { flex: '1 1 320px' },
  aboutDesc: {
    fontSize: 15, lineHeight: 1.8,
    color: 'var(--text-mid)', maxWidth: 520, marginBottom: 32,
  },
  aboutStats: {
    display: 'flex', gap: 24, flexWrap: 'wrap',
  },
  statBox: {
    background: 'var(--ivory)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '14px 20px',
    minWidth: 100,
  },
  statVal: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 22, fontWeight: 700, color: 'var(--gold)',
  },
  statLabel: { fontSize: 12, color: 'var(--text-light)', marginTop: 2 },

  /* TESTIMONIALS */
  testimonialCard: {
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '28px 24px',
  },
  tStars: { fontSize: 14, marginBottom: 12 },
  tQuote: {
    fontSize: 14, lineHeight: 1.8,
    color: 'var(--text-mid)',
    fontStyle: 'italic', marginBottom: 20,
  },
  tAuthor: { display: 'flex', alignItems: 'center', gap: 12 },
  tAvatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: 'var(--gold-pale)',
    border: '1px solid var(--gold)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 700, color: 'var(--gold)',
  },
  tName: { fontSize: 14, fontWeight: 600, color: 'var(--text-dark)' },
  tCity: { fontSize: 12, color: 'var(--text-light)' },

  /* BOTTOM CTA */
  ctaSection: {
    background: 'var(--gold)',
    padding: '80px 24px',
    textAlign: 'center',
  },
  ctaInner: { maxWidth: 640, margin: '0 auto' },
  ctaEyebrow: {
    fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.8)',
    fontWeight: 600, display: 'block', marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 'clamp(28px,4vw,44px)',
    fontWeight: 700, color: '#fff',
    marginBottom: 14,
  },
  ctaSub: {
    fontSize: 16, color: 'rgba(255,255,255,0.85)',
    marginBottom: 36,
  },
  ctaBtn: {
    display: 'inline-block',
    background: '#fff',
    color: 'var(--gold)',
    padding: '16px 36px',
    borderRadius: 6,
    fontSize: 16, fontWeight: 700,
    textDecoration: 'none',
    letterSpacing: 0.3,
  },

  /* FOOTER */
  footer: {
    background: 'var(--text-dark)',
    padding: '32px 24px',
  },
  footerInner: {
    maxWidth: 1200, margin: '0 auto',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
  },
  footerLogo: { display: 'flex', alignItems: 'center', gap: 8 },
  footerBrand: {
    fontSize: 13, color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
  },
  footerText: { fontSize: 13, color: 'rgba(255,255,255,0.4)' },
};
