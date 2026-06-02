import { useState } from 'react';
import { mapNodes } from '../data/mockData';

const statusColor = { normal: '#059669', warning: '#D97706', critical: '#DC2626' };
const statusBg    = { normal: '#ECFDF5', warning: '#FFFBEB', critical: '#FEF2F2' };
const typeIcon    = { warehouse: '🏭', store: '🏪', delivery: '🚚' };

export default function LiveMap() {
  const [hovered, setHovered] = useState(null);
  const counts = {
    normal:   mapNodes.filter(n => n.status === 'normal').length,
    warning:  mapNodes.filter(n => n.status === 'warning').length,
    critical: mapNodes.filter(n => n.status === 'critical').length,
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow)', padding: '22px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Live Operations Map</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>India Operations Network · Real-time</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {(['normal','warning','critical']).map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[s], display: 'block' }} />
              <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'capitalize' }}>{s} ({counts[s]})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{
        position: 'relative', height: 280,
        background: 'linear-gradient(145deg, #F0F4FF 0%, #EEF2FF 50%, #F5F3FF 100%)',
        borderRadius: 'var(--radius)', overflow: 'hidden',
        border: '1px solid var(--border-l)',
      }}>
        {/* Grid */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
          {[20,40,60,80].map(v => (
            <g key={v}>
              <line x1={`${v}%`} y1="0" x2={`${v}%`} y2="100%" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="#C4B5FD" strokeWidth="1" strokeDasharray="4 4" />
            </g>
          ))}
        </svg>

        {/* India outline hint */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
          <path d="M30 8 Q47 6 58 12 L68 22 L72 38 L68 58 L56 78 L44 87 L36 80 L28 65 L22 48 L20 32 L22 18 Z" fill="#4338CA" />
        </svg>

        {/* Connection lines */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {[
            [mapNodes[0], mapNodes[7]], [mapNodes[0], mapNodes[8]],
            [mapNodes[2], mapNodes[7]], [mapNodes[1], mapNodes[9]],
          ].map(([a, b], i) => (
            <line key={i}
              x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
              stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"
            />
          ))}
        </svg>

        {/* Nodes */}
        {mapNodes.map(node => {
          const col = statusColor[node.status];
          const bg  = statusBg[node.status];
          const isH = hovered === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute', left: `${node.x}%`, top: `${node.y}%`,
                transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: isH ? 20 : 2,
              }}
            >
              {/* Pulse ring for critical */}
              {node.status !== 'normal' && (
                <div style={{
                  position: 'absolute', inset: -5, borderRadius: '50%',
                  border: `1.5px solid ${col}`,
                  animation: 'pulse-r 2s infinite', opacity: 0.4,
                }} />
              )}
              {/* Node */}
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: bg, border: `2px solid ${col}`,
                boxShadow: `0 2px 10px ${col}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
              }}>
                {typeIcon[node.type]}
              </div>

              {/* Tooltip */}
              {isH && (
                <div style={{
                  position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                  background: '#fff', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '8px 12px',
                  width: 170, zIndex: 30, boxShadow: 'var(--shadow-lg)',
                  animation: 'fadeUp 0.12s ease', pointerEvents: 'none',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: col, textTransform: 'capitalize', marginBottom: 2 }}>{node.status}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{node.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{node.detail}</div>
                </div>
              )}
            </div>
          );
        })}

        {/* City labels */}
        {[
          { name:'Mumbai', x:11, y:52 },
          { name:'Delhi',  x:34, y:18 },
          { name:'Ahmedabad', x:6, y:34 },
          { name:'Bengaluru', x:30, y:82 },
        ].map(c => (
          <div key={c.name} style={{
            position: 'absolute', left:`${c.x}%`, top:`${c.y}%`,
            fontSize: 8, color: '#4338CA50', fontWeight: 600, userSelect: 'none',
          }}>{c.name}</div>
        ))}
      </div>

      {/* Type pills */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {Object.entries(typeIcon).map(([type, icon]) => (
          <div key={type} style={{
            flex: 1, background: 'var(--bg)', border: '1px solid var(--border-l)',
            borderRadius: 8, padding: '7px 10px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 13 }}>{icon}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'capitalize' }}>{type}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
              {mapNodes.filter(n => n.type === type).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
