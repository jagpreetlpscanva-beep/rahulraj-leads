import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const TABS = ['leads', 'courses', 'profile'];

function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState('leads');

  // Leads
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsSearch, setLeadsSearch] = useState('');

  // Courses
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', price: '', duration: '', image_url: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseMsg, setCourseMsg] = useState('');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseImgUploading, setCourseImgUploading] = useState(false);

  // Profile
  const [profile, setProfile] = useState({ name: '', bio: '', experience: '', students: '', consultations: '', rating: '', photo_url: '', phone: '', email: '' });
  const [profileMsg, setProfileMsg] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileImgUploading, setProfileImgUploading] = useState(false);

  const fetchLeads = useCallback(async (key) => {
    setLeadsLoading(true);
    const res = await fetch('/api/leads', { headers: { 'x-admin-key': key } });
    const data = await res.json();
    setLeadsLoading(false);
    if (res.ok) setLeads(data.leads);
  }, []);

  const fetchCourses = useCallback(async (key) => {
    setCoursesLoading(true);
    const res = await fetch('/api/courses', { headers: { 'x-admin-key': key } });
    const data = await res.json();
    setCoursesLoading(false);
    if (res.ok) setCourses(data.courses);
  }, []);

  const fetchProfile = useCallback(async () => {
    const res = await fetch('/api/profile');
    const data = await res.json();
    if (res.ok && data.profile) setProfile(data.profile);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError('');
    const res = await fetch('/api/leads', { headers: { 'x-admin-key': keyInput } });
    if (res.ok) {
      setAdminKey(keyInput);
      setAuthed(true);
      const data = await res.json();
      setLeads(data.leads);
      fetchCourses(keyInput);
      fetchProfile();
    } else {
      setAuthError('Wrong password.');
    }
  }

  async function deleteLead(id) {
    if (!confirm('Delete this lead?')) return;
    await fetch(`/api/leads?id=${id}`, { method: 'DELETE', headers: { 'x-admin-key': adminKey } });
    setLeads(prev => prev.filter(l => l.id !== id));
  }

  function exportCSV() {
    if (!leads.length) return;
    const rows = [['ID', 'Name', 'Phone', 'Date'], ...leads.map(l => [l.id, l.name, l.phone, new Date(l.created_at).toLocaleString('en-IN')])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `leads-${Date.now()}.csv`; a.click();
  }

  // ── Course image upload ───────────────────────────────────
  async function handleCourseImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setCourseMsg('Please select a valid image file.');
      return;
    }
    setCourseImgUploading(true);
    try {
      const dataUrl = await compressImage(file, 800, 600, 0.8);
      setCourseForm(prev => ({ ...prev, image_url: dataUrl }));
      setCourseMsg('');
    } catch (err) {
      setCourseMsg('Failed to process image.');
    }
    setCourseImgUploading(false);
  }

  // ── Profile photo upload ──────────────────────────────────
  async function handleProfileImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setProfileMsg('Please select a valid image file.');
      return;
    }
    setProfileImgUploading(true);
    try {
      const dataUrl = await compressImage(file, 600, 600, 0.85);
      setProfile(prev => ({ ...prev, photo_url: dataUrl }));
      setProfileMsg('');
    } catch (err) {
      setProfileMsg('Failed to process image.');
    }
    setProfileImgUploading(false);
  }

  async function saveCourse(e) {
    e.preventDefault();
    setCourseMsg('');
    const isEdit = !!editingCourse;
    const url = isEdit ? `/api/courses?id=${editingCourse.id}` : '/api/courses';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ ...courseForm, is_active: true }),
    });
    const data = await res.json();
    if (res.ok) {
      setCourseMsg(isEdit ? 'Course updated!' : 'Course added!');
      setCourseForm({ title: '', description: '', price: '', duration: '', image_url: '' });
      setEditingCourse(null);
      setShowCourseForm(false);
      fetchCourses(adminKey);
    } else {
      setCourseMsg(data.error || 'Failed.');
    }
  }

  async function deleteCourse(id) {
    if (!confirm('Delete this course?')) return;
    await fetch(`/api/courses?id=${id}`, { method: 'DELETE', headers: { 'x-admin-key': adminKey } });
    setCourses(prev => prev.filter(c => c.id !== id));
  }

  async function toggleCourse(course) {
    await fetch(`/api/courses?id=${course.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ ...course, is_active: !course.is_active }),
    });
    fetchCourses(adminKey);
  }

  function startEdit(course) {
    setEditingCourse(course);
    setCourseForm({ title: course.title, description: course.description || '', price: course.price, duration: course.duration || '', image_url: course.image_url || '' });
    setShowCourseForm(true);
    window.scrollTo(0, 0);
  }

  async function saveProfile(e) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg('');
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify(profile),
    });
    setProfileSaving(false);
    if (res.ok) setProfileMsg('Profile saved!');
    else setProfileMsg('Failed to save.');
  }

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(leadsSearch.toLowerCase()) ||
    l.phone.includes(leadsSearch)
  );

  if (!authed) return <LoginScreen keyInput={keyInput} setKeyInput={setKeyInput} onSubmit={handleLogin} error={authError} />;

  return (
    <>
      <Head><title>Admin Dashboard — Rahul Raj</title></Head>
      <div style={s.page}>

        {/* SIDEBAR */}
        <aside style={s.sidebar}>
          <div style={s.sidebarLogo}>
            <span style={s.sidebarSymbol}>☽</span>
            <div>
              <div style={s.sidebarBrand}>RAHUL RAJ</div>
              <div style={s.sidebarSub}>Admin Panel</div>
            </div>
          </div>
          <nav style={s.sidebarNav}>
            {[
              { key: 'leads', icon: '👥', label: 'Leads', count: leads.length },
              { key: 'courses', icon: '📚', label: 'Courses', count: courses.length },
              { key: 'profile', icon: '👤', label: 'Profile', count: null },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                style={tab === item.key ? { ...s.navItem, ...s.navItemActive } : s.navItem}
              >
                <span style={s.navIcon}>{item.icon}</span>
                <span style={s.navLabel}>{item.label}</span>
                {item.count !== null && <span style={tab === item.key ? { ...s.navBadge, ...s.navBadgeActive } : s.navBadge}>{item.count}</span>}
              </button>
            ))}
          </nav>
          <div style={s.sidebarFooter}>
            <a href="/" target="_blank" style={s.viewSiteBtn}>↗ View Site</a>
          </div>
        </aside>

        {/* MAIN */}
        <main style={s.main}>

          {/* ── LEADS TAB ── */}
          {tab === 'leads' && (
            <div>
              <div style={s.pageHeader}>
                <div>
                  <h1 style={s.pageTitle}>Leads</h1>
                  <p style={s.pageSubtitle}>{leads.length} total enquiries</p>
                </div>
                <div style={s.headerActions}>
                  <input
                    placeholder="Search name or phone..."
                    value={leadsSearch}
                    onChange={e => setLeadsSearch(e.target.value)}
                    style={s.searchInput}
                  />
                  <button onClick={exportCSV} style={s.secondaryBtn}>⬇ Export CSV</button>
                  <button onClick={() => fetchLeads(adminKey)} style={s.secondaryBtn}>↻ Refresh</button>
                </div>
              </div>

              {/* Stats */}
              <div style={s.statsRow}>
                {[
                  ['Total Leads', leads.length, '👥'],
                  ["Today's Leads", leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length, '📅'],
                  ['This Week', leads.filter(l => (Date.now() - new Date(l.created_at)) < 7 * 86400000).length, '📊'],
                ].map(([label, val, icon]) => (
                  <div key={label} style={s.statCard}>
                    <div style={s.statIcon}>{icon}</div>
                    <div style={s.statVal}>{val}</div>
                    <div style={s.statLabel}>{label}</div>
                  </div>
                ))}
              </div>

              {leadsLoading ? <p style={s.loading}>Loading...</p> : (
                <div style={s.tableCard}>
                  <table style={s.table}>
                    <thead>
                      <tr>
                        {['#', 'Name', 'Phone', 'Date & Time', 'Action'].map(h => (
                          <th key={h} style={s.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.length === 0 ? (
                        <tr><td colSpan={5} style={s.emptyCell}>No leads found.</td></tr>
                      ) : filteredLeads.map((l, i) => (
                        <tr key={l.id} style={i % 2 === 0 ? s.trEven : s.trOdd}>
                          <td style={s.td}>{l.id}</td>
                          <td style={{ ...s.td, fontWeight: 600 }}>{l.name}</td>
                          <td style={s.td}>
                            <a href={`https://wa.me/91${l.phone}`} target="_blank" rel="noreferrer" style={s.waLink}>
                              📱 {l.phone}
                            </a>
                          </td>
                          <td style={{ ...s.td, fontSize: 13, color: '#7A6545' }}>{new Date(l.created_at).toLocaleString('en-IN')}</td>
                          <td style={s.td}>
                            <button onClick={() => deleteLead(l.id)} style={s.deleteBtn}>🗑 Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── COURSES TAB ── */}
          {tab === 'courses' && (
            <div>
              <div style={s.pageHeader}>
                <div>
                  <h1 style={s.pageTitle}>Courses</h1>
                  <p style={s.pageSubtitle}>{courses.length} courses total</p>
                </div>
                <button onClick={() => { setShowCourseForm(!showCourseForm); setEditingCourse(null); setCourseForm({ title: '', description: '', price: '', duration: '', image_url: '' }); }} style={s.primaryBtn}>
                  {showCourseForm ? '✕ Cancel' : '+ Add Course'}
                </button>
              </div>

              {/* Course Form */}
              {showCourseForm && (
                <div style={s.formCard}>
                  <h2 style={s.formTitle}>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
                  <form onSubmit={saveCourse} style={s.form}>
                    <div style={s.formGrid}>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Course Title *</label>
                        <input style={s.input} value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="e.g. Vedic Astrology Basics" required />
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Price (₹) *</label>
                        <input style={s.input} type="number" value={courseForm.price} onChange={e => setCourseForm({ ...courseForm, price: e.target.value })} placeholder="e.g. 4999" required />
                      </div>
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Duration</label>
                        <input style={s.input} value={courseForm.duration} onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })} placeholder="e.g. 3 Months" />
                      </div>

                      {/* ── Course Image Upload ── */}
                      <div style={s.fieldWrap}>
                        <label style={s.label}>Course Image</label>
                        <div style={s.uploadRow}>
                          <label style={s.uploadBtn}>
                            {courseImgUploading ? 'Uploading...' : '📁 Choose Image'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCourseImageUpload}
                              style={s.hiddenFileInput}
                              disabled={courseImgUploading}
                            />
                          </label>
                          {courseForm.image_url && (
                            <button
                              type="button"
                              onClick={() => setCourseForm({ ...courseForm, image_url: '' })}
                              style={s.removeImgBtn}
                            >
                              ✕ Remove
                            </button>
                          )}
                        </div>
                        <input
                          style={{ ...s.input, marginTop: 8 }}
                          value={courseForm.image_url}
                          onChange={e => setCourseForm({ ...courseForm, image_url: e.target.value })}
                          placeholder="...or paste an image URL"
                        />
                        {courseForm.image_url && (
                          <img
                            src={courseForm.image_url}
                            alt="Preview"
                            style={s.coursePreviewImg}
                            onError={e => e.target.style.display = 'none'}
                          />
                        )}
                      </div>
                    </div>

                    <div style={s.fieldWrap}>
                      <label style={s.label}>Description</label>
                      <textarea style={{ ...s.input, height: 80, resize: 'vertical' }} value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })} placeholder="What will students learn?" />
                    </div>
                    {courseMsg && <p style={courseMsg.includes('!') ? s.successMsg : s.errorMsg}>{courseMsg}</p>}
                    <button type="submit" style={s.primaryBtn} disabled={courseImgUploading}>{editingCourse ? 'Update Course' : 'Add Course'}</button>
                  </form>
                </div>
              )}

              {/* Courses Grid */}
              {coursesLoading ? <p style={s.loading}>Loading...</p> : (
                <div style={s.coursesGrid}>
                  {courses.length === 0 ? (
                    <div style={s.emptyState}>
                      <p style={s.emptyText}>No courses yet. Add your first course above.</p>
                    </div>
                  ) : courses.map(course => (
                    <div key={course.id} style={{ ...s.courseCard, opacity: course.is_active ? 1 : 0.6 }}>
                      {course.image_url && <img src={course.image_url} alt={course.title} style={s.courseImg} />}
                      <div style={s.courseBody}>
                        <div style={s.courseTopRow}>
                          <span style={course.is_active ? s.badgeActive : s.badgeInactive}>
                            {course.is_active ? '● Live' : '○ Hidden'}
                          </span>
                          {course.duration && <span style={s.badgeDuration}>⏱ {course.duration}</span>}
                        </div>
                        <h3 style={s.courseTitle}>{course.title}</h3>
                        {course.description && <p style={s.courseDesc}>{course.description}</p>}
                        <div style={s.courseFooter}>
                          <span style={s.coursePrice}>₹{Number(course.price).toLocaleString('en-IN')}</span>
                          <div style={s.courseActions}>
                            <button onClick={() => toggleCourse(course)} style={s.toggleBtn}>
                              {course.is_active ? 'Hide' : 'Show'}
                            </button>
                            <button onClick={() => startEdit(course)} style={s.editBtn}>Edit</button>
                            <button onClick={() => deleteCourse(course.id)} style={s.deleteBtn}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE TAB ── */}
          {tab === 'profile' && (
            <div>
              <div style={s.pageHeader}>
                <div>
                  <h1 style={s.pageTitle}>Astrologer Profile</h1>
                  <p style={s.pageSubtitle}>Changes reflect on the landing page</p>
                </div>
              </div>

              <div style={s.formCard}>
                <form onSubmit={saveProfile} style={s.form}>
                  <div style={s.formGrid}>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Full Name *</label>
                      <input style={s.input} value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Pt. Rahul Raj" required />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Phone (WhatsApp)</label>
                      <input style={s.input} value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="9876543210" />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Email</label>
                      <input style={s.input} type="email" value={profile.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="rahulraj@example.com" />
                    </div>

                    {/* ── Profile Photo Upload ── */}
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Profile Photo</label>
                      <div style={s.uploadRow}>
                        <label style={s.uploadBtn}>
                          {profileImgUploading ? 'Uploading...' : '📁 Choose Photo'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            style={s.hiddenFileInput}
                            disabled={profileImgUploading}
                          />
                        </label>
                        {profile.photo_url && (
                          <button
                            type="button"
                            onClick={() => setProfile({ ...profile, photo_url: '' })}
                            style={s.removeImgBtn}
                          >
                            ✕ Remove
                          </button>
                        )}
                      </div>
                      <input
                        style={{ ...s.input, marginTop: 8 }}
                        value={profile.photo_url || ''}
                        onChange={e => setProfile({ ...profile, photo_url: e.target.value })}
                        placeholder="...or paste a photo URL"
                      />
                    </div>
                  </div>

                  <div style={s.fieldWrap}>
                    <label style={s.label}>Bio</label>
                    <textarea style={{ ...s.input, height: 100, resize: 'vertical' }} value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} placeholder="Short introduction shown on landing page..." />
                  </div>

                  <h3 style={s.sectionSubheading}>Stats (shown on landing page)</h3>
                  <div style={s.formGrid}>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Experience</label>
                      <input style={s.input} value={profile.experience || ''} onChange={e => setProfile({ ...profile, experience: e.target.value })} placeholder="15+ Years" />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Students Taught</label>
                      <input style={s.input} value={profile.students || ''} onChange={e => setProfile({ ...profile, students: e.target.value })} placeholder="10,000+" />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Consultations Done</label>
                      <input style={s.input} value={profile.consultations || ''} onChange={e => setProfile({ ...profile, consultations: e.target.value })} placeholder="50,000+" />
                    </div>
                    <div style={s.fieldWrap}>
                      <label style={s.label}>Rating</label>
                      <input style={s.input} value={profile.rating || ''} onChange={e => setProfile({ ...profile, rating: e.target.value })} placeholder="4.9/5" />
                    </div>
                  </div>

                  {/* Live photo preview */}
                  {profile.photo_url && (
                    <div style={s.photoPreview}>
                      <img src={profile.photo_url} alt="Preview" style={s.photoPreviewImg} onError={e => e.target.style.display = 'none'} />
                      <span style={s.photoPreviewLabel}>Photo Preview</span>
                    </div>
                  )}

                  {profileMsg && <p style={profileMsg.includes('!') ? s.successMsg : s.errorMsg}>{profileMsg}</p>}
                  <button type="submit" style={s.primaryBtn} disabled={profileSaving || profileImgUploading}>
                    {profileSaving ? 'Saving...' : '✓ Save Profile'}
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

function LoginScreen({ keyInput, setKeyInput, onSubmit, error }) {
  return (
    <>
      <Head><title>Admin Login — Rahul Raj</title></Head>
      <div style={s.loginPage}>
        <div style={s.loginCard}>
          <div style={s.loginHeader}>
            <span style={s.loginSymbol}>☽</span>
            <h1 style={s.loginTitle}>Admin Panel</h1>
            <p style={s.loginSub}>Rahul Raj Vedic Astrology</p>
          </div>
          <form onSubmit={onSubmit} style={s.form}>
            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <input type="password" value={keyInput} onChange={e => setKeyInput(e.target.value)} placeholder="Enter admin password" style={s.input} required autoFocus />
            </div>
            {error && <p style={s.errorMsg}>⚠ {error}</p>}
            <button type="submit" style={s.primaryBtn}>Login →</button>
          </form>
        </div>
      </div>
    </>
  );
}

/* ─── STYLES ─── */
const s = {
  page: { display: 'flex', minHeight: '100vh', background: '#F7F3EC', fontFamily: 'Inter,sans-serif' },

  // Sidebar
  sidebar: { width: 240, background: '#1A1208', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' },
  sidebarLogo: { display: 'flex', alignItems: 'center', gap: 10, padding: '24px 20px', borderBottom: '1px solid rgba(200,146,42,0.2)' },
  sidebarSymbol: { fontSize: 28, color: '#C8922A' },
  sidebarBrand: { fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: 2 },
  sidebarSub: { fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, marginTop: 1 },
  sidebarNav: { flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 },
  navItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 14, fontFamily: 'Inter,sans-serif', width: '100%', textAlign: 'left' },
  navItemActive: { background: 'rgba(200,146,42,0.15)', color: '#E8B84B' },
  navIcon: { fontSize: 16 },
  navLabel: { flex: 1 },
  navBadge: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: '1px 7px', fontSize: 11 },
  navBadgeActive: { background: 'rgba(200,146,42,0.3)', color: '#E8B84B' },
  sidebarFooter: { padding: '16px 12px', borderTop: '1px solid rgba(200,146,42,0.2)' },
  viewSiteBtn: { display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none', padding: '8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' },

  // Main
  main: { flex: 1, padding: '32px', overflowY: 'auto', maxWidth: 'calc(100vw - 240px)' },
  pageHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 },
  pageTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: '#1A1208', margin: 0 },
  pageSubtitle: { fontSize: 14, color: '#7A6545', marginTop: 4 },
  headerActions: { display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' },
  searchInput: { border: '1.5px solid #E8D9B8', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none', background: '#fff', fontFamily: 'Inter,sans-serif', color: '#1A1208', width: 220 },

  // Stats
  statsRow: { display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  statCard: { background: '#fff', border: '1px solid #E8D9B8', borderRadius: 10, padding: '20px 24px', flex: '1 1 140px', textAlign: 'center' },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statVal: { fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: '#C8922A' },
  statLabel: { fontSize: 12, color: '#7A6545', marginTop: 4 },

  // Table
  tableCard: { background: '#fff', border: '1px solid #E8D9B8', borderRadius: 10, overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E8D9B8', color: '#C8922A', fontSize: 11, letterSpacing: 1, fontWeight: 600, background: '#FFF8EC' },
  td: { padding: '13px 16px', color: '#1A1208', verticalAlign: 'middle' },
  trEven: { background: '#fff' },
  trOdd: { background: '#FDFAF4' },
  emptyCell: { padding: '32px', textAlign: 'center', color: '#7A6545' },
  waLink: { color: '#C8922A', textDecoration: 'none', fontWeight: 500 },

  // Buttons
  primaryBtn: { background: '#C8922A', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' },
  secondaryBtn: { background: '#fff', color: '#C8922A', border: '1px solid #E8D9B8', borderRadius: 6, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' },
  deleteBtn: { background: '#FFF0EE', color: '#c0392b', border: '1px solid #f5c6c0', borderRadius: 5, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' },
  editBtn: { background: '#FFF8EC', color: '#C8922A', border: '1px solid #E8D9B8', borderRadius: 5, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' },
  toggleBtn: { background: '#F0F4FF', color: '#3B5BDB', border: '1px solid #C5D0F5', borderRadius: 5, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' },

  // Forms
  formCard: { background: '#fff', border: '1px solid #E8D9B8', borderRadius: 10, padding: '28px', marginBottom: 24 },
  formTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: '#1A1208', marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 500, color: '#4A3A1A' },
  input: { border: '1.5px solid #E8D9B8', borderRadius: 6, padding: '10px 12px', fontSize: 14, outline: 'none', background: '#FAF6EE', color: '#1A1208', fontFamily: 'Inter,sans-serif' },
  sectionSubheading: { fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: '#C8922A', margin: '8px 0 0' },
  successMsg: { fontSize: 13, color: '#27ae60', fontWeight: 500 },
  errorMsg: { fontSize: 13, color: '#c0392b' },
  loading: { color: '#7A6545', padding: '20px 0' },

  // Image upload
  uploadRow: { display: 'flex', gap: 10, alignItems: 'center' },
  uploadBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#FFF8EC', color: '#C8922A', border: '1.5px dashed #E8D9B8',
    borderRadius: 6, padding: '9px 16px', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'Inter,sans-serif', position: 'relative',
  },
  hiddenFileInput: {
    position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%',
  },
  removeImgBtn: {
    background: '#FFF0EE', color: '#c0392b', border: '1px solid #f5c6c0',
    borderRadius: 6, padding: '9px 14px', fontSize: 12, cursor: 'pointer',
    fontFamily: 'Inter,sans-serif',
  },
  coursePreviewImg: {
    width: '100%', maxWidth: 240, height: 140, objectFit: 'cover',
    borderRadius: 8, marginTop: 10, border: '1px solid #E8D9B8',
  },

  // Courses grid
  coursesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 },
  courseCard: { background: '#fff', border: '1px solid #E8D9B8', borderRadius: 10, overflow: 'hidden' },
  courseImg: { width: '100%', height: 140, objectFit: 'cover' },
  courseBody: { padding: '16px' },
  courseTopRow: { display: 'flex', gap: 8, marginBottom: 10 },
  badgeActive: { fontSize: 11, color: '#27ae60', background: '#EAFAF1', border: '1px solid #A9DFBF', borderRadius: 20, padding: '2px 8px', fontWeight: 600 },
  badgeInactive: { fontSize: 11, color: '#7A6545', background: '#F5F0E8', border: '1px solid #E8D9B8', borderRadius: 20, padding: '2px 8px' },
  badgeDuration: { fontSize: 11, color: '#7A6545', background: '#F5F0E8', border: '1px solid #E8D9B8', borderRadius: 20, padding: '2px 8px' },
  courseTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: '#1A1208', marginBottom: 6 },
  courseDesc: { fontSize: 13, color: '#7A6545', lineHeight: 1.6, marginBottom: 12 },
  courseFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0E8D5' },
  coursePrice: { fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: '#C8922A' },
  courseActions: { display: 'flex', gap: 6 },

  emptyState: { gridColumn: '1/-1', padding: '48px', textAlign: 'center', background: '#fff', borderRadius: 10, border: '1px solid #E8D9B8' },
  emptyText: { color: '#7A6545', fontSize: 15 },

  // Photo preview
  photoPreview: { display: 'flex', alignItems: 'center', gap: 12 },
  photoPreviewImg: { width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #C8922A' },
  photoPreviewLabel: { fontSize: 13, color: '#7A6545' },

  // Login
  loginPage: { minHeight: '100vh', background: '#FAF6EE', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  loginCard: { background: '#fff', border: '1px solid #E8D9B8', borderRadius: 12, padding: '40px', width: '100%', maxWidth: 380, boxShadow: '0 8px 40px rgba(200,146,42,0.12)' },
  loginHeader: { textAlign: 'center', marginBottom: 28 },
  loginSymbol: { fontSize: 40, color: '#C8922A', display: 'block', marginBottom: 10 },
  loginTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: '#1A1208', margin: 0 },
  loginSub: { fontSize: 13, color: '#7A6545', marginTop: 6 },
};
