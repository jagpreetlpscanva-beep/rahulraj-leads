import { getAllCourses, getActiveCourses, insertCourse, updateCourse, deleteCourse } from '../../lib/db';

export default async function handler(req, res) {
  // Public GET - active courses only
  if (req.method === 'GET' && !req.headers['x-admin-key']) {
    try {
      const courses = await getActiveCourses();
      return res.status(200).json({ courses });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch courses.' });
    }
  }

  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const courses = await getAllCourses();
      return res.status(200).json({ courses });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch courses.' });
    }
  }

  if (req.method === 'POST') {
    const { title, description, price, duration, image_url } = req.body;
    if (!title || price === undefined) return res.status(400).json({ error: 'Title and price required.' });
    try {
      const course = await insertCourse(title, description, price, duration, image_url);
      return res.status(200).json({ success: true, course });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create course.' });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const { title, description, price, duration, image_url, is_active } = req.body;
    try {
      const course = await updateCourse(id, title, description, price, duration, image_url, is_active);
      return res.status(200).json({ success: true, course });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update course.' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await deleteCourse(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete course.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
