-- Migration 002 — Nouvelles colonnes pour le funnel V2 reécrit
-- À exécuter dans Supabase Dashboard → SQL Editor

ALTER TABLE simulations
  ADD COLUMN IF NOT EXISTS situation_pro          text,
  ADD COLUMN IF NOT EXISTS achat_seul_ou_couple   text,
  ADD COLUMN IF NOT EXISTS ville_data             jsonb;

COMMENT ON COLUMN simulations.situation_pro        IS 'Situation professionnelle : cdi | fonctionnaire | freelance | autre';
COMMENT ON COLUMN simulations.achat_seul_ou_couple IS 'Achat seul ou en couple : seul | couple';
COMMENT ON COLUMN simulations.ville_data           IS 'Données complètes de la ville sélectionnée (objet JSON depuis villes.js)';
