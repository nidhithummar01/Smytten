import { healthScore } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function Ring({ score, size = 120, stroke = 11 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 80 ? '#059669' : score >= 65 ? '#D97706' : '#DC2626';
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        style={{ filter:`drop-shadow(0 0 6px ${color}50)`, transition:'stroke-dasharray 1.2s ease' }}
      />
    </svg>
  );
}

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const scoreColor = s => s >= 80 ? '#059669' : s >= 65 ? '#D97706' : '#DC2626';
const scoreBg    = s => s >= 80 ? '#ECFDF5' : s >= 65 ? '#FFFBEB' : '#FEF2F2';

export default function HealthScore() {
  const { score, label, departments } = healthScore;
  const color = scoreColor(score);
  return (
    <div style={{
      background: '#fff', borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow)', padding: '22px', height: '100%',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 18 }}>
        Operational Health
      </div>

      {/* Gauge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Ring score={score} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 500 }}>/100</span>
          </div>
        </div>
        <div>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700, color,
            background: scoreBg(score), borderRadius: 20, padding: '3px 10px', marginBottom: 6,
          }}>{label}</div>
          <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
            2 departments need<br/>immediate attention
          </p>
        </div>
      </div>

      {/* Dept bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {departments.map(d => {
          const c = scoreColor(d.score);
          const Icon = trendIcon[d.trend];
          return (
            <div key={d.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 600 }}>{d.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon size={12} color={c} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{d.score}</span>
                </div>
              </div>
              <div style={{ height: 5, background: 'var(--bg2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${d.score}%`,
                  background: `linear-gradient(90deg, ${c}90, ${c})`,
                  borderRadius: 3, transition: 'width 1.2s ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
