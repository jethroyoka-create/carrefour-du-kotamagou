import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import type { SanityImage } from './types';

const builder = imageUrlBuilder(client);

/**
 * Générateur d'URL d'image optimisée via le CDN de Sanity
 * Convertit automatiquement vers WebP/AVIF et permet le redimensionnement
 */
export function urlForImage(source: SanityImage | any) {
  if (!source || !source.asset) {
    return null;
  }
  return builder.image(source).auto('format');
}
