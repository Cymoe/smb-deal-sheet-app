# Quick Fix for Supabase Auth Redirect Issues

## The Problem
Supabase OAuth requires whitelisted redirect URLs, but you need both localhost and production to work.

## The Solution (2 Steps)

### Step 1: Update Supabase Dashboard
Go to your Supabase project dashboard:
1. Navigate to **Authentication → URL Configuration**
2. In the **Redirect URLs** section, add BOTH of these URLs:
   ```
   http://localhost:3000/auth/callback
   https://app.smbdealsheet.com/auth/callback
   ```
   
   ⚠️ **IMPORTANT**: You must add BOTH URLs, not just one!

3. Click **Save**

### Step 2: Verify Your Site URL
In the same section, make sure your **Site URL** is set to:
```
https://app.smbdealsheet.com
```

## That's It!

Now your auth will work:
- On localhost: Uses `http://localhost:3000/auth/callback`
- On production: Uses `https://app.smbdealsheet.com/auth/callback`

## Test It
1. Run `npm run dev` locally
2. Go to http://localhost:3000/login
3. Click "Sign in with Google"
4. It should work!

## Why This Works
The simplified code now just uses `window.location.origin` which means:
- On localhost → uses localhost URL
- On production → uses production URL

As long as BOTH URLs are whitelisted in Supabase, it will work seamlessly.

## Still Not Working?
If you still get "Redirect URL not allowed" error:
1. Double-check you added BOTH URLs exactly as shown above
2. Clear your browser cache and cookies
3. Make sure there are no typos in the URLs
4. The URLs must match EXACTLY (including http vs https)
