"use client";

import { useState } from "react";
import { Ship, Search, Filter, BarChart3, MessageSquare, FileText, Users, Star, Settings, ChevronDown, ArrowUpRight } from "lucide-react";

type Tab = "dashboard" | "leads" | "services" | "testimonials" | "blog" | "contact";

const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "leads", label: "Leads", icon: Users },
  { id: "services", label: "Services", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "blog", label: "Blog", icon: MessageSquare },
  { id: "contact", label: "Contact Requests", icon: Settings },
];

const mockLeads = [
  { name: "Amara Lindholm", company: "Nordic Medical Group", email: "amara@nmg.com", service: "Import Services", status: "New", date: "2 hours ago" },
  { name: "Rahul Mehta", company: "Orion Components", email: "rahul@orion.co", service: "Export Services", status: "Contacted", date: "1 day ago" },
  { name: "Elena Rossi", company: "ArcLine Retail", email: "elena@arcline.com", service: "Global Sourcing", status: "Qualified", date: "2 days ago" },
  { name: "Kenji Watanabe", company: "TeraForge Mobility", email: "kenji@teraforge.jp", service: "Freight Forwarding", status: "Proposal", date: "3 days ago" },
  { name: "Sarah Chen", company: "Evergreen Retail", email: "sarah@evergreen.com", service: "Customs Clearance", status: "New", date: "5 hours ago" },
];

const statusColors: Record<string, string> = {
  New: "bg-[#b8860b]/10 text-[#b8860b]",
  Contacted: "bg-blue-50 text-blue-600",
  Qualified: "bg-green-50 text-green-600",
  Proposal: "bg-purple-50 text-purple-600",
};

export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-svh bg-[#f8f7f4]">
      <header className="border-b border-[#e5e1db] bg-white px-6 py-4 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e1db] bg-[#f8f7f4]">
              <Ship className="h-4 w-4 text-[#b8860b]" />
            </span>
            <span className="text-sm font-semibold text-[#0f172a]">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#6b6560]">
            <span>admin@ractysh.com</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b8860b]/10 text-xs font-semibold text-[#b8860b]">A</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl px-6 sm:px-10 lg:px-12">
        <aside className="hidden w-56 shrink-0 border-r border-[#e5e1db] py-8 pr-6 lg:block">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-[#b8860b]/10 text-[#b8860b]"
                      : "text-[#6b6560] hover:bg-[#e5e1db]/50 hover:text-[#0f172a]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 py-8 pl-0 lg:pl-8">
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-medium text-[#0f172a]">Dashboard</h1>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Leads", value: "47", change: "+12%", up: true },
                  { label: "Active Services", value: "25", change: "All", up: true },
                  { label: "Testimonials", value: "6", change: "+2 this month", up: true },
                  { label: "Contact Requests", value: "18", change: "+5 this week", up: true },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-[#e5e1db] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6560]">{stat.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-[#0f172a]">{stat.value}</p>
                    <p className="mt-1 text-xs text-green-600">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-medium text-[#0f172a]">Recent Leads</h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-[#e5e1db] bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-[#e5e1db] bg-[#f8f7f4]">
                      <tr>
                        <th className="px-5 py-3 font-semibold text-[#6b6560]">Name</th>
                        <th className="px-5 py-3 font-semibold text-[#6b6560]">Company</th>
                        <th className="px-5 py-3 font-semibold text-[#6b6560]">Service</th>
                        <th className="px-5 py-3 font-semibold text-[#6b6560]">Status</th>
                        <th className="px-5 py-3 font-semibold text-[#6b6560]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLeads.map((lead) => (
                        <tr key={lead.email} className="border-b border-[#e5e1db] last:border-0">
                          <td className="px-5 py-3 font-medium text-[#0f172a]">{lead.name}</td>
                          <td className="px-5 py-3 text-[#6b6560]">{lead.company}</td>
                          <td className="px-5 py-3 text-[#6b6560]">{lead.service}</td>
                          <td className="px-5 py-3">
                            <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ${statusColors[lead.status]}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#6b6560]">{lead.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-[#0f172a]">Leads</h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6560]" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search leads..."
                      className="w-56 rounded-lg border border-[#e5e1db] bg-white py-2 pl-10 pr-4 text-sm text-[#0f172a] outline-none focus:border-[#b8860b]"
                    />
                  </div>
                  <button className="flex items-center gap-2 rounded-lg border border-[#e5e1db] bg-white px-4 py-2 text-sm text-[#6b6560] transition-colors hover:border-[#b8860b]">
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {mockLeads.map((lead) => (
                  <div key={lead.email} className="flex items-center justify-between rounded-xl border border-[#e5e1db] bg-white p-5 transition-all hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b]/10 text-sm font-semibold text-[#b8860b]">
                        {lead.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div>
                        <p className="font-medium text-[#0f172a]">{lead.name}</p>
                        <p className="text-sm text-[#6b6560]">{lead.company} · {lead.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-[#6b6560]">{lead.service}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "services" || activeTab === "testimonials" || activeTab === "blog" || activeTab === "contact") && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-lg font-medium text-[#0f172a]">{tabs.find((t) => t.id === activeTab)?.label}</p>
                <p className="mt-2 text-sm text-[#6b6560]">Module under development. Check back soon.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
