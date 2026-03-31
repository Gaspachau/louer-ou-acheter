import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from "recharts";
import { saveSimulation } from "../lib/supabase";

/* ─── French cities for autocomplete ─────────────────────── */
const CITIES = [
  { id:"paris",           name:"Paris",            priceM2:9800,  rentRef:1500, taxRef:2300, appRate:2.0 },
  { id:"lyon",            name:"Lyon",             priceM2:4600,  rentRef:950,  taxRef:1480, appRate:2.5 },
  { id:"marseille",       name:"Marseille",        priceM2:3400,  rentRef:820,  taxRef:1100, appRate:2.8 },
  { id:"bordeaux",        name:"Bordeaux",         priceM2:4200,  rentRef:880,  taxRef:1320, appRate:1.8 },
  { id:"nantes",          name:"Nantes",           priceM2:3900,  rentRef:820,  taxRef:1270, appRate:2.2 },
  { id:"toulouse",        name:"Toulouse",         priceM2:3600,  rentRef:800,  taxRef:1170, appRate:2.3 },
  { id:"lille",           name:"Lille",            priceM2:3200,  rentRef:760,  taxRef:1080, appRate:1.9 },
  { id:"strasbourg",      name:"Strasbourg",       priceM2:3500,  rentRef:780,  taxRef:1120, appRate:1.8 },
  { id:"nice",            name:"Nice",             priceM2:5200,  rentRef:1030, taxRef:1640, appRate:2.4 },
  { id:"rennes",          name:"Rennes",           priceM2:3700,  rentRef:790,  taxRef:1220, appRate:2.1 },
  { id:"montpellier",     name:"Montpellier",      priceM2:3800,  rentRef:830,  taxRef:1200, appRate:2.2 },
  { id:"aix-en-provence", name:"Aix-en-Provence",  priceM2:5100,  rentRef:1000, taxRef:1580, appRate:2.3 },
  { id:"grenoble",        name:"Grenoble",         priceM2:2900,  rentRef:720,  taxRef:980,  appRate:1.8 },
  { id:"toulon",          name:"Toulon",           priceM2:3000,  rentRef:740,  taxRef:1020, appRate:2.0 },
  { id:"dijon",           name:"Dijon",            priceM2:2800,  rentRef:690,  taxRef:960,  appRate:1.7 },
  { id:"angers",          name:"Angers",           priceM2:2700,  rentRef:680,  taxRef:940,  appRate:2.0 },
  { id:"reims",           name:"Reims",            priceM2:2600,  rentRef:650,  taxRef:920,  appRate:1.6 },
  { id:"tours",           name:"Tours",            priceM2:2800,  rentRef:700,  taxRef:950,  appRate:1.8 },
  { id:"rouen",           name:"Rouen",            priceM2:2700,  rentRef:680,  taxRef:930,  appRate:1.7 },
  { id:"le-havre",        name:"Le Havre",         priceM2:2200,  rentRef:600,  taxRef:800,  appRate:1.5 },
  { id:"caen",            name:"Caen",             priceM2:2500,  rentRef:650,  taxRef:870,  appRate:1.7 },
  { id:"metz",            name:"Metz",             priceM2:2500,  rentRef:650,  taxRef:880,  appRate:1.6 },
  { id:"nancy",           name:"Nancy",            priceM2:2600,  rentRef:660,  taxRef:900,  appRate:1.6 },
  { id:"brest",           name:"Brest",            priceM2:2300,  rentRef:620,  taxRef:840,  appRate:1.6 },
  { id:"limoges",         name:"Limoges",          priceM2:1800,  rentRef:560,  taxRef:730,  appRate:1.4 },
  { id:"clermont-ferrand",name:"Clermont-Ferrand", priceM2:2400,  rentRef:640,  taxRef:870,  appRate:1.7 },
  { id:"pau",             name:"Pau",              priceM2:2200,  rentRef:620,  taxRef:820,  appRate:1.6 },
  { id:"poitiers",        name:"Poitiers",         priceM2:2400,  rentRef:640,  taxRef:860,  appRate:1.7 },
  { id:"amiens",          name:"Amiens",           priceM2:2300,  rentRef:630,  taxRef:840,  appRate:1.5 },
  { id:"perpignan",       name:"Perpignan",        priceM2:2100,  rentRef:600,  taxRef:790,  appRate:1.6 },
  { id:"orleans",         name:"Orléans",          priceM2:2600,  rentRef:660,  taxRef:900,  appRate:1.7 },
  { id:"besancon",        name:"Besançon",         priceM2:2400,  rentRef:640,  taxRef:860,  appRate:1.6 },
  { id:"avignon",         name:"Avignon",          priceM2:2700,  rentRef:680,  taxRef:930,  appRate:1.8 },
  { id:"nimes",           name:"Nîmes",            priceM2:2500,  rentRef:650,  taxRef:880,  appRate:1.7 },
  { id:"saint-etienne",   name:"Saint-Étienne",    priceM2:1600,  rentRef:530,  taxRef:700,  appRate:1.3 },
  { id:"le-mans",         name:"Le Mans",          priceM2:2000,  rentRef:580,  taxRef:770,  appRate:1.5 },
  { id:"mulhouse",        name:"Mulhouse",         priceM2:1800,  rentRef:560,  taxRef:730,  appRate:1.4 },
  { id:"boulogne",        name:"Boulogne-Billancourt", priceM2:8200, rentRef:1400, taxRef:2100, appRate:2.0 },
  { id:"versailles",      name:"Versailles",       priceM2:6800,  rentRef:1250, taxRef:1900, appRate:1.9 },
];

