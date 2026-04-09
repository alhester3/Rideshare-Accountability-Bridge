import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function AuditCompliancePage() {
  const { activeRole, auditEntries, decisions, toggleDecisionFlag, selectedAuditFilter } = useAppContext();
  const [query, setQuery] = useState(selectedAuditFilter || "");
  const [type, setType] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => auditEntries.filter((entry) => {
    const matchesQuery = !query || `${entry.decisionId} ${entry.userId} ${entry.detail}`.toLowerCase().includes(query.toLowerCase());
    const matchesType = type === "All" || entry.decisionType === type;
    const matchesDate = !dateFrom || entry.timestamp.slice(0, 10) >= dateFrom;
    return matchesQuery && matchesType && matchesDate;
  }), [auditEntries, query, type, dateFrom]);

  if (activeRole !== "Corporate/Admin") return <div className="rounded-2xl bg-white p-5">Audit center is available in Corporate/Admin view only.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Audit & Compliance Center</h1>
      <section className="admin-glass rounded-2xl p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-xl p-2 bg-slate-950/70 text-slate-100 border border-slate-600 placeholder:text-slate-400" placeholder="Search user, decision, keyword" />
          <select className="rounded-xl p-2 bg-slate-950/70 text-slate-100 border border-slate-600" value={type} onChange={(e) => setType(e.target.value)}><option>All</option>{[...new Set(auditEntries.map((a) => a.decisionType))].map((item) => <option key={item}>{item}</option>)}</select>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-xl p-2 bg-slate-950/70 text-slate-100 border border-slate-600" />
          <button className="px-3 py-2 rounded-xl bg-electric text-white">Export PDF</button>
        </div>
        <div className="space-y-2">
          {filtered.map((entry) => (
            <div key={entry.id} className="rounded-xl bg-slate-800 p-3">
              <div className="grid md:grid-cols-7 gap-2 text-sm items-center">
                <div>{entry.decisionId}</div><div>{new Date(entry.timestamp).toLocaleDateString()}</div><div>{entry.decisionType}</div><div>{entry.userType}</div><div>{entry.outcome}</div>
                <div><span className={`px-2 py-1 rounded-full text-xs ${entry.status === "Flagged" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{entry.status}</span></div>
                <div className="flex gap-2"><button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)} className="text-xs underline">Details</button><button onClick={() => toggleDecisionFlag(entry.decisionId)} className="text-xs underline">Flag for Review</button></div>
              </div>
              {expanded === entry.id && <div className="text-sm text-slate-300 mt-2 border-t border-slate-700 pt-2">{entry.detail}<br />Full decision detail: {decisions.find((d) => d.id === entry.decisionId)?.summary}</div>}
            </div>
          ))}
        </div>
      </section>
      <section className="admin-glass rounded-2xl p-4">
        <h3 className="font-semibold">Compliance Summary</h3>
        <ul className="text-sm text-slate-300 mt-2 space-y-1"><li>Decision traceability: 100%</li><li>Appeal SLA adherence: 93%</li><li>Protected attribute exclusion checks: Passed</li><li>Open critical flags: {auditEntries.filter((a) => a.status === "Flagged").length}</li></ul>
      </section>
    </div>
  );
}
