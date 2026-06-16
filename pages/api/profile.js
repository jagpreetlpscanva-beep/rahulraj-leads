import { getProfile, updateProfile } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const profile = await getProfile();
      return res.status(200).json({ profile });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch profile.' });
    }
  }

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    try {
      const profile = await updateProfile(req.body);
      return res.status(200).json({ success: true, profile });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update profile.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
