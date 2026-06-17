import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (res.ok) setStatus('success');
    else { setStatus('error'); setErrorMsg(data.error || 'Something went wrong.'); }
  }

  const WHATSAPP_URL = 'https://wa.me/919999999999?text=Hi%20Rahul%20Raj%20Sir%2C%20I%20want%20to%20join%20the%20astrology%20course';

  return (
    <>
      <Head>
        <title>Learn Astrology from Rahul Raj — Become a Certified Astrologer</title>
        <meta name="description" content="Learn Vedic Astrology from Pt. Rahul Raj. Become a Certified Astrologer in just 15 classes. 1st class FREE. 5000+ happy students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #FBF3E3; color: #1a0e00; }
        
        /* NAV */
        .nav {
          background: rgba(251,243,227,0.97);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(180,130,40,0.15);
          position: sticky; top: 0; z-index: 100;
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px; height: 70px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-logo-icon {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #C8922A, #E8B84B);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 900; color: #fff;
          font-family: 'Playfair Display', serif;
          box-shadow: 0 2px 12px rgba(200,146,42,0.35);
        }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 700; color: #1a0e00;
          letter-spacing: 1px; line-height: 1;
        }
        .nav-logo-sub {
          font-size: 9px; color: #C8922A; letter-spacing: 3px;
          margin-top: 2px; font-weight: 600;
        }
        .nav-links {
          display: flex; align-items: center; gap: 28px;
          list-style: none;
        }
        .nav-links a {
          font-size: 13px; font-weight: 500; color: #4a3010;
          text-decoration: none; letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #C8922A; }
        .nav-links a.active { color: #C8922A; border-bottom: 2px solid #C8922A; padding-bottom: 2px; }
        .nav-enroll {
          background: #C8922A; color: #fff !important;
          padding: 10px 20px; border-radius: 6px;
          font-weight: 700 !important; font-size: 13px !important;
          display: flex; align-items: center; gap: 6px;
        }
        .nav-hamburger {
          display: none; background: none; border: 1px solid #E8D9B8;
          border-radius: 6px; padding: 8px; cursor: pointer;
          color: #1a0e00; font-size: 18px;
        }

        /* HERO */
        .hero {
          background: linear-gradient(135deg, #FBF3E3 0%, #F5E5C0 40%, #EDD49A 100%);
          min-height: calc(100vh - 70px);
          display: flex; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 48px 24px;
          display: flex; align-items: center;
          gap: 0; width: 100%;
        }
        .hero-left { flex: 1; z-index: 2; padding-right: 32px; }
        .hero-right {
          flex: 0 0 520px; position: relative;
          height: 560px;
        }

        /* Zodiac wheel background */
        .zodiac-wheel {
          position: absolute; right: -40px; top: 50%;
          transform: translateY(-50%);
          width: 520px; height: 520px;
          opacity: 0.18;
        }
        .hero-photo {
          position: absolute; bottom: 0; right: 0;
          height: 540px; width: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 40px rgba(180,120,20,0.3));
          z-index: 2;
        }
        .hero-photo-placeholder {
          position: absolute; bottom: 0; right: 40px;
          width: 380px; height: 480px;
          background: linear-gradient(180deg, rgba(200,146,42,0.1) 0%, rgba(200,146,42,0.25) 100%);
          border-radius: 200px 200px 0 0;
          display: flex; align-items: center; justify-content: center;
          z-index: 2;
        }
        .hero-photo-initials {
          font-family: 'Playfair Display', serif;
          font-size: 80px; font-weight: 900; color: rgba(200,146,42,0.4);
        }

        .pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(200,146,42,0.3);
          border-radius: 100px; padding: 6px 14px;
          font-size: 12px; font-weight: 600; color: #8B6020;
          letter-spacing: 1px; margin-bottom: 20px;
          text-transform: uppercase;
        }
        .pill-icon { font-size: 14px; }

        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 900; line-height: 1.1;
          color: #1a0e00; margin-bottom: 10px;
        }
        .hero-h1 span { color: #C8922A; }

        .hero-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2vw, 24px);
          color: #4a3010; margin-bottom: 8px; font-weight: 700;
        }
        .hero-subtitle span { color: #C8922A; }

        .hero-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 16px 0;
        }
        .hero-divider-line { flex: 1; height: 1px; background: rgba(200,146,42,0.3); }
        .hero-divider-icon { color: #C8922A; font-size: 14px; }

        .hero-desc {
          font-size: 15px; color: #5a4020; line-height: 1.7;
          max-width: 440px; margin-bottom: 28px;
        }

        /* Feature badges */
        .features-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 12px; margin-bottom: 28px;
        }
        .feature-badge {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(200,146,42,0.2);
          border-radius: 10px; padding: 12px 8px;
          text-align: center;
        }
        .feature-icon { font-size: 22px; margin-bottom: 6px; display: block; }
        .feature-title { font-size: 12px; font-weight: 700; color: #1a0e00; line-height: 1.3; }
        .feature-sub { font-size: 10px; color: #7a5a30; margin-top: 3px; line-height: 1.4; }

        /* CTA buttons */
        .cta-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
        .btn-primary {
          background: #C8922A;
          color: #fff; border: none; border-radius: 8px;
          padding: 14px 24px; font-size: 14px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 20px rgba(200,146,42,0.4);
          letter-spacing: 0.5px; text-transform: uppercase;
          transition: all 0.2s; text-decoration: none;
          flex: 1; justify-content: center;
        }
        .btn-primary:hover { background: #b07820; transform: translateY(-1px); }
        .btn-whatsapp {
          background: #fff; color: #1a0e00;
          border: 2px solid rgba(200,146,42,0.3);
          border-radius: 8px; padding: 14px 24px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif;
          text-decoration: none; flex: 1; justify-content: center;
          transition: all 0.2s;
        }
        .btn-whatsapp:hover { border-color: #25D366; color: #25D366; }
        .wa-icon { font-size: 18px; }

        /* Trust bar */
        .trust-bar {
          display: flex; gap: 20px; flex-wrap: wrap;
        }
        .trust-item {
          display: flex; align-items: center; gap: 8px;
        }
        .trust-icon { font-size: 16px; color: #C8922A; }
        .trust-text { font-size: 13px; color: #5a4020; font-weight: 500; }
        .trust-text strong { color: #1a0e00; }

        /* FORM SECTION */
        .form-section {
          background: #fff;
          border-top: 3px solid #C8922A;
          padding: 60px 24px;
        }
        .form-section-inner {
          max-width: 600px; margin: 0 auto; text-align: center;
        }
        .form-eyebrow {
          display: inline-block; background: #FBF3E3;
          border: 1px solid #E8D9B8; border-radius: 100px;
          padding: 5px 16px; font-size: 11px; font-weight: 700;
          color: #C8922A; letter-spacing: 2px; margin-bottom: 16px;
          text-transform: uppercase;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3vw, 36px); font-weight: 900;
          color: #1a0e00; margin-bottom: 8px;
        }
        .form-sub { font-size: 15px; color: #7a5a30; margin-bottom: 32px; }

        .lead-form {
          background: #FBF3E3; border-radius: 16px;
          border: 1px solid #E8D9B8; padding: 32px;
          display: flex; flex-direction: column; gap: 16px;
          text-align: left;
        }
        .field-wrap { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 13px; font-weight: 600; color: #4a3010; }
        .field-input {
          border: 2px solid #E8D9B8; border-radius: 8px;
          padding: 13px 16px; font-size: 15px;
          outline: none; background: #fff;
          font-family: 'Inter', sans-serif; color: #1a0e00;
          transition: border-color 0.2s;
          width: 100%;
        }
        .field-input:focus { border-color: #C8922A; }
        .submit-btn {
          background: #C8922A; color: #fff; border: none;
          border-radius: 8px; padding: 16px;
          font-size: 16px; font-weight: 700; cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(200,146,42,0.35);
          transition: all 0.2s;
        }
        .submit-btn:hover:not(:disabled) { background: #b07820; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .privacy-note { font-size: 12px; color: #9a7a50; text-align: center; }
        .error-msg { color: #c0392b; font-size: 13px; }

        .success-box { text-align: center; padding: 16px 0; }
        .success-emoji { font-size: 52px; display: block; margin-bottom: 12px; }
        .success-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 900; color: #C8922A; margin-bottom: 8px;
        }
        .success-text { font-size: 15px; color: #5a4020; line-height: 1.7; }

        /* FEATURES SECTION */
        .features-section {
          background: #FBF3E3; padding: 72px 24px;
          border-top: 1px solid rgba(200,146,42,0.15);
        }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          font-size: 13px; color: #C8922A; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;
        }
        .section-eyebrow::before, .section-eyebrow::after {
          content: ''; flex: 0 0 40px; height: 1px;
          background: linear-gradient(to right, transparent, #C8922A);
        }
        .section-eyebrow::after { background: linear-gradient(to left, transparent, #C8922A); }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3vw, 38px); font-weight: 900;
          color: #1a0e00; line-height: 1.2;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .feature-card {
          background: #fff; border: 1px solid #E8D9B8;
          border-radius: 12px; padding: 28px 20px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .feature-card-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: #FBF3E3; border: 2px solid #E8D9B8;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: #C8922A;
        }
        .feature-card-title {
          font-weight: 700; font-size: 16px; color: #1a0e00;
        }
        .feature-card-desc { font-size: 14px; color: #7a5a30; line-height: 1.7; }

        /* STATS SECTION */
        .stats-section {
          background: linear-gradient(135deg, #2a1800, #1a0e00);
          padding: 60px 24px;
        }
        .stats-grid {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 32px; text-align: center;
        }
        .stat-item {}
        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 40px; font-weight: 900; color: #E8B84B;
          line-height: 1;
        }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 6px; }

        /* TESTIMONIALS */
        .testimonials-section {
          background: #fff; padding: 72px 24px;
        }
        .testimonials-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .testimonial-card {
          background: #FBF3E3; border: 1px solid #E8D9B8;
          border-radius: 12px; padding: 24px;
        }
        .t-stars { color: #C8922A; font-size: 14px; margin-bottom: 12px; }
        .t-quote { font-size: 14px; color: #4a3010; line-height: 1.7; font-style: italic; margin-bottom: 16px; }
        .t-author { display: flex; align-items: center; gap: 10px; }
        .t-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #C8922A, #E8B84B);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; color: #fff; font-size: 16px;
        }
        .t-name { font-size: 14px; font-weight: 700; color: #1a0e00; }
        .t-city { font-size: 12px; color: #9a7a50; }

        /* BOTTOM CTA */
        .bottom-cta {
          background: linear-gradient(135deg, #C8922A, #E8B84B);
          padding: 72px 24px; text-align: center;
        }
        .bottom-cta-tagline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(14px, 2vw, 18px); color: rgba(255,255,255,0.85);
          font-style: italic; margin-bottom: 8px;
        }
        .bottom-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 44px); font-weight: 900;
          color: #fff; margin-bottom: 8px;
        }
        .bottom-cta-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 32px; }
        .bottom-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #fff; color: #C8922A;
          border-radius: 8px; padding: 16px 36px;
          font-size: 16px; font-weight: 700;
          text-decoration: none; letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transition: transform 0.2s;
        }
        .bottom-cta-btn:hover { transform: translateY(-2px); }

        /* FOOTER */
        .footer {
          background: #0e0700; padding: 28px 24px;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 16px; color: rgba(255,255,255,0.6); font-weight: 700;
        }
        .footer-brand span { color: #E8B84B; }
        .footer-text { font-size: 12px; color: rgba(255,255,255,0.3); }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
          .hero-inner { flex-direction: column; padding: 0; }
          .hero-right {
            width: 100%; flex: none;
            height: 340px; order: -1;
          }
          .zodiac-wheel { width: 340px; height: 340px; right: 0; }
          .hero-photo { height: 340px; }
          .hero-photo-placeholder { width: 260px; height: 320px; right: 20px; }
          .hero-photo-initials { font-size: 60px; }
          .hero-left { padding: 24px 20px 36px; }
          .features-row { grid-template-columns: repeat(2, 1fr); }
          .cta-row { flex-direction: column; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .hero-h1 { font-size: 32px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon">R</div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">RAHUL RAJ</span>
              <span className="nav-logo-sub">VEDIC ASTROLOGER</span>
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Me</a></li>
            <li><a href="#" className="active">Teacher Training</a></li>
            <li><a href="#">Course Curriculum</a></li>
            <li><a href="#">Certificates</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#enroll" className="nav-enroll">📅 Enroll Now</a></li>
          </ul>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="pill">
              <span className="pill-icon">🪷</span>
              LEARN. UNDERSTAND. TRANSFORM.
            </div>

            <h1 className="hero-h1">
              Learn Astrology<br />
              from <span>Rahul Raj</span>
            </h1>
            <p className="hero-subtitle">
              Become a Certified Astrologer in Just <span>15 Classes</span>
            </p>

            <div className="hero-divider">
              <div className="hero-divider-line"></div>
              <span className="hero-divider-icon">❋</span>
              <div className="hero-divider-line"></div>
            </div>

            <p className="hero-desc">
              Join thousands of students who are transforming their life
              and guiding others with the power of Vedic Astrology.
            </p>

            <div className="features-row">
              {[
                ['📖', '1st Class FREE', 'Start Your Journey Risk-Free'],
                ['🎓', '15 Classes Complete Training', 'Step-by-Step From Basics to Advanced'],
                ['📜', 'Certificate of Completion', 'Recognized Certification'],
                ['👨‍👩‍👧‍👦', 'Generations of Guidance', 'Learn. Practice. Transform.'],
              ].map(([icon, title, sub]) => (
                <div key={title} className="feature-badge">
                  <span className="feature-icon">{icon}</span>
                  <div className="feature-title">{title}</div>
                  <div className="feature-sub">{sub}</div>
                </div>
              ))}
            </div>

            <div className="cta-row">
              <a href="#enroll" className="btn-primary">
                📅 JOIN FIRST CLASS FREE →
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-whatsapp">
                <span className="wa-icon">💬</span> WHATSAPP US
              </a>
            </div>

            <div className="trust-bar">
              {[
                ['👥', <><strong>5000+</strong> Happy Students</>],
                ['⭐', <><strong>15+</strong> Years Experience</>],
                ['🌟', <><strong>4.9/5</strong> Student Rating</>],
                ['🛡️', <><strong>100%</strong> Trusted Guidance</>],
              ].map(([icon, text], i) => (
                <div key={i} className="trust-item">
                  <span className="trust-icon">{icon}</span>
                  <span className="trust-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            {/* Zodiac Wheel SVG */}
            <svg className="zodiac-wheel" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <circle cx="250" cy="250" r="235" fill="none" stroke="#C8922A" strokeWidth="1.5"/>
              <circle cx="250" cy="250" r="195" fill="none" stroke="#C8922A" strokeWidth="0.8" strokeDasharray="4 8"/>
              <circle cx="250" cy="250" r="150" fill="none" stroke="#C8922A" strokeWidth="0.8"/>
              <circle cx="250" cy="250" r="100" fill="none" stroke="#C8922A" strokeWidth="1"/>
              {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((sym, i) => {
                const angle = (i * 30 - 90) * Math.PI / 180;
                const x = 250 + 215 * Math.cos(angle);
                const y = 250 + 215 * Math.sin(angle);
                const lx = 250 + 172 * Math.cos(angle);
                const ly = 250 + 172 * Math.sin(angle);
                return (
                  <g key={i}>
                    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="22" fill="#C8922A">{sym}</text>
                    <line x1={250 + 100*Math.cos(angle)} y1={250 + 100*Math.sin(angle)}
                      x2={250 + 195*Math.cos(angle)} y2={250 + 195*Math.sin(angle)}
                      stroke="#C8922A" strokeWidth="0.5" opacity="0.4"/>
                  </g>
                );
              })}
              <text x="250" y="240" textAnchor="middle" fontSize="14" fill="#C8922A" fontFamily="serif" letterSpacing="4">VEDIC</text>
              <text x="250" y="262" textAnchor="middle" fontSize="14" fill="#C8922A" fontFamily="serif" letterSpacing="3">JYOTISH</text>
            </svg>

            {/* Photo placeholder — replace src with real photo URL */}
            <div className="hero-photo-placeholder">
              <span className="hero-photo-initials">RR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline banner */}
      <div style={{ background: '#1a0e00', padding: '18px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(14px,2vw,20px)', color: '#E8B84B', fontStyle: 'italic' }}>
          ❋ One Decision Today Can Change Your Life &amp; Generations Forever. ❋
        </p>
      </div>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">❋ Course Highlights ❋</div>
            <h2 className="section-title">From Beginner to Astrologer<br />in 15 Transformative Classes</h2>
          </div>
          <div className="features-grid">
            {[
              ['🎯', 'Complete Learning', 'From fundamentals to advanced techniques. No prior knowledge required.'],
              ['▶️', '15 Step-by-Step Classes', 'Easy to understand modules designed for practical learning.'],
              ['🔮', 'Practical & Predictive', 'Learn chart reading, prediction, remedies and real-life applications.'],
              ['📜', 'Certificate of Completion', 'Get a professional certificate upon successful completion of the course.'],
              ['💰', 'Learn & Earn', 'Build your confidence and start guiding others professionally.'],
              ['🌿', 'Generations of Impact', 'Empower yourself and create a legacy of wisdom for generations.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="feature-card">
                <div className="feature-card-icon">{icon}</div>
                <div className="feature-card-title">{title}</div>
                <p className="feature-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {[['5000+','Happy Students'],['15+','Years Experience'],['4.9/5','Student Rating'],['100%','Trusted Guidance']].map(([val, label]) => (
            <div key={label} className="stat-item">
              <div className="stat-val">{val}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section className="form-section" id="enroll">
        <div className="form-section-inner">
          <span className="form-eyebrow">🎓 Free Counselling Session</span>
          <h2 className="form-title">Get Course Details — It's Free</h2>
          <p className="form-sub">Our team will call you within 24 hours with full details.</p>

          <div className="lead-form">
            {status === 'success' ? (
              <div className="success-box">
                <span className="success-emoji">🙏</span>
                <h3 className="success-title">Namaste, {name}!</h3>
                <p className="success-text">
                  Our team will call you on <strong>{phone}</strong> within 24 hours
                  with full course details. You can also WhatsApp us directly.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
                  💬 WhatsApp Us Now
                </a>
              </div>
            ) : (
              <>
                <div className="field-wrap">
                  <label className="field-label">Your Name</label>
                  <input className="field-input" type="text" placeholder="e.g. Priya Sharma"
                    value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="field-wrap">
                  <label className="field-label">WhatsApp Number</label>
                  <input className="field-input" type="tel" placeholder="10-digit mobile number"
                    value={phone} onChange={e => setPhone(e.target.value)} maxLength={15} required />
                </div>
                {errorMsg && <p className="error-msg">⚠ {errorMsg}</p>}
                <button className="submit-btn" onClick={handleSubmit}
                  disabled={status === 'loading' || !name || !phone}>
                  {status === 'loading' ? 'Sending...' : '🎓 Join First Class FREE →'}
                </button>
                <p className="privacy-note">🔒 No spam. We never share your details.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">❋ Student Stories ❋</div>
            <h2 className="section-title">Real Students. Real Results.</h2>
          </div>
          <div className="testimonials-grid">
            {[
              ['Ananya Mishra', 'Delhi', 'I went from knowing nothing to doing paid consultations in 6 months. Rahul sir explains in simple Hindi — even complex dashas become clear.'],
              ['Rohit Verma', 'Lucknow', 'The practical approach is what sets this apart. I can now read full Kundali charts. The certificate helped me start my own practice.'],
              ['Sneha Patel', 'Ahmedabad', 'Best investment I made. The live classes are incredibly valuable — Rahul sir corrects your charts in real time. Worth every rupee.'],
            ].map(([name, city, quote]) => (
              <div key={name} className="testimonial-card">
                <div className="t-stars">⭐⭐⭐⭐⭐</div>
                <p className="t-quote">"{quote}"</p>
                <div className="t-author">
                  <div className="t-avatar">{name[0]}</div>
                  <div>
                    <div className="t-name">{name}</div>
                    <div className="t-city">{city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bottom-cta">
        <p className="bottom-cta-tagline">❋ Limited Seats Available ❋</p>
        <h2 className="bottom-cta-title">Start Your Astrology Journey Today</h2>
        <p className="bottom-cta-sub">First class is completely FREE. No risk. No obligation.</p>
        <a href="#enroll" className="bottom-cta-btn">
          🎓 Claim Your Free Class Now
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span>RAHUL RAJ</span> — VEDIC ASTROLOGER
          </div>
          <p className="footer-text">© 2024 Rahul Raj. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
