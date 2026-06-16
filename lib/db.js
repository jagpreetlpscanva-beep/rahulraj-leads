import { sql } from '@vercel/postgres';

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      price INTEGER NOT NULL DEFAULT 0,
      duration TEXT,
      image_url TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS profile (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL DEFAULT 'Pt. Rahul Raj',
      bio TEXT,
      experience TEXT,
      students TEXT,
      consultations TEXT,
      rating TEXT,
      photo_url TEXT,
      phone TEXT,
      email TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  // Insert default profile if not exists
  await sql`
    INSERT INTO profile (id, name, bio, experience, students, consultations, rating)
    VALUES (1, 'Pt. Rahul Raj', 'Master Vedic Astrologer with over 15 years of experience guiding students and clients across India.', '15+ Years', '10,000+', '50,000+', '4.9/5')
    ON CONFLICT (id) DO NOTHING;
  `;
}

// LEADS
export async function insertLead(name, phone) {
  await initDB();
  const result = await sql`
    INSERT INTO leads (name, phone) VALUES (${name}, ${phone})
    RETURNING *;
  `;
  return result.rows[0];
}

export async function getAllLeads() {
  await initDB();
  const result = await sql`SELECT * FROM leads ORDER BY created_at DESC;`;
  return result.rows;
}

export async function deleteLead(id) {
  await initDB();
  await sql`DELETE FROM leads WHERE id = ${id};`;
}

// COURSES
export async function getAllCourses() {
  await initDB();
  const result = await sql`SELECT * FROM courses ORDER BY created_at DESC;`;
  return result.rows;
}

export async function getActiveCourses() {
  await initDB();
  const result = await sql`SELECT * FROM courses WHERE is_active = true ORDER BY created_at DESC;`;
  return result.rows;
}

export async function insertCourse(title, description, price, duration, image_url) {
  await initDB();
  const result = await sql`
    INSERT INTO courses (title, description, price, duration, image_url)
    VALUES (${title}, ${description}, ${parseInt(price)}, ${duration}, ${image_url})
    RETURNING *;
  `;
  return result.rows[0];
}

export async function updateCourse(id, title, description, price, duration, image_url, is_active) {
  await initDB();
  const result = await sql`
    UPDATE courses SET
      title = ${title},
      description = ${description},
      price = ${parseInt(price)},
      duration = ${duration},
      image_url = ${image_url},
      is_active = ${is_active}
    WHERE id = ${id}
    RETURNING *;
  `;
  return result.rows[0];
}

export async function deleteCourse(id) {
  await initDB();
  await sql`DELETE FROM courses WHERE id = ${id};`;
}

// PROFILE
export async function getProfile() {
  await initDB();
  const result = await sql`SELECT * FROM profile WHERE id = 1;`;
  return result.rows[0];
}

export async function updateProfile(data) {
  await initDB();
  const result = await sql`
    UPDATE profile SET
      name = ${data.name},
      bio = ${data.bio},
      experience = ${data.experience},
      students = ${data.students},
      consultations = ${data.consultations},
      rating = ${data.rating},
      photo_url = ${data.photo_url},
      phone = ${data.phone},
      email = ${data.email},
      updated_at = NOW()
    WHERE id = 1
    RETURNING *;
  `;
  return result.rows[0];
}
