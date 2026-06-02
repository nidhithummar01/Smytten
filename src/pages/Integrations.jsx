import { integrations } from '../data/mockData';
import { CheckCircle, AlertTriangle, RefreshCw, Plus } from 'lucide-react';
import Button from '../components/Button';

const sCfg = {
  connected: { Icon:CheckCircle,   color:'#059669', bg:'#ECFDF5', border:'#A7F3D0', label:'Connected' },
  warning:   { Icon:AlertTriangle, color:'#D97706', bg:'#FFFBEB', border:'#FDE68A', label:'High Latency' },
};

export default function Integrations() {
  const connected = integrations.filter(i => i.status === 'connected').length;

  return (
    <div style={{ padding:24, flex:1, overflowY:'auto', animation:'fadeUp 0.3s ease' }}>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {[
          { label:'Total Integrations', value:integrations.length, color:'#4338CA' },
          { label:'Connected',          value:connected,           color:'#059669' },
          { label:'Warnings',           value:integrations.length-connected, color:'#D97706' },
        ].map(s => (
          <div key={s.label} style={{
            background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)',
            borderTop:`3px solid ${s.color}`, padding:'18px 22px',
          }}>
            <div style={{ fontSize:30, fontWeight:800, color:s.color, lineHeight:1, marginBottom:6 }}>{s.value}</div>
            <div style={{ fontSize:13, color:'var(--muted)', fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px' }}>API Integrations</div>
        <Button variant="primary" size="md" icon={Plus}>Add Integration</Button>
      </div>

      {/* Integration cards */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
        {integrations.map(intg => {
          const s = sCfg[intg.status];
          const Icon = s.Icon;
          return (
            <div key={intg.id} style={{
              background:'#fff', border:'1px solid var(--border-l)',
              borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow-sm)',
              padding:'20px', display:'flex', alignItems:'flex-start', gap:14,
              transition:'box-shadow 0.18s, transform 0.15s',
              cursor:'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow-lg)'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--shadow-sm)'; e.currentTarget.style.transform='none'; }}>
              <div style={{
                width:44, height:44, borderRadius:12, background:'var(--bg)',
                border:'1px solid var(--border-l)', display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:22, flexShrink:0,
              }}>{intg.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:2 }}>{intg.name}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginBottom:12 }}>{intg.api}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
                  <div style={{
                    display:'flex', alignItems:'center', gap:5,
                    background:s.bg, border:`1px solid ${s.border}`,
                    borderRadius:20, padding:'3px 10px',
                  }}>
                    <Icon size={11} color={s.color}/>
                    <span style={{ fontSize:11, fontWeight:700, color:s.color }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize:12, color:'var(--muted)' }}>
                    Latency: <b style={{ color:intg.status==='warning'?'#D97706':'var(--text-2)' }}>{intg.latency}</b>
                  </span>
                  <span style={{ fontSize:12, color:'var(--muted)' }}>
                    Uptime: <b style={{ color:'#059669' }}>{intg.uptime}</b>
                  </span>
                </div>
              </div>
              <Button variant="icon" size="sm" icon={RefreshCw} title="Sync now" style={{ padding:'7px 8px', flexShrink:0 }} />
            </div>
          );
        })}
      </div>

      {/* Settings panel */}
      <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:18 }}>General Settings</div>
        {[
          { label:'Auto-refresh interval',        value:'5 seconds' },
          { label:'Alert notification channel',   value:'Slack + Email' },
          { label:'SLA breach threshold',         value:'30 minutes' },
          { label:'Correlation confidence level', value:'85%' },
          { label:'Data retention period',        value:'90 days' },
        ].map(s => (
          <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 0' }}>
            <div style={{ fontSize:13, color:'var(--text-2)', fontWeight:500 }}>{s.label}</div>
            <Button variant="secondary" size="sm">{s.value}</Button>
          </div>
        ))}
      </div>

    </div>
  );
}
