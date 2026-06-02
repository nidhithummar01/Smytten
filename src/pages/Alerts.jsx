import AlertsPanel from '../components/AlertsPanel';
import Button from '../components/Button';
import { alerts } from '../data/mockData';
import { AlertCircle, AlertTriangle, CheckCircle, Bell } from 'lucide-react';

const stats = [
  { label:'Critical',       value:2,        Icon:AlertCircle,   color:'#DC2626', bg:'#FEF2F2' },
  { label:'Warnings',       value:2,        Icon:AlertTriangle, color:'#D97706', bg:'#FFFBEB' },
  { label:'Resolved Today', value:14,       Icon:CheckCircle,   color:'#059669', bg:'#ECFDF5' },
  { label:'Avg Resolution', value:'38 min', Icon:Bell,          color:'#4338CA', bg:'#EEF2FF' },
];

export default function AlertsPage() {
  return (
    <div style={{ padding:24, flex:1, overflowY:'auto', animation:'fadeUp 0.3s ease' }}>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {stats.map(s => {
          const Icon = s.Icon;
          return (
            <div key={s.label} style={{
              background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)',
              padding:'18px 20px', display:'flex', alignItems:'center', gap:14,
            }}>
              <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={20} color={s.color}/>
              </div>
              <div>
                <div style={{ fontSize:26, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px' }}>All Alerts</div>
          <div style={{ display:'flex', gap:8 }}>
            <Button variant="secondary" size="sm">Filter</Button>
            <Button variant="primary" size="sm">Mark All Read</Button>
          </div>
        </div>
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
}
