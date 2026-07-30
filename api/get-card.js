const { createClient } = require('@supabase/supabase-js');

// Hardcoded Configuration
const SUPABASE_URL = 'https://drntuchxgbxullltmhih.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybnR1Y2h4Z2J4dWxsbHRtaGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTcxMTYsImV4cCI6MjEwMDUzMzExNn0.zTdr1QKl2aBTL8xd7vwgO-lLbX8UeD_af0Z6VZhLwuQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing reservation ID parameter.' });
  }

  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('id, name, email, phone, reservation_date, reservation_time, guests, notes, status')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Get Card API error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
