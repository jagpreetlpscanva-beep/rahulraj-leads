import { useState } from 'react';
import Head from 'next/head';

export default function Admin() {
  const [key, setKey] = useState('');
  const [leads, setLeads] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchLeads(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/leads', {
      headers: { 'x-admin-key': key },
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setLeads(data.leads);
    } else {
      setError(data.error || 'Failed');
    }
  }

  function exportCSV() {
    if (!leads?.length) return;
    const rows = [['ID', 'Name', 'Phone', 'Date'], ...leads.map(l => [
      l.id, l.name, l.phone, new Date(l.created_at).toLocaleString('en-IN'),
    ])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `rahulraj-leads-${Date.now()}.csv`; a.click();
  }

  return (
    <>
      <Head><title>Admin — Rahul Raj Leads</title></Head>
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.header}>
            <span style={s.logo}>☽</span>
            <div>
              <h1 style={s.title}>Leads Dashboard</h1>
              <p style={s.sub}>Rahul Raj Astrology Course</p>
            </div>
          </div>

          {!leads && (
            <form onSubmit={fetchLeads} style={s.form}>
              <label style={s.label}>Admin Password</label>
              <input
                type="password"
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Enter admin secret"
                style={s.input}
                required
              />
              {error && <p style={s.err}>{error}</p>}
              <button type="submit" style={s.btn} disabled={loading}>
                {loading ? 'Loading...' : 'View Leads'}
              </button>
            </form>
          )}

          {leads && (
            <>
              <div style={s.toolbar}>
                <span style={s.count}>{leads.length} leads total</span>
                <button onClick={exportCSV} style={s.exportBtn}>⬇ Export CSV</button>
              </div>

              {leads.length === 0 ? (
                <p style={s.empty}>No leads yet.</p>
              ) : (
                <div style={s.tableWrap}>
                  <table style={s.table}>
                    <thead>
                      <tr>
                        {['#', 'Name', 'Phone', 'Date'].map(h => (
                          <th key={h} style={s.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l, i) => (
                        <tr key={l.id} style={i % 2 === 0 ? s.trEven : s.trOdd}>
                          <td style={s.td}>{l.id}</td>
                          <td style={s.td}>{l.name}</td>
                          <td style={s.td}>
                            <a href={`tel:${l.phone}`} style={s.phone}>{l.phone}</a>
                          </td>
                          <td style={s.td}>{new Date(l.created_at).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const s = {
  page: {
    minHeight: '100vh', background: '#FAF6EE',
    display: 'flex', alignItems: 'flex-start',
    justifyContent: 'center', padding: '40px 16px',
    fontFamily: 'Inter,sans-serif',
  },
  card: {
    background: '#fff', borderRadius: 12,
    border: '1px solid #E8D9B8',
    padding: '36px', width: '100%', maxWidth: 900,
    boxShadow: '0 4px 24px rgba(200,146,42,0.08)',
  },
  header: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 },
  logo: { fontSize: 32, color: '#C8922A' },
  title: { fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: '#1A1208' },
  sub: { fontSize: 13, color: '#7A6545', marginTop: 2 },
  form: { display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 },
  label: { fontSize: 13, fontWeight: 500, color: '#4A3A1A' },
  input: {
    border: '1.5px solid #E8D9B8', borderRadius: 6,
    padding: '11px 14px', fontSize: 15, outline: 'none',
    background: '#FAF6EE', color: '#1A1208', fontFamily: 'Inter,sans-serif',
  },
  btn: {
    background: '#C8922A', color: '#fff', border: 'none',
    borderRadius: 6, padding: '12px', fontSize: 15, fontWeight: 600,
    cursor: 'pointer',
  },
  err: { fontSize: 13, color: '#c0392b' },
  toolbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 20,
  },
  count: { fontSize: 14, color: '#7A6545', fontWeight: 500 },
  exportBtn: {
    background: '#F5E6C8', color: '#C8922A', border: '1px solid #E8D9B8',
    borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 600,
    cursor: 'pointer',
  },
  empty: { color: '#7A6545', fontSize: 15, padding: '24px 0' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: {
    textAlign: 'left', padding: '10px 14px',
    borderBottom: '2px solid #E8D9B8',
    color: '#C8922A', fontSize: 12, letterSpacing: 1, fontWeight: 600,
  },
  td: { padding: '12px 14px', color: '#1A1208' },
  trEven: { background: '#fff' },
  trOdd: { background: '#FAF6EE' },
  phone: { color: '#C8922A', textDecoration: 'none', fontWeight: 500 },
};
