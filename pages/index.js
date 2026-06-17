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

  const WHATSAPP_URL = 'https://wa.me/919415312590?text=Hi%20Rahul%20Raj%20Sir%2C%20I%20want%20to%20join%20the%20astrology%20course';
  const PHONE_NUMBER = '+91 94153 12590';
  const PHOTO_URL = 'https://raw.githubusercontent.com/jagpreetlpscanva-beep/rahulraj-leads/main/public/ChatGPT%20Image%20Jun%2017%2C%202026%2C%2010_11_27%20AM.png';

  return (
    <>
      <Head>
        <title>Learn Astrology from Rahul Raj — Become a Certified Astrologer</title>
        <meta name="description" content="Learn Vedic Astrology from Pt. Rahul Raj. Become a Certified Astrologer in just 15 classes. 1st class FREE. 5000+ happy students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #ffffff; color: #3a1f0e; }
        .nav {
          background: rgba(255,255,255,0.97); backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(180,130,40,0.15);
          position: sticky; top: 0; z-index: 200;
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 32px; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-logo-icon {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #E8714A, #FFAB85);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; color: #fff;
          font-family: 'Playfair Display', serif;
        }
        .nav-logo-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #3a1f0e; letter-spacing: 1px; }
        .nav-logo-sub { font-size: 9px; color: #E8714A; letter-spacing: 3px; font-weight: 600; }
        .nav-links { display: flex; align-items: center; gap: 24px; list-style: none; }
        .nav-links a { font-size: 13px; font-weight: 500; color: #5a2f18; text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover, .nav-links a.active { color: #E8714A; }
        .nav-enroll { background: #E8714A; color: #fff !important; padding: 9px 18px; border-radius: 6px; font-weight: 700 !important; }
        .nav-hamburger { display: none; background: none; border: 1px solid #FFD4B8; border-radius: 6px; padding: 7px 10px; cursor: pointer; font-size: 18px; }
        .hero {
          background: #ffffff;
          min-height: calc(100vh - 68px);
          display: flex; align-items: center;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(232,113,74,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 60px 32px;
          display: flex; align-items: center; gap: 0; width: 100%;
          position: relative; z-index: 2;
        }
        .hero-left { flex: 1; padding-right: 40px; position: relative; z-index: 2; }
        .hero-right {
          flex: 0 0 560px;
          position: relative;
          height: 640px;
        }
        .zodiac-wheel {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 560px; height: 560px; opacity: 0.2;
        }
        .hero-photo {
          position: absolute; left: 50%; bottom: 0;
          transform: translateX(-50%);
          height: 640px; width: auto; max-width: 600px;
          object-fit: contain; object-position: bottom center;
          z-index: 3;
          filter: drop-shadow(0 20px 60px rgba(0,0,0,0.35));
        }
        .float-card {
          position: absolute; z-index: 4;
          background: #fff;
          border: 1px solid #FFD4B8;
          border-radius: 12px; padding: 10px 16px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 32px rgba(232,113,74,0.15);
        }
        .float-card-1 { top: 40px; right: 0; animation: float1 3s ease-in-out infinite; }
        .float-card-2 { bottom: 160px; left: -20px; animation: float2 3s ease-in-out infinite 1s; }
        .float-card-3 { bottom: 60px; right: -10px; animation: float3 3s ease-in-out infinite 2s; }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .float-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: #FFE8D6;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .float-val { font-size: 15px; font-weight: 700; color: #3a1f0e; line-height: 1.2; }
        .float-label { font-size: 11px; color: #b07a5a; margin-top: 1px; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: #FFE8D6; border: 1px solid #FFD4B8;
          border-radius: 100px; padding: 5px 14px;
          font-size: 11px; font-weight: 600; color: #C8702A;
          letter-spacing: 1.5px; margin-bottom: 20px; text-transform: uppercase;
        }
        .hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px, 4.5vw, 62px);
          font-weight: 900; line-height: 1.1; color: #3a1f0e; margin-bottom: 12px;
        }
        .hero-h1 span { color: #E8714A; }
        .hero-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2vw, 24px);
          color: #5a2f18; font-weight: 700; margin-bottom: 8px;
        }
        .hero-subtitle span { color: #E8714A; }
        .hero-divider { display: flex; align-items: center; gap: 10px; margin: 18px 0; }
        .hero-divider-line { flex: 1; height: 1px; background: #FFD4B8; }
        .hero-divider-icon { color: #E8714A; font-size: 14px; }
        .hero-desc { font-size: 15px; color: #6a4428; line-height: 1.75; max-width: 460px; margin-bottom: 28px; }
        .features-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 28px; }
        .feature-badge {
          background: #FFE8D6; border: 1px solid #FFD4B8;
          border-radius: 10px; padding: 12px 8px; text-align: center;
        }
        .feature-icon { font-size: 20px; margin-bottom: 6px; display: block; }
        .feature-title { font-size: 11px; font-weight: 700; color: #3a1f0e; line-height: 1.3; }
        .feature-sub { font-size: 10px; color: #9a5a3a; margin-top: 3px; line-height: 1.4; }
        .cta-row { display: flex; gap: 12px; margin-bottom: 28px; }
        .btn-primary {
          background: #E8714A; color: #fff; border: none; border-radius: 8px;
          padding: 14px 22px; font-size: 13px; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; letter-spacing: 0.5px; text-transform: uppercase;
          transition: all 0.2s; text-decoration: none; flex: 1; justify-content: center;
          box-shadow: 0 4px 20px rgba(232,113,74,0.3);
        }
        .btn-primary:hover { background: #d65f3a; transform: translateY(-1px); }
        .btn-whatsapp {
          background: #fff; color: #3a1f0e;
          border: 2px solid #FFD4B8; border-radius: 8px;
          padding: 14px 22px; font-size: 13px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; text-decoration: none;
          flex: 1; justify-content: center; transition: all 0.2s;
        }
        .btn-whatsapp:hover { background: rgba(37,211,102,0.08); border-color: #25D366; }
        .trust-bar { display: flex; gap: 20px; flex-wrap: wrap; }
        .trust-item { display: flex; align-items: center; gap: 8px; }
        .trust-text { font-size: 13px; color: #6a4428; font-weight: 500; }
        .trust-text strong { color: #E8714A; }
        .call-now-link { display: inline-block; margin-top: 16px; font-size: 14px; font-weight: 700; color: #E8714A; text-decoration: none; }
        .call-now-link:hover { text-decoration: underline; }
        .tagline-bar { background: #3a1f0e; padding: 18px 24px; text-align: center; }
        .tagline-bar p { font-family: 'Playfair Display',serif; font-size: clamp(14px,2vw,20px); color: #FFAB85; font-style: italic; }
        .features-section { background: #FFE8D6; padding: 80px 24px; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          font-size: 11px; color: #E8714A; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px;
        }
        .section-eyebrow::before, .section-eyebrow::after { content: ''; flex: 0 0 40px; height: 1px; background: #E8714A; opacity: 0.4; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(26px,3vw,40px); font-weight: 900; color: #3a1f0e; line-height: 1.2; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .feature-card { background: #fff; border: 1px solid #FFD4B8; border-radius: 12px; padding: 28px 22px; display: flex; flex-direction: column; gap: 12px; transition: box-shadow 0.2s; }
        .feature-card:hover { box-shadow: 0 4px 24px rgba(232,113,74,0.12); }
        .feature-card-icon { width: 52px; height: 52px; border-radius: 50%; background: #FFE8D6; border: 2px solid #FFD4B8; display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .feature-card-title { font-weight: 700; font-size: 16px; color: #3a1f0e; }
        .feature-card-desc { font-size: 14px; color: #9a5a3a; line-height: 1.7; }
        .stats-section { background: linear-gradient(135deg, #2a1800, #3a1f0e); padding: 64px 24px; }
        .stats-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        .stat-val { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 900; color: #FFAB85; line-height: 1; }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 8px; }
        .form-section { background: #fff; border-top: 3px solid #E8714A; padding: 72px 24px; }
        .form-section-inner { max-width: 560px; margin: 0 auto; text-align: center; }
        .form-eyebrow { display: inline-block; background: #FFE8D6; border: 1px solid #FFD4B8; border-radius: 100px; padding: 5px 16px; font-size: 11px; font-weight: 700; color: #E8714A; letter-spacing: 2px; margin-bottom: 16px; text-transform: uppercase; }
        .form-title { font-family: 'Playfair Display', serif; font-size: clamp(24px,3vw,36px); font-weight: 900; color: #3a1f0e; margin-bottom: 8px; }
        .form-sub { font-size: 15px; color: #9a5a3a; margin-bottom: 32px; }
        .lead-form { background: #FFE8D6; border-radius: 16px; border: 1px solid #FFD4B8; padding: 32px; display: flex; flex-direction: column; gap: 16px; text-align: left; }
        .field-wrap { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 13px; font-weight: 600; color: #5a2f18; }
        .field-input { border: 2px solid #FFD4B8; border-radius: 8px; padding: 13px 16px; font-size: 15px; outline: none; background: #fff; font-family: 'Inter', sans-serif; color: #3a1f0e; transition: border-color 0.2s; width: 100%; }
        .field-input:focus { border-color: #E8714A; }
        .submit-btn { background: #E8714A; color: #fff; border: none; border-radius: 8px; padding: 16px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; letter-spacing: 0.5px; box-shadow: 0 4px 20px rgba(232,113,74,0.35); transition: all 0.2s; }
        .submit-btn:hover:not(:disabled) { background: #d65f3a; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .privacy-note { font-size: 12px; color: #b07a5a; text-align: center; }
        .error-msg { color: #c0392b; font-size: 13px; }
        .success-box { text-align: center; padding: 16px 0; }
        .success-emoji { font-size: 52px; display: block; margin-bottom: 12px; }
        .success-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #E8714A; margin-bottom: 8px; }
        .success-text { font-size: 15px; color: #6a3a22; line-height: 1.7; }
        .testimonials-section { background: #FFE8D6; padding: 80px 24px; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .testimonial-card { background: #fff; border: 1px solid #FFD4B8; border-radius: 12px; padding: 24px; }
        .t-stars { color: #E8714A; font-size: 15px; margin-bottom: 12px; letter-spacing: 2px; }
        .t-quote { font-size: 14px; color: #5a2f18; line-height: 1.7; font-style: italic; margin-bottom: 16px; }
        .t-author { display: flex; align-items: center; gap: 10px; }
        .t-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #E8714A, #FFAB85); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 16px; flex-shrink: 0; }
        .t-name { font-size: 14px; font-weight: 700; color: #3a1f0e; }
        .t-city { font-size: 12px; color: #b07a5a; }
        .bottom-cta { background: linear-gradient(135deg, #E8714A, #FFAB85); padding: 80px 24px; text-align: center; }
        .bottom-cta-tagline { font-family: 'Playfair Display', serif; font-size: 18px; color: rgba(255,255,255,0.85); font-style: italic; margin-bottom: 8px; }
        .bottom-cta-title { font-family: 'Playfair Display', serif; font-size: clamp(26px,3.5vw,46px); font-weight: 900; color: #fff; margin-bottom: 12px; }
        .bottom-cta-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 36px; }
        .bottom-cta-btn { display: inline-flex; align-items: center; gap: 10px; background: #fff; color: #E8714A; border-radius: 8px; padding: 16px 40px; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 20px rgba(0,0,0,0.15); transition: transform 0.2s; }
        .bottom-cta-btn:hover { transform: translateY(-2px); }
        .footer { background: #0e0700; padding: 28px 24px; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-brand { font-family: 'Playfair Display', serif; font-size: 16px; color: rgba(255,255,255,0.5); font-weight: 700; }
        .footer-brand span { color: #FFAB85; }
        .footer-text { font-size: 12px; color: rgba(255,255,255,0.3); }
        .footer-phone { font-size: 13px; color: #FFAB85; font-weight: 600; text-decoration: none; }
        .footer-phone:hover { color: #fff; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
          .hero-inner { flex-direction: column; padding: 0; }
          .hero-right {
            position: relative; width: 100%; max-width: 100%;
            transform: none; flex: none; height: 440px;
            order: -1; overflow: visible; z-index: 1; pointer-events: auto;
          }
          .zodiac-wheel { width: 380px; height: 380px; left: 50%; transform: translate(-50%, -50%); top: 50%; }
          .hero-photo { height: 430px; }
          .float-card-1 { top: 20px; left: auto; right: 8px; }
          .float-card-2 { bottom: 20px; left: 8px; }
          .float-card-3 { bottom: -10px; left: auto; right: 8px; }
          .hero-left { padding: 48px 20px 40px; }
          .features-row { grid-template-columns: repeat(2, 1fr); }
          .cta-row { flex-direction: column; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon">R</div>
            <div style={{display:'flex',flexDirection:'column'}}>
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
            <li><a href="#enroll" className="nav-enroll">📅 Enroll Now</a></li>
          </ul>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-pill">✦ Vedic Astrology &amp; Spiritual Guidance</div>
            <h1 className="hero-h1">Learn Astrology<br />from <span>Rahul Raj</span></h1>
            <p className="hero-subtitle">Become a Certified Astrologer<br />in Just <span>15 Classes</span></p>
            <div className="hero-divider">
              <div className="hero-divider-line"></div>
              <span className="hero-divider-icon">❋</span>
              <div className="hero-divider-line"></div>
            </div>
            <p className="hero-desc">Join thousands of students who are transforming their life and guiding others with the power of Vedic Astrology.</p>
            <div className="features-row">
              {[['📖','1st Class FREE','Start Risk-Free'],['🎓','15 Classes','Step-by-Step Training'],['📜','Certificate','Recognized Credential'],['👨‍👩‍👧','Generations','Learn. Guide. Transform.']].map(([icon,title,sub]) => (
                <div key={title} className="feature-badge">
                  <span className="feature-icon">{icon}</span>
                  <div className="feature-title">{title}</div>
                  <div className="feature-sub">{sub}</div>
                </div>
              ))}
            </div>
            <div className="cta-row">
              <a href="#enroll" className="btn-primary">📅 JOIN FIRST CLASS FREE →</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-whatsapp">💬 WHATSAPP US</a>
            </div>
            <div className="trust-bar">
              {[['👥',<><strong>5000+</strong> Happy Students</>],['⭐',<><strong>15+</strong> Years Experience</>],['🌟',<><strong>4.9/5</strong> Rating</>]].map(([icon,text],i) => (
                <div key={i} className="trust-item">
                  <span style={{fontSize:16}}>{icon}</span>
                  <span className="trust-text">{text}</span>
                </div>
              ))}
            </div>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g,'')}`} className="call-now-link">📞 Call Now: {PHONE_NUMBER}</a>
          </div>

          <div className="hero-right">
            <svg className="zodiac-wheel" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <circle cx="250" cy="250" r="238" fill="none" stroke="#fff" strokeWidth="1.2"/>
              <circle cx="250" cy="250" r="195" fill="none" stroke="#fff" strokeWidth="0.7" strokeDasharray="5 10"/>
              <circle cx="250" cy="250" r="150" fill="none" stroke="#fff" strokeWidth="0.7"/>
              {['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'].map((sym,i) => {
                const angle = (i*30-90)*Math.PI/180;
                const x = 250+218*Math.cos(angle), y = 250+218*Math.sin(angle);
                return (
                  <g key={i}>
                    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="22" fill="#fff">{sym}</text>
                    <line x1={250+150*Math.cos(angle)} y1={250+150*Math.sin(angle)} x2={250+195*Math.cos(angle)} y2={250+195*Math.sin(angle)} stroke="#fff" strokeWidth="0.6"/>
                  </g>
                );
              })}
            </svg>
            <img src={PHOTO_URL} alt="Pt. Rahul Raj" className="hero-photo" />
            <div className="float-card float-card-1">
              <div className="float-icon">👥</div>
              <div><div className="float-val">5000+ Students</div><div className="float-label">Trained &amp; Certified</div></div>
            </div>
            <div className="float-card float-card-2">
              <div className="float-icon">🏆</div>
              <div><div className="float-val">15+ Years</div><div className="float-label">of Teaching Legacy</div></div>
            </div>
            <div className="float-card float-card-3">
              <div className="float-icon">⭐</div>
              <div><div className="float-val">4.9/5 Rating</div><div className="float-label">98% Positive Feedback</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="tagline-bar">
        <p>❋ One Decision Today Can Change Your Life &amp; Generations Forever. ❋</p>
      </div>

      <section className="features-section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Course Highlights</div>
            <h2 className="section-title">From Beginner to Astrologer<br />in 15 Transformative Classes</h2>
          </div>
          <div className="features-grid">
            {[['🎯','Complete Learning','From fundamentals to advanced techniques. No prior knowledge required.'],['▶️','15 Step-by-Step Classes','Easy to understand modules designed for practical learning.'],['🔮','Practical & Predictive','Learn chart reading, prediction, remedies and real-life applications.'],['📜','Certificate of Completion','Get a professional certificate upon successful completion of the course.'],['💰','Learn & Earn','Build your confidence and start guiding others professionally.'],['🌿','Generations of Impact','Empower yourself and create a legacy of wisdom for generations.']].map(([icon,title,desc]) => (
              <div key={title} className="feature-card">
                <div className="feature-card-icon">{icon}</div>
                <div className="feature-card-title">{title}</div>
                <p className="feature-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {[['5000+','Happy Students'],['15+','Years Experience'],['4.9/5','Student Rating'],['100%','Trusted Guidance']].map(([val,label]) => (
            <div key={label}><div className="stat-val">{val}</div><div className="stat-label">{label}</div></div>
          ))}
        </div>
      </section>

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
                <p className="success-text">Our team will call you on <strong>{phone}</strong> within 24 hours with full course details.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:8,marginTop:20,background:'#25D366',color:'#fff',padding:'12px 24px',borderRadius:8,fontWeight:700,textDecoration:'none',fontSize:15}}>💬 WhatsApp Us Now</a>
              </div>
            ) : (
              <>
                <div className="field-wrap">
                  <label className="field-label">Your Name</label>
                  <input className="field-input" type="text" placeholder="e.g. Priya Sharma" value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div className="field-wrap">
                  <label className="field-label">WhatsApp Number</label>
                  <input className="field-input" type="tel" placeholder="10-digit mobile number" value={phone} onChange={e=>setPhone(e.target.value)} maxLength={15} required />
                </div>
                {errorMsg && <p className="error-msg">⚠ {errorMsg}</p>}
                <button className="submit-btn" onClick={handleSubmit} disabled={status==='loading'||!name||!phone}>
                  {status==='loading' ? 'Sending...' : '🎓 Join First Class FREE →'}
                </button>
                <p className="privacy-note">🔒 No spam. We never share your details.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Student Stories</div>
            <h2 className="section-title">Real Students. Real Results.</h2>
          </div>
          <div className="testimonials-grid">
            {[['Ananya Mishra','Delhi','I went from knowing nothing to doing paid consultations in 6 months. Rahul sir explains in simple Hindi — even complex dashas become clear.'],['Rohit Verma','Lucknow','The practical approach is what sets this apart. I can now read full Kundali charts. The certificate helped me start my own practice.'],['Sneha Patel','Ahmedabad','Best investment I made. The live classes are incredibly valuable — Rahul sir corrects your charts in real time. Worth every rupee.']].map(([n,city,quote]) => (
              <div key={n} className="testimonial-card">
                <div className="t-stars">★★★★★</div>
                <p className="t-quote">"{quote}"</p>
                <div className="t-author">
                  <div className="t-avatar">{n[0]}</div>
                  <div><div className="t-name">{n}</div><div className="t-city">{city}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <p className="bottom-cta-tagline">❋ Limited Seats Available ❋</p>
        <h2 className="bottom-cta-title">Start Your Astrology Journey Today</h2>
        <p className="bottom-cta-sub">First class is completely FREE. No risk. No obligation.</p>
        <a href="#enroll" className="bottom-cta-btn">🎓 Claim Your Free Class Now</a>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand"><span>RAHUL RAJ</span> — VEDIC ASTROLOGER</div>
          <a href={`tel:${PHONE_NUMBER.replace(/\s/g,'')}`} className="footer-phone">📞 {PHONE_NUMBER}</a>
          <p className="footer-text">© 2024 Rahul Raj. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
