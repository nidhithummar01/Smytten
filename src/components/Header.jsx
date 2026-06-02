import { Search, Bell, RefreshCw, ChevronDown, Bot } from 'lucide-react';
import Button from './Button';

export default function Header({ alertCount = 2, onToggleChat, chatOpen }) {
  return (
    <header style={{
      height: 60,
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 12,
      flexShrink: 0,
    }}>
      {/* Title */}
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px' }}>
          Operations Intelligence Platform
        </span>
        <span style={{
          marginLeft: 10, fontSize: 10, fontWeight: 700, color: 'var(--primary)',
          background: 'var(--primary-xl)', border: '1px solid var(--secondary)',
          borderRadius: 20, padding: '2px 9px',
        }}>LIVE</span>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '6px 12px', width: 220,
      }}>
        <Search size={13} color="var(--muted-l)" />
        <input
          placeholder="Search incidents, alerts..."
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: 'var(--text)', fontSize: 12, width: '100%',
          }}
        />
      </div>

      {/* AI Chat Toggle */}
      <button
        onClick={onToggleChat}
        title={chatOpen ? 'Close OpsBot' : 'Open OpsBot AI'}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 13px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: chatOpen ? 'linear-gradient(135deg, #4338CA, #6366F1)' : 'var(--primary-xl)',
          color: chatOpen ? '#fff' : '#4338CA',
          fontSize: 12, fontWeight: 600,
          boxShadow: chatOpen ? '0 2px 10px rgba(67,56,202,0.3)' : 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (!chatOpen) { e.currentTarget.style.background = '#E0E7FF'; } }}
        onMouseLeave={e => { if (!chatOpen) { e.currentTarget.style.background = 'var(--primary-xl)'; } }}
      >
        <Bot size={13} />
        OpsBot
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: chatOpen ? '#4ADE80' : '#94A3B8',
          animation: chatOpen ? 'pulse-r 2s infinite' : 'none',
          flexShrink: 0,
        }} />
      </button>

      {/* Refresh */}
      <Button variant="icon" size="sm" title="Refresh data" icon={RefreshCw} style={{ padding:'7px 9px' }} />

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <Button variant="icon" size="sm" title="Notifications" icon={Bell} style={{ padding:'7px 9px' }} />
        {alertCount > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            background: 'var(--danger)', color: '#fff',
            borderRadius: '50%', width: 16, height: 16,
            fontSize: 9, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff', pointerEvents: 'none',
          }}>{alertCount}</span>
        )}
      </div>

      <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

      {/* User */}
      <Button variant="ghost" size="sm" style={{ gap: 8, padding:'4px 8px' }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, #4338CA, #6366F1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff',
          boxShadow: '0 2px 8px rgba(67,56,202,0.3)',
          flexShrink: 0,
        }}>OD</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>Ops Director</div>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 400 }}>Admin</div>
        </div>
        <ChevronDown size={12} color="var(--muted-l)" />
      </Button>
    </header>
  );
}
