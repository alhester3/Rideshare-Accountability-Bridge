import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  appeals as initialAppeals,
  auditLog as initialAudit,
  decisions as initialDecisions,
  fairnessMetrics as initialFairnessMetrics,
  ridesAndTrips as initialTrips,
  roles,
  users as initialUsers
} from "../data/sampleData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeRole, setActiveRole] = useState("Rider/Customer");
  const [themeMode, setThemeMode] = useState("light");

  const [users, setUsers] = useState(initialUsers);
  const [decisions, setDecisions] = useState(initialDecisions);
  const [appeals, setAppeals] = useState(initialAppeals);
  const [auditEntries, setAuditEntries] = useState(initialAudit);
  const [ridesAndTrips] = useState(initialTrips);
  const [fairnessMetrics] = useState(initialFairnessMetrics);

  const [clarificationRequests, setClarificationRequests] = useState([]);
  const [selectedAuditFilter, setSelectedAuditFilter] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    document.body.classList.toggle("admin-role", activeRole === "Corporate/Admin");
  }, [themeMode, activeRole]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addAppeal = ({ userId, decisionId, reason, context }) => {
    const user = users.find((u) => u.id === userId);
    const id = `app-${Date.now()}`;
    const submittedDate = new Date().toISOString().slice(0, 10);
    setAppeals((prev) => [
      {
        id,
        userId,
        decisionId,
        reason,
        context,
        status: "Pending",
        submittedDate,
        type: user?.role ?? activeRole,
        timeline: ["Submitted"]
      },
      ...prev
    ]);
  };

  const addClarificationRequest = ({ decisionId, message, userId }) => {
    setClarificationRequests((prev) => [
      { id: `clr-${Date.now()}`, decisionId, message, userId, timestamp: new Date().toISOString() },
      ...prev
    ]);
  };

  const updateAppealStatus = (appealId, action) => {
    const statusMap = { approve: "Approved", deny: "Denied", escalate: "Escalated", moreInfo: "UnderReview" };
    const newStatus = statusMap[action] ?? "UnderReview";

    setAppeals((prev) =>
      prev.map((appeal) => {
        if (appeal.id !== appealId) return appeal;
        const friendly =
          newStatus === "UnderReview"
            ? "Under Review"
            : newStatus === "Approved" || newStatus === "Denied"
              ? "Resolved"
              : newStatus === "Escalated"
                ? "Escalated"
                : newStatus;
        const timeline = [...appeal.timeline];
        if (!timeline.includes("Under Review") && friendly !== "Pending") timeline.push("Under Review");
        if (friendly === "Resolved") {
          if (!timeline.includes("Decision Made")) timeline.push("Decision Made");
          if (!timeline.includes("Resolved")) timeline.push("Resolved");
        }
        return {
          ...appeal,
          status: friendly,
          timeline,
          resolution: action === "approve" ? "Approved by admin" : action === "deny" ? "Denied by admin" : appeal.resolution,
          resolvedAt: friendly === "Resolved" ? new Date().toISOString() : appeal.resolvedAt
        };
      })
    );

    if (action === "approve") {
      const appeal = appeals.find((a) => a.id === appealId);
      if (appeal) {
        setDecisions((prev) =>
          prev.map((d) => (d.id === appeal.decisionId ? { ...d, outcome: "Overturned", status: "Overturned" } : d))
        );
      }
    }
  };

  const toggleDecisionFlag = (decisionId) => {
    setAuditEntries((prev) =>
      prev.map((entry) =>
        entry.decisionId === decisionId ? { ...entry, status: entry.status === "Flagged" ? "Reviewed" : "Flagged" } : entry
      )
    );
  };

  const updateUserStatus = (userId, status) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
  };

  const value = useMemo(
    () => ({
      roles,
      activeRole,
      setActiveRole,
      themeMode,
      setThemeMode,
      toggleThemeMode,
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
    [activeRole, themeMode, users, decisions, appeals, auditEntries, ridesAndTrips, fairnessMetrics, clarificationRequests, selectedAuditFilter]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
};
