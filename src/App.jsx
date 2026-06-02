import { useState } from 'react';
import Sidebar      from './components/Sidebar';
import Header       from './components/Header';
import Dashboard    from './pages/Dashboard';
import Operations   from './pages/Operations';
import Incidents    from './pages/Incidents';
import AlertsPage   from './pages/Alerts';
import Analytics    from './pages/Analytics';
import Integrations from './pages/Integrations';
import SettingsPage from './pages/Settings';
import AIChatBot    from './components/AIChatBot';
import { Bot }      from 'lucide-react';
import './index.css';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [chatOpen, setChatOpen] = useState(true);

  const renderPage = () => {
    if (page === 'dashboard')    return <Dashboard />;
    if (page === 'operations')   return <Operations />;
    if (page === 'incidents')    return <Incidents />;
    if (page === 'alerts')       return <AlertsPage />;
    if (page === 'analytics')    return <Analytics />;
    if (page === 'integrations') return <Integrations />;
    if (page === 'settings')     return <SettingsPage />;
    return <Dashboard />;
  };

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg)' }}>
      <Sidebar active={page} onNav={setPage} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <Header alertCount={2} onToggleChat={() => setChatOpen(o => !o)} chatOpen={chatOpen} />
        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
          <main style={{ flex:1, overflowY:'auto', background:'var(--bg)', minWidth:0 }}>
            {renderPage()}
          </main>
          {chatOpen && (
            <AIChatBot onClose={() => setChatOpen(false)} />
          )}
        </div>
      </div>

      {/* Floating toggle button when chat is closed */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          title="Open OpsBot AI"
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 999,
            width: 52, height: 52, borderRadius: '50%', border: 'none',
            background: 'linear-gradient(135deg, #4338CA, #6366F1)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(67,56,202,0.45)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(67,56,202,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(67,56,202,0.45)'; }}
        >
          <Bot size={22} />
        </button>
      )}
    </div>
  );
}
