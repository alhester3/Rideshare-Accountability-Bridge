import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppContext } from "../context/AppContext";

export default function AnalyticsPage() {
  const { activeRole, fairnessMetrics, setSelectedAuditFilter, decisions } = useAppContext();
  const isAdmin = activeRole === "Corporate/Admin";

  const biasFlags = useMemo(() => decisions.filter((d) => d.status === "Open").slice(0, 4), [decisions]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Fairness Analytics Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="rounded-2xl p-4 bg-white shadow-soft h-72">
          <h2 className="font-semibold mb-2">Driver Earnings Comparison</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={fairnessMetrics.earningsComparison}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip />
              <Bar dataKey="value" fill="#3B82F6" onClick={(data) => setSelectedAuditFilter(data.name)} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="rounded-2xl p-4 bg-white shadow-soft h-72">
          <h2 className="font-semibold mb-2">Trip Distribution</h2>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={fairnessMetrics.tripDistribution} dataKey="value" nameKey="name" outerRadius={90}>
                {fairnessMetrics.tripDistribution.map((entry, index) => <Cell key={entry.name} fill={["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"][index]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>
        <section className="rounded-2xl p-4 bg-white shadow-soft h-72">
          <h2 className="font-semibold mb-2">Surge Frequency by Location</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={fairnessMetrics.surgeFrequency}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#F59E0B" onClick={(data) => setSelectedAuditFilter(data.name)} /></BarChart>
          </ResponsiveContainer>
        </section>
        {isAdmin && (
          <section className="rounded-2xl p-4 bg-slate-900 text-slate-100 shadow-glow h-72">
            <h2 className="font-semibold mb-2">Geographic Fairness Heatmap</h2>
            <div className="grid grid-cols-4 gap-2 mt-4">{Array.from({ length: 16 }).map((_, i) => <button key={i} onClick={() => setSelectedAuditFilter(`Zone ${i + 1}`)} className="h-10 rounded-lg" style={{ background: `rgba(59,130,246,${0.15 + ((i % 4) * 0.18)})` }} />)}</div>
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
            <ul className="mt-2 text-sm text-slate-300 space-y-1">{fairnessMetrics.demographicDisparity.map((row) => <li key={row.name}>{row.name}: {row.value}% variance</li>)}</ul>
            <button className="mt-4 px-4 py-2 rounded-xl bg-electric text-white">Export Report</button>
          </section>
        </div>
      )}
    </div>
  );
}
