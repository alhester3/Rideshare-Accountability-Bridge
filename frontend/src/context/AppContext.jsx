import { createContext, useContext, useMemo, useState } from "react";
import { appeals as initialAppeals, auditLog as initialAuditLog, decisions as initialDecisions, fairnessMetrics, ridesAndTrips, roles, users as initialUsers } from "../data/sampleData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState("Rider/Customer");
  const [users, setUsers] = useState(initialUsers);
  const [decisions, setDecisions] = useState(initialDecisions);
  const [appeals, setAppeals] = useState(initialAppeals);
  const [auditEntries, setAuditEntries] = useState(initialAuditLog);
  const [clarificationRequests, setClarificationRequests] = useState([]);
  const [selectedAuditFilter, setSelectedAuditFilter] = useState("");

  const addAppeal = ({ userId, decisionId, reason, context }) => {
    const newAppeal = {
      id: `app-${Math.floor(Math.random() * 9000) + 400}`,
      userId,
      decisionId,
      reason,
      context,
      status: "Pending",
      submittedDate: new Date().toISOString().slice(0, 10),
      type: users.find((u) => u.id === userId)?.role ?? activeRole,
      timeline: ["Submitted"]
    };
    setAppeals((prev) => [newAppeal, ...prev]);
  };

  const addClarificationRequest = ({ decisionId, message, userId }) => {
    setClarificationRequests((prev) => [
      { id: `clr-${Date.now()}`, decisionId, message, userId, timestamp: new Date().toISOString() },
      ...prev
    ]);
  };

  const updateAppealStatus = (appealId, action) => {
    const statusMap = {
      approve: "Resolved",
      deny: "Resolved",
      escalate: "Under Review",
      moreInfo: "Under Review"
    };

    setAppeals((prev) =>
      prev.map((appeal) => {
        if (appeal.id !== appealId) return appeal;
        const status = statusMap[action] ?? appeal.status;
        const timeline = [...appeal.timeline];
        if (!timeline.includes("Under Review") && status === "Under Review") timeline.push("Under Review");
        if (status === "Resolved") {
          if (!timeline.includes("Decision Made")) timeline.push("Decision Made");
          if (!timeline.includes("Resolved")) timeline.push("Resolved");
        }
        return { ...appeal, status, timeline };
      })
    );

    if (action === "approve") {
      const appeal = appeals.find((a) => a.id === appealId);
      if (appeal) {
        setDecisions((prev) => prev.map((d) => (d.id === appeal.decisionId ? { ...d, outcome: "Overturned", status: "Closed" } : d)));
      }
    }
  };

  const toggleDecisionFlag = (decisionId) => {
    setAuditEntries((prev) => prev.map((entry) => (entry.decisionId === decisionId ? { ...entry, status: entry.status === "Flagged" ? "Reviewed" : "Flagged" } : entry)));
  };

  const updateUserStatus = (userId, status) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
  };

  const value = useMemo(
    () => ({
      roles,
      activeRole,
      setActiveRole,
      users,
      decisions,
      appeals,
      auditEntries,
      ridesAndTrips,
      fairnessMetrics,
      clarificationRequests,
      selectedAuditFilter,
      setSelectedAuditFilter,
      addAppeal,
      addClarificationRequest,
      updateAppealStatus,
      toggleDecisionFlag,
      updateUserStatus
    }),
    [activeRole, users, decisions, appeals, auditEntries, clarificationRequests, selectedAuditFilter]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
};
