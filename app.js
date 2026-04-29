// ============================================
// IS A PROBLEM — shared JS
// ============================================

const SUPABASE_URL = 'https://bvjffiwdsobtgxqrueja.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wfPG1sotH946vyE6PfjMKg_cLM2PUY1';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser    = null;
let currentProfile = null;

// ---- AUTH ----
async function loadSession() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) { currentUser = null; currentProfile = null; return null; }
  currentUser = user;
  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  currentProfile = data;
  return data;
}

const isOfficer = () => currentProfile?.role === 'officer';
const isMember  = () => currentProfile?.role === 'member' || isOfficer();
const isLoggedIn = () => !!currentUser;

async function loginDiscord() {
  // Determine redirect — use current origin so it works on localhost AND on GitHub Pages
  const base = window.location.origin + (window.location.pathname.includes('/') ? window.location.pathname.replace(/\/[^/]*$/, '/') : '/');
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'discord',
    options: { redirectTo: base + 'dashboard.html' }
  });
  if (error) toast(error.message, 'error');
}

async function doLogout() {
  await sb.auth.signOut();
  window.location.href = 'index.html';
}

// ---- GUARDS ----
async function requireMember() {
  await loadSession();
  if (!isMember()) { toast('Members only.', 'error'); setTimeout(() => window.location.href = 'login.html', 1000); return false; }
  return true;
}
async function requireOfficer() {
  await loadSession();
  if (!isOfficer()) { toast('Officers only.', 'error'); setTimeout(() => window.location.href = 'dashboard.html', 1000); return false; }
  return true;
}

// ---- NAV ----
function renderNav(active) {
  const el = document.getElementById('topnav');
  if (!el) return;

  const links = [{ href: 'index.html', id: 'home', label: 'Home' }];
  if (isMember()) {
    links.push({ href: 'dashboard.html', id: 'dashboard', label: 'Dashboard' });
    links.push({ href: 'roster.html',    id: 'roster',    label: 'Roster' });
  }
  if (isOfficer()) {
    links.push({ href: 'progression.html', id: 'progression', label: 'Progression' });
    links.push({ href: 'recruitment.html', id: 'recruitment', label: 'Recruitment' });
    links.push({ href: 'applications.html', id: 'applications', label: 'Applications' });
    links.push({ href: 'officers.html', id: 'officers', label: 'Officers' });
    links.push({ href: 'formeditor.html', id: 'formeditor', label: 'Form Editor' });
  }
  if (!isMember()) {
    links.push({ href: 'apply.html', id: 'apply', label: 'Apply' });
  }

  const navLinks = links.map(l =>
    `<a href="${l.href}" class="${l.id === active ? 'active' : ''}">${l.label}</a>`
  ).join('');

  let user = '';
  if (currentProfile) {
    user = `<span class="uname">${esc(currentProfile.username)}</span>
            <span class="urole">${isOfficer() ? 'Officer' : 'Member'}</span>
            <button class="btn btn-outline btn-sm" onclick="doLogout()">Logout</button>`;
  } else {
    user = `<a href="login.html" class="btn btn-outline btn-sm">Login</a>`;
  }

  el.innerHTML = `
    <a href="index.html" class="brand">
      <img src="logo.png" alt="Is a Problem logo" style="width:38px;height:38px;object-fit:contain;" onerror="this.style.display='none'">
      <span>IS A PROBLEM</span>
    </a>
    <nav>${navLinks}</nav>
    <div class="userbox">${user}</div>
  `;
}

// ---- TOAST ----
function toast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ---- UTILS ----
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtDateTime(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
