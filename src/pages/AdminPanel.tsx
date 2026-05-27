import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Landmark, DollarSign, CalendarClock, Handshake,
  Menu, X, ChevronRight
} from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminDefuntos from '@/components/admin/AdminDefuntos';
import AdminFinanceiro from '@/components/admin/AdminFinanceiro';
import AdminVelorio from '@/components/admin/AdminVelorio';
import AdminParceiros from '@/components/admin/AdminParceiros';
import AdminConcessoes from '@/components/admin/AdminConcessoes';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'defuntos', label: 'Sepultamentos', icon: Users },
  { id: 'concessoes', label: 'Concessões', icon: Landmark },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'velorio', label: 'Velório', icon: CalendarClock },
  { id: 'parceiros', label: 'Parceiros', icon: Handshake },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'defuntos': return <AdminDefuntos />;
      case 'concessoes': return <AdminConcessoes />;
      case 'financeiro': return <AdminFinanceiro />;
      case 'velorio': return <AdminVelorio />;
      case 'parceiros': return <AdminParceiros />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground text-xs font-bold">✦</span>
            </div>
            <span className="font-display text-sm font-semibold text-sidebar-foreground">Memorial Eterno</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="border-b border-border bg-card px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {tabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
