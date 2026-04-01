import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey
  && supabaseUrl !== 'undefined'
  && supabaseAnonKey !== 'undefined'
  && !supabaseAnonKey.startsWith('REMPLACER'));

/* Guard: ne pas appeler createClient avec des valeurs undefined (crash immédiat) */
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/* ── saveSimulation ──────────────────────────────────────── */
export async function saveSimulation(data) {
  if (!isConfigured || !supabase) return null;

  const { data: row, error } = await supabase
    .from('simulations')
    .insert([data])
    .select('id')
    .single();

  if (error) return null;
  return row?.id ?? null;
}

/* ── saveNewsletter ──────────────────────────────────────── */
export async function saveNewsletter(email) {
  if (!isConfigured || !supabase) return;

  await supabase
    .from('newsletter')
    .upsert([{ email: email.trim().toLowerCase(), actif: true }], { onConflict: 'email' });
}

/* ── saveLead ────────────────────────────────────────────── */
export async function saveLead(email, source, simulationId = null, phone = null) {
  if (!isConfigured || !supabase) return;

  const row = { email: email.trim().toLowerCase(), source, simulation_id: simulationId };
  if (phone) row.phone = phone.trim();

  await supabase.from('leads').insert([row]);
}
