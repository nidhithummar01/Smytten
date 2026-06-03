import { useEffect, useRef, useState } from 'react';
import { Search, Bell, RefreshCw, ChevronDown, Settings, LogOut } from 'lucide-react';
import Button from './Button';

export default function Header({ alertCount = 0, onAlertsClick, onSettingsClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!profileOpen) return undefined;

    const closeOnOutsideClick = event => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [profileOpen]);

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

      {/* Refresh */}
      <Button variant="icon" size="sm" title="Refresh data" icon={RefreshCw} style={{ padding:'7px 9px' }} />

      {/* Notifications */}
      <div ref={profileRef} style={{ position: 'relative' }}>
        <Button
          variant="icon"
          size="sm"
          title="Open alerts"
          icon={Bell}
          onClick={onAlertsClick}
          style={{ padding:'7px 9px' }}
        />
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
      <div style={{ position: 'relative' }}>
        <Button
          variant="ghost"
          size="sm"
          title="Open profile menu"
          onClick={() => setProfileOpen(open => !open)}
          style={{
            gap: 8,
            padding:'4px 8px',
            background: profileOpen ? '#EEF2FF' : undefined,
            borderColor: profileOpen ? '#C7D2FE' : undefined,
          }}
        >
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
          <ChevronDown
            size={12}
            color="var(--muted-l)"
            style={{ transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
          />
        </Button>

        {profileOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: 220,
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 12,
            boxShadow: '0 16px 40px rgba(15,23,42,0.16)',
            padding: 10,
            zIndex: 20,
          }}>
            <div style={{ padding: '8px 10px 10px', borderBottom: '1px solid var(--border-l)', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Ops Director</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Admin access active</div>
            </div>

            <button
              onClick={() => {
                setProfileOpen(false);
                onSettingsClick?.();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 10px',
                border: 'none',
                borderRadius: 8,
                background: 'transparent',
                color: '#334155',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              <Settings size={14} />
              Account settings
            </button>

            <button
              onClick={() => setProfileOpen(false)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 10px',
                border: 'none',
                borderRadius: 8,
                background: 'transparent',
                color: '#DC2626',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
