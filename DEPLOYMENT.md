# Deployment Guide

## Environment Variables

This application requires Firebase configuration to be set via environment variables.

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`

3. The `.env.local` file is git-ignored and will never be committed

### Vercel Deployment

To deploy to Vercel, you need to configure the environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables (get values from your Firebase project settings):

   | Variable Name | Description |
   |--------------|-------------|
   | `VITE_FIREBASE_API_KEY` | Firebase API Key |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
   | `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
   | `VITE_FIREBASE_APP_ID` | Firebase App ID |

4. Set the environment to **Production**, **Preview**, and **Development** (or as needed)
5. Trigger a new deployment for the changes to take effect

### Quick Setup via Vercel CLI

Alternatively, you can set environment variables using the Vercel CLI:

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

## Security Notes

- **Never commit** `.env.local` or any file containing actual credentials to git
- The `.env.example` file should only contain placeholder values
- Firebase API keys are safe to expose in client-side code, but it's still best practice to use environment variables
- Make sure to configure Firebase security rules to restrict access appropriately
