# SMS Notification Setup Guide

## Option 1: Zapier Integration (No Code Required)

### Prerequisites
- Netlify account with deployed site
- Zapier account (free tier available)
- Phone number for SMS

### Setup Steps
1. **Deploy your site to Netlify** (form must be live)
2. **Create Zapier account** at zapier.com
3. **Create new Zap**:
   - Trigger: "Netlify Forms" → "New Form Submission"
   - Action: "SMS by Zapier" → "Send SMS"
4. **Configure**:
   - Connect your Netlify account
   - Enter your phone number
   - Map form fields to SMS message
5. **Test and activate**

### Example SMS Message Template
```
New contact from DevvyDev portfolio:
Name: {{name}}
Email: {{email}}
Subject: {{subject}}
Message: {{message}}
```

---

## Option 2: Netlify Functions + Twilio (More Control)

### Prerequisites
- Twilio account (free trial available)
- Basic JavaScript knowledge

### Setup Files

**netlify/functions/send-sms.js**
```javascript
const twilio = require('twilio');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);
    
    // Initialize Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS
    const sms = await client.messages.create({
      body: `New contact from DevvyDev:
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.YOUR_PHONE_NUMBER
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageSid: sms.sid })
    };

  } catch (error) {
    console.error('SMS Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send SMS' })
    };
  }
};
```

### Environment Variables (in Netlify dashboard)
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
YOUR_PHONE_NUMBER=+1987654321
```

---

## Option 3: Webhook Integration

### Setup in Netlify Dashboard
1. Go to site settings → Forms → Form notifications
2. Add webhook: `https://your-sms-service.com/webhook`
3. Configure payload to include form data

### Popular SMS Webhook Services
- **Twilio Webhook**
- **AWS SNS**
- **MessageBird**
- **Nexmo/Vonage**

---

## Recommendation for Your Portfolio

**Start with Option 1 (Zapier)** because:
- ✅ No coding required
- ✅ Quick setup (5 minutes)
- ✅ Free tier available
- ✅ Works immediately after Netlify deployment
- ✅ Can add email notifications too

**Upgrade to Option 2 later** when you need:
- More customization
- Lower per-message costs
- Integration with business systems

---

## Cost Comparison

### Zapier
- Free: 100 tasks/month
- Paid: $19.99/month for 750 tasks

### Twilio Direct
- SMS: $0.0075 per message (much cheaper at scale)
- Phone number: $1/month

### Recommendation
- **Portfolio**: Zapier (simple, low volume)
- **Business sites**: Twilio direct (cost-effective, scalable)
