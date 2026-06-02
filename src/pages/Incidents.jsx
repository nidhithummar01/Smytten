import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/Button';
import { workflows } from '../data/mockData';

const prioColor = { critical:'#DC2626', high:'#D97706', medium:'#4338CA', low:'#059669' };
const prioBg    = { critical:'#FEF2F2', high:'#FFFBEB', medium:'#EEF2FF', low:'#ECFDF5' };
const sColor    = { 'Open':'#DC2626','In Progress':'#4338CA','Resolved':'#059669' };
const sBg       = { 'Open':'#FEF2F2','In Progress':'#EEF2FF','Resolved':'#ECFDF5' };

const summary = [
  { label:'Total',       value:6, color:'#4338CA' },
  { label:'Open',        value:2, color:'#DC2626' },
  { label:'In Progress', value:2, color:'#D97706' },
  { label:'Resolved',    value:2, color:'#059669' },
];

export default function Incidents() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Open', 'In Progress', 'Resolved'];
  const shown = filter === 'All' ? workflows : workflows.filter(w => w.status === filter);

  return (
    <div style={{ padding:24, overflowY:'auto', flex:1, animation:'fadeUp 0.3s ease' }}>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:22 }}>
        {summary.map(s => (
          <div key={s.label} style={{
            background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)',
            borderTop:`3px solid ${s.color}`, padding:'18px 20px',
          }}>
            <div style={{ fontSize:30, fontWeight:800, color:s.color, lineHeight:1, marginBottom:6 }}>{s.value}</div>
            <div style={{ fontSize:13, color:'var(--muted)', fontWeight:500 }}>{s.label} Incidents</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ display:'flex', gap:6 }}>
          {filters.map(f => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(f)}
            >{f}</Button>
          ))}
        </div>
        <Button variant="primary" size="md" icon={Plus}>New Incident</Button>
      </div>

      {/* Table */}
      <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'var(--bg)' }}>
              {['ID','Issue','Department','Owner','Priority','Status','SLA','Updated'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'12px 16px', fontSize:11, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map(w => (
              <tr key={w.id} style={{ cursor:'pointer', transition:'background 0.12s' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--bg)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{ padding:'13px 16px', fontFamily:'monospace', fontSize:12, color:'var(--muted-l)' }}>{w.id}</td>
                <td style={{ padding:'13px 16px', fontSize:13, fontWeight:600, color:'var(--text)', maxWidth:240 }}>{w.issue}</td>
                <td style={{ padding:'13px 16px', fontSize:13, color:'var(--text-2)', fontWeight:500 }}>{w.dept}</td>
                <td style={{ padding:'13px 16px', fontSize:13, color:'var(--text-2)', fontWeight:500 }}>{w.owner}</td>
                <td style={{ padding:'13px 16px' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:prioColor[w.priority], background:prioBg[w.priority], padding:'3px 10px', borderRadius:5, textTransform:'capitalize' }}>{w.priority}</span>
                </td>
                <td style={{ padding:'13px 16px' }}>
                  <span style={{ fontSize:11, fontWeight:600, color:sColor[w.status], background:sBg[w.status], padding:'3px 12px', borderRadius:20 }}>{w.status}</span>
                </td>
                <td style={{ padding:'13px 16px', fontSize:12, fontWeight:600, color:w.status==='Resolved'?'#059669':'#D97706' }}>{w.sla}</td>
                <td style={{ padding:'13px 16px', fontSize:12, color:'var(--muted)' }}>{w.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
