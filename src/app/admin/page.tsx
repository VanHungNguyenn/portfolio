"use client";

import { useCallback, useEffect, useState } from "react";

type Tab = "profile" | "experience" | "projects" | "cv";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) setAuthed(true);
    else setError("Wrong password");
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-900">
        <div className="w-full max-w-sm space-y-4 rounded-xl border border-slate-200/10 bg-navy-800 p-8">
          <h1 className="text-lg font-bold text-slate-100">Admin Login</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className="w-full rounded-lg border border-slate-200/10 bg-navy-900 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-teal/50"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button onClick={login} className="w-full cursor-pointer rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-navy-900 transition-opacity hover:opacity-90">
            Login
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

function Dashboard() {
  const [tab, setTab] = useState<Tab>("profile");

  const tabs: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "experience", label: "Experience" },
    { key: "projects", label: "Projects" },
    { key: "cv", label: "CV File" },
  ];

  return (
    <div className="min-h-screen bg-navy-900 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-100">Portfolio Admin</h1>
          <a href="/" className="text-sm text-teal hover:underline">← Back to site</a>
        </div>
        <div className="mb-6 flex gap-1 rounded-lg border border-slate-200/10 bg-navy-800 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key ? "bg-teal text-navy-900" : "text-slate-300 hover:text-slate-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "profile" && <ProfileEditor />}
        {tab === "experience" && <ExperienceEditor />}
        {tab === "projects" && <ProjectsEditor />}
        {tab === "cv" && <CvUploader />}
      </div>
    </div>
  );
}

// ─── Shared ───

function Field({ label, value, onChange, textarea }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean;
}) {
  const cls = "w-full rounded-lg border border-slate-200/10 bg-navy-900 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-teal/50";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button onClick={onClick} disabled={saving} className="cursor-pointer rounded-lg bg-teal px-6 py-2.5 text-sm font-semibold text-navy-900 transition-opacity hover:opacity-90 disabled:opacity-50">
      {saving ? "Saving..." : "Save"}
    </button>
  );
}

function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return <p className="mt-2 text-xs text-teal">{msg}</p>;
}

// ─── Profile ───

function ProfileEditor() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { fetch("/api/profile").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast("Saved!"); setTimeout(() => setToast(""), 2000);
  };

  if (!data) return <p className="text-slate-400">Loading...</p>;

  const set = (k: string, v: unknown) => setData({ ...data, [k]: v });
  const about = (data.about as string[]) || [];

  return (
    <div className="space-y-4 rounded-xl border border-slate-200/10 bg-navy-800 p-6">
      <Field label="Name" value={data.name as string} onChange={(v) => set("name", v)} />
      <Field label="Role" value={data.role as string} onChange={(v) => set("role", v)} />
      <Field label="Bio (sidebar)" value={data.bio as string} onChange={(v) => set("bio", v)} textarea />
      <Field label="About paragraph 1" value={about[0] || ""} onChange={(v) => set("about", [v, about[1] || ""])} textarea />
      <Field label="About paragraph 2" value={about[1] || ""} onChange={(v) => set("about", [about[0] || "", v])} textarea />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email" value={data.email as string} onChange={(v) => set("email", v)} />
        <Field label="Phone" value={data.phone as string} onChange={(v) => set("phone", v)} />
        <Field label="LinkedIn" value={data.linkedin as string} onChange={(v) => set("linkedin", v)} />
        <Field label="GitHub" value={data.github as string} onChange={(v) => set("github", v)} />
      </div>
      <hr className="border-slate-200/10" />
      <Field label="School" value={data.school as string} onChange={(v) => set("school", v)} />
      <Field label="Degree" value={data.degree as string} onChange={(v) => set("degree", v)} />
      <Field label="School years" value={data.schoolYears as string} onChange={(v) => set("schoolYears", v)} />
      <div className="flex items-center gap-3">
        <SaveBtn onClick={save} saving={saving} />
        <Toast msg={toast} />
      </div>
    </div>
  );
}

// ─── Experience ───

