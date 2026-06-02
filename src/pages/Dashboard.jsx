import { TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import HealthScore  from '../components/HealthScore';
import AIInsights   from '../components/AIInsights';
import CascadeFlow  from '../components/CascadeFlow';
import AlertsPanel  from '../components/AlertsPanel';
import Button       from '../components/Button';
import { kpis, alerts, fulfillment, deliveryPerf, csatData, workflows, hourlyTrend } from '../data/mockData';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:8, padding:'9px 13px', fontSize:11, boxShadow:'var(--shadow)' }}>
      <p style={{ color:'var(--muted)', marginBottom:5 }}>{label}</p>
      {payload.map(p => <p key={p.name} style={{ color:p.color||p.fill, fontWeight:600 }}>{p.name}: {typeof p.value==='number'?p.value.toLocaleString():p.value}</p>)}
    </div>
  );
};

const Card = ({ children, style }) => (
  <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', ...style }}>{children}</div>
);

const SL = ({ children }) => (
  <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:6 }}>{children}</div>
);

const prioColor = { critical:'#DC2626', high:'#D97706', medium:'#4338CA', low:'#059669' };
const prioBg    = { critical:'#FEF2F2', high:'#FFFBEB', medium:'#EEF2FF', low:'#ECFDF5' };
const sColor    = { 'Open':'#DC2626', 'In Progress':'#4338CA', 'Resolved':'#059669' };
const sBg       = { 'Open':'#FEF2F2', 'In Progress':'#EEF2FF', 'Resolved':'#ECFDF5' };

