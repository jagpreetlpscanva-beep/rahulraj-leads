import { insertLead, getAllLeads } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      return res.status(400).json({ error: 'Enter a valid 10-digit phone number.' });
    }

    try {
      const lead = await insertLead(name.trim(), phoneClean);
      return res.status(200).json({ success: true, lead });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong. Try again.' });
    }
  }

  if (req.method === 'GET') {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const leads = await getAllLeads();
      return res.status(200).json({ leads });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch leads.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
