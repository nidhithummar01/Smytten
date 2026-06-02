import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const cfg = {
  critical: { Icon: AlertCircle,   color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', label: 'Critical' },
  warning:  { Icon: AlertTriangle, color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', label: 'Warning'  },
  resolved: { Icon: CheckCircle,   color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', label: 'Resolved' },
};

const statusStyle = {
  'In Progress':   { color: '#4338CA', bg: '#EEF2FF' },
  'Investigating': { color: '#D97706', bg: '#FFFBEB' },
  'Open':          { color: '#DC2626', bg: '#FEF2F2' },
  'Resolved':      { color: '#059669', bg: '#ECFDF5' },
};

export default function AlertsPanel({ alerts, limit }) {
  const shown = limit ? alerts.slice(0, limit) : alerts;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {shown.map(a => {
        const { Icon, color, bg, border, label } = cfg[a.severity];
        const ss = statusStyle[a.status] || statusStyle['Open'];
        return (
          <div key={a.id} style={{
            background: bg,
            border: `1px solid ${border}`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Icon size={15} color={color} style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>

                {/* Top row: badge + location + time */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, color, background: `${color}20`,
                    padding: '2px 8px', borderRadius: 4,
                    textTransform: 'uppercase', letterSpacing: '0.4px', flexShrink: 0,
                  }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{a.location}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: '#475569', flexShrink: 0 }}>{a.time}</span>
                </div>

                {/* Issue description */}
                <p style={{ fontSize: 13, color: '#1E293B', fontWeight: 500, marginBottom: 10, lineHeight: 1.55 }}>
                  {a.issue}
                </p>

                {/* Meta row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#475569' }}>
                    Impact: <b style={{ color: '#0F172A', fontWeight: 600 }}>{a.impact}</b>
                  </span>
                  <span style={{ fontSize: 12, color: '#475569' }}>
                    Owner: <b style={{ color: '#0F172A', fontWeight: 600 }}>{a.owner}</b>
                  </span>
                  <span style={{
                    marginLeft: 'auto', fontSize: 11, fontWeight: 700,
                    color: ss.color, background: ss.bg,
                    padding: '3px 12px', borderRadius: 20,
                  }}>{a.status}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
