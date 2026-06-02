import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell } from 'recharts';
import { weeklyOrders, hourlyTrend, deliveryPerf, healthScore, cascade } from '../data/mockData';
import { ArrowDown } from 'lucide-react';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:8, padding:'9px 13px', fontSize:11, boxShadow:'var(--shadow)' }}>
      <p style={{ color:'var(--muted)', marginBottom:5 }}>{label}</p>
      {payload.map(p => <p key={p.name} style={{ color:p.color||p.fill||'var(--primary)', fontWeight:600 }}>{p.name}: {typeof p.value==='number'?p.value.toLocaleString():p.value}</p>)}
    </div>
  );
};

const Card = ({ title, sub, children }) => (
  <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px' }}>
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:3 }}>{title}</div>
      {sub && <div style={{ fontSize:12, color:'var(--muted)' }}>{sub}</div>}
    </div>
    {children}
  </div>
);

export default function Analytics() {
  const radarData = healthScore.departments.map(d => ({ subject:d.name.slice(0,5), score:d.score }));
  const scoreColor = s => s >= 80 ? '#059669' : s >= 65 ? '#D97706' : '#DC2626';

  return (
    <div style={{ padding:24, overflowY:'auto', flex:1, animation:'fadeUp 0.3s ease' }}>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>

        <Card title="Weekly Orders vs Target" sub="Daily orders against 12K target">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyOrders}>
              <defs>
                <linearGradient id="go" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4338CA" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4338CA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-l)" vertical={false}/>
              <XAxis dataKey="day" tick={{ fill:'var(--muted)', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'var(--muted)', fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Area type="monotone" dataKey="orders" stroke="#4338CA" fill="url(#go)" strokeWidth={2} dot={false} name="Orders"/>
              <Area type="monotone" dataKey="target" stroke="#C4B5FD" fill="none" strokeWidth={2} strokeDasharray="6 3" dot={false} name="Target"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Department Performance Radar" sub="Health score by department">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border-l)"/>
              <PolarAngleAxis dataKey="subject" tick={{ fill:'var(--muted)', fontSize:11 }}/>
              <Radar name="Score" dataKey="score" stroke="#4338CA" fill="#4338CA" fillOpacity={0.12} strokeWidth={2}/>
              <Tooltip content={<Tip/>}/>
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Hourly Trends — Orders, Delays, Tickets">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyTrend}>
              <defs>
                {[['orders','#4338CA'],['delayed','#DC2626'],['tickets','#D97706']].map(([k,c]) => (
                  <linearGradient key={k} id={`g${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-l)" vertical={false}/>
              <XAxis dataKey="t" tick={{ fill:'var(--muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'var(--muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Area type="monotone" dataKey="orders"  stroke="#4338CA" fill="url(#gorders)"  strokeWidth={2} dot={false} name="Orders"/>
              <Area type="monotone" dataKey="delayed" stroke="#DC2626" fill="url(#gdelayed)" strokeWidth={2} dot={false} name="Delayed"/>
              <Area type="monotone" dataKey="tickets" stroke="#D97706" fill="url(#gtickets)" strokeWidth={2} dot={false} name="Tickets"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Zone Delivery Performance" sub="On-time rate % by zone">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deliveryPerf} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-l)" vertical={false}/>
              <XAxis dataKey="zone" tick={{ fill:'var(--muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis domain={[0,100]} tick={{ fill:'var(--muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="onTime" radius={[4,4,0,0]} name="On-Time %">
                {deliveryPerf.map((d,i) => <Cell key={i} fill={d.onTime>=85?'#4338CA':d.onTime>=70?'#D97706':'#DC2626'}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Dept health */}
      <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:20 }}>Department Health Scores</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14 }}>
          {healthScore.departments.map(d => {
            const c = scoreColor(d.score);
            return (
              <div key={d.name} style={{ textAlign:'center' }}>
                <div style={{ fontSize:32, fontWeight:800, color:c, lineHeight:1, marginBottom:8 }}>{d.score}</div>
                <div style={{ height:6, background:'var(--bg2)', borderRadius:3, overflow:'hidden', marginBottom:8 }}>
                  <div style={{ height:'100%', width:`${d.score}%`, background:c, borderRadius:3 }}/>
                </div>
                <div style={{ fontSize:11, fontWeight:600, color:'var(--text-2)' }}>{d.name}</div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