/* ─── Helpers ─────────────────────────────────────────────── */
const fmt = (v) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
const fmtK = (v) => (Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k €` : `${Math.round(v)} €`);

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
  const loan = Math.max(0, v.price - v.apport);
  const notary = v.price * (v.notaryPct / 100);
  const monthlyPayment = mortgage(loan, v.rate, v.loanYears);
  const annualTax = v.taxFonciere ?? 1100;
  const annualMaint = v.price * 0.01; // 1% entretien
  const annualInsurance = 300;
  const ownerMonthly = monthlyPayment + (annualTax + annualMaint + annualInsurance) / 12;

  const investRate = 0.035 / 12; // 3.5%/an placement
  let renterPortfolio = v.apport + notary;
  const yearlyData = [];

  const months = v.duration * 12;
  for (let m = 1; m <= months; m++) {
    const yr = Math.floor((m - 1) / 12);
    const rent = (v.rent + v.charges) * Math.pow(1 + (v.rentRise ? 0.018 : 0) , yr);
    const surplus = Math.max(0, ownerMonthly - rent);
    renterPortfolio = renterPortfolio * (1 + investRate) + surplus;

    if (m % 12 === 0) {
      const year = m / 12;
      const propVal = v.price * Math.pow(1 + v.appRate / 100, year);
      const rem = remainingBalance(loan, v.rate, v.loanYears, m);
      const ownerNW = propVal - rem - propVal * 0.05;
      yearlyData.push({ year, ownerNW: Math.round(ownerNW), renterNW: Math.round(renterPortfolio) });
    }
  }

  const propValEnd = v.price * Math.pow(1 + v.appRate / 100, v.duration);
  const remEnd = remainingBalance(loan, v.rate, v.loanYears, months);
  const ownerNWEnd = propValEnd - remEnd - propValEnd * 0.05;
  const advantage = ownerNWEnd - renterPortfolio;
  const isBuyBetter = advantage >= 0;

  // Break-even year
  let breakEven = null;
  for (let i = 0; i < yearlyData.length; i++) {
    if (yearlyData[i].ownerNW >= yearlyData[i].renterNW) {
      breakEven = yearlyData[i].year;
      break;
    }
  }

  return {
    monthlyPayment, ownerMonthly, notary, loan,
    ownerNWEnd, renterPortfolio, advantage, isBuyBetter,
    breakEven, yearlyData,
    totalRentPaid: (v.rent + v.charges) * 12 * v.duration,
    totalBuyPaid: ownerMonthly * 12 * v.duration + notary + v.apport,
  };
}

/* ─── Revenue segments ────────────────────────────────────── */
const REVENU_STEPS = [
  { val:1200, label:"1 200 €" },
  { val:1500, label:"1 500 €" },
  { val:2000, label:"2 000 €" },
  { val:2500, label:"2 500 €" },
  { val:3000, label:"3 000 €" },
  { val:4000, label:"4 000 €" },
  { val:5000, label:"5 000 €" },
  { val:7500, label:"6 000 €+" },
];

/* ─── Apport presets ─────────────────────────────────────── */
const APPORT_PRESETS = [0, 5000, 10000, 20000, 30000, 50000];

/* ─── City selector data ─────────────────────────────────── */
const NATIONAL_AVERAGE = { id:"national", name:"Moyenne nationale", priceM2:3200, rentRef:800, taxRef:1100, appRate:2.0 };
const TOP_10_CITIES = CITIES.slice(0, 10);

/* ─── Sub-components ─────────────────────────────────────── */
function Slider({ label, value, onChange, min, max, step = 1, format, hint }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="fv2-slider-wrap">
      <div className="fv2-slider-header">
        <span className="fv2-slider-label">{label}</span>
        <span className="fv2-slider-val">{format ? format(value) : value}</span>
      </div>
      <div className="fv2-slider-track-wrap" style={{ "--pct": `${pct}%` }}>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="fv2-slider"
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

function CitySelector({ v, applyCity }) {
  const initMode = !v.city ? "national" : v.city.id === "manuel" ? "manual" : "list";
  const [mode, setMode] = useState(initMode);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [manualPriceM2, setManualPriceM2] = useState(v.city?.priceM2 || 3200);
  const [manualRent, setManualRent] = useState(v.city?.rentRef || 800);

  const handleModeClick = (m) => {
    setMode(m);
    if (m === "national") applyCity(NATIONAL_AVERAGE);
    else if (m === "list") setDrawerOpen(true);
  };

  const selectCity = (city) => { applyCity(city); setDrawerOpen(false); };

  const applyManual = () => applyCity({
    id:"manuel", name:"Ma zone",
    priceM2:manualPriceM2, rentRef:manualRent,
    taxRef:Math.round(manualPriceM2 * 50 * 0.0045), appRate:2.0,
  });

  const cityLabel = mode === "list" && v.city ? v.city.name : "10 grandes villes";

  return (
    <div className="fv2-city-selector">
      <p className="fv2-field-label" style={{ marginBottom:10 }}>Votre marché immobilier</p>
      <div className="fv2-city-modes">
        {[
          { id:"national", icon:"🇫🇷", label:"Moyenne nationale",   sub:"3 200 €/m² · loyer moy. 800 €/mois" },
          { id:"list",     icon:"🏙️", label:"Choisir ma ville",     sub: cityLabel },
          { id:"manual",   icon:"✏️", label:"Saisir mes données",    sub:"Prix/m² et loyer personnalisés" },
        ].map((m) => (
          <button key={m.id} type="button"
            className={`fv2-city-mode${mode === m.id ? " fv2-city-mode-active" : ""}`}
            onClick={() => handleModeClick(m.id)}
          >
            <span className="fv2-city-mode-icon">{m.icon}</span>
            <span className="fv2-city-mode-body">
              <span className="fv2-city-mode-label">{m.label}</span>
              <span className="fv2-city-mode-sub">{m.sub}</span>
            </span>
            {mode === m.id && <span className="fv2-city-mode-check">✓</span>}
          </button>
        ))}
      </div>

      {mode === "manual" && (
        <div className="fv2-city-manual">
          <div className="fv2-field-wrap">
            <label className="fv2-field-label">Prix au m² dans votre zone</label>
            <div className="fv2-field-row">
              <input type="number" className="fv2-field-input" value={manualPriceM2}
                onChange={(e) => setManualPriceM2(Number(e.target.value) || 0)} />
              <span className="fv2-field-suffix">€/m²</span>
            </div>
          </div>
          <div className="fv2-field-wrap">
            <label className="fv2-field-label">Loyer pour un bien équivalent</label>
            <div className="fv2-field-row">
              <input type="number" className="fv2-field-input" value={manualRent}
                onChange={(e) => setManualRent(Number(e.target.value) || 0)} />
              <span className="fv2-field-suffix">€/mois</span>
            </div>
          </div>
          <button type="button" className="fv2-apply-btn" onClick={applyManual}>
            Appliquer ces données →
          </button>
        </div>
      )}

      {drawerOpen && (
        <div className="fv2-city-drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="fv2-city-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="fv2-city-drawer-header">
              <span>Choisir une ville</span>
              <button type="button" className="fv2-city-drawer-close"
                onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <div className="fv2-city-list">
              {TOP_10_CITIES.map((city) => (
                <button key={city.id} type="button" className="fv2-city-list-item"
                  onClick={() => selectCity(city)}>
                  <span className="fv2-city-list-name">{city.name}</span>
                  <div className="fv2-city-list-meta">
                    <span>{city.priceM2.toLocaleString("fr-FR")} €/m²</span>
                    <span>{city.rentRef} €/mois</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ApportSelector({ v, set }) {
  const [mode, setMode] = useState("amount"); // "amount" | "percent" | "optimal"
  const apportPct = v.price > 0 ? Math.round((v.apport / v.price) * 100) : 0;
  const optimalApport = Math.min(
    Math.round(v.revenus * 0.35 * 12 * 0.5),
    Math.round(v.price * 0.25)
  );
  const isSufficient = apportPct >= 10;

  const handlePctChange = (val) => set("apport")(Math.round(v.price * val / 100));
  const applyOptimal  = () => { set("apport")(optimalApport); setMode("optimal"); };

  return (
    <div className="fv2-apport-wrap">
      <div className="fv2-slider-header">
        <span className="fv2-slider-label">Apport personnel</span>
        <span className="fv2-slider-val fv2-apport-bigval">{fmt(v.apport)}</span>
      </div>
      <div className="fv2-apport-modes">
        {[
          { id:"amount",  icon:"💰", label:"Montant" },
          { id:"percent", icon:"📊", label:"% du prix" },
          { id:"optimal", icon:"🎯", label:"Optimal" },
        ].map((m) => (
          <button key={m.id} type="button"
            className={`fv2-apport-mode-btn${mode === m.id ? " fv2-apport-mode-active" : ""}`}
            onClick={() => m.id === "optimal" ? applyOptimal() : setMode(m.id)}
          >{m.icon} {m.label}</button>
        ))}
      </div>

      {mode === "amount" && (
        <div className="fv2-field-row" style={{ marginTop:12 }}>
          <input type="number" min={0} step={1000} className="fv2-field-input"
            value={v.apport} onChange={(e) => set("apport")(Number(e.target.value) || 0)} />
          <span className="fv2-field-suffix">€</span>
        </div>
      )}
      {mode === "percent" && (
        <div style={{ marginTop:12 }}>
          <Slider label="Part du prix du bien" value={apportPct}
            onChange={handlePctChange} min={0} max={30} step={1}
            format={(x) => `${x} %`}
            hint={`Soit ${fmt(v.apport)} — pour un bien à ${fmt(v.price)}`}
          />
        </div>
      )}
      {mode === "optimal" && (
        <div className="fv2-apport-optimal-box">
          <span className="fv2-apport-optimal-val">{fmt(optimalApport)}</span>
          <span className="fv2-apport-optimal-sub">
            Calculé sur la base de vos revenus ({v.revenus.toLocaleString("fr-FR")} €/mois)
          </span>
        </div>
      )}

      <div className={`fv2-apport-hint ${isSufficient ? "fv2-apport-ok" : "fv2-apport-warn"}`}>
        {v.apport > 0
          ? <><strong>{apportPct} %</strong> du prix du bien {isSufficient ? "— suffisant pour un bon taux ✓" : "— en dessous de 10 %, taux majoré ⚠️"}</>
          : "Sans apport : financement plus difficile et taux majoré ⚠️"}
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, suffix, hint }) {
  return (
    <div className="fv2-field-wrap">
      <label className="fv2-field-label">{label}</label>
      <div className="fv2-field-row">
        <input
          type="number"
          className="fv2-field-input"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          min={0}
        />
        {suffix && <span className="fv2-field-suffix">{suffix}</span>}
      </div>
      {hint && <p className="fv2-hint">{hint}</p>}
    </div>
  );
}

/* ─── Progress bar ────────────────────────────────────────── */
const STEP_LABELS = ["Profil", "Finances", "Projet", "Financement", "Location", "Résultat"];
const STEP_TIMES  = [3, 3, 2, 2, 2, 0]; // minutes remaining after each step

function ProgressBar({ step, total, onBack }) {
  const pct = (step / total) * 100;
  const remaining = STEP_TIMES[step - 1] ?? 0;
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
          <strong>{STEP_LABELS[step - 1]}</strong>
          <span className="fv2-progress-step"> — étape {step}/{total}</span>
        </span>
        {remaining > 0
          ? <span className="fv2-progress-time">~{remaining} min</span>
          : <span />}
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
        <div key={p.dataKey} className="fv2-chart-tip-row" style={{ color: p.color }}>
          <span>{p.name}</span><span>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Email modal ─────────────────────────────────────────── */
function EmailModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const send = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setTimeout(onClose, 2200);
  };

  return (
    <div className="fv2-modal-overlay" onClick={onClose}>
      <div className="fv2-modal" onClick={(e) => e.stopPropagation()}>
        {!sent ? (
          <>
            <h3 className="fv2-modal-title">Recevoir mon analyse détaillée</h3>
            <p className="fv2-modal-desc">
              Nous vous envoyons un PDF complet avec toutes vos projections sur {" "}
              votre horizon choisi.
            </p>
            <form onSubmit={send} className="fv2-modal-form">
              <input
                type="email" required placeholder="votre@email.fr"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="fv2-modal-input"
              />
              <button type="submit" className="btn-primary">Envoyer mon analyse →</button>
            </form>
            <p className="fv2-modal-privacy">🔒 Aucun démarchage. Confidentiel.</p>
          </>
        ) : (
          <div className="fv2-modal-success">
            <span className="fv2-modal-success-icon">✅</span>
            <p>Analyse envoyée sur <strong>{email}</strong> !</p>
          </div>
        )}
        <button type="button" className="fv2-modal-close" onClick={onClose} aria-label="Fermer">✕</button>
      </div>
    </div>
  );
}

/* ─── Main funnel ─────────────────────────────────────────── */
const TOTAL_STEPS = 6;
const DEFAULTS = {
  situation: null,   // locataire | proprietaire | heberge
  city: null,
  revenus: 3000,
  apport: 35000,
  emploi: null,      // cdi | freelance | fonctionnaire | autre
  price: 250000,
  propType: "appt",  // appt | maison
  duration: 15,
  rate: 3.5,
  loanYears: 20,
  notaryPct: 8,
  showAdvanced: false,
  appRate: 2.0,      // appreciation
  rent: 900,
  charges: 80,
  rentRise: false,
  taxFonciere: 1100,
};

export default function FunnelV2() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState("forward"); // forward | back
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
  const [showEmail, setShowEmail] = useState(false);
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const go = useCallback((n) => {
    setDir(n > step ? "forward" : "back");
    setTimeout(() => setStep(n), 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const next = () => go(step + 1);
  const back = () => go(step - 1);

  // Apply city defaults
  const applyCity = (city) => {
    if (!city) { set("city")(null); return; }
    setV((s) => ({
      ...s,
      city,
      price: city.priceM2 * 50,
      rent: city.rentRef,
      taxFonciere: city.taxRef,
      appRate: city.appRate,
    }));
  };

  const result = useMemo(() => step === TOTAL_STEPS ? computeResult(v) : null, [step, v]);

  return (
    <div className="fv2-root">
      {step < TOTAL_STEPS && (
        <ProgressBar step={step} total={TOTAL_STEPS} onBack={step > 1 ? back : undefined} />
      )}

      <div className={`fv2-screen fv2-screen-${dir}`} key={step}>
        {step === 1 && <Step1 v={v} set={set} applyCity={applyCity} onNext={next} />}
        {step === 2 && <Step2 v={v} set={set} onNext={next} />}
        {step === 3 && <Step3 v={v} set={set} onNext={next} />}
        {step === 4 && <Step4 v={v} set={set} onNext={next} />}
        {step === 5 && <Step5 v={v} set={set} onNext={next} />}
        {step === 6 && result && (
          <Step6 v={v} result={result} onEdit={() => go(1)} onEmail={() => setShowEmail(true)} />
        )}
      </div>

      {showEmail && <EmailModal onClose={() => setShowEmail(false)} />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 1 — PROFIL
   ════════════════════════════════════════════════════════════ */
function Step1({ v, set, applyCity, onNext }) {
  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">PROFIL</div>
      <h1 className="fv2-card-title">Commençons par vous</h1>
      <p className="fv2-card-desc">Quelle est votre situation actuelle ?</p>

      <div className="fv2-choices-col">
        <ChoiceBtn
          active={v.situation === "locataire"}
          onClick={() => set("situation")("locataire")}
          icon="🔑"
          label="Je suis locataire"
          sub="Je paie un loyer chaque mois"
        />
        <ChoiceBtn
          active={v.situation === "proprietaire"}
          onClick={() => set("situation")("proprietaire")}
          icon="🏠"
          label="Je suis propriétaire"
          sub="Je souhaite changer de bien"
        />
        <ChoiceBtn
          active={v.situation === "heberge"}
          onClick={() => set("situation")("heberge")}
          icon="👨‍👩‍👦"
          label="Je suis hébergé gratuitement"
          sub="Chez mes parents ou un proche"
        />
      </div>

      <CitySelector v={v} applyCity={applyCity} />

      <button
        className="btn-primary fv2-cta"
        onClick={onNext}
        disabled={!v.situation}
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
  const borrowPower = Math.round(
    v.revenus * 0.35 * (1 - Math.pow(1 + 3.5/100/12, -240)) / (3.5/100/12)
  );

  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">FINANCES</div>
      <h1 className="fv2-card-title">Parlons de vos moyens</h1>

      {/* ── Revenus ── */}
      <div className="fv2-slider-wrap">
        <div className="fv2-slider-header">
          <span className="fv2-slider-label">Revenus mensuels nets</span>
          <span className="fv2-slider-val">{v.revenus.toLocaleString("fr-FR")} €/mois</span>
        </div>
        <div className="fv2-revenu-grid">
          {REVENU_STEPS.map((s) => (
            <button
              key={s.val} type="button"
              className={`fv2-revenu-btn${v.revenus === s.val ? " fv2-revenu-active" : ""}`}
              onClick={() => set("revenus")(s.val)}
            >{s.label}</button>
          ))}
        </div>
        <p className="fv2-hint">Capacité d'emprunt théorique : <strong>{fmt(borrowPower)}</strong></p>
      </div>

      {/* ── Apport ── */}
      <ApportSelector v={v} set={set} />

      {/* ── Situation pro ── */}
      <div style={{ marginTop: 20 }}>
        <p className="fv2-field-label" style={{ marginBottom: 10 }}>Situation professionnelle</p>
        <div className="fv2-emploi-grid">
          {[
            { id:"cdi",          label:"CDI",          icon:"👔" },
            { id:"fonctionnaire",label:"Fonctionnaire", icon:"🏛️" },
            { id:"freelance",    label:"Indépendant",  icon:"💻" },
            { id:"autre",        label:"Autre",        icon:"🔧" },
          ].map((e) => (
            <ChoiceBtn key={e.id} active={v.emploi === e.id}
              onClick={() => set("emploi")(e.id)} icon={e.icon} label={e.label} />
          ))}
        </div>
      </div>

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
  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">PROJET</div>
      <h1 className="fv2-card-title">Votre projet immobilier</h1>

      <Slider
        label="Prix du bien visé"
        value={v.price}
        onChange={set("price")}
        min={80000} max={900000} step={5000}
        format={fmt}
      />

      <div style={{ marginTop: 20 }}>
        <p className="fv2-field-label" style={{ marginBottom: 10 }}>Type de bien</p>
        <div className="fv2-choices-row">
          <ChoiceBtn active={v.propType === "appt"} onClick={() => set("propType")("appt")}
            icon="🏢" label="Appartement" />
          <ChoiceBtn active={v.propType === "maison"} onClick={() => set("propType")("maison")}
            icon="🏡" label="Maison" />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Slider
          label="Combien d'années prévoyez-vous d'y rester ?"
          value={v.duration}
          onChange={set("duration")}
          min={1} max={25} step={1}
          format={(x) => `${x} an${x > 1 ? "s" : ""}`}
          hint={v.duration < 6
            ? "⚠️ Horizon court : louer est souvent plus avantageux en dessous de 6 ans."
            : v.duration >= 10
            ? "✓ Horizon long : l'achat a le temps de s'amortir pleinement."
            : "Autour de 7–9 ans : le résultat dépend du marché local."}
        />
      </div>

      <button className="btn-primary fv2-cta" onClick={onNext}>
        Continuer →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 4 — FINANCEMENT
   ════════════════════════════════════════════════════════════ */
function Step4({ v, set, onNext }) {
  const notary = Math.round(v.price * (v.notaryPct / 100));
  const loan = Math.max(0, v.price - v.apport);
  const monthly = Math.round(mortgage(loan, v.rate, v.loanYears));

  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">FINANCEMENT</div>
      <h1 className="fv2-card-title">Paramètres de financement</h1>

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
          <span className="fv2-fs-val">{fmt(monthly)}/mois</span>
        </div>
      </div>

      <div className="fv2-compact-sliders">
        <Slider
          label="Taux d'intérêt"
          value={v.rate}
          onChange={set("rate")}
          min={1.5} max={5.5} step={0.1}
          format={(x) => `${x.toFixed(1)} %`}
          hint="Moyenne 20 ans en 2026 : 3,4–3,9 %"
        />
        <Slider
          label="Durée du crédit"
          value={v.loanYears}
          onChange={set("loanYears")}
          min={10} max={25} step={1}
          format={(x) => `${x} ans`}
        />
      </div>

      <div className="fv2-notary-row">
        <span className="fv2-field-label">Frais de notaire <span className="fv2-auto-tag">Auto</span></span>
        <span className="fv2-notary-val">{v.notaryPct} % → {fmt(notary)}</span>
      </div>

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
            label="Appréciation annuelle du bien"
            value={v.appRate}
            onChange={set("appRate")}
            min={0} max={5} step={0.5}
            format={(x) => `${x.toFixed(1)} %/an`}
            hint="Moyenne nationale : 1,5–2,5 %/an"
          />
          <Slider
            label="Frais de notaire"
            value={v.notaryPct}
            onChange={set("notaryPct")}
            min={2} max={10} step={0.5}
            format={(x) => `${x.toFixed(1)} %`}
            hint="Ancien : ~8 %. Neuf : ~2,5 %"
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
   STEP 5 — LOCATION
   ════════════════════════════════════════════════════════════ */
function Step5({ v, set, onNext }) {
  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">LOCATION</div>
      <h1 className="fv2-card-title">Votre situation actuelle</h1>

      <NumberInput
        label="Loyer mensuel"
        value={v.rent}
        onChange={set("rent")}
        suffix="€/mois"
        hint={v.situation === "heberge" ? "Mettez 0 si vous êtes hébergé gratuitement" : undefined}
      />

      <NumberInput
        label="Charges locatives"
        value={v.charges}
        onChange={set("charges")}
        suffix="€/mois"
        hint="Charges récupérables (eau, ordures…) non incluses dans le loyer"
      />

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
        <p className="fv2-recap-title">📊 Récapitulatif de votre projet</p>
        <div className="fv2-recap-grid">
          <div><span>Prix du bien</span><strong>{fmt(v.price)}</strong></div>
          <div><span>Apport</span><strong>{fmt(v.apport)}</strong></div>
          <div><span>Mensualité crédit</span><strong>{fmt(mortgage(Math.max(0, v.price - v.apport), v.rate, v.loanYears))}/mois</strong></div>
          <div><span>Durée comparaison</span><strong>{v.duration} ans</strong></div>
        </div>
      </div>

      <button className="btn-primary fv2-cta" onClick={onNext}>
        Voir mes résultats →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP 6 — RÉSULTAT
   ════════════════════════════════════════════════════════════ */
function Step6({ v, result, onEdit, onEmail }) {
  const [chartReady, setChartReady] = useState(false);
  const savedRef = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => setChartReady(true), 200);
    if (!savedRef.current) {
      savedRef.current = true;
      saveSimulation({
        ville: v.city?.name ?? null,
        profil: v.situation ?? null,
        revenus: v.revenus,
        apport: v.apport,
        prix_bien: v.price,
        duree_pret: v.loanYears,
        taux: v.rate,
        loyer: v.rent + (v.charges ?? 0),
        resultat_verdict: result.isBuyBetter ? 'acheter' : 'louer',
        resultat_patrimoine_achat: Math.round(result.ownerNWEnd),
        resultat_patrimoine_location: Math.round(result.renterPortfolio),
        resultat_difference: Math.round(Math.abs(result.advantage)),
        point_equilibre: result.breakEven ?? null,
      });
    }
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isBuyBetter, advantage, breakEven, yearlyData, monthlyPayment,
          ownerNWEnd, renterPortfolio } = result;

  const buyColor  = "#2563eb";
  const rentColor = "#06b6d4";
  const maxNW = Math.max(...yearlyData.map((d) => Math.max(d.ownerNW, d.renterNW)));
  const minNW = Math.min(...yearlyData.map((d) => Math.min(d.ownerNW, d.renterNW)));

  const breakEvenDisplay = breakEven
    ? `${breakEven} an${breakEven > 1 ? "s" : ""}`
    : isBuyBetter ? "Dès le départ" : `> ${v.duration} ans`;

  const insight = isBuyBetter
    ? `En restant dans ce bien ${v.duration} ans, acheter vous rapporte ${fmt(Math.abs(advantage))} de patrimoine supplémentaire par rapport à rester locataire et placer la différence.`
    : `Sur ${v.duration} ans, rester locataire et placer vos économies vous laisse ${fmt(Math.abs(advantage))} de plus qu'acheter.${breakEven ? ` L'achat deviendrait rentable à partir de ${breakEven} ans.` : ""}`;

  const timelineZone = v.duration < 5 ? "rent" : v.duration > 15 ? "buy" : "neutral";
  const markerPct = Math.min(Math.max((v.duration / 25) * 100, 2), 98);

  return (
    <div className="fv2-result">

      {/* ── Grand verdict ── */}
      <div className={`fv2-verdict2 ${isBuyBetter ? "fv2-verdict2-buy" : "fv2-verdict2-rent"}`}>
        <div className="fv2-verdict2-icon">{isBuyBetter ? "🏠" : "🔑"}</div>
        <div className="fv2-verdict2-body">
          <h1 className="fv2-verdict2-title">
            {isBuyBetter ? "Acheter est plus avantageux" : "Louer est plus avantageux"}
          </h1>
          <p className="fv2-verdict2-sub">
            {breakEven && isBuyBetter
              ? `Rentable après ${breakEven} an${breakEven > 1 ? "s" : ""} · ${v.duration} ans comparés`
              : `Sur ${v.duration} ans`}
          </p>
        </div>
        <div className="fv2-verdict2-adv">
          <span className="fv2-verdict2-adv-val">{fmt(Math.abs(advantage))}</span>
          <span className="fv2-verdict2-adv-lbl">d'avantage</span>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="fv2-chart-wrap">
        <p className="fv2-chart-title">Évolution du patrimoine net — {v.duration} ans</p>
        {chartReady && (
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={yearlyData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" />
              <XAxis dataKey="year" tickLine={false} axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(y) => `${y}a`} />
              <YAxis tickLine={false} axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }} width={54}
                tickFormatter={fmtK}
                domain={[Math.min(0, Math.floor(minNW * 1.15 / 10000) * 10000), Math.ceil(maxNW * 1.1 / 10000) * 10000]}
              />
              <Tooltip content={<ChartTip />} />
              {breakEven && (
                <ReferenceLine x={breakEven} stroke="#6366f1" strokeDasharray="4 3"
                  label={{ value:`Équilibre (${breakEven}a)`, position:"insideTopRight", fontSize:10, fill:"#6366f1" }} />
              )}
              <Line type="monotone" dataKey="ownerNW" name="Acheter"
                stroke={buyColor} strokeWidth={3} dot={false}
                animationDuration={1200} animationEasing="ease-out" />
              <Line type="monotone" dataKey="renterNW" name="Louer + placer"
                stroke={rentColor} strokeWidth={3} dot={false}
                animationDuration={1500} animationEasing="ease-out" />
            </LineChart>
          </ResponsiveContainer>
        )}
        <div className="fv2-chart-legend">
          <span><span className="fv2-leg-dot" style={{ background:buyColor }} />Acheter</span>
          <span><span className="fv2-leg-dot" style={{ background:rentColor }} />Louer + placer</span>
          {breakEven && <span><span className="fv2-leg-dot" style={{ background:"#6366f1" }} />Équilibre</span>}
        </div>
      </div>

      {/* ── 3 cartes chiffres clés ── */}
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
          <span className="fv2-kf-card-val">{fmt(monthlyPayment)}</span>
          <span className="fv2-kf-card-label">Mensualité / mois</span>
        </div>
      </div>

      {/* ── Insight naturel ── */}
      <div className="fv2-insight-box">
        <span className="fv2-insight-icon">💡</span>
        <p className="fv2-insight-text">{insight}</p>
      </div>

      {/* ── Timeline pédagogique ── */}
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
          <div className="fv2-timeline-marker" style={{ left:`${markerPct}%` }}>
            <span className="fv2-timeline-you">↑ {v.duration} ans</span>
          </div>
        </div>
      </div>

      {/* ── Patrimoine comparé (compact) ── */}
      <div className="fv2-patrimoine-row">
        <div className="fv2-pat-card fv2-pat-buy">
          <span className="fv2-pat-label">🏠 Acheteur</span>
          <span className="fv2-pat-val">{fmt(ownerNWEnd)}</span>
          <span className="fv2-pat-sub">Valeur bien − capital dû</span>
        </div>
        <div className="fv2-pat-vs">vs</div>
        <div className="fv2-pat-card fv2-pat-rent">
          <span className="fv2-pat-label">🔑 Locataire</span>
          <span className="fv2-pat-val">{fmt(renterPortfolio)}</span>
          <span className="fv2-pat-sub">Apport + surplus placés</span>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="fv2-result-ctas">
        <button type="button" className="btn-primary fv2-cta fv2-cta-email" onClick={onEmail}>
          📧 Recevoir mon analyse par email
        </button>
        <button type="button" className="fv2-btn-secondary" onClick={onEdit}>
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
