import { ArrowRight, Car, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    title: "Bounded Transparency",
    text: "We explain the decision boundaries in plain language, including what categories were considered and what categories were excluded.",
    icon: ShieldCheck
  },
  {
    title: "Structured Recourse",
    text: "When something feels wrong, you can request clarification, escalate to human review, and formally appeal from one connected flow.",
    icon: Sparkles
  },
  {
    title: "Tiered Accountability",
    text: "Riders, drivers, and oversight teams each get tailored visibility that fits their role without exposing protected system details.",
    icon: Users2
  }
];

export default function LandingPage() {
  return (
    <div className="space-y-10 page-fade">
      <section className="min-h-[82vh] rounded-[28px] relative overflow-hidden flex items-center justify-center text-center text-slate-100 p-8" style={{ background: "radial-gradient(circle at 10% 20%, rgba(59,130,246,0.35), transparent 40%), radial-gradient(circle at 90% 20%, rgba(139,92,246,0.35), transparent 40%), linear-gradient(140deg, #0f172a, #1e1b4b)" }}>
        <div className="absolute w-64 h-64 rounded-full bg-blue-400/30 blur-2xl animate-float" />
        <div className="absolute w-64 h-64 rounded-full bg-purple-400/30 blur-2xl animate-float" style={{ animationDelay: "1.2s", right: "18%", top: "22%" }} />
        <div className="absolute w-64 h-64 rounded-full bg-amber-300/20 blur-2xl animate-float" style={{ animationDelay: "2s", left: "18%", bottom: "12%" }} />

        <div className="relative z-10 max-w-4xl">
          <p className="text-sm tracking-wide text-slate-300">The Accountability Bridge: Fairness & Transparency Portal</p>
          <h1 className="mt-3 text-[clamp(3rem,8vw,4.4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] gradient-headline">Trust Through Clear Boundaries</h1>
          <p className="mt-5 text-lg text-slate-200">Understand decisions, request recourse, and move from confusion to clarity without exposing sensitive platform internals.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/dashboard" className="primary-btn inline-flex items-center gap-2"><Car size={16} /> Enter as Rider</Link>
            <Link to="/dashboard" className="secondary-btn inline-flex items-center gap-2"><Users2 size={16} /> Enter as Driver</Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] gradient-headline mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map(({ title, text, icon: Icon }) => (
            <article key={title} className="surface-card p-6 group">
              <Icon className="text-blue-600" />
              <h3 className="mt-3 text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-slate-600">{text}</p>
              <div className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition" />
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2 className="text-4xl font-bold tracking-[-0.02em] gradient-headline mb-8">Built for Everyone</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[{ role: "Rider", color: "#3B82F6", desc: "Friendly, plain-language explanations and one-tap recourse when decisions feel unclear." }, { role: "Driver", color: "#6366F1", desc: "Operational clarity, fairness metrics, and actionable trip-level context to improve outcomes." }, { role: "Corporate", color: "#0F172A", desc: "Audit-ready governance, queue operations, and role-scoped accountability controls." }].map((card) => (
            <div key={card.role} className="surface-card p-6" style={{ borderTop: `4px solid ${card.color}` }}>
              <h3 className="text-2xl font-bold">{card.role}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section text-center">
        <div className="w-20 h-[1px] bg-slate-300 mx-auto mb-6" />
        <blockquote className="text-3xl md:text-4xl font-semibold text-slate-500 max-w-4xl mx-auto leading-tight">
          “We don't show you the algorithm. We show you the boundaries we set around it.”
        </blockquote>
      </section>

      <footer className="rounded-[20px] bg-[#0F172A] text-slate-200 p-8 flex flex-wrap justify-between gap-4">
        <div>
          <div className="font-semibold">Accountability Bridge</div>
          <div className="text-sm text-slate-400 mt-1">Fairness with measurable accountability.</div>
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/fairness">Fairness Center</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/appeals">Appeals</Link>
        </div>
      </footer>
    </div>
  );
}
