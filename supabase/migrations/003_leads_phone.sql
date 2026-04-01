-- Migration 003 — Ajout colonne phone dans leads
-- À exécuter dans Supabase Dashboard → SQL Editor

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS phone text;

COMMENT ON COLUMN leads.phone IS 'Numéro de téléphone du lead (cross-sell funnel)';
