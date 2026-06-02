// ── KPIs ─────────────────────────────────────────────────────────────────────
export const kpis = [
  { id:1, label:'Total Orders',       value:'25,430', delta:'+3.2%', up:true,  sub:'vs yesterday',   icon:'📦' },
  { id:2, label:'Delayed Orders',     value:'1,120',  delta:'+12%',  up:false, sub:'needs attention', icon:'⏱️' },
  { id:3, label:'Open Support Tickets',value:'235',   delta:'+8%',   up:false, sub:'vs yesterday',   icon:'🎧' },
  { id:4, label:'Inventory Risk',     value:'42 SKUs',delta:'-2',    up:false, sub:'below reorder',  icon:'🗄️' },
  { id:5, label:'Ops Health Score',   value:'71/100', delta:'-4pts', up:false, sub:'moderate risk',  icon:'💡' },
];

// ── Health ─────────────────────────────────────────────────────────────────────
export const healthScore = {
  score: 71,
  label: 'Moderate Risk',
  departments: [
    { name:'Warehouse',  score:64, trend:'down' },
    { name:'Delivery',   score:58, trend:'down' },
    { name:'Support',    score:72, trend:'stable' },
    { name:'Store Ops',  score:80, trend:'up' },
    { name:'Inventory',  score:75, trend:'up' },
  ],
};

export const fulfillment = [
  { label:'Processed',  value:23480, pct:92, color:'#4338CA' },
  { label:'Delayed',    value:1120,  pct:4.4,color:'#F59E0B' },
  { label:'Failed',     value:830,   pct:3.3,color:'#DC2626' },
];

export const deliveryPerf = [
  { zone:'Zone 1', onTime:95 }, { zone:'Zone 2', onTime:92 },
  { zone:'Zone 3', onTime:88 }, { zone:'Zone 4', onTime:62 },
  { zone:'Zone 5', onTime:91 }, { zone:'Zone 6', onTime:89 },
  { zone:'Zone 7', onTime:58 },
];

export const csatData = [
  { label:'Excellent (5★)', pct:38, color:'#059669' },
  { label:'Good (4★)',      pct:29, color:'#4338CA' },
  { label:'Neutral (3★)',   pct:18, color:'#94A3B8' },
  { label:'Poor (1-2★)',    pct:15, color:'#DC2626' },
];

// ── AI Insights ───────────────────────────────────────────────────────────────
export const aiInsights = [
  {
    id:1, type:'root-cause',
    title:'Ahmedabad FC-01 is root cause',
    desc:'Dispatch backlog (3h delay) is responsible for 78% of active delivery SLA breaches. Immediate intervention recommended.',
    impact:'1,200 orders · ₹4.2L revenue risk',
    confidence:93,
    action:'View Incident',
  },
  {
    id:2, type:'recommendation',
    title:'Activate Zone 4 backup fleet',
    desc:'Based on historical data, deploying 12 additional delivery partners in Zone 4 will recover SLA compliance by ~68% within 2h.',
    impact:'Recovers ~760 delayed orders',
    confidence:87,
    action:'Assign Team',
  },
  {
    id:3, type:'predictive',
    title:'Support queue will breach SLA in ~40 min',
    desc:'Current ticket arrival rate (18/min) exceeds agent capacity. Queue will breach 15-min SLA threshold at approximately 11:25 AM.',
    impact:'235 customers at CSAT risk',
    confidence:91,
    action:'View Tickets',
  },
  {
    id:4, type:'impact',
    title:'Weekend demand surge expected',
    desc:'Friday–Sunday demand forecast is 34% above current inventory cover for Beauty & Skincare. Reorder should be triggered today.',
    impact:'₹8.6L potential revenue at risk',
    confidence:84,
    action:'Reorder Now',
  },
];

