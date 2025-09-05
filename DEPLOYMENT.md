# Deployment Guide

## Netlify Deployment (Portfolio Site)

### Prerequisites
- GitHub repository with your code
- Netlify account (free tier available)

### Setup Steps

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Netlify configuration and form handling"
   git push origin main
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the `DevvyDev` repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.` (root)
   - Click "Deploy site"

3. **Custom Domain** (optional):
   - In site settings, go to "Domain management"
   - Add your custom domain
   - Configure DNS according to Netlify's instructions

4. **Form Handling**:
   - Forms will automatically work with the `data-netlify="true"` attribute
   - View form submissions in Netlify dashboard under "Forms"
   - Set up email notifications in form settings

### Features Enabled
- ✅ Contact form handling (no backend needed)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Security headers
- ✅ Cache optimization

---

## Firebase Setup (Future Business Projects)

### Prerequisites
- Google account
- Node.js installed
- Firebase CLI: `npm install -g firebase-tools`

### Project Setup

1. **Create Firebase Project**:
   ```bash
   firebase login
   firebase init
   ```
   
   Select:
   - ✅ Firestore
   - ✅ Functions
   - ✅ Hosting
   - ✅ Storage

2. **Project Structure for Business Sites**:
   ```
   your-business-project/
   ├── public/              # Static assets
   ├── src/                # Source code
   ├── functions/          # Cloud Functions
   ├── firebase.json       # Firebase config
   ├── firestore.rules     # Database rules
   └── package.json
   ```

### Business Project Examples

#### Winchester Jaunts (Tour Booking)
```javascript
// Example booking functionality
import { collection, addDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Create booking
async function createBooking(tourData) {
  const docRef = await addDoc(collection(db, 'bookings'), {
    ...tourData,
    createdAt: new Date(),
    status: 'pending'
  });
  
  // Process payment
  const processPayment = httpsCallable(functions, 'processPayment');
  await processPayment({ bookingId: docRef.id, ...paymentData });
}
```

#### Esthetician Site (Appointment Scheduling)
```javascript
// Example appointment booking
async function bookAppointment(appointmentData) {
  const docRef = await addDoc(collection(db, 'appointments'), {
    ...appointmentData,
    createdAt: new Date(),
    status: 'confirmed'
  });
  
  // Send confirmation email
  const sendEmail = httpsCallable(functions, 'sendAppointmentConfirmation');
  await sendEmail({ appointmentId: docRef.id });
}
```

### Authentication Setup
```javascript
// Enable Google, email/password, phone auth
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
// Implementation based on business needs
```

### Payment Integration
```javascript
// Stripe integration with Cloud Functions
const functions = require('firebase-functions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = functions.https.onCall(async (data, context) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: 'usd',
    // ... payment processing logic
  });
  
  return { clientSecret: paymentIntent.client_secret };
});
```

### Mobile App Support
Firebase provides SDKs for:
- ✅ React Native
- ✅ Flutter
- ✅ iOS (Swift)
- ✅ Android (Kotlin/Java)

All with real-time sync, offline support, and cross-platform authentication.

---

## Next Steps

### For Portfolio (Immediate):
1. Deploy to Netlify using the steps above
2. Test contact form functionality
3. Set up custom domain if desired

### For Business Projects (Future):
1. Start with Winchester Jaunts or esthetician site
2. Set up Firebase project
3. Implement booking/scheduling system
4. Add payment processing
5. Create mobile app companion

### Cost Considerations
- **Netlify**: Free tier covers portfolio site needs
- **Firebase**: Pay-as-you-go, free tier generous for starting businesses
- **Stripe**: 2.9% + 30¢ per transaction

Both platforms scale automatically with your business growth!
