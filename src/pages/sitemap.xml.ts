import type { APIRoute } from 'astro';
import { client } from '../lib/sanity/client';
import { articlesQuery } from '../lib/sanity/queries';
import { fallbackArticles } from '../lib/sanity/fallback';
import type { Article } from '../lib/sanity/types';

/**
 * Échappement des caractères réservés en XML (RFC 3023 / W3C XML 1.0)
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export const GET: APIRoute = async ({ site }) => {
  const rawBaseUrl = (site ? site.toString() : (import.meta.env.PUBLIC_SITE_URL || 'https://carrefour-du-kotamagou.pages.dev')).replace(/\/$/, '');
  const baseUrl = escapeXml(rawBaseUrl);

  // 1. Pages statiques publiques fondamentales
  // RÈGLE SEO IMPÉRATIVE : La page 404 est strictement et rigoureusement exclue
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/actualites/', changefreq: 'daily', priority: '0.9' },
    { url: '/reportages/', changefreq: 'weekly', priority: '0.8' },
    { url: '/interviews/', changefreq: 'weekly', priority: '0.8' },
    { url: '/culture-et-traditions/', changefreq: 'weekly', priority: '0.8' },
    { url: '/histoire-et-memoire/', changefreq: 'weekly', priority: '0.8' },
    { url: '/bibliotheque/', changefreq: 'weekly', priority: '0.8' },
    { url: '/recherche/', changefreq: 'monthly', priority: '0.6' },
    { url: '/a-propos/', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact/', changefreq: 'monthly', priority: '0.5' },
    { url: '/mentions-legales/', changefreq: 'yearly', priority: '0.3' },
    { url: '/politique-de-confidentialite/', changefreq: 'yearly', priority: '0.3' },
  ];

  // 2. Récupération dynamique des articles publiés respectant les verrous de conformité
  let articles: Article[] = [];
  try {
    articles = await client.fetch<Article[]>(articlesQuery);
  } catch {
    // Mode résilience hors ligne
  }

  const liveArticles: Article[] = articles.length > 0 ? articles : fallbackArticles;

  const dynamicArticles = liveArticles.map((article: Article) => {
    let lastmod: string | undefined;
    if (article.publishedAt) {
      try {
        lastmod = new Date(article.publishedAt).toISOString().split('T')[0];
      } catch {
        // Date non conforme ignorée
      }
    }
    const safeSlug = encodeURIComponent(article.slug.current);
    return {
      url: `/articles/${safeSlug}/`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.8',
    };
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${escapeXml(page.url)}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
${dynamicArticles
  .map(
    (art) => `  <url>
    <loc>${baseUrl}${escapeXml(art.url)}</loc>${art.lastmod ? `\n    <lastmod>${art.lastmod}</lastmod>` : ''}
    <changefreq>${art.changefreq}</changefreq>
    <priority>${art.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
