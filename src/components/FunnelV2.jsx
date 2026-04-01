import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from "recharts";
import { VILLES, MOYENNE_NATIONALE } from "../data/villes";
import { saveSimulation } from "../lib/supabase";

/* ─── Helpers ─────────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) =>
  Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`;

function normalizeStr(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mortgage(principal, rateAnnual, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = rateAnnual / 100 / 12;
  if (r === 0) return principal / (years * 12);
  return (principal * r) / (1 - Math.pow(1 + r, -(years * 12)));
}

function remainingBalance(principal, rateAnnual, years, monthsPaid) {
  if (monthsPaid <= 0) return principal;
  if (monthsPaid >= years * 12) return 0;
  const r = rateAnnual / 100 / 12;
  if (r === 0) return Math.max(0, principal - (principal / (years * 12)) * monthsPaid);
  const p = mortgage(principal, rateAnnual, years);
  return principal * Math.pow(1 + r, monthsPaid) - p * ((Math.pow(1 + r, monthsPaid) - 1) / r);
}

function computeResult(v) {
  const revenus_total = v.achat === "couple" ? v.revenus + (v.revenus_co || 0) : v.revenus;
  const loan = Math.max(0, v.prix_bien - v.apport);
  const notary = v.prix_bien * (v.frais_notaire_pct / 100);
  const mensualite = mortgage(loan, v.taux, v.duree_credit);
  const ville = v.ville ?? MOYENNE_NATIONALE;
  const annualTax = ville.taxe_fonciere ?? 900;
  const annualCopro = (ville.charges_copro ?? 180) * 12;
  const annualMaint = v.prix_bien * 0.008;
  const annualInsurance = 350;
  const owner_total_monthly = mensualite + (annualTax + annualCopro + annualMaint + annualInsurance) / 12;
  const appRate = (v.appreciation ?? ville.appreciation ?? 2.0) / 100;
  const investRate = 0.04 / 12;
  const loyer_total = v.situation === "proprietaire" ? 0 : ((v.loyer ?? 0) + (v.charges ?? 0));

  let renterPortfolio = v.apport + notary;
  const yearlyData = [];
  const months = v.duree_sejour * 12;

  for (let m = 1; m <= months; m++) {
    const yr = Math.floor((m - 1) / 12);
    const rentM = loyer_total * Math.pow(1 + (v.rentRise ? 0.018 : 0), yr);
    const surplus = Math.max(0, owner_total_monthly - rentM);
    renterPortfolio = renterPortfolio * (1 + investRate) + surplus;
    if (m % 12 === 0) {
      const year = m / 12;
      const propVal = v.prix_bien * Math.pow(1 + appRate, year);
      const rem = remainingBalance(loan, v.taux, v.duree_credit, m);
      const ownerNW = propVal - rem - propVal * 0.05;
      yearlyData.push({ year, ownerNW: Math.round(ownerNW), renterNW: Math.round(renterPortfolio) });
    }
  }

  const propValEnd = v.prix_bien * Math.pow(1 + appRate, v.duree_sejour);
  const remEnd = remainingBalance(loan, v.taux, v.duree_credit, months);
  const ownerNWEnd = propValEnd - remEnd - propValEnd * 0.05;
  const advantage = ownerNWEnd - renterPortfolio;
  const isBuyBetter = advantage >= 0;

  let breakEven = null;
  for (const d of yearlyData) {
    if (d.ownerNW >= d.renterNW) { breakEven = d.year; break; }
  }

  const taux_endettement = revenus_total > 0 ? (mensualite / revenus_total) * 100 : 0;
  const capacite_emprunt = Math.round(revenus_total * 0.35 * (1 - Math.pow(1 + v.taux / 100 / 12, -(v.duree_credit * 12))) / (v.taux / 100 / 12));

  return {
    mensualite, owner_total_monthly, notary, loan,
    ownerNWEnd, renterPortfolio, advantage, isBuyBetter,
    breakEven, yearlyData, taux_endettement, capacite_emprunt,
    revenus_total, loyer_total,
  };
}

/* ─── Defaults ────────────────────────────────────────────── */
const DEFAULTS = {
  situation: null,       // locataire | heberge | proprietaire
  ville: null,           // from VILLES or null (= MOYENNE_NATIONALE)
  revenus: 3000,
  revenus_co: 0,
  situation_pro: null,   // cdi | fonctionnaire | freelance | autre
  achat: "seul",         // seul | couple
  apport: 40000,
  prix_bien: 250000,
  duree_sejour: 10,
  loyer: 800,
  charges: 80,
  taux: 3.5,
  duree_credit: 20,
  frais_notaire_pct: 8,
  appreciation: null,    // null = use ville.appreciation
  rentRise: false,
  showAdvanced: false,
};

