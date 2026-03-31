import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ── Fire-and-forget helpers ─────────────────────────────── */

export async function saveSimulation(data) {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    const { data: row } = await supabase
      .from('simulations')
      .insert([data])
      .select('id')
      .single();
    return row?.id ?? null;
  } catch {
    return null;
  }
}

export async function saveNewsletter(email) {
  if (!supabaseUrl || !supabaseAnonKey) return;
  try {
    await supabase
      .from('newsletter')
      .upsert([{ email: email.trim().toLowerCase(), actif: true }], { onConflict: 'email' });
  } catch {}
}

export async function saveLead(email, source, simulationId = null) {
  if (!supabaseUrl || !supabaseAnonKey) return;
  try {
    await supabase.from('leads').insert([{
      email: email.trim().toLowerCase(),
      source,
      simulation_id: simulationId,
    }]);
  } catch {}
}
