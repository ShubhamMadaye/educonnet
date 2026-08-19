/* ============================================================
   EduConnect — app.js
   Global app: auth guard, sidebar, toast, navigation
   ============================================================ */

/* ── Auth Guard ── */
function requireAuth() {
  const user = getCurrentUser();
  if (!user) { window.location.href = 'index.html'; return null; }
  return user;
}

function requireRole(...roles) {
  const user = requireAuth();
  if (!user) return null;
  if (roles.length && !roles.includes(user.role)) {
    showToast('Access denied', 'error');
    window.location.href = 'feed.html';
    return null;
  }
  return user;
}

/* ── Sidebar Builder ── */
const NAV_ITEMS = [
  { label:null, items:[
    { icon:'ph-house',         text:'Home Feed',      href:'feed.html',          key:'feed' },
    { icon:'ph-bell',          text:'Notifications',  href:'notifications.html', key:'notifications', badge:true },
    { icon:'ph-chat-circle',   text:'Messages',       href:'messages.html',      key:'messages' },
  ]},
  { label:'LEARN', items:[
    { icon:'ph-users-three',   text:'Communities',    href:'community.html',     key:'community' },
    { icon:'ph-student',       text:'Study Groups',   href:'studygroup.html',    key:'studygroup' },
    { icon:'ph-clipboard-text',text:'Quizzes & Tests',href:'quizzes.html',       key:'quizzes' },
    { icon:'ph-chart-bar',     text:'My Dashboard',   href:'dashboard.html',     key:'dashboard', studentOnly:true },
  ]},
  { label:'MORE', items:[
    { icon:'ph-trophy',        text:'Leaderboard',    href:'leaderboard.html',   key:'leaderboard' },
    { icon:'ph-shield-check',  text:'Admin Panel',    href:'admin.html',         key:'admin', adminOnly:true },
  ]},
];

function buildSidebar(activeKey) {
  const user = getCurrentUser();
  if (!user) return;

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const unread = getUnreadCount(user.id);

  let navHTML = '';
  NAV_ITEMS.forEach(group => {
    if (group.label) navHTML += `<div class="nav-label">${group.label}</div>`;
    group.items.forEach(item => {
      if (item.adminOnly && user.role !== 'admin') return;
      if (item.studentOnly && user.role === 'teacher') return;
      const isActive = item.key === activeKey;
      const badgeHTML = item.badge && unread > 0 ? `<span class="nav-badge">${unread > 9 ? '9+' : unread}</span>` : '';
      navHTML += `
        <a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}">
          <i class="ph ${item.icon}"></i>
          <span>${item.text}</span>
          ${badgeHTML}
        </a>`;
    });
  });

  const avatarStyle = user.bg ? `style="background:${user.bg}"` : '';
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-icon">🎓</div>
      <span>EduConnect</span>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <a href="profile.html?id=${user.id}" class="sidebar-user" id="sidebar-user-btn">
      <div class="avatar avatar-sm" ${avatarStyle}>${user.avatar}</div>
      <div class="user-info">
        <div class="user-name">${user.name}</div>
        <div class="user-role">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
      </div>
      <i class="ph ph-caret-right" style="color:var(--text-muted);font-size:0.85rem;"></i>
    </a>`;

  // Mobile overlay
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('sidebar-overlay');
  if (mobileBtn) mobileBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay && overlay.classList.toggle('open');
  });
  if (overlay) overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

/* ── Toast ── */
function showToast(msg, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success:'ph-check-circle', error:'ph-x-circle', info:'ph-info', warning:'ph-warning' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="ph ${icons[type] || icons.info} toast-icon"></i>
    <span class="toast-msg">${msg}</span>
    <i class="ph ph-x toast-close"></i>`;

  container.appendChild(toast);

  const close = () => {
    toast.classList.add('out');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', close);
  setTimeout(close, duration);
}

/* ── Modal Helpers ── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('hidden'); document.body.style.overflow = ''; }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.classList.add('hidden');
  });
  document.body.style.overflow = '';
}

// Click outside to close
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeAllModals();
});

/* ── Dropdown Helpers ── */
function toggleDropdown(id) {
  const dd = document.getElementById(id);
  if (!dd) return;
  const isHidden = dd.classList.contains('hidden');
  document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.add('hidden'));
  if (isHidden) dd.classList.remove('hidden');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.add('hidden'));
  }
});

/* ── Tabs ── */
function initTabs(containerSel) {
  const container = document.querySelector(containerSel);
  if (!container) return;
  const buttons = container.querySelectorAll('.tab-btn');
  const contents = container.querySelectorAll('.tab-content');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });
}

/* ── Avatar HTML ── */
function avatarHTML(user, size = 'md') {
  const avatarStyle = user && user.bg ? `style="background:${user.bg}"` : '';
  return `<div class="avatar avatar-${size}" ${avatarStyle}>${user ? user.avatar : '?'}</div>`;
}

