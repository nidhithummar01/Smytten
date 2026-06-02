import { Cpu, Lightbulb, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import Button from './Button';
import { aiInsights } from '../data/mockData';

const typeConfig = {
  'root-cause':    { icon:Cpu,        label:'Root Cause',       color:'#4338CA', bg:'#EEF2FF', border:'#C4B5FD' },
  'recommendation':{ icon:Lightbulb,  label:'Recommendation',   color:'#059669', bg:'#ECFDF5', border:'#A7F3D0' },
  'predictive':    { icon:Zap,        label:'Predictive Alert',  color:'#D97706', bg:'#FFFBEB', border:'#FDE68A' },
  'impact':        { icon:TrendingUp, label:'Business Impact',   color:'#0284C7', bg:'#F0F9FF', border:'#BAE6FD' },
};

export default function AIInsights() {
  return (
    <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:2 }}>AI-Powered Insights</div>
          <div style={{ fontSize:12, color:'var(--muted)' }}>Real-time intelligence · Updated 2 min ago</div>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:5,
          background:'linear-gradient(135deg, #EEF2FF, #F5F3FF)',
          border:'1px solid var(--secondary)', borderRadius:20, padding:'4px 12px',
        }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--primary)', animation:'pulse-r 2s infinite' }} />
          <span style={{ fontSize:11, fontWeight:600, color:'var(--primary)' }}>AI Active</span>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {aiInsights.map(insight => {
          const { icon:Icon, label, color, bg, border } = typeConfig[insight.type];
          return (
            <div key={insight.id} style={{
              background:bg, border:`1px solid ${border}`,
              borderRadius:'var(--radius)', padding:'16px',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
                <div style={{ width:26, height:26, borderRadius:8, background:`${color}20`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={14} color={color} />
                </div>
                <span style={{ fontSize:10, fontWeight:800, color, textTransform:'uppercase', letterSpacing:'0.4px' }}>{label}</span>
                <span style={{ marginLeft:'auto', fontSize:10, fontWeight:700, color, background:`${color}15`, borderRadius:20, padding:'2px 8px' }}>
                  {insight.confidence}%
                </span>
              </div>

              <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:6, lineHeight:1.45 }}>
                {insight.title}
              </div>
              <p style={{ fontSize:12, color:'#475569', lineHeight:1.65, marginBottom:10 }}>
                {insight.desc}
              </p>
              <div style={{ fontSize:11, fontWeight:600, color, background:`${color}12`, borderRadius:6, padding:'5px 10px', marginBottom:10, display:'inline-block' }}>
                Impact: {insight.impact}
              </div>

              {/* Active button with Button component */}
              <Button
                variant="primary"
                size="sm"
                fullWidth
                icon={ArrowRight}
                iconRight
                style={{ background:color, boxShadow:`0 2px 8px ${color}40` }}
              >{insight.action}</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
