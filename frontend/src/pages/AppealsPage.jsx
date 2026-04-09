import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const statuses = ["Pending", "Under Review", "Escalated", "Resolved"];

function Timeline({ timeline }) {
  const steps = ["Submitted", "Under Review", "Decision Made", "Resolved"];
  return <div className="flex gap-2 flex-wrap">{steps.map((step) => <div key={step} className={`px-3 py-1 rounded-full text-xs ${timeline.includes(step) ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{step}</div>)}</div>;
}

export default function AppealsPage() {
  const [params] = useSearchParams();
  const { activeRole, appeals, addAppeal, updateAppealStatus, users, decisions } = useAppContext();
  const [reason, setReason] = useState("Price Too High");
  const [decisionId, setDecisionId] = useState(params.get("decisionId") ?? "dec-1002");
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [filters, setFilters] = useState({ status: "All", type: "All" });

  const isAdmin = activeRole === "Corporate/Admin";
  const user = users.find((u) => u.role === activeRole) ?? users[0] ?? { id: "r1" };

  const visibleAppeals = useMemo(() => appeals.filter((a) => (filters.status === "All" || a.status === filters.status) && (filters.type === "All" || a.type === filters.type)), [appeals, filters]);

  const handleSubmit = () => {
    addAppeal({ userId: params.get("userId") ?? user.id, decisionId, reason, context });
    setSubmitted(true);
    setContext("");
  };

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Appeal & Dispute Center</h1>
      {!isAdmin && (
        <section className="rounded-2xl bg-white p-5 shadow-soft">
          <h2 className="font-semibold mb-3">Submit Appeal</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="rounded-xl border p-3">
              {[
                "Price Too High",
                "Incorrect Match",
                "Account Flag",
                "Earnings Dispute",
                "Other"
              ].map((r) => <option key={r}>{r}</option>)}
            </select>
            <input value={decisionId} onChange={(e) => setDecisionId(e.target.value)} className="rounded-xl border p-3" placeholder="Decision ID" />
            <textarea value={context} onChange={(e) => setContext(e.target.value)} className="md:col-span-2 rounded-xl border p-3" rows="4" placeholder="Additional context" />
          </div>
          <button onClick={handleSubmit} className="mt-3 px-4 py-2 rounded-xl bg-electric text-white">Submit Appeal</button>
          {submitted && <p className="mt-2 text-emerald-700">Appeal submitted successfully.</p>}
        </section>
      )}

      <section className={`rounded-2xl p-5 shadow-soft ${isAdmin ? "admin-glass" : "bg-white"}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {isAdmin && <>
            <select className="rounded-xl border border-slate-600 p-2 bg-slate-950/70 text-slate-100" onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}><option>All</option>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
            <select className="rounded-xl border border-slate-600 p-2 bg-slate-950/70 text-slate-100" onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}><option>All</option>{[...new Set(appeals.map((a) => a.type))].map((t) => <option key={t}>{t}</option>)}</select>
          </>}
          <div className="text-sm">Estimated resolution: 24-72 hours</div>
        </div>

        <div className="space-y-2">
          {visibleAppeals.map((appeal) => (
            <div key={appeal.id} className={`rounded-xl p-3 ${isAdmin ? "bg-slate-800" : "bg-slate-50"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div><b>{appeal.id}</b> · {appeal.reason} · {appeal.submittedDate}</div>
                <span className={`px-3 py-1 rounded-full text-xs ${appeal.status === "Pending" ? "bg-amber-100 text-amber-700 animate-pulseSoft" : appeal.status === "Resolved" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{appeal.status}</span>
              </div>
              <Timeline timeline={appeal.timeline} />
              {isAdmin && <div className="mt-2 flex flex-wrap gap-2"><button onClick={() => setSelectedAppeal(appeal)} className="px-3 py-1 rounded-lg bg-electric text-white">Review</button><button type="button" onClick={() => updateAppealStatus(appeal.id, "escalate")} className="px-3 py-1 rounded-lg bg-amber-500 text-white font-semibold shadow-sm hover:bg-amber-400">Escalate</button><button type="button" onClick={() => updateAppealStatus(appeal.id, "approve")} className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-semibold shadow-sm hover:bg-emerald-400">Resolve</button></div>}
            </div>
          ))}
        </div>
      </section>

      {selectedAppeal && (
        <div className="fixed inset-0 bg-slate-900/50 grid place-items-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white text-slate-900 p-5 space-y-3">
            {(() => {
              const appealUser = users.find((u) => u.id === selectedAppeal.userId);
              const linkedDecision = decisions.find((d) => d.id === selectedAppeal.decisionId);
              return (
                <>
            <h3 className="text-lg font-semibold">Appeal Review — {selectedAppeal.id}</h3>
            <p className="text-sm">{selectedAppeal.context}</p>
            <p className="text-sm">User: <b>{appealUser?.name}</b> ({appealUser?.id}) · {appealUser?.role}</p>
            <p className="text-sm">Original decision: {selectedAppeal.decisionId} · {linkedDecision?.summary}</p>
            {selectedAppeal.resolution && <p className="text-sm text-emerald-700">Resolution: {selectedAppeal.resolution}</p>}
            <div className="flex flex-wrap gap-2"><button onClick={() => updateAppealStatus(selectedAppeal.id, "approve")} className="px-3 py-2 rounded-lg bg-emerald-500 text-white">Approve Appeal</button><button onClick={() => updateAppealStatus(selectedAppeal.id, "deny")} className="px-3 py-2 rounded-lg bg-rose-500 text-white">Deny Appeal</button><button type="button" onClick={() => updateAppealStatus(selectedAppeal.id, "escalate")} className="px-3 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-400">Escalate</button><button onClick={() => updateAppealStatus(selectedAppeal.id, "moreInfo")} className="px-3 py-2 rounded-lg border">Request More Info</button></div>
            <button onClick={() => setSelectedAppeal(null)} className="text-sm text-slate-500">Close</button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
