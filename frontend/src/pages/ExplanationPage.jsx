import { CheckCircle2, HelpCircle, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function FactorCards({ factors }) {
  return <div className="grid md:grid-cols-2 gap-3">{factors.map((factor) => <div key={factor} className="rounded-2xl border border-slate-200 p-3 bg-white">{factor}</div>)}</div>;
}

export default function ExplanationPage() {
  const { decisionId = "dec-1002" } = useParams();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { decisions, users, activeRole, addClarificationRequest } = useAppContext();
  const [clarifyOpen, setClarifyOpen] = useState(false);
  const [clarifyMsg, setClarifyMsg] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const decision = decisions.find((d) => d.id === decisionId) ?? decisions[0];
  if (!decision) {
    return <section className="surface-card p-6">No decision data available yet.</section>;
  }
  const user = users.find((u) => u.id === decision.userId);

  const submitClarification = () => {
    addClarificationRequest({ decisionId: decision.id, message: clarifyMsg, userId: user?.id ?? "unknown" });
    setConfirmed(true);
    setClarifyMsg("");
  };

  const goToAppeal = () => navigate(`/appeals?decisionId=${decision.id}&userId=${user?.id ?? ""}`);

  const isAdmin = activeRole === "Corporate/Admin";
  const isDriver = activeRole === "Driver/Courier";

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Decision Explanation</h1>
      <section className="rounded-2xl p-4 bg-white shadow-soft text-slate-900">
        <div className="text-sm text-slate-600">Decision ID</div>
        <div className="font-bold text-lg">{decision.id}</div>
        <div className="mt-2 text-sm">{decision.summary}</div>
      </section>

      {!isAdmin && (
        <>
          <section className="rounded-2xl p-4 bg-white shadow-soft">
            <h2 className="font-semibold mb-3">{isDriver ? "Trip Assignment Explanation" : "Surge Pricing Explanation"}</h2>
            <FactorCards factors={decision.factors} />
            <p className="mt-3 text-sm text-slate-600">This decision was based on current demand and driver availability in your area.</p>
            {isDriver && search.get("whyNotMe") && <div className="mt-3 p-3 rounded-xl bg-amber-50 text-amber-700">Why Not Me? A nearby active driver with slightly better pickup proximity accepted first.</div>}
          </section>

          <section className="rounded-2xl p-4 bg-white shadow-soft">
            <h2 className="font-semibold mb-3">What Was Not Considered</h2>
            <div className="grid md:grid-cols-3 gap-2">{decision.excluded.map((item) => <div key={item} className="text-sm flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> {item}</div>)}</div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => setClarifyOpen(true)} className="px-4 py-2 rounded-xl bg-electric text-white inline-flex gap-2"><HelpCircle size={16} /> Request Clarification</button>
            <button onClick={goToAppeal} className="px-4 py-2 rounded-xl border border-slate-300 inline-flex gap-2"><ShieldAlert size={16} /> Submit Appeal</button>
          </div>
        </>
      )}

      {isAdmin && (
        <section className="admin-glass rounded-2xl p-4 text-slate-100">
          <h2 className="font-semibold">Admin Detail</h2>
          <p className="text-sm text-slate-300 mt-2">Timestamp: {new Date(decision.timestamp).toLocaleString()} · System Version: v2.4.1</p>
          <p className="text-sm text-slate-300">Factors weighted by category: Demand, Availability, Geographic Load, Quality.</p>
          <div className="mt-3 flex gap-2"><Link className="inline-flex items-center px-3 py-2 rounded-xl bg-amber-500 text-white font-semibold no-underline shadow-sm hover:bg-amber-400" to="/audit">Flag for Review</Link><button type="button" className="px-3 py-2 rounded-xl bg-emerald-500 text-white font-semibold shadow-sm hover:bg-emerald-400">Mark Resolved</button></div>
        </section>
      )}

      {clarifyOpen && (
        <div className="fixed inset-0 bg-slate-900/40 grid place-items-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md space-y-3">
            <h3 className="font-semibold">Request Clarification</h3>
            <textarea value={clarifyMsg} onChange={(e) => setClarifyMsg(e.target.value)} className="w-full rounded-xl border border-slate-300 p-3" rows="4" placeholder="Tell us what needs clarification..." />
            {!confirmed ? <button onClick={submitClarification} className="px-4 py-2 rounded-xl bg-electric text-white">Submit Request</button> : <div className="text-emerald-700">Your request has been received.</div>}
            <button onClick={() => { setClarifyOpen(false); setConfirmed(false); }} className="text-sm text-slate-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
