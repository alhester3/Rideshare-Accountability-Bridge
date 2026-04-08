import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  { title: "Bounded Transparency", text: "We explain what categories were used and excluded, without exposing sensitive system internals." },
  { title: "Structured Recourse", text: "You can request clarification, escalate to a human review, and submit formal appeals." },
  { title: "Tiered Accountability", text: "Users, teams, and auditors each get the right level of insight and action." }
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-card shadow-soft">
        <div className="absolute -top-10 -left-8 h-44 w-44 rounded-full bg-blue-300/30 blur-2xl animate-float" />
        <div className="absolute -bottom-10 right-4 h-40 w-40 rounded-full bg-purple-300/30 blur-2xl animate-float" />
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">The Accountability Bridge</h1>
        <p className="mt-4 text-slate-700 max-w-2xl">A fairness and transparency portal that helps riders, drivers, partners, and oversight teams understand decisions and act on them confidently.</p>
        <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-[1.02] transition">
          Enter Portal <ArrowRight size={16} />
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {["Rider", "Driver", "Corporate"].map((role) => (
          <div key={role} className="glass-card rounded-2xl p-5 shadow-soft hover:-translate-y-1 transition">
            <h3 className="font-bold text-xl">{role} Portal</h3>
            <p className="text-sm text-slate-600 mt-2">Purpose-built controls and explanations for {role.toLowerCase()} stakeholders.</p>
            <Link to="/dashboard" className="mt-4 inline-flex items-center gap-2 text-electric font-semibold">Enter Portal <ArrowRight size={14} /></Link>
          </div>
        ))}
      </section>

      <section className="rounded-2xl p-6 bg-white shadow-soft">
        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => (
            <article key={pillar.title} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 font-semibold">{i === 0 ? <Compass size={16} /> : i === 1 ? <Sparkles size={16} /> : <ShieldCheck size={16} />}{pillar.title}</div>
              <p className="text-sm text-slate-600 mt-2">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
