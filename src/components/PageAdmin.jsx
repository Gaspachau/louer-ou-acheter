import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useSEO } from "../utils/useSEO";

/* ── Helpers ─────────────────────────────────────────────── */
function fmt(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}
function fmtDate(s) {
  if (!s) return "—";
  return new Date(s).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

/* ── Login form ──────────────────────────────────────────── */
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); }
    else onLogin();
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-header">
          <span className="adm-login-icon">🔐</span>
          <h1 className="adm-login-title">Administration</h1>
          <p className="adm-login-sub">louer-acheter.fr</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-login-form">
          <div className="adm-field">
            <label className="adm-label">Email</label>
            <input
              type="email" required autoComplete="email"
              className="adm-input" placeholder="admin@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="adm-field">
            <label className="adm-label">Mot de passe</label>
            <input
              type="password" required autoComplete="current-password"
              className="adm-input" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="adm-error">{error}</p>}
          <button type="submit" className="adm-login-btn" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Stat card ───────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="adm-stat-card" style={{ "--adm-color": color }}>
      <span className="adm-stat-icon">{icon}</span>
      <div className="adm-stat-body">
        <span className="adm-stat-value">{value}</span>
        <span className="adm-stat-label">{label}</span>
        {sub && <span className="adm-stat-sub">{sub}</span>}
      </div>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────── */
