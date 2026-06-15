"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  Bell,
  Check,
  Archive,
  Inbox,
  MessageSquare,
  AlertTriangle,
  FileText,
  UserPlus,
  Activity,
  Clock
} from "lucide-react";
import type { AdminCommandCenterData } from "@ractysh/types/admin";

function isToday(d: string) {
  return new Date(d).toDateString() === new Date().toDateString();
}

function formatNumber(n: number) {
  return n.toLocaleString();
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function priorityBadgeClasses(p: string) {
  switch (p) {
    case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default: return "bg-[#1f1f1f] text-[#8a8a92] border-[#232323]";
  }
}

function priorityLabel(p: string) {
  switch (p) {
    case "critical": return "Urgent";
    case "high": return "High";
    case "medium": return "Medium";
    default: return "Low";
  }
}

export function SimpleDashboard({ data: initialData, projectKey }: { data: AdminCommandCenterData; projectKey: string }) {
  const [data, setData] = React.useState(initialData);
  const [pending, setPending] = React.useState(false);

  const projectNotifications = React.useMemo(
    () => data.notifications.filter((n) => n.project === projectKey),
    [data.notifications, projectKey]
  );

  const projectAlerts = React.useMemo(
    () => data.criticalAlerts.filter((a) => a.project === projectKey),
    [data.criticalAlerts, projectKey]
  );

  const projectActivities = React.useMemo(
    () => data.activities.filter((a) => a.project === projectKey),
    [data.activities, projectKey]
  );

  const unreadCount = React.useMemo(
    () => projectNotifications.filter((n) => n.status === "unread").length,
    [projectNotifications]
  );

  const sortedNotifications = React.useMemo(
    () => [...projectNotifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [projectNotifications]
  );

  const todayStats = React.useMemo(
    () => [
      { icon: Inbox, label: "New Leads", value: data.leads.filter((l) => l.division === projectKey && isToday(l.createdAt)).length, color: "text-blue-400" },
      { icon: MessageSquare, label: "Contact Forms", value: data.contacts.filter((c) => c.division === projectKey && isToday(c.createdAt)).length, color: "text-emerald-400" },
      { icon: FileText, label: "Applications", value: data.applications.filter((a) => a.division === projectKey && isToday(a.createdAt)).length, color: "text-violet-400" },
      { icon: UserPlus, label: "Subscribers", value: data.subscribers.filter((s) => s.division === projectKey && isToday(s.createdAt)).length, color: "text-amber-400" },
    ],
    [data, projectKey]
  );

  const runIntent = React.useCallback(
    async (body: Record<string, unknown>, successMessage: string) => {
      setPending(true);
      try {
        const res = await fetch("/api/admin/command-center", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok || !payload.success || !payload.data) {
          throw new Error(payload.message || "Action failed.");
        }
        setData(payload.data);
        toast.success(successMessage);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Action failed.");
      } finally {
        setPending(false);
      }
    },
    []
  );

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#f5f5f5" },
        }}
      />
      <div className="mx-auto max-w-4xl space-y-6 py-6">
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8a8a92]">
            <Clock className="h-3 w-3" />
            {new Date(data.generatedAt).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#f5f5f5]">Dashboard</h1>
          <p className="text-sm text-[#8a8a92]">Here&apos;s what&apos;s happening today.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {todayStats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[10px] border border-[#1f1f1f] bg-[#111] p-4"
            >
              <div className="flex items-center gap-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                <p className="text-xs text-[#8a8a92]">{s.label}</p>
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#f5f5f5]">{formatNumber(s.value)}</p>
            </motion.div>
          ))}
        </div>

        {projectAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[10px] border border-red-500/20 bg-red-500/5 p-4"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <p className="text-sm font-semibold text-red-400">
                {projectAlerts.length} Alert{projectAlerts.length > 1 ? "s" : ""} Need Attention
              </p>
            </div>
            <div className="mt-2 space-y-1.5">
              {projectAlerts.slice(0, 3).map((a) => (
                <p key={a.id} className="text-sm text-[#c0c0c0]">{a.title}</p>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#b8860b]" />
              <h2 className="text-sm font-semibold text-[#f5f5f5]">Notifications</h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[#b8860b] px-2 py-0.5 text-[10px] font-bold text-[#0d0d0d]">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                disabled={pending}
                onClick={() => runIntent({ intent: "notification.markAllRead" }, "Marked all as read.")}
                className="flex items-center gap-1.5 rounded-[8px] border border-[#1f1f1f] px-3 py-1.5 text-xs text-[#8a8a92] transition hover:border-[#b8860b]/40 hover:text-[#f5f5f5] disabled:opacity-50"
              >
                <Check className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          <div className="space-y-2">
            {sortedNotifications.length > 0 ? (
              sortedNotifications.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`group rounded-[10px] border p-4 transition ${
                    n.status === "unread"
                      ? "border-[#b8860b]/20 bg-[#b8860b]/5"
                      : "border-[#1f1f1f] bg-[#111]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          n.status === "unread" ? "bg-[#b8860b]" : n.status === "read" ? "bg-[#4ade80]" : "bg-[#8a8a92]"
                        }`} />
                        <span className={`rounded-[6px] border px-2 py-0.5 text-[10px] font-medium ${priorityBadgeClasses(n.priority)}`}>
                          {priorityLabel(n.priority)}
                        </span>
                        <span className="text-[10px] text-[#8a8a92]">{timeAgo(n.createdAt)}</span>
                      </div>
                      <p className={`mt-1.5 text-sm font-medium ${n.status === "unread" ? "text-[#f5f5f5]" : "text-[#c0c0c0]"}`}>
                        {n.title}
                      </p>
                      {n.message && (
                        <p className="mt-0.5 text-sm leading-5 text-[#8a8a92]">{n.message}</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-1.5 opacity-0 transition group-hover:opacity-100">
                      {n.status === "unread" && (
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => runIntent({ intent: "notification.markRead", id: n.id }, "Marked as read.")}
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#1f1f1f] text-[#8a8a92] transition hover:border-[#4ade80]/40 hover:text-[#4ade80]"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={pending || n.status === "archived"}
                        onClick={() => runIntent({ intent: "notification.archive", id: n.id }, "Archived.")}
                        className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#1f1f1f] text-[#8a8a92] transition hover:border-[#b8860b]/40 hover:text-[#b8860b]"
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="rounded-[10px] border border-[#1f1f1f] bg-[#111] p-8 text-center">
                <Bell className="mx-auto h-6 w-6 text-[#8a8a92]" />
                <p className="mt-2 text-sm text-[#8a8a92]">No notifications yet</p>
              </div>
            )}
          </div>
        </motion.div>

        {projectActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#8a8a92]" />
              <h2 className="text-sm font-semibold text-[#f5f5f5]">Recent Activity</h2>
            </div>
            <div className="space-y-1">
              {projectActivities.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-[8px] border border-[#1f1f1f] bg-[#111] px-4 py-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#b8860b]/60" />
                  <p className="flex-1 truncate text-sm text-[#c0c0c0]">{a.detail || a.action}</p>
                  <span className="text-[10px] text-[#8a8a92]">{timeAgo(a.createdAt)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