// ── Cascade ────────────────────────────────────────────────────────────────────
export const cascade = {
  rootCause: { label:'Ahmedabad Warehouse FC-01', detail:'3-hour dispatch backlog — outbound queue congestion' },
  steps: [
    { icon:'🚚', label:'Delivery Delays',            metric:'+35%',  dept:'Logistics',     count:1120, color:'#4338CA' },
    { icon:'🎧', label:'Customer Complaints Rise',   metric:'+28%',  dept:'Support',       count:235,  color:'#6366F1' },
    { icon:'↩️', label:'Returns Increase',           metric:'+18%',  dept:'Warehouse',     count:312,  color:'#A78BFA' },
    { icon:'💸', label:'Revenue Impact',             metric:'₹4.2L', dept:'Leadership',    count:null, color:'#C4B5FD' },
  ],
  confidence:93,
};

// ── Alerts ────────────────────────────────────────────────────────────────────
export const alerts = [
  { id:1, severity:'critical', location:'Ahmedabad FC-01',       issue:'Inventory shortage & dispatch backlog', impact:'1,200 orders at risk', owner:'Warehouse Team', team:'Ops',       status:'In Progress', sla:'45 min left', time:'8 min ago'  },
  { id:2, severity:'critical', location:'Zone 4 & 7 - Mumbai',   issue:'Delivery SLA breach - avg delay 38 min', impact:'480 deliveries',      owner:'Priya Mehta',    team:'Logistics', status:'Investigating',sla:'20 min left', time:'15 min ago' },
  { id:3, severity:'warning',  location:'Support Queue',          issue:'Ticket backlog - wait >12 min',         impact:'CSAT risk — 235 users', owner:'CS Lead',        team:'Support',   status:'Open',         sla:'1h remaining',time:'31 min ago' },
  { id:4, severity:'warning',  location:'Inventory - Skincare',   issue:'42 SKUs below reorder threshold',       impact:'Weekend demand risk',  owner:'Sonal Patel',    team:'Inventory', status:'Open',         sla:'3h remaining',time:'52 min ago' },
  { id:5, severity:'resolved', location:'Delhi Store - CP',       issue:'POS system downtime - recovered',       impact:'0 orders lost',        owner:'Store Ops',      team:'Ops',       status:'Resolved',     sla:'Closed',      time:'2h ago'     },
];

// ── Workflow ────────────────────────────────────────────────────────────────────
export const workflows = [
  { id:'INC-0047', issue:'Inventory Delay - Premium Skincare',  dept:'Warehouse',  owner:'Rahul Sharma', status:'Open',         priority:'high',     sla:'2h left',     updated:'5 min ago'  },
  { id:'INC-0046', issue:'Delivery SLA Breach - Zone 4',        dept:'Logistics',  owner:'Priya Mehta',  status:'In Progress',  priority:'critical', sla:'20 min left', updated:'12 min ago' },
  { id:'INC-0045', issue:'Store Complaint - Connaught Place',    dept:'Store Ops',  owner:'Amit Verma',   status:'Resolved',     priority:'medium',   sla:'Closed',      updated:'2h ago'     },
  { id:'INC-0044', issue:'Return Backlog - Warehouse Mumbai',    dept:'Warehouse',  owner:'Neha Singh',   status:'In Progress',  priority:'high',     sla:'3h left',     updated:'35 min ago' },
  { id:'INC-0043', issue:'Support Ticket Spike',                 dept:'Support',    owner:'Ravi Kumar',   status:'Open',         priority:'medium',   sla:'4h left',     updated:'1h ago'     },
  { id:'INC-0042', issue:'Inventory Reorder Missed - 12 SKUs',   dept:'Inventory',  owner:'Sonal Patel',  status:'Resolved',     priority:'low',      sla:'Closed',      updated:'5h ago'     },
];

// ── Charts ────────────────────────────────────────────────────────────────────
export const hourlyTrend = [
  { t:'06:00', orders:820,  delayed:20,  tickets:18  },
  { t:'07:00', orders:1240, delayed:35,  tickets:42  },
  { t:'08:00', orders:2100, delayed:80,  tickets:95  },
  { t:'09:00', orders:3400, delayed:210, tickets:160 },
  { t:'10:00', orders:4200, delayed:380, tickets:235 },
  { t:'11:00', orders:3800, delayed:290, tickets:200 },
  { t:'12:00', orders:3200, delayed:240, tickets:175 },
];