function Dashboard({ onLogout }) {
  const [simulations, setSimulations] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("simulations");

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: sims }, { data: nl }, { data: lds }] = await Promise.all([
      supabase.from("simulations").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("newsletter").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    setSimulations(sims ?? []);
    setNewsletter(nl ?? []);
    setLeads(lds ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  /* KPIs */
  const buyCount  = simulations.filter((s) => s.resultat_verdict === "acheter").length;
  const rentCount = simulations.filter((s) => s.resultat_verdict === "louer").length;
  const nlActif   = newsletter.filter((n) => n.actif).length;
  const avgDiff   = simulations.length
    ? Math.round(simulations.reduce((a, s) => a + (s.resultat_difference ?? 0), 0) / simulations.length)
    : 0;

  /* Export CSV */
  const exportCSV = (rows, filename) => {
    if (!rows.length) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(";"), ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(";"))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="adm-root">
      {/* Header */}
      <header className="adm-header">
        <div className="adm-header-inner">
          <div className="adm-header-left">
            <span className="adm-header-logo">📊</span>
            <div>
              <h1 className="adm-header-title">Dashboard admin</h1>
              <p className="adm-header-sub">louer-acheter.fr</p>
            </div>
          </div>
          <div className="adm-header-right">
            <button className="adm-refresh-btn" onClick={load} disabled={loading}>
              {loading ? "…" : "⟳ Actualiser"}
            </button>
            <button className="adm-logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </div>
      </header>

      <div className="adm-content">
        {loading ? (
          <div className="adm-loading">Chargement des données…</div>
        ) : (
          <>
            {/* Stats */}
            <div className="adm-stats-grid">
              <StatCard icon="📐" label="Simulations totales" value={simulations.length} sub="louer-acheter" color="#2563eb" />
              <StatCard icon="🏠" label="Verdict Acheter" value={buyCount} sub={`${simulations.length ? Math.round(buyCount/simulations.length*100) : 0}%`} color="#059669" />
              <StatCard icon="🔑" label="Verdict Louer" value={rentCount} sub={`${simulations.length ? Math.round(rentCount/simulations.length*100) : 0}%`} color="#d97706" />
              <StatCard icon="📧" label="Newsletter actifs" value={nlActif} sub={`${newsletter.length} total`} color="#7c3aed" />
              <StatCard icon="🎯" label="Leads email" value={leads.length} sub="captures formulaire" color="#0d9488" />
              <StatCard icon="💰" label="Différence moy." value={fmt(avgDiff)} sub="achat vs location" color="#db2777" />
            </div>

            {/* Tabs */}
            <div className="adm-tabs">
              {[
                { id: "simulations", label: `Simulations (${simulations.length})` },
                { id: "newsletter", label: `Newsletter (${newsletter.length})` },
                { id: "leads", label: `Leads (${leads.length})` },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`adm-tab${activeTab === t.id ? " adm-tab-active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Table: Simulations */}
            {activeTab === "simulations" && (
              <div className="adm-table-wrap">
                <div className="adm-table-actions">
                  <button className="adm-export-btn" onClick={() => exportCSV(simulations, "simulations.csv")}>
                    ⬇ Exporter CSV
                  </button>
                </div>
                <div className="adm-table-scroll">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Date</th><th>Ville</th><th>Profil</th><th>Revenus</th>
                        <th>Apport</th><th>Prix bien</th><th>Taux</th><th>Loyer</th>
                        <th>Verdict</th><th>Différence</th><th>Équilibre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {simulations.map((s) => (
                        <tr key={s.id}>
                          <td>{fmtDate(s.created_at)}</td>
                          <td>{s.ville ?? "—"}</td>
                          <td>{s.profil ?? "—"}</td>
                          <td>{s.revenus ? `${s.revenus.toLocaleString("fr-FR")} €` : "—"}</td>
                          <td>{s.apport ? fmt(s.apport) : "—"}</td>
                          <td>{s.prix_bien ? fmt(s.prix_bien) : "—"}</td>
                          <td>{s.taux != null ? `${s.taux}%` : "—"}</td>
                          <td>{s.loyer ? `${s.loyer} €` : "—"}</td>
                          <td>
                            <span className={`adm-verdict adm-verdict-${s.resultat_verdict}`}>
                              {s.resultat_verdict === "acheter" ? "🏠 Acheter" : s.resultat_verdict === "louer" ? "🔑 Louer" : "—"}
                            </span>
                          </td>
                          <td>{s.resultat_difference ? fmt(s.resultat_difference) : "—"}</td>
                          <td>{s.point_equilibre ? `${s.point_equilibre} ans` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table: Newsletter */}
            {activeTab === "newsletter" && (
              <div className="adm-table-wrap">
                <div className="adm-table-actions">
                  <button className="adm-export-btn" onClick={() => exportCSV(newsletter, "newsletter.csv")}>
                    ⬇ Exporter CSV
                  </button>
                </div>
                <div className="adm-table-scroll">
                  <table className="adm-table">
                    <thead>
                      <tr><th>Date</th><th>Email</th><th>Statut</th></tr>
                    </thead>
                    <tbody>
                      {newsletter.map((n) => (
                        <tr key={n.id}>
                          <td>{fmtDate(n.created_at)}</td>
                          <td>{n.email}</td>
                          <td><span className={`adm-badge ${n.actif ? "adm-badge-green" : "adm-badge-gray"}`}>{n.actif ? "Actif" : "Désabonné"}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table: Leads */}
            {activeTab === "leads" && (
              <div className="adm-table-wrap">
                <div className="adm-table-actions">
                  <button className="adm-export-btn" onClick={() => exportCSV(leads, "leads.csv")}>
                    ⬇ Exporter CSV
                  </button>
                </div>
                <div className="adm-table-scroll">
                  <table className="adm-table">
                    <thead>
                      <tr><th>Date</th><th>Email</th><th>Source</th><th>Simulation ID</th></tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id}>
                          <td>{fmtDate(l.created_at)}</td>
                          <td>{l.email}</td>
                          <td>{l.source ?? "—"}</td>
                          <td className="adm-uuid">{l.simulation_id ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────── */
export default function PageAdmin() {
  useSEO({ title: "Admin", path: "/admin", robots: "noindex, nofollow" });
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="adm-loading-page">Chargement…</div>;
  }

  if (!session) {
    return <LoginForm onLogin={() => {}} />;
  }

  return <Dashboard onLogout={() => setSession(null)} />;
}
