# IS A PROBLEM — Deployment Guide

## Step 1: Run schema update in Supabase

1. Open your Supabase project → SQL Editor → New query
2. Paste the contents of `schema_update.sql` and click Run
3. You should see "Success" — this adds the officers table and new application fields

## Step 2: Make yourself an officer

1. Go to Supabase → Table Editor → profiles
2. Find your row (you may need to log in via the site once first to create it)
3. Change `role` from `outsider` to `officer`
4. Change `rank` to `Guild Master`
5. Save

## Step 3: Add your logo file

- Save your logo image as `logo.png` inside the project folder
- It will automatically appear in the nav header
- Keep it square (ideally 128x128 or 256x256)

## Step 4: Push to GitHub

You said you have a GitHub account. Here's what to do:

1. Go to github.com → New Repository
2. Name it exactly: `isaproblem` (or whatever you prefer)
3. Set it to Public (required for free GitHub Pages)
4. Do NOT initialize with README
5. Click Create Repository

Then follow the instructions GitHub shows you under "upload an existing file":
- Drag and drop all the project files into the GitHub file upload UI
- Files to upload: index.html, login.html, apply.html, dashboard.html,
  roster.html, progression.html, recruitment.html, applications.html,
  officers.html, style.css, app.js, logo.png
- Commit the files

## Step 5: Enable GitHub Pages

1. Go to your repo → Settings → Pages
2. Under "Source", select: Deploy from a branch
3. Branch: main, Folder: / (root)
4. Click Save
5. After ~2 minutes, your site will be live at:
   https://YOUR-GITHUB-USERNAME.github.io/isaproblem/

## Step 6: Update Supabase redirect URLs

Once you have the GitHub Pages URL, add it to Supabase:
1. Supabase → Authentication → URL Configuration
2. Site URL: https://YOUR-USERNAME.github.io/isaproblem/
3. Redirect URLs: add https://YOUR-USERNAME.github.io/isaproblem/**
4. Save

Also update in Discord Developer Portal → OAuth2 → Redirects:
- Add: https://bvjffiwdsobtgxqrueja.supabase.co/auth/v1/callback
  (this should already be there from setup)

## Step 7: Connect isaproblem.pro (Porkbun → GitHub Pages)

After buying the domain on Porkbun:

**In GitHub:**
1. Repo → Settings → Pages
2. Under "Custom domain", type: isaproblem.pro
3. Click Save — GitHub will give you 4 IP addresses to point to

**In Porkbun:**
1. Log in → Manage your domain → DNS Records
2. Delete any existing A records
3. Add 4 x A records pointing to GitHub's IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
4. Add a CNAME record:
   - Name: www
   - Value: YOUR-USERNAME.github.io
5. Wait up to 24h for DNS to propagate (usually faster)
6. Back in GitHub Pages settings, tick "Enforce HTTPS" once it appears

**Update Supabase again after domain is live:**
1. Site URL: https://isaproblem.pro
2. Redirect URLs: https://isaproblem.pro/** and https://www.isaproblem.pro/**

## Future deployments (making changes)

Every time you change a file:
1. Go to your GitHub repo
2. Click the file you want to update
3. Click the pencil icon (Edit)
4. Make your change
5. Click "Commit changes"
6. GitHub Pages auto-deploys within ~1 minute — no build step needed

Or drag-drop new versions of files via the GitHub upload UI.
No Netlify, no build commands, no cost per deploy.
