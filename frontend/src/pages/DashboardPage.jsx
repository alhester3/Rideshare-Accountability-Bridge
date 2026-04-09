import { useMemo, useState } from "react";
import { AlertTriangle, ArrowUpRight, ChevronDown, ChevronUp, CircleHelp, Clock3, Eye, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppContext } from "../context/AppContext";

const statusBadgeClass = (status) => {
  if (status.includes("Pending") || status.includes("Missed")) return "badge-pending";
  if (status.includes("Resolved") || status.includes("Completed") || status.includes("Delivered")) return "badge-resolved";
  return "badge-review";
};

function RiderDashboard() {
  const { ridesAndTrips, users } = useAppContext();
  const rider = users.find((u) => u.name.includes("Emily")) ?? users.find((u) => u.role === "Rider/Customer");
  const rides = ridesAndTrips.filter((r) => r.userId === rider?.id).slice(0, 5);
  const latestRide = rides[0];
  const trustScore = 82;

  return (
    <div className="space-y-6">
      <section className="surface-card p-7" style={{ background: "#FAFAF9" }}>
        <p className="text-sm text-slate-500">Most recent ride</p>
        <h2 className="text-3xl font-bold mt-1">{latestRide?.id} · ${latestRide?.price.toFixed(2)}</h2>
        <p className="mt-2 text-slate-600">You are covered by clear explanations and a human recourse path whenever a decision feels unclear.</p>
        <div className="mt-4 flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs ${statusBadgeClass(latestRide?.status ?? "")}`}>{latestRide?.status}</span>
          <Link to={`/explanation/${latestRide?.decisionId}`} className="secondary-btn inline-flex items-center gap-2"><CircleHelp size={16} /> Why did this happen?</Link>
        </div>
      </section>

      <section className="surface-card p-6" style={{ background: "#FAFAF9" }}>
        <h3 className="text-2xl font-semibold">Ride Timeline</h3>
        <div className="mt-5 space-y-4 border-l-2 border-slate-200 pl-5">
          {rides.map((ride) => (
            <div key={ride.id} className="surface-card p-4 relative">
              <div className="absolute -left-[30px] top-5 h-3 w-3 rounded-full bg-blue-500" />
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <div className="font-semibold">{ride.location} {"->"} Downtown Hub</div>
                  <div className="text-sm text-slate-500">{ride.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${ride.price.toFixed(2)} {ride.surge ? <span className="text-amber-600">(surge)</span> : null}</div>
                  <span className={`px-3 py-1 rounded-full text-xs ${statusBadgeClass(ride.status)}`}>{ride.status}</span>
                </div>
              </div>
              <Link className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 text-sm" to={`/explanation/${ride.decisionId}`}><Eye size={14} /> View Explanation</Link>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-5">
        <section className="surface-card p-6" style={{ background: "#FAFAF9" }}>
          <h4 className="text-xl font-semibold">Your Trust Score</h4>
          <div className="mt-4 mx-auto h-36 w-36 rounded-full grid place-items-center" style={{ background: `conic-gradient(#3B82F6 ${trustScore * 3.6}deg, #e2e8f0 0)` }}>
            <div className="h-28 w-28 rounded-full bg-white grid place-items-center">
              <span className="text-2xl font-bold">{trustScore}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-3">Good standing with healthy verification and consistent account activity.</p>
        </section>

        <section className="surface-card p-6" style={{ background: "#FAFAF9" }}>
          <div className="rounded-xl bg-amber-100 text-amber-800 p-3 flex gap-2"><AlertTriangle size={16} /> Surge activity was detected during one recent ride due to high demand and reduced nearby availability.</div>
          <Link to={`/explanation/${latestRide?.decisionId}`} className="mt-3 inline-flex text-sm text-blue-700">Read full surge explanation</Link>
          <div className="mt-5 rounded-xl border border-slate-200 p-4">
            <h4 className="font-semibold">Something feel unfair? Challenge a decision.</h4>
            <p className="text-sm text-slate-600 mt-1">You can request clarification or submit a formal appeal in under 2 minutes.</p>
            <Link to="/appeals" className="primary-btn mt-3 inline-flex items-center gap-2"><ShieldCheck size={16} /> Open Appeals Center</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function DriverDashboard() {
  const { ridesAndTrips, users } = useAppContext();
  const driver = users.find((u) => u.name.includes("Alex Rivera")) ?? users.find((u) => u.role === "Driver/Courier");
  if (!driver) {
    return <section className="surface-card p-6">No driver profile available yet.</section>;
  }
  const trips = ridesAndTrips.filter((t) => t.id.startsWith("trip-") && t.driverId === driver.id);
  const [sortBy, setSortBy] = useState("date");
  const [expandedMiss, setExpandedMiss] = useState("");

  const sortedTrips = useMemo(() => [...trips].sort((a, b) => sortBy === "earnings" ? b.earnings - a.earnings : a.date < b.date ? 1 : -1), [trips, sortBy]);
  const missedTrips = sortedTrips.filter((t) => t.status === "Missed").slice(0, 3);
  const earningsWeek = [{ day: "Mon", value: 88 }, { day: "Tue", value: 72 }, { day: "Wed", value: 95 }, { day: "Thu", value: 84 }, { day: "Fri", value: 103 }, { day: "Sat", value: 116 }, { day: "Sun", value: 90 }];
  const completion = Math.round((sortedTrips.filter((t) => t.status.includes("Completed")).length / Math.max(1, sortedTrips.length)) * 100);
  const fairnessScore = Number(driver.fairnessScore ?? 88);

  return (
    <div className="space-y-6">
      <section className="surface-card p-7" style={{ background: "#F1F5F9" }}>
        <p className="text-sm text-slate-500">Today</p>
        <div className="flex flex-wrap items-end gap-3">
          <h2 className="text-5xl font-extrabold">${Number(driver.weeklyEarnings ?? 0).toFixed(2)}</h2>
          <div className="inline-flex items-center text-emerald-600"><ArrowUpRight size={18} /> {(((Number(driver.weeklyEarnings ?? 0) - Number(driver.platformAverageEarnings ?? 0)) / Math.max(1, Number(driver.platformAverageEarnings ?? 1))) * 100).toFixed(1)}% vs platform avg</div>
        </div>
        <p className="text-slate-600 mt-2">Performance is strong in downtown and airport lanes. Keep acceptance rates stable for priority opportunities.</p>
      </section>

      <section className="surface-card p-5" style={{ background: "#F1F5F9" }}>
        <div className="flex justify-between mb-3"><h3 className="text-2xl font-semibold">Trip History</h3><button className="secondary-btn" onClick={() => setSortBy((v) => v === "date" ? "earnings" : "date")}>Sort by {sortBy === "date" ? "Earnings" : "Date"}</button></div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500 border-b border-slate-300"><th className="py-2">Trip ID</th><th>Pickup Zone</th><th>Earnings</th><th>Distance</th><th>Rating Given</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{sortedTrips.map((trip) => <tr key={trip.id} className="border-b border-slate-200"><td className="py-2">{trip.id}</td><td>{driver.zone || "Downtown"}</td><td>${trip.earnings.toFixed(2)}</td><td>{trip.distance} mi</td><td>{driver.rating || 4.8}</td><td><span className={`px-2 py-1 rounded-full text-xs ${statusBadgeClass(trip.status)}`}>{trip.status}</span></td><td><Link to={`/explanation/${trip.decisionId}`} className="text-blue-700">View</Link></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[{ label: "Acceptance Rate", value: 91 }, { label: "Completion Rate", value: Number(driver.completionRate ?? completion) }, { label: "Fairness Score", value: fairnessScore }].map((m) => (
          <div key={m.label} className="surface-card p-4" style={{ background: "#F1F5F9" }}><div className="text-sm text-slate-500">{m.label}</div><div className="text-2xl font-bold mt-1">{m.value}%</div><div className="mt-2 h-2 bg-slate-200 rounded-full"><div className="h-2 rounded-full bg-blue-500" style={{ width: `${m.value}%` }} /></div></div>
        ))}
      </section>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="surface-card p-5" style={{ background: "#F1F5F9" }}>
          <h3 className="text-xl font-semibold">Why Not Me?</h3>
          <div className="mt-3 space-y-2">{missedTrips.map((trip) => <div key={trip.id} className="border border-slate-300 rounded-xl p-3"><button className="w-full flex items-center justify-between" onClick={() => setExpandedMiss((v) => v === trip.id ? "" : trip.id)}><span>{trip.id} missed due to proximity ranking</span>{expandedMiss === trip.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>{expandedMiss === trip.id && <p className="text-sm text-slate-600 mt-2">Closest eligible driver had 0.6 mi shorter pickup path and active availability at dispatch moment.</p>}</div>)}</div>
        </section>

        <section className="surface-card p-5" style={{ background: "#F1F5F9" }}>
          <h3 className="text-xl font-semibold">Weekly Earnings</h3>
          <div className="h-56 mt-2"><ResponsiveContainer width="100%" height="100%"><BarChart data={earningsWeek}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#3B82F6" isAnimationActive animationDuration={900} /></BarChart></ResponsiveContainer></div>
        </section>
      </div>

      <section className="surface-card p-5" style={{ background: "#F1F5F9" }}>
        <h3 className="text-xl font-semibold mb-3">Zone Activity Heatmap</h3>
        <div className="grid grid-cols-6 gap-2">{Array.from({ length: 18 }).map((_, i) => <div key={i} className="h-10 rounded-lg" style={{ background: `rgba(59,130,246,${0.2 + ((i % 6) * 0.12)})` }} />)}</div>
      </section>
    </div>
  );
}

function RestaurantDashboard() {
  const { ridesAndTrips } = useAppContext();
  const orders = ridesAndTrips.filter((o) => o.id.startsWith("ord-"));
  const columns = {
    Incoming: orders.filter((o) => o.status === "On Track"),
    "In Progress": orders.filter((o) => o.status === "Dispatch Busy"),
    Delivered: orders.filter((o) => o.status === "Queue Delay"),
    Disputed: orders.filter((o) => o.status === "Appeal Submitted")
  };

  return (
    <div className="space-y-6">
      <section className="surface-card p-7 border-emerald-300">
        <p className="text-sm text-emerald-700">Restaurant Partner Console</p>
        <h2 className="text-4xl font-bold mt-1">Today: 42 orders</h2>
        <p className="mt-2 text-slate-600 inline-flex items-center gap-2"><Clock3 size={16} /> Average delivery time: 26 min</p>
      </section>

      <div className="rounded-2xl bg-amber-100 text-amber-800 p-4 flex items-start justify-between gap-3">
        <p>Order prioritization shifted due to driver load and prep-time estimates in your zone.</p>
        <Link className="primary-btn whitespace-nowrap" to="/appeals?type=restaurant">Request Review</Link>
      </div>

      <section className="grid lg:grid-cols-4 gap-4">
        {Object.entries(columns).map(([title, list]) => (
          <div key={title} className="surface-card p-4">
            <h3 className="font-semibold text-emerald-700">{title}</h3>
            <div className="mt-3 space-y-2 min-h-[160px]">
              {list.map((order) => (
                <Link key={order.id} to={`/explanation/${order.decisionId}`} className="block rounded-xl border border-slate-200 p-3 bg-white/70">
                  <div className="font-medium">{order.id}</div>
                  <div className="text-xs text-slate-500">Items: 4 · Driver: Alex</div>
                  <div className="text-xs text-slate-500">ETA: {order.eta}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function AdminDashboard() {
  const { appeals, auditEntries, fairnessMetrics } = useAppContext();
  const pendingAppeals = appeals.filter((a) => a.status === "Pending").length;
  const resolvedAppeals = appeals.filter((a) => a.status === "Resolved");
  const avgResolutionDays = resolvedAppeals.length
    ? (resolvedAppeals.reduce((acc, a) => acc + (a.submittedDate && a.resolvedAt ? (new Date(a.resolvedAt) - new Date(a.submittedDate)) / 86400000 : 2), 0) / resolvedAppeals.length).toFixed(1)
    : "0.0";
  const dynamic = fairnessMetrics.dynamic || [];
  const fairnessScore = dynamic.length
    ? Math.round((dynamic.reduce((acc, m) => acc + (m.status === "Normal" ? 100 : m.status === "Warning" ? 72 : 48), 0) / dynamic.length))
    : 91;
  const kpis = [
    { label: "Total Appeals This Week", value: pendingAppeals, trend: `${pendingAppeals}`, note: "Live pending appeal volume" },
    { label: "Average Resolution Time", value: `${avgResolutionDays}d`, trend: "-5%", note: "Calculated from resolved appeals" },
    { label: "Fairness Score", value: `${fairnessScore}`, trend: "+1.2", note: "Computed from seeded fairness metrics" },
    { label: "Active Audit Flags", value: auditEntries.filter((a) => a.status === "Flagged").length, trend: "-2", note: "Lower unresolved risks" }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Corporate Dashboard</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl bg-[#1E293B] border border-blue-500/20 p-5 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_8px_26px_rgba(59,130,246,0.25)]">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 mb-3" />
            <div className="text-sm text-slate-400">{kpi.label}</div>
            <div className="text-3xl font-bold mt-1">{kpi.value}</div>
            <div className={`text-sm mt-1 ${kpi.trend.startsWith("-") ? "text-rose-400" : "text-emerald-400"}`}>{kpi.trend} <TrendingUp className="inline" size={14} /></div>
            <p className="text-xs text-slate-400 mt-2">{kpi.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { activeRole } = useAppContext();
  return (
    <div className="space-y-4 page-fade">
      {activeRole === "Rider/Customer" && <RiderDashboard />}
      {activeRole === "Driver/Courier" && <DriverDashboard />}
      {activeRole === "Restaurant Partner" && <RestaurantDashboard />}
      {activeRole === "Corporate/Admin" && <AdminDashboard />}
    </div>
  );
}
