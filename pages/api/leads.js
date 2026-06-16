import { insertLead, getAllLeads, deleteLead } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone required.' });
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) return res.status(400).json({ error: 'Valid 10-digit number required.' });
    try {
      const lead = await insertLead(name.trim(), phoneClean);
      return res.status(200).json({ success: true, lead });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const leads = await getAllLeads();
      return res.status(200).json({ leads });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch leads.' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await deleteLead(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete lead.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
