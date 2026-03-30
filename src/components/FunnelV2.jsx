import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from "recharts";

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
  const annualTax = v.taxFonciere;
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

function CityAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value?.name || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query.length >= 2
    ? CITIES.filter((c) => c.name.toLowerCase().startsWith(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (city) => {
    setQuery(city.name);
    setOpen(false);
    onChange(city);
  };

  return (
    <div className="fv2-city-wrap" ref={ref}>
      <div className="fv2-city-input-row">
        <span className="fv2-city-icon">📍</span>
        <input
          type="text"
          className="fv2-city-input"
          placeholder="Votre ville (ex : Lyon, Bordeaux…)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); if (!e.target.value) onChange(null); }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
        {value && <span className="fv2-city-check">✓</span>}
      </div>
      {open && filtered.length > 0 && (
        <ul className="fv2-city-dropdown" role="listbox">
          {filtered.map((c) => (
            <li key={c.id} className="fv2-city-option" role="option" onMouseDown={() => select(c)}>
              <span className="fv2-city-option-name">{c.name}</span>
              <span className="fv2-city-option-price">{fmtK(c.priceM2)}/m²</span>
            </li>
          ))}
        </ul>
      )}
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
      annualPropertyTax: city.taxRef,
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

      <div style={{ marginTop: 24 }}>
        <label className="fv2-field-label" style={{ marginBottom: 8, display: "block" }}>
          Votre ville ou région <span className="fv2-optional">(optionnel)</span>
        </label>
        <CityAutocomplete value={v.city} onChange={applyCity} />
        {v.city && (
          <p className="fv2-hint fv2-hint-success">
            ✓ Prix, loyer et taxe foncière pré-remplis pour {v.city.name}
          </p>
        )}
      </div>

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
  return (
    <div className="fv2-card">
      <div className="fv2-card-kicker">FINANCES</div>
      <h1 className="fv2-card-title">Parlons de vos moyens</h1>

      <Slider
        label="Revenus mensuels nets"
        value={v.revenus}
        onChange={set("revenus")}
        min={1000} max={10000} step={100}
        format={(x) => `${x.toLocaleString("fr-FR")} €/mois`}
        hint={`Capacité d'emprunt théorique : ${fmt(v.revenus * 0.35 * (1 - Math.pow(1 + 3.5/100/12, -240)) / (3.5/100/12))}`}
      />

      <NumberInput
        label="Apport disponible"
        value={v.apport}
        onChange={set("apport")}
        suffix="€"
        hint="Épargne mobilisable pour le projet (hors réserve d'urgence)"
      />

      <div style={{ marginTop: 24 }}>
        <p className="fv2-field-label" style={{ marginBottom: 10 }}>Situation professionnelle</p>
        <div className="fv2-choices-row">
          {[
            { id:"cdi",         label:"CDI",          icon:"👔" },
            { id:"freelance",   label:"Freelance",    icon:"💻" },
            { id:"fonctionnaire",label:"Fonctionnaire",icon:"🏛️" },
            { id:"autre",       label:"Autre",        icon:"🔧" },
          ].map((e) => (
            <ChoiceBtn key={e.id} active={v.emploi === e.id}
              onClick={() => set("emploi")(e.id)} icon={e.icon} label={e.label} />
          ))}
        </div>
      </div>

      <div className="fv2-privacy-note">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#64748b" strokeWidth="1.3"/>
          <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        Ces informations restent 100 % confidentielles
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
          label="Durée prévue dans ce bien"
          value={v.duration}
          onChange={set("duration")}
          min={1} max={25} step={1}
          format={(x) => `${x} an${x > 1 ? "s" : ""}`}
        />
        <div className="fv2-alert-red">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#dc2626" strokeWidth="1.3"/>
            <path d="M7 4v3.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7" cy="10" r=".8" fill="#dc2626"/>
          </svg>
          C'est le facteur le plus important pour savoir si acheter est rentable.
        </div>
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

      <Slider
        label="Taux d'intérêt"
        value={v.rate}
        onChange={set("rate")}
        min={1.0} max={6.0} step={0.1}
        format={(x) => `${x.toFixed(1)} %`}
        hint="Taux fixe moyen 20 ans en 2026 : 3,5–4,0 %"
      />

      <Slider
        label="Durée du crédit"
        value={v.loanYears}
        onChange={set("loanYears")}
        min={10} max={25} step={1}
        format={(x) => `${x} ans`}
      />

      <div className="fv2-notary-row">
        <span className="fv2-field-label">Frais de notaire</span>
        <span className="fv2-notary-val">{v.notaryPct} % — {fmt(notary)} <span className="fv2-auto-tag">Auto</span></span>
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

      <label className="fv2-checkbox-row">
        <input
          type="checkbox"
          className="fv2-checkbox"
          checked={v.rentRise}
          onChange={(e) => set("rentRise")(e.target.checked)}
        />
        <span className="fv2-checkbox-label">
          Mon loyer va probablement augmenter
          <span className="fv2-checkbox-sub">Indexation IRL ~1,8 %/an prise en compte</span>
        </span>
      </label>

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
  useEffect(() => { const t = setTimeout(() => setChartReady(true), 120); return () => clearTimeout(t); }, []);

  const { isBuyBetter, advantage, breakEven, yearlyData, monthlyPayment, ownerMonthly,
          ownerNWEnd, renterPortfolio, notary } = result;

  const title = isBuyBetter
    ? breakEven
      ? `Acheter devient plus rentable après ${breakEven} an${breakEven > 1 ? "s" : ""}`
      : "Acheter est rentable dès le départ"
    : "Louer reste plus avantageux dans votre situation";

  const heroColor = isBuyBetter ? "#059669" : "#d97706";

  const maxNW = Math.max(...yearlyData.map((d) => Math.max(d.ownerNW, d.renterNW)));
  const minNW = Math.min(...yearlyData.map((d) => Math.min(d.ownerNW, d.renterNW)));

  return (
    <div className="fv2-result">
      {/* Header */}
      <div className="fv2-result-header">
        <div className="fv2-result-kicker" style={{ color: heroColor }}>
          {isBuyBetter ? "✅ ACHETER RECOMMANDÉ" : "🔵 LOCATION AVANTAGEUSE"}
        </div>
        <h1 className="fv2-result-title">{title}</h1>
        <p className="fv2-result-insight">
          Dans votre situation, {isBuyBetter
            ? `acheter vous permettrait d'accumuler environ `
            : `louer vous permet de préserver environ `}
          <strong style={{ color: heroColor }}>{fmt(Math.abs(advantage))}</strong>
          {isBuyBetter
            ? ` de patrimoine supplémentaire sur ${v.duration} ans.`
            : ` de plus que l'achat sur ${v.duration} ans.`}
        </p>
      </div>

      {/* Chart */}
      <div className="fv2-chart-wrap">
        <p className="fv2-chart-title">Évolution du patrimoine net sur {v.duration} ans</p>
        {chartReady && (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={yearlyData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" />
              <XAxis
                dataKey="year" tickLine={false} axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickFormatter={(y) => `${y}a`}
              />
              <YAxis
                tickLine={false} axisLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }} width={48}
                tickFormatter={fmtK}
                domain={[Math.min(0, minNW * 1.1), maxNW * 1.1]}
              />
              <Tooltip content={<ChartTip />} />
              {breakEven && (
                <ReferenceLine
                  x={breakEven}
                  stroke="#6366f1"
                  strokeDasharray="4 3"
                  label={{ value: `Équilibre`, position: "top", fontSize: 10, fill: "#6366f1" }}
                />
              )}
              <Line
                type="monotone" dataKey="ownerNW" name="Acheter"
                stroke="#1a56db" strokeWidth={2.5} dot={false}
                animationDuration={1200} animationEasing="ease-out"
              />
              <Line
                type="monotone" dataKey="renterNW" name="Louer + investir"
                stroke="#f59e0b" strokeWidth={2.5} dot={false}
                animationDuration={1400} animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        <div className="fv2-chart-legend">
          <span><span className="fv2-leg-dot" style={{ background: "#1a56db" }} />Acheter</span>
          <span><span className="fv2-leg-dot" style={{ background: "#f59e0b" }} />Louer + investir</span>
          {breakEven && <span><span className="fv2-leg-dot" style={{ background: "#6366f1" }} />Point d'équilibre</span>}
        </div>
      </div>

      {/* Summary cards */}
      <div className="fv2-summary-grid">
        <div className="fv2-sum-card fv2-sum-blue">
          <span className="fv2-sum-label">Patrimoine acheteur</span>
          <span className="fv2-sum-val">{fmt(ownerNWEnd)}</span>
          <span className="fv2-sum-sub">Valeur du bien — capital restant</span>
        </div>
        <div className="fv2-sum-card fv2-sum-amber">
          <span className="fv2-sum-label">Patrimoine locataire</span>
          <span className="fv2-sum-val">{fmt(renterPortfolio)}</span>
          <span className="fv2-sum-sub">Apport + frais placés à 3,5 %/an</span>
        </div>
        <div className={`fv2-sum-card ${isBuyBetter ? "fv2-sum-green" : "fv2-sum-orange"}`}>
          <span className="fv2-sum-label">Avantage</span>
          <span className="fv2-sum-val">{isBuyBetter ? "+" : "−"}{fmt(Math.abs(advantage))}</span>
          <span className="fv2-sum-sub">En faveur de {isBuyBetter ? "l'achat" : "la location"}</span>
        </div>
      </div>

      {/* Key figures */}
      <div className="fv2-key-figures">
        <div className="fv2-kf-row">
          <span>🏦 Mensualité crédit</span>
          <strong>{fmt(monthlyPayment)}/mois</strong>
        </div>
        <div className="fv2-kf-row">
          <span>📊 Coût total mensuel propriétaire</span>
          <strong>{fmt(ownerMonthly)}/mois</strong>
        </div>
        <div className="fv2-kf-row">
          <span>🏷️ Frais de notaire</span>
          <strong>{fmt(notary)}</strong>
        </div>
        <div className="fv2-kf-row">
          <span>📅 Horizon de comparaison</span>
          <strong>{v.duration} ans</strong>
        </div>
        {breakEven && (
          <div className="fv2-kf-row fv2-kf-highlight">
            <span>⚖️ Point d'équilibre achat/location</span>
            <strong>{breakEven} ans</strong>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="fv2-result-ctas">
        <button type="button" className="btn-primary fv2-cta" onClick={onEmail}>
          📨 Recevoir mon analyse détaillée
        </button>
        <a
          href="https://www.meilleursagents.com/conseils-immobilier/courtier/"
          target="_blank" rel="noopener noreferrer"
          className="fv2-btn-secondary"
        >
          💬 Parler à un expert
        </a>
      </div>

      <div className="fv2-result-actions-row">
        <button type="button" className="fv2-edit-btn" onClick={onEdit}>
          ↩ Modifier mes paramètres
        </button>
        <Link to="/simulateurs" className="fv2-edit-btn">
          🧮 Autres simulateurs
        </Link>
      </div>

      <p className="fv2-disclaimer">
        Simulation indicative basée sur vos données. Consultez un conseiller financier avant toute décision.
      </p>
    </div>
  );
}
