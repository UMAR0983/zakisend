const BASE_URL = 'https://fizzybutterchicken.vercel.app';

async function testLiveEmailSending() {
  console.log('=== TESTING REAL EMAIL TRANSMISSION VIA GMAIL SMTP ===\n');

  // Test 1: Reservation request for umarkhatabmalik2156@gmail.com
  const req1 = {
    name: 'Umar Khatab Malik',
    email: 'umarkhatabmalik2156@gmail.com',
    phone: '03348473537',
    date: '2026-07-30',
    time: '19:30',
    guests: '4',
    notes: 'Live Gmail SMTP Email Test'
  };

  // Test 2: Reservation request for zakiulhassan105@gmail.com
  const req2 = {
    name: 'Zaki Ul Hassan',
    email: 'zakiulhassan105@gmail.com',
    phone: '(705) 555-0199',
    date: '2026-07-30',
    time: '20:00',
    guests: '2',
    notes: 'Live Gmail SMTP Email Test'
  };

  console.log('1️⃣ Sending reservation request 1 for umarkhatabmalik2156@gmail.com...');
  const res1 = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req1)
  });
  const data1 = await res1.json();
  console.log('   Registration Output 1:', data1);

  console.log('\n2️⃣ Sending reservation request 2 for zakiulhassan105@gmail.com...');
  const res2 = await fetch(`${BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req2)
  });
  const data2 = await res2.json();
  console.log('   Registration Output 2:', data2);

  // Directly trigger /api/send-email for test 1
  console.log('\n3️⃣ Triggering /api/send-email for Admin Notification...');
  const emailRes1 = await fetch(`${BASE_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'admin_notification',
      email: 'umarkhatabmalik2156@gmail.com',
      record: {
        id: data1.id || 'RES-100001',
        name: req1.name,
        email: req1.email,
        phone: req1.phone,
        reservation_date: req1.date,
        reservation_time: req1.time,
        guests: req1.guests,
        notes: req1.notes
      }
    })
  });
  const emailData1 = await emailRes1.json();
  console.log('   Email Service Output 1:', emailData1);

  // Directly trigger /api/send-email for test 2
  console.log('\n4️⃣ Triggering /api/send-email for zakiulhassan105@gmail.com...');
  const emailRes2 = await fetch(`${BASE_URL}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'admin_notification',
      email: 'zakiulhassan105@gmail.com',
      record: {
        id: data2.id || 'RES-100002',
        name: req2.name,
        email: req2.email,
        phone: req2.phone,
        reservation_date: req2.date,
        reservation_time: req2.time,
        guests: req2.guests,
        notes: req2.notes
      }
    })
  });
  const emailData2 = await emailRes2.json();
  console.log('   Email Service Output 2:', emailData2);

  console.log('\n=== REAL EMAIL TRANSMISSION TEST COMPLETE ===');
}

testLiveEmailSending();
