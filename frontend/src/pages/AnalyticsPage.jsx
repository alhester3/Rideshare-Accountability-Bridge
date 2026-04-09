import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppContext } from "../context/AppContext";

const statusColor = (status) => status === "Flagged" ? "#EF4444" : status === "Warning" ? "#F59E0B" : "#10B981";

export default function AnalyticsPage() {
  const { activeRole, fairnessMetrics, setSelectedAuditFilter, decisions, themeMode } = useAppContext();
  const isAdmin = activeRole === "Corporate/Admin";
  const chartTick = themeMode === "dark" ? "#cbd5e1" : "#475569";
  const chartGrid = themeMode === "dark" ? "#334155" : "#e2e8f0";

  const dynamic = fairnessMetrics.dynamic || [];
  const earningsComparison = dynamic.filter((m) => m.type === "EarningsDisparity").map((m) => ({ name: m.zone, value: m.value, status: m.status }));
  const tripDistribution = dynamic.filter((m) => m.type === "TripDistribution").map((m) => ({ name: m.zone, value: m.value, status: m.status }));
  const surgeFrequency = dynamic.filter((m) => m.type === "SurgeFrequency").map((m) => ({ name: m.zone, value: m.value, status: m.status }));
  const geoFairness = dynamic.filter((m) => m.type === "GeographicFairness");

  const biasFlags = useMemo(() => decisions.filter((d) => d.status === "UnderReview" || d.status === "Overturned").slice(0, 6), [decisions]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Fairness Analytics Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="rounded-2xl p-4 bg-white text-slate-900 shadow-soft h-72">
          <h2 className="font-semibold mb-2">Driver Earnings Comparison</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={earningsComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="name" tick={{ fill: chartTick }} stroke={chartTick} />
              <YAxis tick={{ fill: chartTick }} stroke={chartTick} />
              <Tooltip />
              <Bar dataKey="value" onClick={(data) => setSelectedAuditFilter(data.name)}>{earningsComparison.map((e) => <Cell key={e.name} fill={statusColor(e.status)} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="rounded-2xl p-4 bg-white text-slate-900 shadow-soft h-72">
          <h2 className="font-semibold mb-2">Trip Distribution</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={tripDistribution} dataKey="value" nameKey="name" outerRadius={90}>{tripDistribution.map((entry) => <Cell key={entry.name} fill={statusColor(entry.status)} />)}</Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        <section className="rounded-2xl p-4 bg-white text-slate-900 shadow-soft h-72">
          <h2 className="font-semibold mb-2">Surge Frequency by Location</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={surgeFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="name" tick={{ fill: chartTick }} stroke={chartTick} />
              <YAxis tick={{ fill: chartTick }} stroke={chartTick} />
              <Tooltip />
              <Bar dataKey="value" onClick={(data) => setSelectedAuditFilter(data.name)}>{surgeFrequency.map((e) => <Cell key={e.name} fill={statusColor(e.status)} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        {isAdmin && (
          <section className="rounded-2xl p-4 bg-slate-900 text-slate-100 shadow-glow h-72">
            <h2 className="font-semibold mb-2">Geographic Fairness Heatmap</h2>
            <div className="grid grid-cols-4 gap-2 mt-4">{geoFairness.map((m) => <button key={m.id} onClick={() => setSelectedAuditFilter(m.zone)} className="h-10 rounded-lg" style={{ background: statusColor(m.status), opacity: 0.6 }} />)}</div>
            <p className="text-xs text-slate-400 mt-3">Click a zone to prime audit filtering context.</p>
          </section>
        )}
      </div>

      {isAdmin && (
        <div className="grid md:grid-cols-2 gap-4">
          <section className="admin-glass rounded-2xl p-4">
            <h3 className="font-semibold">Bias Detection Flags</h3>
            <div className="mt-2 space-y-2">{biasFlags.map((flag) => <button key={flag.id} onClick={() => setSelectedAuditFilter(flag.id)} className="w-full text-left rounded-xl bg-slate-800 px-3 py-2 hover:bg-slate-700">{flag.id} · {flag.type}</button>)}</div>
          </section>
          <section className="admin-glass rounded-2xl p-4">
            <h3 className="font-semibold">Demographic Disparity Indicators (Sample)</h3>
            <ul className="mt-2 text-sm text-slate-300 space-y-1">{geoFairness.map((row) => <li key={row.id}>{row.zone}: {row.disparity || `${row.value}`}</li>)}</ul>
            <button className="mt-4 px-4 py-2 rounded-xl bg-electric text-white">Export Report</button>
          </section>
        </div>
      )}
    </div>
  );
}