export const weeklyOrders = [
  { day:'Mon', orders:11200, target:12000 },
  { day:'Tue', orders:12100, target:12000 },
  { day:'Wed', orders:11800, target:12000 },
  { day:'Thu', orders:13200, target:12000 },
  { day:'Fri', orders:14100, target:12000 },
  { day:'Sat', orders:15600, target:12000 },
  { day:'Sun', orders:12847, target:12000 },
];

// ── Map Nodes ─────────────────────────────────────────────────────────────────
export const mapNodes = [
  { id:'wh1', type:'warehouse', label:'Mumbai FC-01',    x:20, y:55, status:'normal',   detail:'1,240/h throughput' },
  { id:'wh2', type:'warehouse', label:'Delhi FC-01',     x:40, y:25, status:'normal',   detail:'980/h throughput' },
  { id:'wh3', type:'warehouse', label:'Ahmedabad FC-01', x:16, y:38, status:'critical', detail:'Dispatch delay — 3h' },
  { id:'wh4', type:'warehouse', label:'Bengaluru FC-01', x:38, y:74, status:'warning',  detail:'88% capacity' },
  { id:'st1', type:'store',     label:'Mumbai Stores',   x:24, y:60, status:'warning',  detail:'3 complaints' },
  { id:'st2', type:'store',     label:'Delhi Stores',    x:44, y:22, status:'normal',   detail:'All clear' },
  { id:'st3', type:'store',     label:'Blr Stores',      x:42, y:78, status:'normal',   detail:'All clear' },
  { id:'dl1', type:'delivery',  label:'Zone 4',          x:28, y:52, status:'critical', detail:'SLA breach — 38 min' },
  { id:'dl2', type:'delivery',  label:'Zone 7',          x:32, y:62, status:'critical', detail:'SLA breach — 42 min' },
  { id:'dl3', type:'delivery',  label:'Zone 2',          x:48, y:30, status:'normal',   detail:'95% on-time' },
];

// ── Integrations ──────────────────────────────────────────────────────────────
export const integrations = [
  { id:'wms',   name:'Warehouse Management',  api:'WMS API v2.3',  status:'connected', latency:'42ms',  icon:'📦', uptime:'99.8%' },
  { id:'lms',   name:'Logistics & Delivery',  api:'LMS API v1.8',  status:'connected', latency:'68ms',  icon:'🚚', uptime:'99.2%' },
  { id:'crm',   name:'Customer Support CRM',  api:'Freshdesk API', status:'connected', latency:'55ms',  icon:'🎧', uptime:'99.9%' },
  { id:'ims',   name:'Inventory Management',  api:'IMS API v3.1',  status:'warning',   latency:'210ms', icon:'🗄️', uptime:'97.1%' },
  { id:'store', name:'Store Operations POS',  api:'POS API v1.2',  status:'connected', latency:'38ms',  icon:'🏪', uptime:'99.5%' },
  { id:'bi',    name:'BI & Analytics Engine', api:'Internal API',  status:'connected', latency:'91ms',  icon:'📊', uptime:'99.7%' },
];

// ── Activity Feed ─────────────────────────────────────────────────────────────
export const activityFeed = [
  { id:1, time:'10:42', dept:'Delivery',  msg:'Zone 4 - 48 deliveries exceeded SLA threshold' },
  { id:2, time:'10:39', dept:'Warehouse', msg:'Ahmedabad FC-01 dispatch queue cleared 12 orders' },
  { id:3, time:'10:36', dept:'Support',   msg:'3 new escalations received - delivery complaints' },
  { id:4, time:'10:31', dept:'Inventory', msg:'6 SKUs auto-reorder triggered by system' },
  { id:5, time:'10:28', dept:'Store Ops', msg:'Mumbai CP store - complaint resolved' },
  { id:6, time:'10:24', dept:'Delivery',  msg:'Zone 7 - driver shortage flagged by supervisor' },
];

export const deptColors = {
  Delivery:'#4338CA', Warehouse:'#059669', Support:'#D97706',
  Inventory:'#6366F1', 'Store Ops':'#0284C7',
};
