import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function FairnessCenterPage() {
  const sections = [
    ["How Matching Works", "We prioritize availability, proximity, and service quality signals to route trips and deliveries efficiently."],
    ["How Pricing Works", "Prices change with real-time demand and available supply to maintain reliable service during peak periods."],
    ["Our Fairness Principles", "Equal opportunity, geographic equity, and no protected attribute usage in decision pathways."],
    ["Bias Prevention Measures", "Regular audits, geographic monitoring, and earnings distribution review across service areas."]
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Fairness & Transparency Center</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map(([title, body]) => (
          <section key={title} className="rounded-2xl bg-white p-5 shadow-soft">
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-sm text-slate-600 mt-2">{body}</p>
          </section>
        ))}
      </div>
      <section className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="font-semibold text-lg">What We Do NOT Use</h2>
        <div className="grid md:grid-cols-3 gap-3 mt-3">{["Race", "Gender", "Age", "Religion", "Disability", "Political affiliation"].map((item) => <div key={item} className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-emerald-500" /> {item}</div>)}</div>
      </section>
      <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5">
        <p className="font-semibold text-lg inline-flex gap-2"><ShieldCheck size={18} /> We don't show you the algorithm. We show you the boundaries we set around it.</p>
      </section>
    </div>
  );
}
