import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function WhatIfSimulationPage() {
  const { fairnessMetrics, activeRole } = useAppContext();
  const isAdmin = activeRole === "Corporate/Admin";
  const [availability, setAvailability] = useState(2);
  const [demand, setDemand] = useState(2);
  const [distance, setDistance] = useState(5);
  const zones = [...new Set((fairnessMetrics.dynamic || []).map((m) => m.zone))];
  const [zone, setZone] = useState(zones[0] || "Downtown");

  const output = useMemo(() => {
    const base = 10;
    const demandFactor = [0.9, 1.1, 1.35][demand - 1];
    const availabilityFactor = [0.8, 1.0, 1.2][availability - 1];
    const estimatedPrice = ((base + distance * 1.4) * demandFactor) / availabilityFactor;
    const matchingLikelihood = Math.max(25, Math.min(97, Math.round((availabilityFactor * 40) + (100 - distance * 6) + (demand * 5))));
    return { estimatedPrice, matchingLikelihood };
  }, [availability, demand, distance, zone]);

  const fieldClass = isAdmin
    ? "w-full rounded-lg border border-slate-600 bg-slate-950/70 text-slate-100 p-2 mt-1"
    : "w-full rounded-lg border p-2 mt-1";

  return (
    <div className={`space-y-4 rounded-2xl p-5 shadow-soft ${isAdmin ? "admin-glass border border-slate-700" : "bg-white"}`}>
      <h1 className={`text-3xl font-bold ${isAdmin ? "text-slate-50" : ""}`}>What-If Simulation Tool</h1>
      <p className={`text-sm ${isAdmin ? "text-slate-300" : "text-slate-600"}`}>This tool demonstrates how factors influence outcomes. It does not reflect the actual algorithm.</p>
      <div className={`grid md:grid-cols-3 gap-4 ${isAdmin ? "text-slate-200" : ""}`}>
        <label className="block">Zone
          <select value={zone} onChange={(e) => setZone(e.target.value)} className={fieldClass}>
            {zones.map((z) => <option key={z}>{z}</option>)}
          </select>
        </label>
        <label className="block">Driver Availability: {availability}<input type="range" min="1" max="3" value={availability} onChange={(e) => setAvailability(Number(e.target.value))} className="w-full accent-blue-500" /></label>
        <label className="block">Demand Level: {demand}<input type="range" min="1" max="3" value={demand} onChange={(e) => setDemand(Number(e.target.value))} className="w-full accent-blue-500" /></label>
        <label className="block">Distance to Pickup: {distance} mi<input type="range" min="1" max="15" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-blue-500" /></label>
      </div>
      <div className={`rounded-2xl p-4 border ${isAdmin ? "bg-slate-950/50 border-slate-600 text-slate-100" : "bg-slate-50"}`}>
        <div>Estimated Price: <b>${output.estimatedPrice.toFixed(2)}</b></div>
        <div>Matching Likelihood: <b>{output.matchingLikelihood}%</b></div>
      </div>
    </div>
  );
}
