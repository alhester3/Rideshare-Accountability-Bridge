import { AlertTriangle, CircleDollarSign, Eye, Gauge, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const badge = (status) => status.includes("Pending") || status.includes("Missed") ? "bg-amber-100 text-amber-700 animate-pulseSoft" : status.includes("Resolved") || status.includes("Completed") ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700";

function RiderView() {
  const { ridesAndTrips } = useAppContext();
  const rides = ridesAndTrips.filter((r) => r.id.startsWith("ride-")).slice(0, 5);
  const hasSurge = rides.some((r) => r.surge);
  return <div className="space-y-4">{hasSurge && <div className="rounded-2xl p-4 bg-amber-100 text-amber-800 flex gap-2"><AlertTriangle size={18} /> Surge pricing detected in recent rides.</div>}<div className="grid gap-3">{rides.map((ride) => <div key={ride.id} className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between"><div><div className="font-semibold">{ride.id} · {ride.date}</div><div className="text-sm text-slate-500">${ride.price.toFixed(2)} · {ride.location}</div></div><div className="flex items-center gap-3"><span className={`px-3 py-1 rounded-full text-xs ${badge(ride.status)}`}>{ride.status}</span><Link className="px-3 py-2 rounded-xl bg-electric text-white text-sm inline-flex gap-1" to={`/explanation/${ride.decisionId}`}><Eye size={14} /> View Explanation</Link></div></div>)}</div><Link to="/appeals" className="inline-flex gap-2 items-center px-4 py-2 rounded-xl bg-slate-900 text-white"><SearchCheck size={16} /> Submit an Appeal</Link></div>;
}

function DriverView() {
  const { ridesAndTrips, users } = useAppContext();
  const alex = users.find((u) => u.name === "Alex");
  const trips = ridesAndTrips.filter((t) => t.id.startsWith("trip-") && t.userId === alex.id).slice(0, 5);
  const completed = trips.filter((t) => t.status === "Completed").length;
  const avgEarnings = trips.reduce((acc, t) => acc + t.earnings, 0) / trips.length;
  const fairnessScore = Math.min(100, Math.round(((alex.rating / 5) * 50) + (completed / trips.length) * 30 + (avgEarnings / 35) * 20));
  return <div className="space-y-4"><div className="grid md:grid-cols-2 gap-4"><div className="glass-card rounded-2xl p-4"><div className="font-semibold flex items-center gap-2"><Gauge size={16} /> Personal Fairness Score</div><div className="mt-3 h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all" style={{ width: `${fairnessScore}%` }} /></div><div className="mt-2 text-sm">{fairnessScore}/100</div></div><div className="glass-card rounded-2xl p-4"><div className="font-semibold flex items-center gap-2"><CircleDollarSign size={16} /> Earnings Summary</div><div className="mt-2 text-sm">This week: <b>$422</b> · Last week: <b>$395</b></div></div></div><div className="grid gap-3">{trips.map((trip) => <div key={trip.id} className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between"><div><div className="font-semibold">{trip.id} · {trip.date}</div><div className="text-sm text-slate-500">${trip.earnings.toFixed(2)} · {trip.distance} mi</div></div><div className="flex items-center gap-2"><span className={`px-3 py-1 rounded-full text-xs ${badge(trip.status)}`}>{trip.status}</span><Link className="px-3 py-2 rounded-xl bg-electric text-white text-sm inline-flex gap-1" to={`/explanation/${trip.decisionId}`}><Eye size={14} /> View Explanation</Link><Link to={`/explanation/${trip.decisionId}?whyNotMe=true`} className="px-3 py-2 rounded-xl border border-slate-300 text-sm">Why Not Me?</Link></div></div>)}</div></div>;
}

function PartnerView() {
  const { ridesAndTrips } = useAppContext();
  const orders = ridesAndTrips.filter((o) => o.id.startsWith("ord-")).slice(0, 5);
  return <div className="space-y-3">{orders.map((order) => <div key={order.id} className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between"><div><div className="font-semibold">{order.id}</div><div className="text-sm text-slate-500">ETA: {order.eta} · {order.status}</div></div><div className="flex gap-2"><span className={`px-3 py-1 rounded-full text-xs ${badge(order.priority)}`}>{order.priority}</span><Link className="px-3 py-2 rounded-xl bg-electric text-white text-sm" to={`/appeals?decisionId=${order.decisionId}&type=restaurant`}>Request Review</Link></div></div>)}</div>;
}

function AdminView() {
  const { appeals, decisions, auditEntries } = useAppContext();
  const kpis = [
    { label: "Total Appeals This Week", value: appeals.length },
    { label: "Average Resolution Time", value: "2.3 days" },
    { label: "Fairness Score", value: "91/100" },
    { label: "Active Audit Flags", value: auditEntries.filter((a) => a.status === "Flagged").length }
  ];
  return <div className="space-y-4"> <div className="grid md:grid-cols-4 gap-3">{kpis.map((kpi) => <div key={kpi.label} className="admin-glass rounded-2xl p-4 hover:shadow-glow transition"><div className="text-sm text-slate-400">{kpi.label}</div><div className="text-2xl font-bold mt-1">{kpi.value}</div></div>)}</div><div className="admin-glass rounded-2xl p-4"><div className="flex flex-wrap gap-3"><Link to="/audit" className="px-4 py-2 rounded-xl bg-electric text-white">Audit Log</Link><Link to="/appeals" className="px-4 py-2 rounded-xl bg-slate-700 text-slate-100">Appeal Queue</Link><Link to="/analytics" className="px-4 py-2 rounded-xl bg-slate-700 text-slate-100">Fairness Monitor</Link></div><div className="mt-4 space-y-2">{decisions.slice(0, 5).map((d) => <div key={d.id} className="text-sm border-b border-slate-700 pb-2">{d.id} · {d.type} · {d.outcome}</div>)}</div></div></div>;
}

export default function DashboardPage() {
  const { activeRole } = useAppContext();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Role Dashboard</h1>
      {activeRole === "Rider/Customer" && <RiderView />}
      {activeRole === "Driver/Courier" && <DriverView />}
      {activeRole === "Restaurant Partner" && <PartnerView />}
      {activeRole === "Corporate/Admin" && <AdminView />}
    </div>
  );
}
