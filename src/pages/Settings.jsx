import { Bell, Shield, Database } from 'lucide-react';
import Button from '../components/Button';

const sections = [
  {
    icon: Bell, title: 'Notifications', color: '#4338CA',
    settings: [
      { label:'Email alerts for critical incidents', type:'toggle', value:true },
      { label:'Slack notifications',                 type:'toggle', value:true },
      { label:'SLA breach threshold (minutes)',      type:'input',  value:'30' },
      { label:'Daily summary report',                type:'toggle', value:false },
    ],
  },
  {
    icon: Shield, title: 'Security & Access', color: '#059669',
    settings: [
      { label:'Two-factor authentication',    type:'toggle', value:true },
      { label:'Session timeout (minutes)',    type:'input',  value:'60' },
      { label:'IP allowlist enforcement',     type:'toggle', value:false },
    ],
  },
  {
    icon: Database, title: 'Data & Retention', color: '#D97706',
    settings: [
      { label:'Data retention period (days)',         type:'input',  value:'90' },
      { label:'Auto-archive resolved incidents',      type:'toggle', value:true },
      { label:'Export audit logs',                    type:'toggle', value:true },
    ],
  },
];

function Toggle({ value }) {
  return (
    <div style={{
      width:40, height:22, borderRadius:11,
      background:value ? '#4338CA' : '#E2E8F0',
      position:'relative', cursor:'pointer',
      transition:'background 0.2s',
      boxShadow: value ? '0 2px 8px rgba(67,56,202,0.3)' : 'none',
      flexShrink: 0,
    }}>
      <div style={{
        position:'absolute', top:3, left:value?19:3,
        width:16, height:16, borderRadius:'50%', background:'#fff',
        transition:'left 0.2s', boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
      }}/>
    </div>
  );
}

export default function Settings() {
  return (
    <div style={{ padding:24, flex:1, overflowY:'auto', animation:'fadeUp 0.3s ease' }}>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.title} style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', overflow:'hidden' }}>
              <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border-l)', display:'flex', alignItems:'center', gap:10, background:'var(--bg)' }}>
                <div style={{ width:34, height:34, borderRadius:10, background:`${section.color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={16} color={section.color}/>
                </div>
                <span style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{section.title}</span>
              </div>
              <div style={{ padding:'16px 20px' }}>
                {section.settings.map(s => (
                  <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', gap:16 }}>
                    <span style={{ fontSize:13, color:'var(--text-2)', fontWeight:500, flex:1 }}>{s.label}</span>
                    {s.type === 'toggle'
                      ? <Toggle value={s.value}/>
                      : <input defaultValue={s.value} style={{
                          width:70, background:'var(--bg)', border:'1px solid var(--border)',
                          borderRadius:7, padding:'5px 10px', fontSize:12, color:'var(--text)',
                          textAlign:'center', outline:'none', fontFamily:'inherit',
                          cursor:'text',
                        }}/>
                    }
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Team members */}
      <div style={{ background:'#fff', borderRadius:'var(--radius-lg)', boxShadow:'var(--shadow)', padding:'22px', marginTop:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Team Members</div>
          <Button variant="primary" size="md">+ Invite Member</Button>
        </div>
        {[
          { name:'Rahul Sharma', role:'Warehouse Lead',    dept:'Warehouse', initials:'RS', active:true  },
          { name:'Priya Mehta',  role:'Logistics Manager', dept:'Delivery',  initials:'PM', active:true  },
          { name:'Amit Verma',   role:'CS Manager',        dept:'Support',   initials:'AV', active:false },
          { name:'Sonal Patel',  role:'Inventory Lead',    dept:'Inventory', initials:'SP', active:true  },
        ].map(m => (
          <div key={m.name} style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 0' }}>
            <div style={{
              width:38, height:38, borderRadius:'50%',
              background:'linear-gradient(135deg, #4338CA, #6366F1)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:13, fontWeight:700, color:'#fff', flexShrink:0,
              boxShadow:'0 2px 8px rgba(67,56,202,0.25)',
            }}>{m.initials}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'#0F172A' }}>{m.name}</div>
              <div style={{ fontSize:12, color:'#475569', marginTop:2 }}>{m.role} · {m.dept}</div>
            </div>
            <Button
              variant={m.active ? 'success' : 'ghost'}
              size="sm"
            >{m.active ? 'Active' : 'Offline'}</Button>
          </div>
        ))}
      </div>

      {/* Save button */}
      <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:20 }}>
        <Button variant="secondary" size="md">Cancel</Button>
        <Button variant="primary" size="lg">Save Settings</Button>
      </div>

    </div>
  );
}
