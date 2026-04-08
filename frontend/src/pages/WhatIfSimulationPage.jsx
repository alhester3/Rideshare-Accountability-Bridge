import { useMemo, useState } from "react";

export default function WhatIfSimulationPage() {
  const [availability, setAvailability] = useState(2);
  const [demand, setDemand] = useState(2);
  const [distance, setDistance] = useState(5);

  const output = useMemo(() => {
    const base = 10;
    const demandFactor = [0.9, 1.1, 1.35][demand - 1];
    const availabilityFactor = [0.8, 1.0, 1.2][availability - 1];
    const estimatedPrice = ((base + distance * 1.4) * demandFactor) / availabilityFactor;
    const matchingLikelihood = Math.max(25, Math.min(97, Math.round((availabilityFactor * 40) + (100 - distance * 6) + (demand * 5))));
    return { estimatedPrice, matchingLikelihood };
  }, [availability, demand, distance]);

  return (
    <div className="space-y-4 rounded-2xl p-5 bg-white shadow-soft">
      <h1 className="text-3xl font-bold">What-If Simulation Tool</h1>
      <p className="text-sm text-slate-600">This tool demonstrates how factors influence outcomes. It does not reflect the actual algorithm.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <label>Driver Availability: {availability}<input type="range" min="1" max="3" value={availability} onChange={(e) => setAvailability(Number(e.target.value))} className="w-full" /></label>
        <label>Demand Level: {demand}<input type="range" min="1" max="3" value={demand} onChange={(e) => setDemand(Number(e.target.value))} className="w-full" /></label>
        <label>Distance to Pickup: {distance} mi<input type="range" min="1" max="15" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full" /></label>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <div>Estimated Price: <b>${output.estimatedPrice.toFixed(2)}</b></div>
        <div>Matching Likelihood: <b>{output.matchingLikelihood}%</b></div>
      </div>
    </div>
  );
}
