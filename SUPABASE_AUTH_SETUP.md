# Supabase Authentication Setup Guide

## Overview
This guide explains how to configure Supabase authentication to work seamlessly between localhost development and production environments.

## The Problem
When using OAuth providers (like Google) with Supabase, the redirect URLs must be whitelisted in the Supabase dashboard. This creates a challenge when developing locally while your Supabase project is configured for production URLs.

## The Solution
Our implementation handles this by:
1. Detecting when authentication is initiated from localhost
2. Using the production URL for OAuth (as configured in Supabase)
3. Including special parameters that tell the production callback to redirect back to localhost
4. Seamlessly exchanging the auth code and establishing the session

## Supabase Dashboard Configuration

### 1. Add Redirect URLs
In your Supabase project dashboard, go to **Authentication → URL Configuration** and add these URLs to the "Redirect URLs" section:

```
https://app.smbdealsheet.com/auth/callback
https://your-vercel-app.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

**Note:** While we include localhost for completeness, the OAuth flow will actually use the production URL even when developing locally.

### 2. Site URL Configuration
Set your Site URL to your production URL:
```
https://app.smbdealsheet.com
```

### 3. OAuth Provider Setup
When configuring Google OAuth (or other providers):
- Use your production URL as the authorized redirect URI
- The callback URL should be: `https://app.smbdealsheet.com/auth/callback`

## Environment Variables

### Local Development (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://app.smbdealsheet.com
```

### Production (Vercel Environment Variables)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://app.smbdealsheet.com
```

## How It Works

### 1. Login/Signup Flow
When a user clicks "Sign in with Google" on localhost:
- The app detects it's running on localhost
- It constructs a redirect URL pointing to production with special parameters
- Example: `https://app.smbdealsheet.com/auth/callback?from_local=true&local_origin=http://localhost:3000`

### 2. OAuth Flow
- User is redirected to Google
- Google redirects back to the production URL (as configured in Supabase)
- The production callback receives the auth code

### 3. Callback Handling
The `/auth/callback` route:
- Checks if the `from_local=true` parameter is present
- If yes, it knows to redirect back to localhost after exchanging the code
- Exchanges the auth code for a session
- Redirects to the appropriate origin (localhost or production)

### 4. Session Persistence
- The session cookies are set for the Supabase domain
- Both localhost and production can access the same session
- User remains logged in across environments

## Troubleshooting

### "Redirect URL not allowed" Error
- Ensure all URLs are added to Supabase dashboard
- Check that you're using the exact URLs (including protocol)
- Clear browser cache and cookies

### Session Not Persisting
- Check that cookies are enabled
- Ensure the Supabase URL is correct in environment variables
- Try clearing all site data and logging in again

### Localhost Redirect Not Working
- Check browser console for any errors
- Ensure the production site is deployed and accessible
- Verify the `NEXT_PUBLIC_SITE_URL` is set correctly

## Testing

1. **Test Localhost Development:**
   ```bash
   npm run dev
   ```
   - Navigate to http://localhost:3000/login
   - Click "Sign in with Google"
   - Should redirect to Google, then back to localhost

2. **Test Production:**
   - Deploy to Vercel
   - Navigate to your production URL
   - Test the login flow
   - Should stay on production domain throughout

3. **Test Cross-Environment:**
   - Log in on localhost
   - Open production URL in same browser
   - Should be logged in on both

## Security Considerations

1. **Environment Separation:** The `from_local` parameter is only respected in production builds, preventing potential security issues.

2. **Origin Validation:** The callback validates the `local_origin` parameter to ensure it's a valid localhost URL.

3. **HTTPS in Production:** Always use HTTPS for production URLs to prevent man-in-the-middle attacks.

## Additional Notes

- This solution works with any OAuth provider supported by Supabase
- The approach can be extended to handle preview deployments by adding more URL checks
- Consider implementing rate limiting on the auth callback endpoint for additional security
