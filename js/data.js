/* ============================================================
   EduConnect — data.js
   Mock data & localStorage helpers
   ============================================================ */

const DB_KEYS = {
  USERS:    'edu_users',
  CURRENT:  'edu_current_user',
  POSTS:    'edu_posts',
  COMMENTS: 'edu_comments',
  MESSAGES: 'edu_messages',
  GROUPS:   'edu_groups',
  NOTIFS:   'edu_notifs',
  REPORTS:  'edu_reports',
};

/* ── Seed Data ── */
const SEED_USERS = [
  { id:'u1', name:'Priya Sharma', role:'teacher', subject:'Mathematics', avatar:'PS', bio:'10+ years teaching Math. Love inspiring students!', followers:['u3','u4','u5','u6'], following:['u2'], points:4800, badges:['first-post','quiz-master','mentor'], streak:14, joined:'2024-01-15', verified:true, posts:47, bg:'linear-gradient(135deg,#7c3aed,#06b6d4)' },
  { id:'u2', name:'Rohan Verma', role:'teacher', subject:'Physics', avatar:'RV', bio:'Physics & science enthusiast. Making concepts fun!', followers:['u3','u5'], following:['u1'], points:3900, badges:['first-post','science-star'], streak:7, joined:'2024-02-01', verified:true, posts:33, bg:'linear-gradient(135deg,#06b6d4,#10b981)' },
  { id:'u3', name:'Ananya Singh', role:'student', subject:'Science', avatar:'AS', bio:'Class 10 | Love studying Physics & Math', followers:['u4'], following:['u1','u2'], points:2450, badges:['first-post','streak-5'], streak:5, joined:'2024-03-10', posts:18, bg:'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { id:'u4', name:'Dev Patel', role:'student', subject:'Commerce', avatar:'DP', bio:'Aspiring CA | Commerce enthusiast', followers:['u3'], following:['u1'], points:1980, badges:['first-post'], streak:3, joined:'2024-03-20', posts:12, bg:'linear-gradient(135deg,#10b981,#06b6d4)' },
  { id:'u5', name:'Meera Joshi', role:'student', subject:'Arts', avatar:'MJ', bio:'Passionate about literature and history', followers:[], following:['u1','u2'], points:3200, badges:['first-post','bookworm','streak-5'], streak:11, joined:'2024-02-28', posts:25, bg:'linear-gradient(135deg,#7c3aed,#f59e0b)' },
  { id:'u6', name:'Karan Mehta', role:'student', subject:'Science', avatar:'KM', bio:'JEE aspirant | Chemistry nerd', followers:[], following:['u1'], points:4100, badges:['first-post','top-scorer','streak-5','quiz-master'], streak:21, joined:'2024-01-28', posts:31, bg:'linear-gradient(135deg,#ef4444,#7c3aed)' },
  { id:'admin', name:'Admin User', role:'admin', subject:'', avatar:'AU', bio:'Platform Administrator', followers:[], following:[], points:9999, badges:['admin'], streak:0, joined:'2024-01-01', posts:0, bg:'linear-gradient(135deg,#475569,#1e293b)' },
];

const SEED_POSTS = [
  {
    id:'p1', authorId:'u1', type:'note', subject:'Mathematics',
    text:'📐 Quadratic Formula Cheat Sheet!\n\nThe quadratic formula is: x = (-b ± √(b²-4ac)) / 2a\n\nRemember: discriminant (b²-4ac)\n• > 0: Two real roots\n• = 0: One real root\n• < 0: No real roots\n\nPractice makes perfect! Drop your doubts below 👇',
    tags:['#Maths','#Quadratic','#Formula','#Class10'],
    likes:['u3','u4','u5','u6'], bookmarks:['u3','u6'], shares:3,
    timestamp: Date.now() - 3600000, community:'Mathematics',
    resource: null
  },
  {
    id:'p2', authorId:'u2', type:'announcement', subject:'Physics',
    text:'🚀 Quiz Alert! Newton\'s Laws of Motion\n\nI\'ve created a 10-question quiz on Newton\'s Three Laws. You have 15 minutes to complete it.\n\nTopics covered:\n• First Law (Inertia)\n• Second Law (F=ma)\n• Third Law (Action-Reaction)\n\nBest of luck everyone! 🎯',
    tags:['#Physics','#Quiz','#Newton'],
    likes:['u3','u5','u6'], bookmarks:['u5'], shares:2,
    timestamp: Date.now() - 7200000, community:'Physics',
    resource: null
  },
  {
    id:'p3', authorId:'u3', type:'question', subject:'Science',
    text:'❓ Can someone explain the difference between speed and velocity?\n\nI keep getting confused. My teacher said speed is scalar and velocity is vector but I don\'t fully get it with examples. Please help! 🙏',
    tags:['#Physics','#Doubt','#Class9'],
    likes:['u1','u4'], bookmarks:[], shares:0,
    timestamp: Date.now() - 10800000, community:'Physics',
    resource: null
  },
  {
    id:'p4', authorId:'u6', type:'resource', subject:'Chemistry',
    text:'📄 Sharing my handwritten notes on Periodic Table - Elements, Groups, and Periods.\n\nCovered all important elements with atomic numbers. Download and use for revision! 🧪',
    tags:['#Chemistry','#PeriodicTable','#Notes'],
    likes:['u1','u2','u3','u5'], bookmarks:['u3','u5','u4'], shares:5,
    timestamp: Date.now() - 14400000, community:'Chemistry',
    resource: { name:'Periodic_Table_Notes.pdf', type:'PDF', size:'2.4 MB' }
  },
  {
    id:'p5', authorId:'u5', type:'post', subject:'Literature',
    text:'Just finished reading "The Alchemist" by Paulo Coelho for our literature class! 📖\n\n"When you want something, all the universe conspires in helping you to achieve it."\n\nFavorite book so far this semester. Highly recommend for everyone! ✨',
    tags:['#Literature','#Reading','#Alchemist'],
    likes:['u1','u3','u4'], bookmarks:['u4'], shares:1,
    timestamp: Date.now() - 21600000, community:'Literature',
    resource: null
  },
  {
    id:'p6', authorId:'u1', type:'announcement', subject:'Mathematics',
    text:'📢 Assignment Update!\n\nChapter 5 - Arithmetic Progressions assignment is due this Friday.\n\nRemember:\n• Show all working\n• Answer all 8 questions\n• Submit via the platform\n\nAny doubts? Post them in the Mathematics community! 🎯',
    tags:['#Maths','#Assignment','#AP'],
    likes:['u3','u4','u6'], bookmarks:['u3','u4','u6'], shares:0,
    timestamp: Date.now() - 86400000, community:'Mathematics',
    resource: null
  },
];

const SEED_COMMENTS = [
  { id:'c1', postId:'p1', authorId:'u3', text:'This is so helpful! Thank you Ma\'am 🙏', timestamp: Date.now() - 3000000 },
  { id:'c2', postId:'p1', authorId:'u4', text:'Can you also explain completing the square method?', timestamp: Date.now() - 2800000 },
  { id:'c3', postId:'p1', authorId:'u1', text:'Sure @Dev! I\'ll make a post about that tomorrow 😊', timestamp: Date.now() - 2600000 },
  { id:'c4', postId:'p3', authorId:'u1', text:'Great question! Speed is scalar (only magnitude) while velocity is vector (magnitude + direction). Example: 60km/h is speed, 60km/h North is velocity!', timestamp: Date.now() - 10000000 },
  { id:'c5', postId:'p3', authorId:'u2', text:'Perfect explanation by Priya Ma\'am! Think of it this way — if you run around a circular track and come back to start, your average velocity is 0 but speed is not!', timestamp: Date.now() - 9500000 },
];

const SEED_MESSAGES = [
  { id:'conv1', participants:['u3','u1'], messages:[
    { from:'u3', text:'Hello Ma\'am! I have a doubt about quadratics 🙋', ts: Date.now()-90000000 },
    { from:'u1', text:'Of course Ananya! What\'s the doubt?', ts: Date.now()-89000000 },
    { from:'u3', text:'How do I know when to use factorization vs quadratic formula?', ts: Date.now()-88000000 },
    { from:'u1', text:'Use factorization when you can spot the factors easily. Otherwise, the formula always works! I\'ll post an example 😊', ts: Date.now()-87000000 },
  ]},
  { id:'conv2', participants:['u6','u2'], messages:[
    { from:'u6', text:'Sir, can we get extra practice problems for Newton\'s laws?', ts: Date.now()-172800000 },
    { from:'u2', text:'Absolutely Karan! I\'ll upload a worksheet tomorrow.', ts: Date.now()-172000000 },
    { from:'u6', text:'Thank you Sir! Really appreciate it 🙏', ts: Date.now()-171000000 },
  ]},
];

const SEED_GROUPS = [
  { id:'g1', name:'JEE Aspirants 2025', subject:'Science', members:['u3','u6','u4'], admin:'u6', desc:'A group for serious JEE preparation. Daily practice problems & discussions.', icon:'🚀', resources:[], chat:[
    { from:'u6', text:'Chapter 7 of NCERT Physics is important for JEE mains!', ts: Date.now()-3600000 },
    { from:'u3', text:'Yes! I have good notes for that. Sharing shortly 📖', ts: Date.now()-3000000 },
  ]},
  { id:'g2', name:'Maths Study Circle', subject:'Mathematics', members:['u3','u4','u5'], admin:'u3', desc:'Weekly sessions to solve challenging math problems together.', icon:'📐', resources:[], chat:[
    { from:'u3', text:'Who wants to solve the olympiad problems this Sunday?', ts: Date.now()-7200000 },
    { from:'u5', text:'I\'m in! What time?', ts: Date.now()-6800000 },
    { from:'u4', text:'Count me in too! 🙋', ts: Date.now()-6500000 },
  ]},
  { id:'g3', name:'Commerce Warriors', subject:'Commerce', members:['u4'], admin:'u4', desc:'For commerce students — accountancy, economics, business studies.', icon:'💼', resources:[], chat:[] },
];

const SEED_NOTIFS = [
  { id:'n1', userId:'u3', type:'like', fromId:'u1', postId:'p3', text:'Priya Sharma liked your post', read:false, ts: Date.now()-1800000 },
  { id:'n2', userId:'u3', type:'comment', fromId:'u1', postId:'p3', text:'Priya Sharma answered your question', read:false, ts: Date.now()-1700000 },
  { id:'n3', userId:'u3', type:'follow', fromId:'u4', postId:null, text:'Dev Patel started following you', read:false, ts: Date.now()-3600000 },
  { id:'n4', userId:'u3', type:'badge', fromId:null, postId:null, text:'You earned the "Streak Starter" badge! 🔥', read:true, ts: Date.now()-86400000 },
  { id:'n5', userId:'u3', type:'quiz', fromId:'u2', postId:null, text:'New quiz available: Newton\'s Laws of Motion', read:true, ts: Date.now()-90000000 },
  { id:'n6', userId:'u6', type:'like', fromId:'u1', postId:'p4', text:'Priya Sharma liked your resource', read:false, ts: Date.now()-900000 },
  { id:'n7', userId:'u6', type:'quiz', fromId:'u2', postId:null, text:'Quiz Results: You scored 9/10! Great job! 🎉', read:false, ts: Date.now()-3600000 },
];

const SEED_QUIZZES = [
  {
    id:'q1', title:"Newton's Laws of Motion", subject:'Physics', authorId:'u2',
    duration:15, totalMarks:10, dueDate:'2026-08-25',
    questions:[
      { q:"Which law states that an object at rest stays at rest?", opts:["First Law","Second Law","Third Law","Law of Gravity"], ans:0 },
      { q:"F = ma represents which law?", opts:["First Law","Second Law","Third Law","Kepler's Law"], ans:1 },
      { q:"For every action there is an equal and opposite reaction — which law?", opts:["First Law","Second Law","Third Law","Fourth Law"], ans:2 },
      { q:"Unit of Force is?", opts:["Joule","Watt","Newton","Pascal"], ans:2 },
      { q:"Inertia depends on:", opts:["Velocity","Mass","Acceleration","Volume"], ans:1 },
    ],
    submissions:{ 'u3':{ score:4, total:5, submittedAt: Date.now()-3600000 }, 'u6':{ score:5, total:5, submittedAt: Date.now()-7200000 } },
    status:'active'
  },
  {
    id:'q2', title:"Quadratic Equations - Practice Test", subject:'Mathematics', authorId:'u1',
    duration:20, totalMarks:10, dueDate:'2026-08-30',
    questions:[
      { q:"The standard form of a quadratic equation is:", opts:["ax+b=0","ax²+bx+c=0","ax³+bx+c=0","ax²+b=0"], ans:1 },
      { q:"Discriminant of a quadratic equation is:", opts:["b²-4ac","b²+4ac","2b-4ac","4ac-b²"], ans:0 },
      { q:"If discriminant > 0, then roots are:", opts:["Equal real","No real roots","Two distinct real roots","Complex"], ans:2 },
      { q:"Sum of roots of ax²+bx+c=0 is:", opts:["c/a","b/a","-b/a","-c/a"], ans:2 },
      { q:"Product of roots of ax²+bx+c=0 is:", opts:["c/a","b/a","-b/a","-c/a"], ans:0 },
    ],
    submissions:{ 'u3':{ score:3, total:5, submittedAt: Date.now()-86400000 } },
    status:'active'
  },
];

const SEED_ASSIGNMENTS = [
  { id:'a1', title:'Arithmetic Progressions - Exercise 5.3', subject:'Mathematics', authorId:'u1', dueDate:'2026-08-23', description:'Complete all 8 questions. Show all working steps clearly.', maxMarks:20, submissions:{ 'u3':{ fileUrl:null, submittedAt: Date.now()-3600000, grade:null, feedback:'' }, 'u6':{ fileUrl:null, submittedAt: Date.now()-7200000, grade:18, feedback:'Excellent work! Minor error in Q6.' } }, status:'active' },
  { id:'a2', title:'Newton\'s Laws - Lab Report', subject:'Physics', authorId:'u2', dueDate:'2026-08-28', description:'Write a 1000-word lab report on the experiment conducted in class.', maxMarks:15, submissions:{}, status:'active' },
];

const COMMUNITIES = [
  { id:'cm1', name:'Mathematics', icon:'📐', color:'#7c3aed', members:['u1','u3','u4','u6'], desc:'Algebra, geometry, calculus, and beyond. Post doubts, share tips, and solve problems together!', posts:['p1','p6'], pinned:'p1' },
  { id:'cm2', name:'Physics', icon:'⚛️', color:'#06b6d4', members:['u2','u3','u5','u6'], desc:'Newton to quantum — everything physics. Questions welcome!', posts:['p2','p3'], pinned:'p2' },
  { id:'cm3', name:'Chemistry', icon:'🧪', color:'#10b981', members:['u2','u6'], desc:'Atoms, molecules, reactions and experiments. Let\'s explore chemistry!', posts:['p4'], pinned:'p4' },
  { id:'cm4', name:'Biology', icon:'🧬', color:'#f59e0b', members:['u2','u3'], desc:'Life sciences, ecology, anatomy and more.', posts:[], pinned:null },
  { id:'cm5', name:'Literature', icon:'📖', color:'#ef4444', members:['u1','u5'], desc:'Books, poetry, essays, and literary analysis. Share your love of reading!', posts:['p5'], pinned:'p5' },
  { id:'cm6', name:'History', icon:'🏛️', color:'#8b5cf6', members:['u5'], desc:'Ancient to modern history. Explore the past!', posts:[], pinned:null },
  { id:'cm7', name:'Computer Science', icon:'💻', color:'#0891b2', members:['u4','u6'], desc:'Programming, algorithms, data structures and tech.', posts:[], pinned:null },
  { id:'cm8', name:'Commerce', icon:'💼', color:'#d97706', members:['u4'], desc:'Accountancy, economics, business studies.', posts:[], pinned:null },
];

const ACHIEVEMENTS_LIST = [
  { id:'first-post',  name:'First Post',     icon:'✍️', desc:'Shared your first educational post',      points:50  },
  { id:'streak-5',    name:'Streak Master',  icon:'🔥', desc:'Maintained a 5-day streak',               points:100 },
  { id:'quiz-master', name:'Quiz Master',    icon:'🎯', desc:'Scored 100% on 3 quizzes',                points:250 },
  { id:'top-scorer',  name:'Top Scorer',     icon:'🏆', desc:'Ranked #1 on the leaderboard',            points:500 },
  { id:'bookworm',    name:'Bookworm',        icon:'📚', desc:'Bookmarked 10+ resources',               points:75  },
  { id:'mentor',      name:'Mentor',          icon:'👨‍🏫', desc:'Answered 20+ student doubts',           points:200 },
  { id:'science-star',name:'Science Star',   icon:'⭐', desc:'Active in 3 science communities',         points:150 },
  { id:'admin',       name:'Admin',           icon:'🛡️', desc:'Platform administrator',                 points:0   },
  { id:'early-bird',  name:'Early Bird',      icon:'🌅', desc:'One of the first 100 users',             points:100 },
  { id:'helper',      name:'Helper',          icon:'🤝', desc:'Helped 5+ students with doubts',         points:100 },
  { id:'content-king',name:'Content King',   icon:'👑', desc:'Posted 30+ educational posts',            points:300 },
  { id:'perfect-week',name:'Perfect Week',   icon:'📅', desc:'Active every day for a full week',        points:150 },
];

/* ── DB Helpers ── */
const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  update(key, updater) {
    const val = this.get(key);
    this.set(key, updater(val));
    return this.get(key);
  }
};

/* ── Seed if First Run ── */
function seedIfNeeded() {
  if (!DB.get(DB_KEYS.USERS)) {
    DB.set(DB_KEYS.USERS, SEED_USERS);
    DB.set(DB_KEYS.POSTS, SEED_POSTS);
    DB.set(DB_KEYS.COMMENTS, SEED_COMMENTS);
    DB.set(DB_KEYS.MESSAGES, SEED_MESSAGES);
    DB.set(DB_KEYS.GROUPS, SEED_GROUPS);
    DB.set(DB_KEYS.NOTIFS, SEED_NOTIFS);
    DB.set('edu_quizzes', SEED_QUIZZES);
    DB.set('edu_assignments', SEED_ASSIGNMENTS);
    DB.set('edu_communities', COMMUNITIES);
    console.log('✅ EduConnect DB seeded');
  }
}

/* ── Auth Helpers ── */
function getCurrentUser() {
  const id = DB.get(DB_KEYS.CURRENT);
  if (!id) return null;
  return getUser(id);
}

function getUser(id) {
  const users = DB.get(DB_KEYS.USERS) || [];
  return users.find(u => u.id === id) || null;
}

function getAllUsers() {
  return DB.get(DB_KEYS.USERS) || [];
}

function updateUser(id, changes) {
  DB.update(DB_KEYS.USERS, users => users.map(u => u.id === id ? { ...u, ...changes } : u));
}

function loginUser(id) {
  DB.set(DB_KEYS.CURRENT, id);
}

function logoutUser() {
  DB.set(DB_KEYS.CURRENT, null);
}

/* ── Post Helpers ── */
function getPosts() { return (DB.get(DB_KEYS.POSTS) || []).sort((a,b) => b.timestamp - a.timestamp); }
function getPost(id) { return getPosts().find(p => p.id === id); }
function addPost(post) { DB.update(DB_KEYS.POSTS, posts => [post, ...posts]); }
function updatePost(id, changes) { DB.update(DB_KEYS.POSTS, posts => posts.map(p => p.id === id ? {...p, ...changes} : p)); }
function deletePost(id) { DB.update(DB_KEYS.POSTS, posts => posts.filter(p => p.id !== id)); }

function toggleLike(postId, userId) {
  const posts = DB.get(DB_KEYS.POSTS) || [];
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  const liked = post.likes.includes(userId);
  post.likes = liked ? post.likes.filter(id => id !== userId) : [...post.likes, userId];
  DB.set(DB_KEYS.POSTS, posts);
  return !liked;
}

function toggleBookmark(postId, userId) {
  const posts = DB.get(DB_KEYS.POSTS) || [];
  const post = posts.find(p => p.id === postId);
  if (!post) return;
  const bm = post.bookmarks.includes(userId);
  post.bookmarks = bm ? post.bookmarks.filter(id => id !== userId) : [...post.bookmarks, userId];
  DB.set(DB_KEYS.POSTS, posts);
  return !bm;
}

/* ── Comment Helpers ── */
function getComments(postId) {
  return (DB.get(DB_KEYS.COMMENTS) || []).filter(c => c.postId === postId).sort((a,b) => a.timestamp - b.timestamp);
}

function addComment(comment) {
  DB.update(DB_KEYS.COMMENTS, comments => [...comments, comment]);
}

/* ── Follow Helpers ── */
function toggleFollow(targetId, currentUserId) {
  const users = DB.get(DB_KEYS.USERS) || [];
  const me = users.find(u => u.id === currentUserId);
  const target = users.find(u => u.id === targetId);
  if (!me || !target) return false;
  const isFollowing = me.following.includes(targetId);
  if (isFollowing) {
    me.following = me.following.filter(id => id !== targetId);
    target.followers = target.followers.filter(id => id !== currentUserId);
  } else {
    me.following.push(targetId);
    target.followers.push(currentUserId);
  }
  DB.set(DB_KEYS.USERS, users);
  return !isFollowing;
}

/* ── Notification Helpers ── */
function getNotifs(userId) {
  return (DB.get(DB_KEYS.NOTIFS) || []).filter(n => n.userId === userId).sort((a,b) => b.ts - a.ts);
}

function getUnreadCount(userId) {
  return getNotifs(userId).filter(n => !n.read).length;
}

function markNotifsRead(userId) {
  DB.update(DB_KEYS.NOTIFS, notifs => notifs.map(n => n.userId === userId ? {...n, read:true} : n));
}

function addNotif(notif) {
  DB.update(DB_KEYS.NOTIFS, notifs => [notif, ...notifs]);
}

/* ── Community Helpers ── */
function getCommunities() { return DB.get('edu_communities') || COMMUNITIES; }
function getCommunity(id) { return getCommunities().find(c => c.id === id); }
function joinCommunity(communityId, userId) {
  DB.update('edu_communities', comms => comms.map(c => c.id === communityId && !c.members.includes(userId) ? {...c, members:[...c.members, userId]} : c));
}
function leaveCommunity(communityId, userId) {
  DB.update('edu_communities', comms => comms.map(c => c.id === communityId ? {...c, members: c.members.filter(id => id !== userId)} : c));
}

/* ── Message Helpers ── */
function getConversations(userId) {
  return (DB.get(DB_KEYS.MESSAGES) || []).filter(c => c.participants.includes(userId));
}

function getOrCreateConv(userId1, userId2) {
  let convs = DB.get(DB_KEYS.MESSAGES) || [];
  let conv = convs.find(c => c.participants.includes(userId1) && c.participants.includes(userId2));
  if (!conv) {
    conv = { id: 'conv' + Date.now(), participants: [userId1, userId2], messages: [] };
    convs.push(conv);
    DB.set(DB_KEYS.MESSAGES, convs);
  }
  return conv;
}

function sendMessage(convId, from, text) {
  DB.update(DB_KEYS.MESSAGES, convs => convs.map(c => c.id === convId ? {
    ...c, messages: [...c.messages, { from, text, ts: Date.now() }]
  } : c));
}

/* ── Quiz Helpers ── */
function getQuizzes() { return DB.get('edu_quizzes') || []; }
function getQuiz(id)  { return getQuizzes().find(q => q.id === id); }
function submitQuiz(quizId, userId, score, total) {
  DB.update('edu_quizzes', quizzes => quizzes.map(q => q.id === quizId ? {
    ...q, submissions: { ...q.submissions, [userId]: { score, total, submittedAt: Date.now() } }
  } : q));
}

function getAssignments() { return DB.get('edu_assignments') || []; }
function getAssignment(id){ return getAssignments().find(a => a.id === id); }
function submitAssignment(asgId, userId) {
  DB.update('edu_assignments', asgs => asgs.map(a => a.id === asgId ? {
    ...a, submissions: { ...a.submissions, [userId]: { submittedAt: Date.now(), grade: null, feedback: '' } }
  } : a));
}

/* ── Group Helpers ── */
function getGroups() { return DB.get(DB_KEYS.GROUPS) || []; }
function getGroup(id){ return getGroups().find(g => g.id === id); }
function joinGroup(groupId, userId) {
  DB.update(DB_KEYS.GROUPS, groups => groups.map(g => g.id === groupId && !g.members.includes(userId) ? {...g, members:[...g.members,userId]} : g));
}
function sendGroupMsg(groupId, from, text) {
  DB.update(DB_KEYS.GROUPS, groups => groups.map(g => g.id === groupId ? {
    ...g, chat: [...g.chat, { from, text, ts: Date.now() }]
  } : g));
}

/* ── Report Helpers ── */
function reportContent(reporterId, targetId, type, reason) {
  DB.update(DB_KEYS.REPORTS, reports => [...(reports||[]), {
    id: 'r' + Date.now(), reporterId, targetId, type, reason, ts: Date.now(), status: 'pending'
  }]);
}
function getReports() { return DB.get(DB_KEYS.REPORTS) || []; }
function resolveReport(id, action) {
  DB.update(DB_KEYS.REPORTS, reports => reports.map(r => r.id === id ? {...r, status: action} : r));
}

/* ── Performance Data ── */
function getStudentPerformance(userId) {
  const quizzes = getQuizzes();
  const subjectScores = {};
  quizzes.forEach(q => {
    if (q.submissions[userId]) {
      const { score, total } = q.submissions[userId];
      const pct = Math.round((score/total)*100);
      if (!subjectScores[q.subject]) subjectScores[q.subject] = { scores:[], name:q.subject };
      subjectScores[q.subject].scores.push(pct);
    }
  });
  const marks = { Mathematics:72, Physics:85, Chemistry:63, Biology:88, Literature:91, History:78, 'Computer Science':95, Commerce:69 };
  return { subjectScores, marks };
}

/* ── Leaderboard ── */
function getLeaderboard() {
  return getAllUsers().filter(u => u.role !== 'admin').sort((a,b) => b.points - a.points).map((u,i) => ({...u, rank:i+1}));
}

/* ── Time Formatting ── */
function timeAgo(ts) {
  const d = Date.now() - ts;
  if (d < 60000)   return 'just now';
  if (d < 3600000) return Math.floor(d/60000) + 'm ago';
  if (d < 86400000)return Math.floor(d/3600000) + 'h ago';
  if (d < 604800000)return Math.floor(d/86400000) + 'd ago';
  return new Date(ts).toLocaleDateString('en-IN', { day:'numeric', month:'short' });
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

/* ── Generate ID ── */
function genId(prefix='id') {
  return prefix + Date.now() + Math.random().toString(36).slice(2,7);
}

/* ── Initialize ── */
seedIfNeeded();
