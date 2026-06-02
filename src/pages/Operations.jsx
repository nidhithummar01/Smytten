import LiveMap from '../components/LiveMap';
import { activityFeed, mapNodes, deptColors } from '../data/mockData';

const depts = [
  { id:'warehouse', label:'Warehouse',  color:'#4338CA', emoji:'📦', metrics:[['Throughput','1,240/h'],['Capacity','88%'],['Returns Pending','47']] },
  { id:'delivery',  label:'Delivery',   color:'#DC2626', emoji:'🚚', metrics:[['Active Routes','3,412'],['On-Time','78%'],['Avg Delay','38 min']] },
  { id:'support',   label:'Support',    color:'#D97706', emoji:'🎧', metrics:[['Open Tickets','235'],['Wait Time','12.4 min'],['Escalations','22']] },
  { id:'store',     label:'Store Ops',  color:'#059669', emoji:'🏪', metrics:[['Active Stores','94/96'],['Footfall','28,410'],['Complaints','18']] },
  { id:'inventory', label:'Inventory',  color:'#6366F1', emoji:'🗄️', metrics:[['SKUs Tracked','18,204'],['Below Reorder','42'],['Accuracy','97.3%']] },
];

const Card = ({ children, style }) => (
  <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', ...style }}>{children}</div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:16 }}>
    {children}
  </div>
);

export default function Operations() {
  return (
    <div style={{ padding:24, overflowY:'auto', flex:1, animation:'fadeUp 0.3s ease' }}>

      {/* Dept health strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 }}>
        {depts.map(d => (
          <Card key={d.id} style={{ padding:'18px', borderTop:`3px solid ${d.color}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <span style={{ fontSize:17 }}>{d.emoji}</span>
              <span style={{ fontSize:13, fontWeight:700, color:'var(--text)' }}>{d.label}</span>
            </div>
            {d.metrics.map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontSize:12, color:'var(--muted)' }}>{k}</span>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--text)' }}>{v}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>

      {/* Map */}
      <div style={{ marginBottom:20 }}>
        <LiveMap />
      </div>

      {/* Activity + Node status */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>

        {/* Activity Feed — no separators, just spacing */}
        <Card style={{ padding:'22px' }}>
          <SectionLabel>Live Activity Feed</SectionLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {activityFeed.map(item => {
              const color = deptColors[item.dept] || '#4338CA';
              return (
                <div key={item.id} style={{
                  display:'flex', gap:12, alignItems:'flex-start',
                  padding:'10px 0',
                }}>
                  <span style={{
                    fontSize:12, fontWeight:600, color:'var(--muted)',
                    fontVariantNumeric:'tabular-nums', flexShrink:0, width:42, paddingTop:1,
                  }}>{item.time}</span>
                  <span style={{
                    fontSize:11, fontWeight:700, color, background:`${color}12`,
                    padding:'3px 10px', borderRadius:20, flexShrink:0, alignSelf:'flex-start',
                  }}>{item.dept}</span>
                  <span style={{ fontSize:13, color:'var(--text)', lineHeight:1.6, fontWeight:500 }}>{item.msg}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Node status — no separator lines */}
        <Card style={{ padding:'22px' }}>
          <SectionLabel>Node Status Summary</SectionLabel>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {mapNodes.map(n => {
              const col = n.status==='normal' ? '#059669' : n.status==='warning' ? '#D97706' : '#DC2626';
              const bg  = n.status==='normal' ? '#ECFDF5' : n.status==='warning' ? '#FFFBEB' : '#FEF2F2';
              return (
                <div key={n.id} style={{
                  display:'flex', alignItems:'center', gap:10,
                  background:'var(--bg)', borderRadius:'var(--radius-sm)',
                  padding:'10px 12px',
                }}>
                  <span style={{ fontSize:15, flexShrink:0 }}>
                    {n.type==='warehouse'?'🏭':n.type==='store'?'🏪':'🚚'}
                  </span>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--text)', flex:1 }}>{n.label}</span>
                  <span style={{ fontSize:12, color:'var(--muted)', marginRight:6 }}>{n.detail}</span>
                  <span style={{
                    fontSize:11, fontWeight:700, color:col, background:bg,
                    padding:'3px 10px', borderRadius:20, textTransform:'capitalize', flexShrink:0,
                  }}>{n.status}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

    </div>
  );
}
