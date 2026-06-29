## Lactee (Human Milk Bank Management System)

## SMS integration plan

The current site is static HTML, so SMS support is added through a lightweight Node.js backend.

### What was added
- A backend server in server.js that accepts form submissions and can send SMS messages.
- A form submission hook in beneficiaries/request-milk.html so the request form posts to the backend.
- A smoke test in tests/sms-smoke-test.js.
- A sample environment file in .env.example.

### How it works
1. A beneficiary submits the request form.
2. The form posts to /submit-inquiry.
3. The server builds an SMS message and sends it through your SMS provider.
4. If no provider credentials are configured, it runs in mock mode and logs the SMS message.

### To activate your real SMS provider
1. Copy .env.example to .env.
2. Set SMS_PROVIDER to your provider name.
3. Set SMS_API_URL to your provider endpoint.
4. Set SMS_API_KEY to your provider API key.
5. Install dependencies with npm install.
6. Start the server with npm start.

### Quick test
- Run npm test to verify the payload shape.
- Run npm start and submit the request form.