export default function Dashboard() {
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const resolvedCount = alerts.filter(a => a.severity === 'resolved').length;

  return (
    <div style={{ padding:24, overflowY:'auto', flex:1, animation:'fadeUp 0.3s ease' }}>

      {/* ── KPIs ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14, marginBottom:22 }}>
        {kpis.map(k => {
          const good = k.id === 1 ? k.up : !k.up;
          const dc = good ? '#059669' : '#DC2626';
          const TI = k.up ? TrendingUp : TrendingDown;
          return (
            <Card key={k.id} style={{ padding:'18px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:'var(--primary-xl)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                  {k.icon}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:700, color:dc }}>
                  <TI size={11}/> {k.delta}
                </div>
              </div>
              <div style={{ fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.5px', lineHeight:1.1, marginBottom:4 }}>{k.value}</div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text-2)', marginBottom:2 }}>{k.label}</div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>{k.sub}</div>
            </Card>
          );
        })}
      </div>

      {/* ── Health + Fulfillment + Delivery + CSAT ── */}
      <div style={{ display:'grid', gridTemplateColumns:'280px 1fr 1fr', gap:14, marginBottom:22 }}>
        <HealthScore />

        <Card style={{ padding:'22px' }}>
          <SL>Order Fulfillment Status</SL>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:18 }}>Today's Breakdown</div>
          {fulfillment.map(f => (
            <div key={f.label} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, color:'var(--text-2)', fontWeight:500 }}>{f.label}</span>
                <div style={{ display:'flex', gap:8 }}>
                  <span style={{ fontSize:12, color:'var(--muted)' }}>{f.value.toLocaleString()}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:f.color }}>{f.pct}%</span>
                </div>
              </div>
              <div style={{ height:6, background:'var(--bg2)', borderRadius:4, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${f.pct}%`, background:f.color, borderRadius:4, transition:'width 1s' }} />
              </div>
            </div>
          ))}
          <ResponsiveContainer width="100%" height={90}>
            <AreaChart data={hourlyTrend}>
              <defs>
                <linearGradient id="go" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4338CA" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#4338CA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="orders" stroke="#4338CA" fill="url(#go)" strokeWidth={2} dot={false} name="Orders"/>
              <XAxis dataKey="t" hide/><YAxis hide/>
              <Tooltip content={<Tip/>}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Card style={{ padding:'18px', flex:1 }}>
            <SL>Delivery Performance</SL>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:10 }}>On-Time Rate by Zone</div>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={deliveryPerf} barSize={10}>
                <XAxis dataKey="zone" tick={{ fill:'var(--muted)', fontSize:10 }} axisLine={false} tickLine={false}/>
                <YAxis domain={[0,100]} hide/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="onTime" radius={[3,3,0,0]} name="On-Time %">
                  {deliveryPerf.map((d,i) => <Cell key={i} fill={d.onTime>=85?'#4338CA':d.onTime>=70?'#D97706':'#DC2626'}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ padding:'18px' }}>
            <SL>Customer Satisfaction</SL>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:28, fontWeight:800, color:'var(--primary)', lineHeight:1 }}>3.7</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>/ 5.0</div>
                <div style={{ fontSize:18, marginTop:3 }}>⭐</div>
              </div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>
                {csatData.map(c => (
                  <div key={c.label}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                      <span style={{ fontSize:12, color:'var(--muted)' }}>{c.label}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:c.color }}>{c.pct}%</span>
                    </div>
                    <div style={{ height:5, background:'var(--bg2)', borderRadius:3 }}>
                      <div style={{ height:'100%', width:`${c.pct}%`, background:c.color, borderRadius:3 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── AI Insights ── */}
      <div style={{ marginBottom:22 }}>
        <AIInsights />
      </div>

      {/* ── Cascade + Alerts ── */}
      <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', gap:14, marginBottom:22 }}>
        <CascadeFlow />

        <Card style={{ padding:'22px', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <div>
              <SL>Live Alerts Center</SL>
              <div style={{ display:'flex', gap:8, marginTop:6 }}>
                {[
                  { label:`${criticalCount} Critical`, color:'#DC2626', bg:'#FEF2F2' },
                  { label:`${alerts.filter(a=>a.severity==='warning').length} Warnings`, color:'#D97706', bg:'#FFFBEB' },
                  { label:`${resolvedCount} Resolved`, color:'#059669', bg:'#ECFDF5' },
                ].map(b => (
                  <span key={b.label} style={{
                    fontSize:11, fontWeight:700, color:b.color, background:b.bg,
                    borderRadius:20, padding:'3px 10px',
                  }}>{b.label}</span>
                ))}
              </div>
            </div>
            <Button variant="secondary" size="sm">View All</Button>
          </div>
          <div style={{ flex:1, overflowY:'auto' }}>
            <AlertsPanel alerts={alerts} />
          </div>
        </Card>
      </div>

      {/* ── Workflow Table ── */}
      <Card style={{ padding:'22px', marginBottom:22 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div>
            <SL>Workflow Ownership Tracking</SL>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginTop:3 }}>Active Incidents & Assignments</div>
          </div>
          <Button variant="primary" size="md">+ New Incident</Button>
        </div>

        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'var(--bg)' }}>
                {['ID','Issue','Department','Owner','Priority','Status','SLA','Updated'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 16px', fontSize:11, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workflows.map(w => {
                const pc = prioColor[w.priority]; const pb = prioBg[w.priority];
                const sc = sColor[w.status];     const sb = sBg[w.status];
                return (
                  <tr key={w.id} style={{ cursor:'pointer', transition:'background 0.12s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{ padding:'12px 16px', fontFamily:'monospace', fontSize:12, color:'var(--muted-l)' }}>{w.id}</td>
                    <td style={{ padding:'12px 16px', fontSize:13, fontWeight:600, color:'var(--text)', maxWidth:240 }}>{w.issue}</td>
                    <td style={{ padding:'12px 16px', fontSize:12, color:'var(--muted)', fontWeight:500 }}>{w.dept}</td>
                    <td style={{ padding:'12px 16px', fontSize:13, color:'var(--text-2)', fontWeight:500 }}>{w.owner}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ fontSize:11, fontWeight:700, color:pc, background:pb, padding:'3px 10px', borderRadius:5, textTransform:'capitalize' }}>{w.priority}</span>
                    </td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ fontSize:11, fontWeight:600, color:sc, background:sb, padding:'3px 12px', borderRadius:20 }}>{w.status}</span>
                    </td>
                    <td style={{ padding:'12px 16px', fontSize:12, fontWeight:600, color:w.status==='Resolved'?'#059669':'#D97706', whiteSpace:'nowrap' }}>{w.sla}</td>
                    <td style={{ padding:'12px 16px', fontSize:12, color:'var(--muted)', whiteSpace:'nowrap' }}>{w.updated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Leadership bar ── */}
      <div style={{
        background:'linear-gradient(135deg, #4338CA 0%, #6366F1 100%)',
        borderRadius:'var(--radius-lg)', padding:'20px 28px',
        display:'flex', gap:40, alignItems:'center',
        boxShadow:'0 4px 20px rgba(67,56,202,0.25)',
      }}>
        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:4 }}>Leadership View</div>
          <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Today's Summary</div>
        </div>
        <div style={{ width:1, height:40, background:'rgba(255,255,255,0.15)', flexShrink:0 }}/>
        {[
          { label:'Revenue at Risk', value:'₹4.2L' },
          { label:'SLA Breaches',    value:'2' },
          { label:'Delayed Orders',  value:'1,120' },
          { label:'CSAT Score',      value:'3.7/5' },
          { label:'Ops Health',      value:'71/100' },
          { label:'Resolved Today',  value:'14' },
        ].map(item => (
          <div key={item.label} style={{ textAlign:'center' }}>
            <div style={{ fontSize:20, fontWeight:800, color:'#fff', letterSpacing:'-0.3px' }}>{item.value}</div>
            <div style={{ fontSize:10, fontWeight:600, color:'rgba(255,255,255,0.7)', marginTop:2 }}>{item.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
