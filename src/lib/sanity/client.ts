import { createClient } from '@sanity/client';

/**
 * Client officiel Sanity pour Astro (SSG)
 *
 * RÈGLES DE SÉCURITÉ ESSENTIELLES :
 * 1. perspective: 'published' obligatoire pour ne JAMAIS charger de brouillons en ligne.
 * 2. Dataset public en lecture seule : aucun token d'écriture n'est embarqué ici.
 * 3. useCdn: true permet de solliciter le CDN de Sanity (quota de 1 000 000 req/mois).
 */

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'carrefour-kotamagou';
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

export const sanityClient = client;
