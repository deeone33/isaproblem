# IS A PROBLEM — Guild Site Master Goals

## Infrastructure
- [x] Supabase project created (isaproblem)
- [x] Database schema with 8 tables
- [x] Row Level Security policies (outsider/member/officer)
- [x] Discord OAuth configured in Supabase
- [ ] GitHub repo created (user done)
- [ ] Custom domain isaproblem.pro via Porkbun → GitHub Pages
- [ ] Deploy all files to GitHub Pages

## Public Pages (no login required)
- [ ] index.html — landing, rank, progression, news, recruitment
- [ ] apply.html — application form (name, char, age optional, experience, logs, expectations)
- [ ] login.html — Discord OAuth login button

## Member Pages (Discord login required, non-officer)
- [ ] dashboard.html — news feed, upcoming schedule
- [ ] roster.html — guild roster, officer list
- [ ] applications.html (own view) — applicant can see their own application status (pending/accepted/denied)

## Officer Pages (officer role required)
- [ ] dashboard.html — same as member + officer alert panel (pending apps count)
- [ ] dashboard.html — post/delete news announcements
- [ ] progression.html — edit kill times, add/remove bosses, manage tiers
- [ ] recruitment.html — add/remove/edit class needs with priority
- [ ] roster.html — promote/demote/remove members, edit officer titles
- [ ] applications.html — see all apps, view full info, accept/reject
- [ ] officers.html — manage officer list (GM, officers, roles/titles)

## Application Flow
- [ ] Applicant submits form (name, char name, age optional, class/spec, logs URL, experience, expectations, why join)
- [ ] On submit: confirmation shown on site
- [ ] Officer sees pending apps with all info, can accept or reject
- [ ] Accepted: applicant account promoted to member role automatically
- [ ] Notification: applicant sees status change on their dashboard (logged in non-member)
- [ ] Manual Discord contact still primary — site shows status, doesn't block manual flow

## Design
- [ ] Color palette from logo: near-black bg, off-white/grey text, silver accent — NOT red/gold
- [ ] Logo visible in header at all times (small, tasteful)
- [ ] Minimalistic — less is more
- [ ] All officer-editable content stored in Supabase (not hardcoded)

## Data Persistence
- [ ] Progression/bosses — Supabase
- [ ] News/announcements — Supabase
- [ ] Recruitment needs — Supabase
- [ ] Roster/profiles — Supabase
- [ ] Officers table — Supabase
- [ ] Applications — Supabase
- [ ] Site design changes should not affect data (data always from DB)
