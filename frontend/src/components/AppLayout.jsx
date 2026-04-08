import { NavLink } from "react-router-dom";
import { BarChart3, FileSearch, Gavel, Home, LayoutDashboard, Scale, ShieldCheck, Users } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/explanation/dec-1002", label: "Explanation", icon: FileSearch },
  { to: "/fairness", label: "Fairness", icon: Scale },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/appeals", label: "Appeals", icon: Gavel }
];

function RoleSwitcher() {
  const { activeRole, roles, setActiveRole } = useAppContext();
  return (
    <div className="rounded-full bg-slate-200/70 p-1 flex gap-1">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => setActiveRole(role)}
          className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition ${activeRole === role ? "bg-electric text-white shadow-soft" : "text-slate-600 hover:bg-white"}`}
        >
          {role.split("/")[0]}
        </button>
      ))}
    </div>
  );
}

export default function AppLayout({ children }) {
  const { activeRole } = useAppContext();
  const isAdmin = activeRole === "Corporate/Admin";

  return (
    <div className={`min-h-screen ${isAdmin ? "bg-navy text-slate-100" : "bg-riderbg text-slate-900"}`}>
      <nav className={`sticky top-0 z-20 backdrop-blur border-b ${isAdmin ? "bg-slate-900/80 border-slate-700" : "bg-white/90 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <div className="font-bold text-lg">The Accountability Bridge</div>
          <div className="flex flex-wrap items-center gap-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `px-3 py-2 rounded-xl text-sm flex items-center gap-1 transition ${isActive ? "bg-electric text-white" : isAdmin ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"}`}
              >
                <Icon size={16} /> {label}
              </NavLink>
            ))}
            {isAdmin && (
              <>
                <NavLink to="/audit" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm flex items-center gap-1 ${isActive ? "bg-electric text-white" : "text-slate-300 hover:bg-slate-800"}`}><ShieldCheck size={16} /> Audit Log</NavLink>
                <NavLink to="/users" className={({ isActive }) => `px-3 py-2 rounded-xl text-sm flex items-center gap-1 ${isActive ? "bg-electric text-white" : "text-slate-300 hover:bg-slate-800"}`}><Users size={16} /> Users</NavLink>
              </>
            )}
          </div>
          <RoleSwitcher />
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
