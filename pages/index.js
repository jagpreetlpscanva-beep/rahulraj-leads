import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e, source = 'hero') => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, phone: formData.phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const features = [
    { icon: '📖', title: '1st Class FREE', sub: 'Start Risk-Free' },
    { icon: '🎓', title: '15 Classes', sub: 'Complete Training' },
    { icon: '📜', title: 'Certificate', sub: 'Recognized Nationwide' },
    { icon: '👨‍👩‍👧', title: 'Legacy', sub: 'Guide Generations' },
  ];

  const benefits = [
    { icon: '🎯', title: 'Complete Learning', desc: 'From fundamentals to advanced Vedic techniques. No prior knowledge required.' },
    { icon: '▶️', title: '15 Step-by-Step Classes', desc: 'Easy-to-follow modules designed for practical, real-world application.' },
    { icon: '🔮', title: 'Practical & Predictive', desc: 'Master chart reading, predictions, remedies, and real-life consultations.' },
    { icon: '📜', title: 'Certificate of Completion', desc: 'A professional certificate to launch your astrology career with confidence.' },
    { icon: '💰', title: 'Learn & Earn', desc: 'Build confidence and start guiding others professionally from Day 1.' },
    { icon: '🌱', title: 'Generations of Impact', desc: 'Empower yourself and create a lasting legacy of Vedic wisdom.' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', city: 'Delhi', text: 'I joined with zero knowledge. After 15 classes I am now guiding clients professionally. Rahul Sir explains everything so clearly!', stars: 5 },
    { name: 'Amit Verma', city: 'Mumbai', text: 'The course changed my life. I now earn ₹50,000+ per month from astrology consultations. Best investment I ever made.', stars: 5 },
    { name: 'Sunita Devi', city: 'Jaipur', text: 'Rahul Sir has 15+ years of experience and he shares everything. The WhatsApp support is amazing. Highly recommend!', stars: 5 },
    { name: 'Rakesh Gupta', city: 'Lucknow', text: 'I was skeptical at first but the free first class convinced me. The depth of knowledge is unmatched. Worth every rupee.', stars: 5 },
  ];

  const faqs = [
    { q: 'Do I need any prior knowledge of astrology?', a: 'No! The course starts from absolute basics. If you can read and write, you can learn Vedic Astrology with us.' },
    { q: 'How are the classes conducted?', a: 'Classes are conducted live online via video call. Recordings are also provided so you never miss a session.' },
    { q: 'What language are the classes in?', a: 'Classes are primarily in Hindi, making complex Vedic concepts easy to understand for Indian students.' },
    { q: 'Is the certificate recognized?', a: 'Yes, you receive a professional Certificate of Completion that you can use to establish your astrology practice.' },
    { q: 'Can I really start earning after this course?', a: 'Many of our students are earning ₹30,000–₹1,00,000+ per month. We provide guidance on how to start your practice.' },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Head>
        <title>Learn Vedic Astrology from Rahul Raj – Become a Certified Astrologer in 15 Classes</title>
        <meta name="description" content="Join 5000+ students. Learn Vedic Astrology from expert Rahul Raj. First class FREE. Get certified in just 15 classes. Enroll now." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --gold: #C8861A;
          --gold-light: #E6A020;
          --gold-pale: #F5E6C8;
          --cream: #FDF6EC;
          --cream-dark: #F7EDDA;
          --brown-dark: #1A0E00;
          --brown-mid: #3D2200;
          --text: #2C1810;
          --text-light: #6B4423;
          --white: #FFFFFF;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          color: var(--text);
          line-height: 1.6;
        }

        h1, h2, h3 {
          font-family: 'Playfair Display', serif;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.3s;
          padding: 16px 24px;
        }
        .nav.scrolled {
          background: rgba(253, 246, 236, 0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(200,134,26,0.15);
          padding: 10px 24px;
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-logo-icon {
          width: 44px; height: 44px;
          background: var(--gold);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          font-family: 'Playfair Display', serif;
          color: white;
          font-weight: 900;
          box-shadow: 0 0 0 3px rgba(200,134,26,0.2);
        }
        .nav-logo-text h3 {
          font-size: 16px;
          color: var(--brown-dark);
          letter-spacing: 0.05em;
          line-height: 1.1;
        }
        .nav-logo-text span {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--gold);
          font-weight: 600;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .nav-links a {
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-light);
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--gold); }
        .nav-links a.active { color: var(--gold); border-bottom: 2px solid var(--gold); padding-bottom: 2px; }
        .nav-cta {
          background: var(--gold);
          color: white !important;
          padding: 8px 20px;
          border-radius: 6px;
          font-weight: 700 !important;
          font-size: 13px !important;
          letter-spacing: 0.06em !important;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: var(--gold-light) !important; color: white !important; }
        .nav-mobile-cta {
          display: none;
          background: var(--gold);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          white-space: nowrap;
        }

        /* HERO */
        .hero {
          min-height: 100vh;
          background: linear-gradient(160deg, #FFF5E0 0%, #FDEAC8 40%, #F5D9A0 100%);
          padding-top: 76px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 600px; height: 600px;
          border-radius: 50%;
          border: 1px solid rgba(200,134,26,0.1);
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute;
          top: -50px; right: -50px;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(200,134,26,0.15);
          pointer-events: none;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          min-height: calc(100vh - 76px);
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,134,26,0.1);
          border: 1px solid rgba(200,134,26,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--gold);
          margin-bottom: 20px;
        }
        .hero h1 {
          font-size: clamp(36px, 5vw, 60px);
          line-height: 1.1;
          color: var(--brown-dark);
          margin-bottom: 12px;
        }
        .hero h1 .accent { color: var(--gold); }
        .hero-sub {
          font-size: clamp(18px, 2.5vw, 24px);
          color: var(--brown-mid);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .hero-sub .accent { color: var(--gold); }
        .hero-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
          color: var(--gold);
          font-size: 18px;
        }
        .hero-divider::before, .hero-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-pale));
        }
        .hero-desc {
          font-size: 16px;
          color: var(--text-light);
          margin-bottom: 28px;
          line-height: 1.7;
        }
        .hero-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        .hero-feature {
          text-align: center;
          padding: 12px 8px;
          background: rgba(255,255,255,0.6);
          border-radius: 10px;
          border: 1px solid rgba(200,134,26,0.2);
        }
        .hero-feature-icon {
          font-size: 20px;
          margin-bottom: 4px;
        }
        .hero-feature-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--brown-dark);
          line-height: 1.2;
        }
        .hero-feature-sub {
          font-size: 10px;
          color: var(--text-light);
          margin-top: 2px;
        }

        /* LEAD FORM */
        .lead-form-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 8px 40px rgba(200,134,26,0.15);
          border: 1px solid rgba(200,134,26,0.2);
        }
        .lead-form-title {
          font-size: 20px;
          color: var(--brown-dark);
          margin-bottom: 4px;
          font-family: 'Playfair Display', serif;
        }
        .lead-form-subtitle {
          font-size: 13px;
          color: var(--text-light);
          margin-bottom: 20px;
        }
        .lead-form input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #E8D5B0;
          border-radius: 8px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          color: var(--text);
          background: var(--cream);
          margin-bottom: 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .lead-form input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(200,134,26,0.12);
        }
        .lead-form input::placeholder { color: #B09060; }
        .btn-primary {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.06em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(200,134,26,0.4);
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(200,134,26,0.5);
        }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-whatsapp {
          width: 100%;
          padding: 13px;
          background: white;
          color: #25D366;
          border: 2px solid #25D366;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .btn-whatsapp:hover { background: #25D366; color: white; }
        .form-success {
          text-align: center;
          padding: 20px;
        }
        .form-success-icon { font-size: 48px; margin-bottom: 12px; }
        .form-success h3 {
          color: var(--gold);
          margin-bottom: 8px;
          font-size: 20px;
        }
        .form-success p { color: var(--text-light); font-size: 14px; }
        .form-error {
          background: #FFF0F0;
          border: 1px solid #FFCCCC;
          color: #CC3333;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          margin-bottom: 12px;
        }
        .form-privacy {
          font-size: 11px;
          color: var(--text-light);
          text-align: center;
          margin-top: 10px;
        }

        /* HERO RIGHT - IMAGE AREA */
        .hero-image-col {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .hero-stat {
          text-align: center;
          background: rgba(255,255,255,0.7);
          border-radius: 10px;
          padding: 14px 8px;
          border: 1px solid rgba(200,134,26,0.15);
        }
        .hero-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--gold);
        }
        .hero-stat-label {
          font-size: 10px;
          color: var(--text-light);
          margin-top: 2px;
        }

        /* SECTION: BENEFITS */
        .section {
          padding: 80px 24px;
        }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-eyebrow {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--gold);
          font-size: 13px;
          letter-spacing: 0.15em;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .section-eyebrow::before, .section-eyebrow::after {
          content: '✦';
          font-size: 10px;
        }
        .section-title {
          text-align: center;
          font-size: clamp(26px, 4vw, 40px);
          color: var(--brown-dark);
          margin-bottom: 8px;
        }
        .section-sub {
          text-align: center;
          color: var(--gold);
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 18px;
          margin-bottom: 48px;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .benefit-card {
          background: white;
          border-radius: 14px;
          padding: 28px 24px;
          border: 1px solid rgba(200,134,26,0.15);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .benefit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(200,134,26,0.12);
          border-color: rgba(200,134,26,0.4);
        }
        .benefit-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, rgba(200,134,26,0.1), rgba(200,134,26,0.05));
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          margin-bottom: 16px;
          border: 1px solid rgba(200,134,26,0.2);
        }
        .benefit-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--brown-dark);
          margin-bottom: 8px;
        }
        .benefit-desc { font-size: 14px; color: var(--text-light); line-height: 1.6; }

        /* SOCIAL PROOF */
        .social-proof { background: var(--brown-dark); padding: 60px 24px; }
        .social-inner { max-width: 1200px; margin: 0 auto; }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        .testimonial-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(200,134,26,0.3);
          border-radius: 14px;
          padding: 24px;
        }
        .testimonial-stars { color: var(--gold); font-size: 14px; margin-bottom: 12px; }
        .testimonial-text { color: rgba(255,255,255,0.85); font-size: 14px; line-height: 1.7; margin-bottom: 16px; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 10px; }
        .testimonial-avatar {
          width: 36px; height: 36px;
          background: var(--gold);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: white;
        }
        .testimonial-name { font-weight: 700; font-size: 13px; color: white; }
        .testimonial-city { font-size: 11px; color: rgba(255,255,255,0.5); }

        /* FAQ */
        .faq-section { background: var(--cream-dark); padding: 80px 24px; }
        .faq-list { max-width: 760px; margin: 40px auto 0; }
        .faq-item {
          background: white;
          border-radius: 10px;
          margin-bottom: 10px;
          border: 1px solid rgba(200,134,26,0.15);
          overflow: hidden;
        }
        .faq-question {
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          color: var(--brown-dark);
          transition: color 0.2s;
          user-select: none;
        }
        .faq-question:hover { color: var(--gold); }
        .faq-arrow { font-size: 12px; color: var(--gold); transition: transform 0.2s; }
        .faq-arrow.open { transform: rotate(180deg); }
        .faq-answer {
          padding: 0 24px 18px;
          font-size: 14px;
          color: var(--text-light);
          line-height: 1.7;
        }

        /* CTA SECTION */
        .cta-section {
          background: linear-gradient(135deg, var(--gold) 0%, #A06010 100%);
          padding: 80px 24px;
          text-align: center;
        }
        .cta-section h2 { color: white; font-size: clamp(28px, 4vw, 44px); margin-bottom: 16px; }
        .cta-section p { color: rgba(255,255,255,0.85); font-size: 17px; margin-bottom: 36px; max-width: 560px; margin-left: auto; margin-right: auto; }
        .cta-form {
          display: flex;
          gap: 12px;
          max-width: 480px;
          margin: 0 auto 16px;
          flex-direction: column;
        }
        .cta-form input {
          padding: 14px 18px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          color: white;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .cta-form input:focus { border-color: white; }
        .cta-form input::placeholder { color: rgba(255,255,255,0.6); }
        .btn-cta-white {
          padding: 15px 32px;
          background: white;
          color: var(--gold);
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .btn-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.25); }

        /* STICKY MOBILE CTA */
        .sticky-cta {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: white;
          padding: 12px 16px;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
          z-index: 99;
          display: none;
          gap: 10px;
        }

        /* FOOTER */
        .footer {
          background: var(--brown-dark);
          padding: 40px 24px 24px;
          text-align: center;
        }
        .footer-logo { color: var(--gold); font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 8px; }
        .footer-tagline { color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.2em; margin-bottom: 20px; }
        .footer-links { display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
        .footer-links a { color: rgba(255,255,255,0.6); font-size: 13px; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--gold); }
        .footer-copy { color: rgba(255,255,255,0.3); font-size: 12px; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-mobile-cta { display: block; }
          .hero-inner {
            grid-template-columns: 1fr;
            padding: 24px 16px 32px;
            min-height: unset;
            gap: 24px;
          }
          .hero-features { grid-template-columns: repeat(2, 1fr); }
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-image-col { order: -1; }
          .benefits-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .sticky-cta { display: flex; }
          .section { padding: 60px 16px; }
          .faq-section { padding: 60px 16px; }
          .cta-section { padding: 60px 16px; }
          .social-proof { padding: 60px 16px; }
        }

        @media (max-width: 480px) {
          .hero-features { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon">R</div>
            <div className="nav-logo-text">
              <h3>RAHUL RAJ</h3>
              <span>VEDIC ASTROLOGER</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#benefits">About</a>
            <a href="#benefits" className="active">Teacher Training</a>
            <a href="#benefits">Curriculum</a>
            <a href="#testimonials">Certificates</a>
            <a href="#faq">FAQ</a>
            <a href="#cta" className="nav-cta">📅 ENROLL NOW</a>
          </div>
          <a href="#hero-form" className="nav-mobile-cta">JOIN FREE →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-inner">
          {/* LEFT: Copy */}
          <div>
            <div className="hero-eyebrow">🪷 LEARN. UNDERSTAND. TRANSFORM.</div>
            <h1>
              Learn Astrology<br />
              from <span className="accent">Rahul Raj</span>
            </h1>
            <p className="hero-sub">
              Become a Certified Astrologer in Just <span className="accent">15 Classes</span>
            </p>
            <div className="hero-divider">✦</div>
            <p className="hero-desc">
              Join thousands of students who are transforming their lives and guiding others with the ancient power of Vedic Astrology.
            </p>

            <div className="hero-features">
              {features.map((f, i) => (
                <div className="hero-feature" key={i}>
                  <div className="hero-feature-icon">{f.icon}</div>
                  <div className="hero-feature-title">{f.title}</div>
                  <div className="hero-feature-sub">{f.sub}</div>
                </div>
              ))}
            </div>

            {/* MOBILE FORM */}
            <div id="hero-form" style={{ display: 'block' }}>
              <div className="lead-form-card">
                {status === 'success' ? (
                  <div className="form-success">
                    <div className="form-success-icon">🌟</div>
                    <h3>You're Registered!</h3>
                    <p>Rahul Sir's team will contact you within 24 hours to schedule your <strong>FREE first class</strong>.</p>
                    <a href="https://wa.me/919999999999" className="btn-whatsapp" style={{ marginTop: 16 }}>
                      💬 WhatsApp Us Directly
                    </a>
                  </div>
                ) : (
                  <>
                    <h2 className="lead-form-title">Book Your FREE First Class</h2>
                    <p className="lead-form-subtitle">Enter your details — Rahul Sir's team will call you</p>
                    {status === 'error' && <div className="form-error">⚠️ {errorMsg}</div>}
                    <form className="lead-form" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp Number (10 digits)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                        maxLength={15}
                      />
                      <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                        {status === 'loading' ? '⏳ Registering...' : '📅 JOIN FIRST CLASS FREE →'}
                      </button>
                    </form>
                    <a href="https://wa.me/919999999999" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WHATSAPP US
                    </a>
                    <p className="form-privacy">🔒 100% Private. No spam. We only call to schedule your class.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Stats */}
          <div className="hero-image-col">
            <div style={{
              background: 'linear-gradient(135deg, rgba(200,134,26,0.08), rgba(200,134,26,0.03))',
              border: '1px solid rgba(200,134,26,0.2)',
              borderRadius: 16,
              padding: '32px 24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 80, marginBottom: 8 }}>🔮</div>
              <p style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', fontSize: 20, fontStyle: 'italic', marginBottom: 16 }}>
                "One Decision Today Can Change Your Life & Generations Forever."
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-light)' }}>— Rahul Raj, Vedic Astrologer</p>
            </div>
            <div className="hero-stats">
              {[
                { num: '5000+', label: 'Happy Students' },
                { num: '15+', label: 'Years Experience' },
                { num: '4.9/5', label: 'Student Rating' },
                { num: '100%', label: 'Trusted Guidance' },
              ].map((s, i) => (
                <div className="hero-stat" key={i}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section" id="benefits">
        <div className="section-inner">
          <div className="section-eyebrow">FROM BEGINNER TO ASTROLOGER</div>
          <h2 className="section-title">15 Transformative Classes That<br />Will Change Your Life</h2>
          <p className="section-sub">Everything you need to become a practicing Vedic Astrologer</p>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div className="benefit-card" key={i}>
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="social-proof" id="testimonials">
        <div className="social-inner">
          <div className="section-eyebrow" style={{ color: 'var(--gold)' }}>STUDENT SUCCESS STORIES</div>
          <h2 className="section-title" style={{ color: 'white' }}>Lives Transformed by Vedic Astrology</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-city">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="section-inner">
          <div className="section-eyebrow">COMMON QUESTIONS</div>
          <h2 className="section-title">Everything You Need to Know</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`faq-arrow ${openFaq === i ? 'open' : ''}`}>▼</span>
                </div>
                {openFaq === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section" id="cta">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2>Start Your Journey Today — <br />First Class is FREE</h2>
          <p>No experience needed. No risk. Just one step toward a life guided by Vedic wisdom.</p>
          <div className="cta-form">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="WhatsApp Number"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
            {status === 'success' ? (
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '16px', color: 'white', textAlign: 'center', fontWeight: 600 }}>
                ✅ Registered! We'll call you within 24 hours.
              </div>
            ) : (
              <button className="btn-cta-white" onClick={handleSubmit} disabled={status === 'loading'}>
                {status === 'loading' ? '⏳ Registering...' : '📅 BOOK MY FREE CLASS NOW →'}
              </button>
            )}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>🔒 Your information is safe. We will only contact you to schedule your free class.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Rahul Raj</div>
        <div className="footer-tagline">VEDIC ASTROLOGER</div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#benefits">About</a>
          <a href="#benefits">Course</a>
          <a href="#testimonials">Certificates</a>
          <a href="#faq">FAQ</a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">Contact</a>
        </div>
        <div className="footer-copy">© 2024 Rahul Raj Vedic Astrologer. All rights reserved.</div>
      </footer>

      {/* STICKY MOBILE CTA */}
      {showSticky && (
        <div className="sticky-cta">
          <a href="#hero-form" className="btn-primary" style={{ flex: 1, textDecoration: 'none', fontSize: 13 }}>
            📅 JOIN FREE CLASS
          </a>
          <a href="https://wa.me/919999999999" className="btn-whatsapp" style={{ flex: 1, fontSize: 13 }}>
            💬 WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