function ExperienceEditor() {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { fetch("/api/experiences").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/experiences", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    setToast("Saved!"); setTimeout(() => setToast(""), 2000);
  };

  if (!data) return <p className="text-slate-400">Loading...</p>;

  const update = (i: number, k: string, v: unknown) => {
    const next = [...data];
    next[i] = { ...next[i], [k]: v };
    setData(next);
  };

  const addExp = () => {
    setData([...data, { role: "", company: "", period: "", current: false, tech: [], points: [""] }]);
  };

  const removeExp = (i: number) => setData(data.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      {data.map((exp, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-slate-200/10 bg-navy-800 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-100">{(exp.company as string) || "New"}</span>
            <button onClick={() => removeExp(i)} className="cursor-pointer text-xs text-red-400 hover:text-red-300">Delete</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Role" value={exp.role as string} onChange={(v) => update(i, "role", v)} />
            <Field label="Company" value={exp.company as string} onChange={(v) => update(i, "company", v)} />
            <Field label="Period" value={exp.period as string} onChange={(v) => update(i, "period", v)} />
            <Field label="Tech (comma)" value={(exp.tech as string[]).join(", ")} onChange={(v) => update(i, "tech", v.split(",").map(s => s.trim()).filter(Boolean))} />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={!!exp.current} onChange={(e) => update(i, "current", e.target.checked)} className="accent-teal" />
            Current job
          </label>
          <Field label="Points (one per line)" value={(exp.points as string[]).join("\n")} textarea onChange={(v) => update(i, "points", v.split("\n").filter(Boolean))} />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={addExp} className="cursor-pointer rounded-lg border border-slate-200/10 px-4 py-2 text-sm text-slate-300 hover:border-teal/30 hover:text-teal">+ Add Experience</button>
        <SaveBtn onClick={save} saving={saving} />
        <Toast msg={toast} />
      </div>
    </div>
  );
}

// ─── Projects ───

function ProjectsEditor() {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => { fetch("/api/projects").then(r => r.json()).then(setData); }, []);

  const save = useCallback(async (projects: Record<string, unknown>[]) => {
    setSaving(true);
    for (const p of projects) {
      await fetch("/api/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    }
    setSaving(false);
    setToast("Saved!"); setTimeout(() => setToast(""), 2000);
  }, []);

  if (!data) return <p className="text-slate-400">Loading...</p>;

  const update = (i: number, k: string, v: unknown) => {
    const next = [...data];
    next[i] = { ...next[i], [k]: v };
    setData(next);
  };

  const addProject = async () => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Project", description: "", year: new Date().getFullYear().toString(), tech: [], overview: "", problem: "", solution: "", highlights: [], images: [] }),
    });
    const p = await res.json();
    setData([...data, p]);
    setExpanded(data.length);
  };

  const deleteProject = async (slug: string) => {
    await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }) });
    setData(data.filter((p) => p.slug !== slug));
  };

  return (
    <div className="space-y-3">
      {data.map((p, i) => (
        <div key={p.slug as string} className="rounded-xl border border-slate-200/10 bg-navy-800">
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
          >
            <div>
              <span className="text-sm font-semibold text-slate-100">{p.title as string}</span>
              <span className="ml-2 text-xs text-slate-400">{p.year as string}</span>
            </div>
            <span className="text-slate-400">{expanded === i ? "▾" : "▸"}</span>
          </button>
          {expanded === i && (
            <div className="space-y-3 border-t border-slate-200/10 p-4">
              <Field label="Title" value={p.title as string} onChange={(v) => update(i, "title", v)} />
              <Field label="Year" value={p.year as string} onChange={(v) => update(i, "year", v)} />
              <Field label="Description" value={p.description as string} onChange={(v) => update(i, "description", v)} textarea />
              <Field label="Tech (comma)" value={(p.tech as string[]).join(", ")} onChange={(v) => update(i, "tech", v.split(",").map(s => s.trim()).filter(Boolean))} />
              <Field label="Overview" value={p.overview as string} onChange={(v) => update(i, "overview", v)} textarea />
              <Field label="Problem" value={p.problem as string} onChange={(v) => update(i, "problem", v)} textarea />
              <Field label="Solution" value={p.solution as string} onChange={(v) => update(i, "solution", v)} textarea />
              <Field label="Highlights (one per line)" value={(p.highlights as string[]).join("\n")} textarea onChange={(v) => update(i, "highlights", v.split("\n").filter(Boolean))} />
              <Field label="Images (one URL per line)" value={(p.images as string[]).join("\n")} textarea onChange={(v) => update(i, "images", v.split("\n").filter(Boolean))} />
              <div className="flex items-center gap-3">
                <button onClick={() => deleteProject(p.slug as string)} className="cursor-pointer rounded-lg border border-red-500/30 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10">Delete Project</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 pt-2">
        <button onClick={addProject} className="cursor-pointer rounded-lg border border-slate-200/10 px-4 py-2 text-sm text-slate-300 hover:border-teal/30 hover:text-teal">+ Add Project</button>
        <SaveBtn onClick={() => save(data)} saving={saving} />
        <Toast msg={toast} />
      </div>
    </div>
  );
}

// ─── CV ───

function CvUploader() {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(d => setUrl(d.cvUrl || ""));
  }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/cv", { method: "POST", body: form });
    const data = await res.json();
    setUrl(data.url);
    setUploading(false);
    setToast("Uploaded!"); setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200/10 bg-navy-800 p-6">
      <div>
        <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">Current CV</span>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-teal hover:underline">{url}</a>
        ) : (
          <span className="text-sm text-slate-500">No CV uploaded</span>
        )}
      </div>
      <div>
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">Upload new CV</span>
        <input type="file" accept=".pdf" onChange={upload} className="text-sm text-slate-300 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-900" />
        {uploading && <p className="mt-2 text-xs text-slate-400">Uploading...</p>}
        <Toast msg={toast} />
      </div>
    </div>
  );
}
