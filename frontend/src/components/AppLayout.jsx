import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, FileSearch, Gavel, Home, LayoutDashboard, Menu, Moon, Scale, Shield, ShieldCheck, Sun, Users } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/explanation/dec-1002", label: "Explanation", icon: FileSearch },
  { to: "/fairness", label: "Fairness", icon: Scale },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/appeals", label: "Appeals", icon: Gavel }
];

const adminLinks = [
  ...navItems,
  { to: "/audit", label: "Audit", icon: ShieldCheck },
  { to: "/users", label: "Users", icon: Users }
];

function RoleSwitcher() {
  const { activeRole, roles, setActiveRole } = useAppContext();
  const activeIndex = Math.max(0, roles.findIndex((r) => r === activeRole));

  return (
    <div className="relative rounded-full bg-slate-200/70 p-1 flex gap-1 min-w-[320px]">
      <div className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300" style={{ left: `calc(${activeIndex} * 25% + 4px)`, width: "calc(25% - 8px)" }} />
      {roles.map((role) => (
        <button key={role} onClick={() => setActiveRole(role)} className={`relative z-10 flex-1 px-2 py-1.5 text-xs rounded-full transition ${activeRole === role ? "text-white" : "text-slate-700"}`}>
          {role.split("/")[0]}
        </button>
      ))}
    </div>
  );
}

export default function AppLayout({ children }) {
  const { activeRole, themeMode, toggleThemeMode, isLoading, apiError } = useAppContext();
  const isAdmin = activeRole === "Corporate/Admin";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen page-fade">
      <div className="animated-topbar" />
      {!isAdmin && (
        <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur-xl">
          <div className="page-shell py-4 flex items-center justify-between gap-4">
            <div className="text-xl font-bold gradient-headline inline-flex items-center gap-2"><Shield size={18} /> Accountability Bridge</div>
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={({ isActive }) => `text-sm pb-1 inline-flex items-center gap-1 border-b-2 ${isActive ? "border-blue-500 text-slate-900" : "border-transparent text-slate-600 hover:text-slate-900"}`}>
                  <Icon size={14} /> {label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button className="secondary-btn inline-flex items-center gap-2" onClick={toggleThemeMode}>{themeMode === "light" ? <Moon size={16} /> : <Sun size={16} />} {themeMode === "light" ? "Dark" : "Light"}</button>
              <RoleSwitcher />
            </div>
          </div>
        </header>
      )}

      {isAdmin ? (
        <div className="flex min-h-[calc(100vh-4px)]">
          <aside className={`border-r border-slate-700 bg-[#0F172A] text-slate-100 transition-all ${sidebarCollapsed ? "w-20" : "w-72"}`}>
            <div className="p-4 flex items-center justify-between border-b border-slate-700">
              {!sidebarCollapsed && <div className="font-semibold">Admin Console</div>}
              <button onClick={() => setSidebarCollapsed((v) => !v)} className="p-2 rounded-lg hover:bg-slate-800"><Menu size={16} /></button>
            </div>
            <div className="p-3 space-y-1">
              {adminLinks.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl border-l-2 ${isActive ? "border-blue-500 bg-slate-800" : "border-transparent hover:bg-slate-800/70"}`}>
                  <Icon size={16} /> {!sidebarCollapsed && label}
                </NavLink>
              ))}
            </div>
          </aside>
          <div className="flex-1 bg-[#0F172A] text-slate-100">
            <header className="sticky top-0 z-20 border-b border-slate-700 bg-[#0F172A]/85 backdrop-blur-xl">
              <div className="page-shell py-3 flex items-center justify-between">
                <div className="text-lg font-semibold">Corporate / Admin</div>
                <div className="flex items-center gap-2">
                  <button className="secondary-btn inline-flex items-center gap-2" onClick={toggleThemeMode}>{themeMode === "light" ? <Moon size={16} /> : <Sun size={16} />} {themeMode === "light" ? "Dark" : "Light"}</button>
                  <RoleSwitcher />
                </div>
              </div>
            </header>
            <main className="page-shell py-6">
              {isLoading && <div className="surface-card p-3 mb-3 text-sm">Loading live data...</div>}
              {apiError && <div className="surface-card p-3 mb-3 text-sm border-amber-300 bg-amber-50 text-amber-800">{apiError}</div>}
              {children}
            </main>
          </div>
        </div>
      ) : (
        <main className="page-shell py-6">
          {isLoading && <div className="surface-card p-3 mb-3 text-sm">Loading live data...</div>}
          {apiError && <div className="surface-card p-3 mb-3 text-sm border-amber-300 bg-amber-50 text-amber-800">{apiError}</div>}
          {children}
        </main>
      )}
    </div>
  );
}