/* ── Subject Color ── */
const SUBJECT_COLORS = {
  'Mathematics':    '#7c3aed',
  'Physics':        '#06b6d4',
  'Chemistry':      '#10b981',
  'Biology':        '#f59e0b',
  'Literature':     '#ef4444',
  'History':        '#8b5cf6',
  'Computer Science':'#0891b2',
  'Commerce':       '#d97706',
};

function subjectColor(subject) {
  return SUBJECT_COLORS[subject] || '#7c3aed';
}

/* ── URL Params ── */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ── Logout ── */
function handleLogout() {
  logoutUser();
  showToast('Logged out successfully', 'info');
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
}

/* ── Points Award ── */
function awardPoints(userId, pts, reason) {
  const users = DB.get(DB_KEYS.USERS) || [];
  const user = users.find(u => u.id === userId);
  if (user) {
    user.points = (user.points || 0) + pts;
    DB.set(DB_KEYS.USERS, users);
  }
}

/* ── Global BG Orbs ── */
function injectBgOrbs() {
  if (document.querySelector('.bg-orbs')) return;
  const orbs = document.createElement('div');
  orbs.className = 'bg-orbs';
  orbs.innerHTML = '<div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>';
  document.body.prepend(orbs);
}

/* ── Mobile Boilerplate ── */
function injectMobileMenu() {
  if (!document.getElementById('mobile-menu-btn')) {
    const btn = document.createElement('button');
    btn.id = 'mobile-menu-btn';
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = '<i class="ph ph-list"></i>';
    document.body.appendChild(btn);
  }
  if (!document.getElementById('sidebar-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
  }
}

/* ── Post Card Builder (shared) ── */
function buildPostCard(post, currentUser) {
  const author = getUser(post.authorId);
  if (!author) return '';

  const liked      = currentUser && post.likes.includes(currentUser.id);
  const bookmarked = currentUser && post.bookmarks.includes(currentUser.id);
  const comments   = getComments(post.id);
  const canDelete  = currentUser && (currentUser.id === post.authorId || currentUser.role === 'admin');

  const typeLabels = { note:'📝 Note', announcement:'📢 Announcement', question:'❓ Question', resource:'📄 Resource', post:'💬 Post' };
  const typeLabel  = typeLabels[post.type] || '💬 Post';

  const avatarStyle = author.bg ? `style="background:${author.bg}"` : '';

  let resourceHTML = '';
  if (post.resource) {
    resourceHTML = `
      <div class="post-resource">
        <i class="ph ph-file-pdf post-resource-icon"></i>
        <div>
          <div class="post-resource-name">${post.resource.name}</div>
          <div class="post-resource-meta">${post.resource.type} • ${post.resource.size}</div>
        </div>
        <i class="ph ph-download-simple" style="margin-left:auto;color:var(--text-muted);"></i>
      </div>`;
  }

  const tagsHTML = post.tags.map(t => `<span class="chip">${t}</span>`).join('');

  const topComments = comments.slice(-2).map(c => {
    const ca = getUser(c.authorId);
    return `
      <div class="comment-item">
        ${avatarHTML(ca,'xs')}
        <div class="comment-body">
          <span class="comment-author">${ca ? ca.name : 'User'}</span>
          <div class="comment-text">${escapeHtml(c.text)}</div>
          <div class="comment-time">${timeAgo(c.timestamp)}</div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="post-card animate-fade-in-up" id="post-${post.id}">
      <div class="post-header">
        ${avatarHTML(author,'md')}
        <div class="post-author-info">
          <div class="post-author-name">
            <a href="profile.html?id=${author.id}" style="color:inherit;text-decoration:none;">${author.name}</a>
            ${author.verified ? '<i class="ph ph-seal-check" style="color:var(--accent);font-size:0.85rem;"></i>' : ''}
            <span class="badge ${author.role === 'teacher' ? 'badge-teacher' : 'badge-student'}" style="font-size:0.65rem;">${author.role}</span>
          </div>
          <div class="post-meta">${typeLabel} • ${post.subject} • ${timeAgo(post.timestamp)}</div>
        </div>
        <div class="dropdown" style="margin-left:auto;">
          <button class="btn btn-ghost btn-icon btn-sm" onclick="toggleDropdown('dd-${post.id}')">
            <i class="ph ph-dots-three"></i>
          </button>
          <div class="dropdown-menu hidden" id="dd-${post.id}">
            <div class="dropdown-item" onclick="sharePost('${post.id}')"><i class="ph ph-share-network"></i> Share</div>
            <div class="dropdown-item" onclick="reportPost('${post.id}')"><i class="ph ph-flag"></i> Report</div>
            ${canDelete ? `<div class="dropdown-item danger" onclick="deletePostUI('${post.id}')"><i class="ph ph-trash"></i> Delete</div>` : ''}
          </div>
        </div>
      </div>
      <div class="post-content">
        <div class="post-text">${escapeHtml(post.text).replace(/\n/g,'<br>')}</div>
        ${resourceHTML}
        ${tagsHTML ? `<div class="post-tags">${tagsHTML}</div>` : ''}
      </div>
      <div class="post-actions">
        <button class="post-action-btn ${liked ? 'liked':''}" onclick="likePost('${post.id}')" id="like-btn-${post.id}">
          <i class="ph ${liked ? 'ph-heart-fill':'ph-heart'}"></i>
          <span id="like-count-${post.id}">${post.likes.length}</span>
        </button>
        <button class="post-action-btn" onclick="toggleComments('${post.id}')">
          <i class="ph ph-chat-circle"></i>
          <span>${comments.length}</span>
        </button>
        <button class="post-action-btn" onclick="sharePost('${post.id}')">
          <i class="ph ph-share-network"></i>
          <span>${post.shares}</span>
        </button>
        <button class="post-action-btn ${bookmarked ? 'bookmarked':''}" onclick="bookmarkPost('${post.id}')" id="bm-btn-${post.id}" style="margin-left:auto;">
          <i class="ph ${bookmarked ? 'ph-bookmark-simple-fill':'ph-bookmark-simple'}"></i>
        </button>
      </div>
      <div class="post-comments hidden" id="comments-${post.id}">
        <div id="comments-list-${post.id}">${topComments}</div>
        <div class="comment-input-row">
          ${avatarHTML(currentUser,'xs')}
          <input type="text" class="form-input" placeholder="Add a comment…" id="comment-input-${post.id}" style="flex:1;" onkeydown="if(event.key==='Enter') submitComment('${post.id}')">
          <button class="btn btn-primary btn-sm" onclick="submitComment('${post.id}')"><i class="ph ph-paper-plane-tilt"></i></button>
        </div>
      </div>
    </div>`;
}

/* ── Post Interactions ── */
function likePost(postId) {
  const user = getCurrentUser();
  if (!user) return showToast('Please login', 'error');
  const liked = toggleLike(postId, user.id);
  const btn = document.getElementById(`like-btn-${postId}`);
  const countEl = document.getElementById(`like-count-${postId}`);
  if (btn) {
    btn.classList.toggle('liked', liked);
    const icon = btn.querySelector('i');
    if (icon) icon.className = `ph ${liked ? 'ph-heart-fill':'ph-heart'}`;
  }
  const post = getPost(postId);
  if (countEl && post) countEl.textContent = post.likes.length;
}

function toggleComments(postId) {
  const panel = document.getElementById(`comments-${postId}`);
  if (panel) panel.classList.toggle('hidden');
}

function submitComment(postId) {
  const user = getCurrentUser();
  if (!user) return;
  const input = document.getElementById(`comment-input-${postId}`);
  if (!input || !input.value.trim()) return;
  const comment = { id: genId('c'), postId, authorId: user.id, text: input.value.trim(), timestamp: Date.now() };
  addComment(comment);
  awardPoints(user.id, 5, 'comment');
  const list = document.getElementById(`comments-list-${postId}`);
  const ca = user;
  const avatarStyle = ca.bg ? `style="background:${ca.bg}"` : '';
  if (list) {
    list.insertAdjacentHTML('beforeend', `
      <div class="comment-item animate-fade-in">
        <div class="avatar avatar-xs" ${avatarStyle}>${ca.avatar}</div>
        <div class="comment-body">
          <span class="comment-author">${ca.name}</span>
          <div class="comment-text">${escapeHtml(comment.text)}</div>
          <div class="comment-time">just now</div>
        </div>
      </div>`);
  }
  input.value = '';
}

function bookmarkPost(postId) {
  const user = getCurrentUser();
  if (!user) return;
  const bm = toggleBookmark(postId, user.id);
  const btn = document.getElementById(`bm-btn-${postId}`);
  if (btn) {
    btn.classList.toggle('bookmarked', bm);
    const icon = btn.querySelector('i');
    if (icon) icon.className = `ph ${bm ? 'ph-bookmark-simple-fill':'ph-bookmark-simple'}`;
  }
  showToast(bm ? 'Bookmarked!' : 'Bookmark removed', 'success');
}

function sharePost(postId) {
  updatePost(postId, { shares: (getPost(postId)?.shares || 0) + 1 });
  showToast('Shared to your followers!', 'success');
}

function deletePostUI(postId) {
  if (!confirm('Delete this post?')) return;
  deletePost(postId);
  const el = document.getElementById(`post-${postId}`);
  if (el) { el.style.opacity = '0'; el.style.transform = 'scale(0.95)'; el.style.transition = 'all 0.3s'; setTimeout(() => el.remove(), 300); }
  showToast('Post deleted', 'success');
}

function reportPost(postId) {
  const user = getCurrentUser();
  if (!user) return;
  reportContent(user.id, postId, 'post', 'Inappropriate content');
  showToast('Post reported. Our team will review it.', 'info');
}

/* ── Escape HTML ── */
function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Init on Load ── */
document.addEventListener('DOMContentLoaded', () => {
  injectBgOrbs();
  injectMobileMenu();
});
