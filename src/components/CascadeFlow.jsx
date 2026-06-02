import { ArrowDown, AlertTriangle, Sparkles } from 'lucide-react';
import Button from './Button';
import { cascade } from '../data/mockData';

export default function CascadeFlow() {
  const { rootCause, steps, confidence } = cascade;

  return (
    <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px', height:'100%' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.6px', marginBottom:4 }}>Issue Correlation</div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <Sparkles size={14} color="var(--primary)" />
            <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Cascade Detected</span>
          </div>
        </div>
        <div style={{
          fontSize:11, fontWeight:700, color:'#059669',
          background:'#ECFDF5', border:'1px solid #A7F3D0',
          borderRadius:20, padding:'4px 12px',
        }}>{confidence}% confidence</div>
      </div>

      {/* Root Cause */}
      <div style={{
        background:'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
        border:'2px solid var(--secondary)', borderRadius:'var(--radius)',
        padding:'12px 14px', marginBottom:18,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:4 }}>
          <AlertTriangle size={13} color="#DC2626" />
          <span style={{ fontSize:10, fontWeight:800, color:'#DC2626', textTransform:'uppercase', letterSpacing:'0.5px' }}>Root Cause Identified</span>
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:'var(--primary)' }}>{rootCause.label}</div>
        <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{rootCause.detail}</div>
      </div>

      {/* Chain */}
      <div style={{ display:'flex', flexDirection:'column' }}>
        {steps.map((step, i) => (
          <div key={step.id}>
            <div style={{
              display:'flex', alignItems:'center', gap:12,
              background:'var(--bg)', border:'1px solid var(--border-l)',
              borderRadius:'var(--radius-sm)', padding:'10px 12px',
            }}>
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0,
                background:`${step.color}15`, border:`1px solid ${step.color}30`,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:16,
              }}>{step.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:2 }}>{step.label}</div>
                <div style={{ fontSize:12, color:'#475569' }}>{step.dept}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:800, color:step.color, background:`${step.color}12`, borderRadius:8, padding:'4px 10px', textAlign:'center' }}>
                {step.metric}
                {step.count && <div style={{ fontSize:9, fontWeight:500, color:'var(--muted)', marginTop:1 }}>{step.count.toLocaleString()} affected</div>}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ display:'flex', justifyContent:'center', padding:'4px 0' }}>
                <div style={{
                  width:22, height:22, borderRadius:'50%',
                  background:'var(--primary-xl)', border:'1px solid var(--secondary)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <ArrowDown size={11} color="var(--primary)" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display:'flex', gap:8, marginTop:16 }}>
        <Button variant="primary" size="md" fullWidth>Create Incident</Button>
        <Button variant="secondary" size="md" fullWidth>Assign Team</Button>
      </div>
    </div>
  );
}
