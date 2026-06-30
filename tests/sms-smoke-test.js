const assert = require('assert');
const { buildMessage, normalizePhone } = require('../assets/js/server');

const samplePayload = {
  contact_number: '09123456789',
  infant_name: 'Maria'
};

const donorPayload = {
  contact_number: '09123456789',
  first_name: 'Ana'
};

const requestMessage = buildMessage(samplePayload, 'mother-request');
const donorApplicationMessage = buildMessage(donorPayload, 'donor-application');
const donorStoredMessage = buildMessage(donorPayload, 'donor-stored');

assert.ok(samplePayload.contact_number, 'contact number should be present');
assert.ok(normalizePhone('09123456789').startsWith('+63'), 'phone should be normalized to E.164');
assert.ok(requestMessage.includes('Lactee request received'), 'request message should include the request notice');
assert.ok(donorApplicationMessage.includes('donation application'), 'donor application message should explain the application');
assert.ok(donorStoredMessage.includes('stored safely in the bank'), 'donor storage message should confirm storage');
console.log('SMS payload smoke test passed.');
