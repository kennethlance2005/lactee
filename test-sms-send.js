const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const axios = require('axios');

function normalizePhone(value) {
  if (!value) return '';
  const digits = value.toString().replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) {
    return `+63${digits.slice(1)}`;
  }
  if (digits.startsWith('63')) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

async function sendSmsDirectly(phoneNumber, message) {
  const recipient = normalizePhone(phoneNumber);
  const apiKey = process.env.TEXTBEE_API_KEY;
  const deviceId = process.env.TEXTBEE_DEVICE_ID;

  if (!apiKey || !deviceId) {
    throw new Error('TEXTBEE_API_KEY and TEXTBEE_DEVICE_ID must be set in .env');
  }

  const url = `https://api.textbee.dev/api/v1/gateway/devices/${deviceId}/send-sms`;

  console.log(`Sending SMS to ${phoneNumber} (normalized: ${recipient})`);
  console.log(`Message: "${message}"`);
  console.log(`API Endpoint: ${url}`);

  try {
    const response = await axios.post(url, {
      recipients: [recipient],
      message
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    });

    console.log('✓ SMS sent successfully!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('✗ SMS send failed!');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  const numbers = ['09217166944', '09064527822'];
  const message = 'hello';

  console.log('=== Textbee SMS API Test ===\n');

  for (const number of numbers) {
    console.log(`\n--- Testing number: ${number} ---`);
    try {
      await sendSmsDirectly(number, message);
    } catch (error) {
      console.log(`Failed to send to ${number}`);
    }
  }

  console.log('\n=== Test Complete ===');
}

main().catch(console.error);
