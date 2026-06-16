import { sql } from '@vercel/postgres';

export async function createLeadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function insertLead(name, phone) {
  await createLeadsTable();
  const result = await sql`
    INSERT INTO leads (name, phone)
    VALUES (${name}, ${phone})
    RETURNING id, name, phone, created_at;
  `;
  return result.rows[0];
}

export async function getAllLeads() {
  await createLeadsTable();
  const result = await sql`
    SELECT * FROM leads ORDER BY created_at DESC;
  `;
  return result.rows;
}
