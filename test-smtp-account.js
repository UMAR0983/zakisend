const nodemailer = require('nodemailer');

const appPass = 'yvmssiucnnanpeb';
const accounts = [
  'fizzybutterchicken@gmail.com',
  'umarkhatabmalik2156@gmail.com',
  'zakiulhassan105@gmail.com'
];

async function testAccounts() {
  console.log('Testing which Google account matches App Password: yvmssiucnnanpeb...\n');

  for (const account of accounts) {
    console.log(`Testing authentication for: ${account}...`);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: account,
        pass: appPass
      }
    });

    try {
      await transporter.verify();
      console.log(`🎉 SUCCESS! The 16-character App Password matches: ${account}`);
      return account;
    } catch (err) {
      console.log(`  ❌ Rejected for ${account}:`, err.message);
    }
  }
}

testAccounts();