const RESULT_STEP = 5;

/* ─── Slider ───────────────────────────────────────────────── */
function Slider({ label, value, onChange, min, max, step = 1, format, hint }) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="fv2-slider-wrap">
      <div className="fv2-slider-header">
        <span className="fv2-slider-label">{label}</span>
        <span className="fv2-slider-val">{format ? format(value) : value}</span>
      </div>
      <div className="fv2-slider-track-wrap">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="fv2-slider"
          style={{ "--pct": `${pct}%` }}
        />
        <div className="fv2-slider-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="fv2-slider-minmax">
        <span>{format ? format(min) : min}</span>
        <span>{format ? format(max) : max}</span>
      </div>
      {hint && <p className="fv2-hint">{hint}</p>}
    </div>
  );
}

/* ─── ChoiceBtn ────────────────────────────────────────────── */
function ChoiceBtn({ active, onClick, icon, label, sub }) {
  return (
    <button type="button" className={`fv2-choice${active ? " fv2-choice-active" : ""}`} onClick={onClick}>
      {icon && <span className="fv2-choice-icon">{icon}</span>}
      <span className="fv2-choice-body">
        <span className="fv2-choice-label">{label}</span>
        {sub && <span className="fv2-choice-sub">{sub}</span>}
      </span>
      {active && (
        <span className="fv2-choice-check" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#1a56db" />
            <path d="M5 8l2.5 2.5L11 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

/* ─── CitySearch ───────────────────────────────────────────── */
function CitySearch({ ville, onSelect }) {
  const [query, setQuery] = useState(ville?.nom ?? "");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const norm = normalizeStr(query);
    return VILLES.filter((c) => normalizeStr(c.nom).includes(norm)).slice(0, 8);
  }, [query]);

  const select = (c) => {
    setQuery(c.nom);
    setOpen(false);
    onSelect(c);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setOpen(true);
    if (e.target.value === "") onSelect(null);
  };

  const clear = () => {
    setQuery("");
    onSelect(null);
    inputRef.current?.focus();
  };

  return (
    <div className="sf-city-search">
      <div className="sf-city-search-wrap">
        <span className="sf-city-search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.75"/>
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          className="sf-city-search-input"
          placeholder="Rechercher une ville (ex: Lyon, Nantes…)"
          value={query}
          onChange={handleChange}
          onFocus={() => query.length >= 2 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          autoComplete="off"
        />
        {query && (
          <button type="button" className="sf-city-search-clear" onClick={clear} aria-label="Effacer">
            ✕
          </button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div className="sf-city-suggestions">
          {suggestions.map((c) => (
            <button key={c.id} type="button" className="sf-city-suggestion-item"
              onMouseDown={() => select(c)}>
              <span className="sf-sug-name">{c.nom}</span>
              <span className="sf-sug-meta">{c.prix_m2.toLocaleString("fr-FR")} €/m² · {c.tension}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── CityCard ─────────────────────────────────────────────── */
function CityCard({ ville }) {
  if (!ville) return null;
  const tensionKey = normalizeStr(ville.tension ?? "").replace(/\s+/g, "-");
  return (
    <div className="sf-city-card">
      <div className="sf-city-card-header">
        <span className="sf-city-card-name">{ville.nom}</span>
        <span className={`sf-city-tension sf-tension-${tensionKey}`}>{ville.tension}</span>
      </div>
      <div className="sf-city-card-stats">
        <div className="sf-city-stat">
          <span className="sf-city-stat-val">{ville.prix_m2.toLocaleString("fr-FR")} €</span>
          <span className="sf-city-stat-lbl">Prix/m²</span>
        </div>
        <div className="sf-city-stat">
          <span className="sf-city-stat-val">{ville.loyer_t2} €</span>
          <span className="sf-city-stat-lbl">Loyer T2/mois</span>
        </div>
        <div className="sf-city-stat">
          <span className="sf-city-stat-val">{ville.appreciation} %/an</span>
          <span className="sf-city-stat-lbl">Appréciation</span>
        </div>
        <div className="sf-city-stat">
          <span className="sf-city-stat-val">{ville.rentabilite_annees} ans</span>
          <span className="sf-city-stat-lbl">Seuil rentabilité</span>
        </div>
      </div>
      {ville.commentaire && (
        <p className="sf-city-card-comment">{ville.commentaire}</p>
      )}
    </div>
  );
}

/* ─── ProgressBar ──────────────────────────────────────────── */
const STEP_NAMES = ["Situation", "Finances", "Projet", "Location"];

function ProgressBar({ step, total, onBack }) {
  const pct = (step / total) * 100;
  const label = STEP_NAMES[step - 1] ?? "Résultat";
  return (
    <div className="fv2-progress-bar">
      <div className="fv2-progress-top">
        {step > 1 ? (
          <button type="button" className="fv2-back-btn" onClick={onBack} aria-label="Retour">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : <span />}
        <span className="fv2-progress-label">
          <strong>{label}</strong>
          <span className="fv2-progress-step"> — étape {step}/{total}</span>
        </span>
        <span />
      </div>
      <div className="fv2-progress-track">
        <div className="fv2-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─── Chart tooltip ───────────────────────────────────────── */
function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="fv2-chart-tip">
      <p className="fv2-chart-tip-year">Année {label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="fv2-chart-tip-row" style={{ color: p.stroke }}>
          <span>{p.name}</span><span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 1 — SITUATION + VILLE
   ════════════════════════════════════════════════════════════ */
function Step1({ v, set, applyVille, onNext }) {
  const villeDisplay = v.ville ?? MOYENNE_NATIONALE;

  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">ÉTAPE 1</div>
      <h1 className="fv2-card-title">Votre situation actuelle</h1>
      <p className="fv2-card-desc">Où en êtes-vous aujourd'hui ?</p>

      <div className="fv2-choices-col">
        <ChoiceBtn
          active={v.situation === "locataire"}
          onClick={() => set("situation")("locataire")}
          icon="🔑"
          label="Je suis locataire"
          sub="Je paie un loyer chaque mois"
        />
        <ChoiceBtn
          active={v.situation === "heberge"}
          onClick={() => set("situation")("heberge")}
          icon="👨‍👩‍👦"
          label="Je suis hébergé gratuitement"
          sub="Chez mes parents ou un proche"
        />
        <ChoiceBtn
          active={v.situation === "proprietaire"}
          onClick={() => set("situation")("proprietaire")}
          icon="🏠"
          label="Je suis propriétaire"
          sub="Je souhaite changer de bien"
        />
      </div>

      <div style={{ marginTop: 28 }}>
        <p className="fv2-field-label" style={{ marginBottom: 10 }}>
          Où souhaitez-vous acheter ?
        </p>
        <CitySearch ville={v.ville} onSelect={applyVille} />

        {!v.ville && (
          <button
            type="button"
            className="sf-national-btn"
            onClick={() => applyVille(MOYENNE_NATIONALE)}
          >
            Utiliser la moyenne nationale
          </button>
        )}

        <CityCard ville={villeDisplay} />
      </div>

      <button
        className="btn-primary fv2-cta"
        onClick={onNext}
        disabled={!v.situation}
        style={{ marginTop: 24 }}
      >
        Continuer →
      </button>
      {!v.situation && (
        <p className="fv2-micro">Choisissez votre situation pour continuer</p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 2 — FINANCES
   ════════════════════════════════════════════════════════════ */
function Step2({ v, set, onNext }) {
  const revenus_total = v.achat === "couple" ? v.revenus + (v.revenus_co || 0) : v.revenus;
  const capacite = Math.round(
    revenus_total * 0.35 * (1 - Math.pow(1 + v.taux / 100 / 12, -(v.duree_credit * 12))) / (v.taux / 100 / 12)
  );

  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">ÉTAPE 2</div>
      <h1 className="fv2-card-title">Votre profil financier</h1>

      {/* Seul ou couple */}
      <div style={{ marginBottom: 20 }}>
        <p className="fv2-field-label" style={{ marginBottom: 10 }}>Vous achetez</p>
        <div className="fv2-choices-row">
          <ChoiceBtn
            active={v.achat === "seul"}
            onClick={() => set("achat")("seul")}
            icon="🧍"
            label="Seul(e)"
          />
          <ChoiceBtn
            active={v.achat === "couple"}
            onClick={() => set("achat")("couple")}
            icon="👫"
            label="À deux"
          />
        </div>
      </div>

      {/* Revenus */}
      <Slider
        label={v.achat === "couple" ? "Vos revenus nets (vous)" : "Revenus mensuels nets"}
        value={v.revenus}
        onChange={set("revenus")}
        min={1000} max={12000} step={100}
        format={(x) => `${x.toLocaleString("fr-FR")} €/mois`}
      />

      {v.achat === "couple" && (
        <Slider
          label="Revenus nets du co-emprunteur"
          value={v.revenus_co}
          onChange={set("revenus_co")}
          min={0} max={10000} step={100}
          format={(x) => `${x.toLocaleString("fr-FR")} €/mois`}
        />
      )}

      <div className="fv2-hint" style={{ marginTop: -4, marginBottom: 16 }}>
        Capacité d'emprunt théorique : <strong>{fmt(capacite)}</strong>
        {v.achat === "couple" && (
          <span> (revenus combinés : {fmt(revenus_total)}/mois)</span>
        )}
      </div>

      {/* Situation pro */}
      <div style={{ marginBottom: 20 }}>
        <p className="fv2-field-label" style={{ marginBottom: 10 }}>Situation professionnelle</p>
        <div className="fv2-emploi-grid">
          {[
            { id: "cdi",           label: "CDI",           icon: "👔" },
            { id: "fonctionnaire", label: "Fonctionnaire", icon: "🏛️" },
            { id: "freelance",     label: "Indépendant",   icon: "💻" },
            { id: "autre",         label: "Autre",         icon: "🔧" },
          ].map((e) => (
            <ChoiceBtn
              key={e.id}
              active={v.situation_pro === e.id}
              onClick={() => set("situation_pro")(e.id)}
              icon={e.icon}
              label={e.label}
            />
          ))}
        </div>
        {v.situation_pro === "freelance" && (
          <p className="fv2-hint" style={{ marginTop: 8, color: "var(--amber)" }}>
            ⚠️ En tant qu'indépendant, les banques appliquent souvent des conditions plus strictes (3 ans de bilans requis).
          </p>
        )}
      </div>

      {/* Apport */}
      <Slider
        label="Apport personnel"
        value={v.apport}
        onChange={set("apport")}
        min={0} max={Math.min(v.prix_bien, 200000)} step={1000}
        format={fmt}
        hint={
          v.prix_bien > 0
            ? (() => {
                const pct = Math.round((v.apport / v.prix_bien) * 100);
                return pct >= 10
                  ? `${pct} % du prix — bon dossier ✓`
                  : pct > 0
                  ? `${pct} % du prix — en dessous de 10 %, taux majoré ⚠️`
                  : "Sans apport : financement difficile ⚠️";
              })()
            : null
        }
      />

      <button className="btn-primary fv2-cta" onClick={onNext}>
        Continuer →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 3 — PROJET
   ════════════════════════════════════════════════════════════ */
function Step3({ v, set, onNext }) {
  const ville = v.ville ?? MOYENNE_NATIONALE;
  const suggestedMin = Math.round(ville.prix_m2 * 25);
  const suggestedMax = Math.round(ville.prix_m2 * 120);
  const loan = Math.max(0, v.prix_bien - v.apport);
  const mensualite = Math.round(mortgage(loan, v.taux, v.duree_credit));
  const notary = Math.round(v.prix_bien * (v.frais_notaire_pct / 100));

  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">ÉTAPE 3</div>
      <h1 className="fv2-card-title">Votre projet immobilier</h1>

      <Slider
        label="Prix du bien visé"
        value={v.prix_bien}
        onChange={set("prix_bien")}
        min={Math.max(50000, suggestedMin)} max={Math.min(1500000, suggestedMax)} step={5000}
        format={fmt}
        hint={`À ${ville.nom} : ~${ville.prix_m2.toLocaleString("fr-FR")} €/m² · mensualité estimée : ${fmt(mensualite)}/mois`}
      />

      <Slider
        label="Combien d'années prévoyez-vous d'y rester ?"
        value={v.duree_sejour}
        onChange={set("duree_sejour")}
        min={1} max={25} step={1}
        format={(x) => `${x} an${x > 1 ? "s" : ""}`}
        hint={
          v.duree_sejour < 5
            ? "⚠️ Horizon court : louer est souvent plus avantageux en dessous de 5 ans."
            : v.duree_sejour >= 10
            ? "✓ Horizon long : l'achat a le temps de s'amortir pleinement."
            : "Entre 5 et 10 ans : le résultat dépend du marché local."
        }
      />

      {/* Récap financement */}
      <div className="fv2-finance-summary">
        <div className="fv2-fs-item">
          <span className="fv2-fs-label">Emprunt</span>
          <span className="fv2-fs-val">{fmt(loan)}</span>
        </div>
        <div className="fv2-fs-item">
          <span className="fv2-fs-label">Frais de notaire</span>
          <span className="fv2-fs-val">{fmt(notary)}</span>
        </div>
        <div className="fv2-fs-item fv2-fs-highlight">
          <span className="fv2-fs-label">Mensualité estimée</span>
          <span className="fv2-fs-val">{fmt(mensualite)}/mois</span>
        </div>
      </div>

      {/* Accordion paramètres avancés */}
      <button
        type="button"
        className="fv2-toggle-advanced"
        onClick={() => set("showAdvanced")(!v.showAdvanced)}
      >
        <span>{v.showAdvanced ? "▲" : "▼"}</span>
        Paramètres avancés
      </button>

      {v.showAdvanced && (
        <div className="fv2-advanced">
          <Slider
            label="Taux d'intérêt"
            value={v.taux}
            onChange={set("taux")}
            min={1.5} max={6.0} step={0.1}
            format={(x) => `${x.toFixed(1)} %`}
            hint="Taux moyen 20 ans en 2026 : 3,3–3,8 %"
          />
          <Slider
            label="Durée du crédit"
            value={v.duree_credit}
            onChange={set("duree_credit")}
            min={10} max={25} step={1}
            format={(x) => `${x} ans`}
          />
          <Slider
            label="Frais de notaire"
            value={v.frais_notaire_pct}
            onChange={set("frais_notaire_pct")}
            min={2} max={10} step={0.5}
            format={(x) => `${x.toFixed(1)} %`}
            hint="Ancien : ~8 %. Neuf ou VEFA : ~2,5 %"
          />
          <Slider
            label="Appréciation annuelle du bien"
            value={v.appreciation ?? (v.ville?.appreciation ?? MOYENNE_NATIONALE.appreciation)}
            onChange={set("appreciation")}
            min={0} max={6} step={0.5}
            format={(x) => `${x.toFixed(1)} %/an`}
            hint={`Valeur suggérée pour ${ville.nom} : ${ville.appreciation} %/an`}
          />
        </div>
      )}

      <button className="btn-primary fv2-cta" onClick={onNext}>
        Continuer →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 4 — SITUATION LOCATIVE (skipped for propriétaires)
   ════════════════════════════════════════════════════════════ */
function Step4({ v, set, onNext }) {
  const ville = v.ville ?? MOYENNE_NATIONALE;

  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">ÉTAPE 4</div>
      <h1 className="fv2-card-title">Votre situation actuelle</h1>
      <p className="fv2-card-desc">
        {v.situation === "heberge"
          ? "Vous êtes hébergé gratuitement — indiquez 0 pour le loyer."
          : "Quel est votre loyer actuel ?"}
      </p>

      <div className="fv2-field-wrap">
        <label className="fv2-field-label">Loyer mensuel</label>
        <div className="fv2-field-row">
          <input
            type="number" min={0} step={10}
            className="fv2-field-input"
            value={v.loyer}
            onChange={(e) => set("loyer")(Number(e.target.value) || 0)}
          />
          <span className="fv2-field-suffix">€/mois</span>
        </div>
      </div>

      <div className="fv2-field-wrap">
        <label className="fv2-field-label">Charges locatives</label>
        <div className="fv2-field-row">
          <input
            type="number" min={0} step={10}
            className="fv2-field-input"
            value={v.charges}
            onChange={(e) => set("charges")(Number(e.target.value) || 0)}
          />
          <span className="fv2-field-suffix">€/mois</span>
        </div>
        <p className="fv2-hint">Charges récupérables non incluses dans le loyer (eau, ordures…)</p>
      </div>

      <div
        className="fv2-toggle-row"
        role="switch"
        aria-checked={v.rentRise}
        tabIndex={0}
        onClick={() => set("rentRise")(!v.rentRise)}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && set("rentRise")(!v.rentRise)}
      >
        <div className={`fv2-toggle${v.rentRise ? " fv2-toggle-on" : ""}`}>
          <div className="fv2-toggle-thumb" />
        </div>
        <span className="fv2-toggle-label">
          Mon loyer va probablement augmenter
          <span className="fv2-toggle-sub">Indexation IRL ~1,8 %/an prise en compte</span>
        </span>
      </div>

      <div className="fv2-recap-box">
        <p className="fv2-recap-title">📊 Récapitulatif du projet</p>
        <div className="fv2-recap-grid">
          <div><span>Prix du bien</span><strong>{fmt(v.prix_bien)}</strong></div>
          <div><span>Apport</span><strong>{fmt(v.apport)}</strong></div>
          <div><span>Durée comparaison</span><strong>{v.duree_sejour} ans</strong></div>
          <div>
            <span>Mensualité crédit</span>
            <strong>
              {fmt(mortgage(Math.max(0, v.prix_bien - v.apport), v.taux, v.duree_credit))}/mois
            </strong>
          </div>
        </div>
        <p className="fv2-hint" style={{ marginTop: 8 }}>
          Référence {ville.nom} : loyer T2 ~{ville.loyer_t2} €/mois
        </p>
      </div>

      <button className="btn-primary fv2-cta" onClick={onNext}>
        Voir mes résultats →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   RESULT PAGE
   ════════════════════════════════════════════════════════════ */
function ResultPage({ v, result, onRestart }) {
  const [chartReady, setChartReady] = useState(false);
  const savedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setChartReady(true), 200);

    if (!savedRef.current) {
      savedRef.current = true;
      const ville = v.ville ?? MOYENNE_NATIONALE;
      const payload = {
        ville: ville.nom,
        profil: v.situation ?? null,
        revenus: v.revenus ?? null,
        apport: v.apport ?? null,
        prix_bien: v.prix_bien ?? null,
        duree_pret: v.duree_credit ?? null,
        taux: v.taux ?? null,
        loyer: (v.loyer ?? 0) + (v.charges ?? 0),
        resultat_verdict: result.isBuyBetter ? "acheter" : "louer",
        resultat_patrimoine_achat: result.ownerNWEnd != null ? Math.round(result.ownerNWEnd) : null,
        resultat_patrimoine_location: result.renterPortfolio != null ? Math.round(result.renterPortfolio) : null,
        resultat_difference: result.advantage != null ? Math.round(Math.abs(result.advantage)) : null,
        point_equilibre: result.breakEven ?? null,
        situation_pro: v.situation_pro ?? null,
        achat_seul_ou_couple: v.achat ?? null,
        ville_data: v.ville ? { id: v.ville.id, nom: v.ville.nom, prix_m2: v.ville.prix_m2 } : null,
      };
      saveSimulation(payload).then((id) => {
        if (id) console.log("[FunnelV2] Simulation enregistrée, id:", id);
      });
    }

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isBuyBetter, advantage, breakEven, yearlyData, mensualite,
          ownerNWEnd, renterPortfolio, taux_endettement, loyer_total } = result;

  const buyColor  = "#2563eb";
  const rentColor = "#06b6d4";
  const allVals   = yearlyData.flatMap((d) => [d.ownerNW, d.renterNW]);
  const maxNW     = Math.max(...allVals, 1);
  const minNW     = Math.min(...allVals, 0);

  const breakEvenDisplay = breakEven
    ? `${breakEven} an${breakEven > 1 ? "s" : ""}`
    : isBuyBetter ? "Dès le départ" : `> ${v.duree_sejour} ans`;

  const insight = isBuyBetter
    ? `En restant dans ce bien ${v.duree_sejour} ans, acheter vous procure ${fmt(Math.abs(advantage))} de patrimoine supplémentaire par rapport à rester locataire et placer la différence.`
    : `Sur ${v.duree_sejour} ans, rester locataire et placer vos économies vous laisse ${fmt(Math.abs(advantage))} de plus qu'acheter.${breakEven ? ` L'achat deviendrait rentable à partir de ${breakEven} an${breakEven > 1 ? "s" : ""}.` : ""}`;

  const timelineZone = v.duree_sejour < 5 ? "rent" : v.duree_sejour > 15 ? "buy" : "neutral";
  const markerPct    = Math.min(Math.max((v.duree_sejour / 25) * 100, 2), 98);

  return (
    <div className="fv2-result">

      {/* ── Verdict ── */}
      <div className={`fv2-verdict2 ${isBuyBetter ? "fv2-verdict2-buy" : "fv2-verdict2-rent"}`}>
        <div className="fv2-verdict2-icon">{isBuyBetter ? "🏠" : "🔑"}</div>
        <div className="fv2-verdict2-body">
          <h1 className="fv2-verdict2-title">
            {isBuyBetter ? "Acheter est plus avantageux" : "Louer est plus avantageux"}
          </h1>
          <p className="fv2-verdict2-sub">
            {breakEven && isBuyBetter
              ? `Rentable après ${breakEven} an${breakEven > 1 ? "s" : ""} · ${v.duree_sejour} ans comparés`
              : `Sur ${v.duree_sejour} ans · ${(v.ville ?? MOYENNE_NATIONALE).nom}`}
          </p>
        </div>
        <div className="fv2-verdict2-adv">
          <span className="fv2-verdict2-adv-val">{fmt(Math.abs(advantage))}</span>
          <span className="fv2-verdict2-adv-lbl">d'avantage</span>
        </div>
      </div>

      {/* ── Courbes patrimoine ── */}
      <div className="fv2-chart-wrap">
        <p className="fv2-chart-title">Évolution du patrimoine net — {v.duree_sejour} ans</p>
        {chartReady && (
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={yearlyData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradBuy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={buyColor} stopOpacity={0.18}/>
                  <stop offset="95%" stopColor={buyColor} stopOpacity={0.02}/>
                </linearGradient>
                <linearGradient id="gradRent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={rentColor} stopOpacity={0.18}/>
                  <stop offset="95%" stopColor={rentColor} stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.05)" />
              <XAxis dataKey="year" tickLine={false} axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(y) => `${y}a`} />
              <YAxis tickLine={false} axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }} width={54}
                tickFormatter={fmtK}
                domain={[
                  Math.min(0, Math.floor(minNW * 1.15 / 10000) * 10000),
                  Math.ceil(maxNW * 1.1 / 10000) * 10000,
                ]}
              />
              <Tooltip content={<ChartTip />} />
              {breakEven && (
                <ReferenceLine x={breakEven} stroke="#6366f1" strokeDasharray="4 3"
                  label={{ value: `Équilibre (${breakEven}a)`, position: "insideTopRight", fontSize: 10, fill: "#6366f1" }} />
              )}
              <Area type="monotone" dataKey="ownerNW" name="Acheter"
                stroke={buyColor} strokeWidth={2.5} fill="url(#gradBuy)"
                animationDuration={1200} animationEasing="ease-out" dot={false} />
              <Area type="monotone" dataKey="renterNW" name="Louer + placer"
                stroke={rentColor} strokeWidth={2.5} fill="url(#gradRent)"
                animationDuration={1500} animationEasing="ease-out" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        )}
        <div className="fv2-chart-legend">
          <span><span className="fv2-leg-dot" style={{ background: buyColor }} />Acheter</span>
          <span><span className="fv2-leg-dot" style={{ background: rentColor }} />Louer + placer</span>
          {breakEven && <span><span className="fv2-leg-dot" style={{ background: "#6366f1" }} />Équilibre</span>}
        </div>
      </div>

      {/* ── 3 métriques clés ── */}
      <div className="fv2-kf-cards">
        <div className="fv2-kf-card">
          <span className="fv2-kf-card-icon">⚖️</span>
          <span className="fv2-kf-card-val">{breakEvenDisplay}</span>
          <span className="fv2-kf-card-label">Point d'équilibre</span>
        </div>
        <div className="fv2-kf-card fv2-kf-card-main">
          <span className="fv2-kf-card-icon">{isBuyBetter ? "📈" : "💰"}</span>
          <span className="fv2-kf-card-val">{fmt(Math.abs(advantage))}</span>
          <span className="fv2-kf-card-label">Différence de patrimoine</span>
        </div>
        <div className="fv2-kf-card">
          <span className="fv2-kf-card-icon">💳</span>
          <span className="fv2-kf-card-val">{fmt(mensualite)}</span>
          <span className="fv2-kf-card-label">Mensualité / mois</span>
        </div>
      </div>

      {/* ── Insight ── */}
      <div className="fv2-insight-box">
        <span className="fv2-insight-icon">💡</span>
        <p className="fv2-insight-text">{insight}</p>
      </div>

      {/* ── Timeline ── */}
      <div className="fv2-timeline">
        <p className="fv2-timeline-title">Horizon de rentabilité</p>
        <div className="fv2-timeline-outer">
          <div className="fv2-timeline-track">
            <div className={`fv2-timeline-zone fv2-tz-rent${timelineZone === "rent" ? " fv2-tz-active" : ""}`}>
              <span className="fv2-tz-label">🔑 Location</span>
              <span className="fv2-tz-range">&lt; 5 ans</span>
            </div>
            <div className={`fv2-timeline-zone fv2-tz-neutral${timelineZone === "neutral" ? " fv2-tz-active" : ""}`}>
              <span className="fv2-tz-label">⚖️ Neutre</span>
              <span className="fv2-tz-range">5–15 ans</span>
            </div>
            <div className={`fv2-timeline-zone fv2-tz-buy${timelineZone === "buy" ? " fv2-tz-active" : ""}`}>
              <span className="fv2-tz-label">🏠 Achat</span>
              <span className="fv2-tz-range">&gt; 15 ans</span>
            </div>
          </div>
          <div className="fv2-timeline-marker" style={{ left: `${markerPct}%` }}>
            <span className="fv2-timeline-you">↑ {v.duree_sejour} ans</span>
          </div>
        </div>
      </div>

      {/* ── Patrimoine comparé ── */}
      <div className="fv2-patrimoine-row">
        <div className="fv2-pat-card fv2-pat-buy">
          <span className="fv2-pat-label">🏠 Acheteur</span>
          <span className="fv2-pat-val">{fmt(ownerNWEnd)}</span>
          <span className="fv2-pat-sub">Valeur bien − capital dû − 5 % frais cession</span>
        </div>
        <div className="fv2-pat-vs">vs</div>
        <div className="fv2-pat-card fv2-pat-rent">
          <span className="fv2-pat-label">🔑 Locataire</span>
          <span className="fv2-pat-val">{fmt(renterPortfolio)}</span>
          <span className="fv2-pat-sub">Apport + surplus placés à 4 %/an</span>
        </div>
      </div>

      {/* Taux d'endettement */}
      {taux_endettement > 0 && (
        <div className={`fv2-insight-box${taux_endettement > 35 ? " fv2-insight-warn" : ""}`} style={{ marginTop: 12 }}>
          <span className="fv2-insight-icon">{taux_endettement > 35 ? "⚠️" : "📊"}</span>
          <p className="fv2-insight-text">
            Taux d'endettement : <strong>{taux_endettement.toFixed(1)} %</strong>
            {taux_endettement > 35
              ? " — au-dessus du seuil bancaire de 35 %. Ce projet nécessitera un dossier solide."
              : " — dans les limites acceptées par les banques (≤ 35 %)."}
          </p>
        </div>
      )}

      {/* ── CTAs ── */}
      <div className="fv2-result-ctas">
        <button type="button" className="fv2-btn-secondary" onClick={onRestart}>
          🔄 Relancer une simulation
        </button>
      </div>

      <div className="fv2-result-actions-row">
        <Link to="/simulateurs" className="fv2-edit-btn">Autres simulateurs →</Link>
      </div>

      <p className="fv2-disclaimer">
        Simulation indicative. Les projections dépendent des hypothèses saisies — consultez un conseiller avant toute décision.
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FUNNEL V2 — main
   ════════════════════════════════════════════════════════════ */
export default function FunnelV2() {
  const [step, setStep] = useState(1);
  const [v, setV] = useState(() => {
    try {
      const preset = sessionStorage.getItem("fv2_preset");
      if (preset) {
        sessionStorage.removeItem("fv2_preset");
        return { ...DEFAULTS, ...JSON.parse(preset) };
      }
    } catch {}
    return DEFAULTS;
  });

  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const applyVille = useCallback((ville) => {
    setV((s) =>
      ville
        ? {
            ...s,
            ville,
            prix_bien: Math.round(ville.prix_m2 * 50),
            loyer: ville.loyer_t2,
            appreciation: ville.appreciation,
          }
        : { ...s, ville: null }
    );
  }, []);

  const isProprio = v.situation === "proprietaire";
  const totalInputSteps = isProprio ? 3 : 4;

  const go = useCallback((n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    if (step === 3 && isProprio) go(RESULT_STEP);
    else if (step < RESULT_STEP) go(step + 1);
  }, [step, isProprio, go]);

  const back = useCallback(() => {
    if (step === RESULT_STEP && isProprio) go(3);
    else go(step - 1);
  }, [step, isProprio, go]);

  const result = useMemo(
    () => (step === RESULT_STEP ? computeResult(v) : null),
    [step, v]
  );

  const showProgressBar = step < RESULT_STEP;

  return (
    <div className="fv2-root">
      {showProgressBar && (
        <ProgressBar
          step={step}
          total={totalInputSteps}
          onBack={step > 1 ? back : undefined}
        />
      )}

      <div className="fv2-screen" key={step}>
        {step === 1 && <Step1 v={v} set={set} applyVille={applyVille} onNext={next} />}
        {step === 2 && <Step2 v={v} set={set} onNext={next} />}
        {step === 3 && <Step3 v={v} set={set} onNext={next} />}
        {step === 4 && <Step4 v={v} set={set} onNext={next} />}
        {step === RESULT_STEP && result && (
          <ResultPage v={v} result={result} onRestart={() => { setV(DEFAULTS); go(1); }} />
        )}
      </div>
    </div>
  );
}
