import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey
  && supabaseUrl !== 'undefined'
  && supabaseAnonKey !== 'undefined'
  && !supabaseAnonKey.startsWith('REMPLACER'));

if (!isConfigured) {
  console.warn('[Supabase] Variables manquantes — VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY non configurées. Les sauvegardes sont désactivées.');
}

/* Guard: ne pas appeler createClient avec des valeurs undefined (crash immédiat) */
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/* ── saveSimulation ──────────────────────────────────────── */
export async function saveSimulation(data) {
  if (!isConfigured || !supabase) {
    console.warn('[Supabase] saveSimulation ignorée — client non initialisé');
    return null;
  }

  console.log('[Supabase] saveSimulation appelée avec :', data);

  const { data: row, error } = await supabase
    .from('simulations')
    .insert([data])
    .select('id')
    .single();

  if (error) {
    console.error('[Supabase] Erreur saveSimulation :', error.message, error.details, error.hint);
    return null;
  }

  console.log('[Supabase] Simulation sauvegardée, id :', row?.id);
  return row?.id ?? null;
}

/* ── saveNewsletter ──────────────────────────────────────── */
export async function saveNewsletter(email) {
  if (!isConfigured || !supabase) {
    console.warn('[Supabase] saveNewsletter ignorée — client non initialisé');
    return;
  }

  console.log('[Supabase] saveNewsletter appelée pour :', email);

  const { error } = await supabase
    .from('newsletter')
    .upsert([{ email: email.trim().toLowerCase(), actif: true }], { onConflict: 'email' });

  if (error) {
    console.error('[Supabase] Erreur saveNewsletter :', error.message);
  } else {
    console.log('[Supabase] Newsletter enregistrée');
  }
}

/* ── saveLead ────────────────────────────────────────────── */
export async function saveLead(email, source, simulationId = null) {
  if (!isConfigured || !supabase) {
    console.warn('[Supabase] saveLead ignorée — client non initialisé');
    return;
  }

  const { error } = await supabase.from('leads').insert([{
    email: email.trim().toLowerCase(),
    source,
    simulation_id: simulationId,
  }]);

  if (error) {
    console.error('[Supabase] Erreur saveLead :', error.message);
  }
}
