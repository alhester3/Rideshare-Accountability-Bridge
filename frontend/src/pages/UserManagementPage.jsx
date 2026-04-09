import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function UserManagementPage() {
  const { activeRole, users, decisions, appeals, ridesAndTrips, updateUserStatus } = useAppContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("All");

  const rows = useMemo(() => users
    .filter((u) => roleFilter === "All" || u.role === roleFilter)
    .map((u) => ({
      ...u,
      totalDecisions: decisions.filter((d) => d.userId === u.id).length,
      openAppeals: appeals.filter((a) => a.userId === u.id && a.status !== "Resolved").length
    })), [users, decisions, appeals, roleFilter]);

  if (activeRole !== "Corporate/Admin") return <div className="rounded-2xl bg-white p-5">User management is available in Corporate/Admin view only.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">User Management Panel</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm">Filter role:</span>
        <select className="rounded-lg border border-slate-600 p-2 bg-slate-950/70 text-slate-100" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option>All</option>
          <option>Rider/Customer</option>
          <option>Driver/Courier</option>
          <option>Restaurant Partner</option>
          <option>Corporate/Admin</option>
        </select>
      </div>
      <div className="admin-glass rounded-2xl p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-400"><th>User ID</th><th>Name</th><th>Role</th><th>Status</th><th>Total Decisions</th><th>Open Appeals</th><th>Last Activity</th></tr></thead>
          <tbody>
            {rows.map((u) => <tr key={u.id} className="border-t border-slate-700 hover:bg-slate-800 cursor-pointer" onClick={() => setSelectedUser(u)}><td>{u.id}</td><td>{u.name}</td><td>{u.role}</td><td>{u.status}</td><td>{u.totalDecisions}</td><td>{u.openAppeals}</td><td>{u.lastActivity}</td></tr>)}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 grid place-items-center p-4">
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl p-5 space-y-3">
            <h3 className="text-lg font-bold">{selectedUser.name} ({selectedUser.id})</h3>
            <div className="text-sm">Account Flag History: {selectedUser.accountFlaggedDate ? `Flagged on ${selectedUser.accountFlaggedDate}` : "No active flags"}</div>
            <div className="text-sm"><b>Rides/Trips/Orders:</b> {ridesAndTrips.filter((x) => x.userId === selectedUser.id).map((x) => x.id).join(", ") || "None"}</div>
            <div className="text-sm"><b>Decisions:</b> {decisions.filter((d) => d.userId === selectedUser.id).map((d) => d.id).join(", ") || "None"}</div>
            <div className="text-sm"><b>Appeals:</b> {appeals.filter((a) => a.userId === selectedUser.id).map((a) => `${a.id} (${a.status})`).join(", ") || "None"}</div>
            <div className="flex gap-2 items-center"><span>Change status:</span>{["Active", "Flagged", "Suspended"].map((status) => <button key={status} onClick={() => updateUserStatus(selectedUser.id, status)} className="px-3 py-1 rounded-lg border">{status}</button>)}</div>
            <button onClick={() => setSelectedUser(null)} className="text-sm text-slate-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
