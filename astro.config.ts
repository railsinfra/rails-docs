import { defineConfig, fontProviders } from 'astro/config';
import { generateAPIReferenceItems, stainlessDocs } from '@stainless-api/docs';

const marketingSite =
  typeof process.env.PUBLIC_MARKETING_SITE_URL === 'string' && process.env.PUBLIC_MARKETING_SITE_URL.length > 0
    ? process.env.PUBLIC_MARKETING_SITE_URL.replace(/\/$/, '')
    : 'http://localhost:3000';

/** In Docker/CI there is no `stl` CLI auth; pass the key explicitly when set. */
const stainlessApiKey =
  typeof process.env.STAINLESS_API_KEY === 'string' && process.env.STAINLESS_API_KEY.trim().length > 0
    ? process.env.STAINLESS_API_KEY.trim()
    : undefined;

/**
 * Header `Get started` CTA: env-driven URL + feature flag so we can hide it per environment
 * without redeploying code (e.g. dashboard not yet live in staging/production).
 *
 * Env contract:
 * - PUBLIC_GET_STARTED_URL: absolute or relative URL the button points to. Defaults to docs root `/`.
 * - PUBLIC_GET_STARTED_ENABLED: feature flag. Truthy values: `true` | `1` | `yes` | `on` (case-insensitive).
 *   Defaults to enabled to preserve current behavior when the flag is unset.
 */
const getStartedUrl =
  typeof process.env.PUBLIC_GET_STARTED_URL === 'string' && process.env.PUBLIC_GET_STARTED_URL.trim().length > 0
    ? process.env.PUBLIC_GET_STARTED_URL.trim().replace(/\/$/, '')
    : '/';

const getStartedFlag = (process.env.PUBLIC_GET_STARTED_ENABLED ?? '').trim().toLowerCase();
const getStartedEnabled =
  getStartedFlag === '' ? true : getStartedFlag === 'true' || getStartedFlag === '1' || getStartedFlag === 'yes' || getStartedFlag === 'on';

const getStartedIsExternal = /^https?:\/\//i.test(getStartedUrl);

const headerLinks = [
  ...(getStartedEnabled
    ? [
        {
          label: 'Get started',
          link: getStartedUrl,
          ...(getStartedIsExternal ? { attrs: { target: '_blank', rel: 'noopener noreferrer' } } : {}),
        },
      ]
    : []),
  {
    label: 'Website',
    link: marketingSite,
    attrs: { target: '_blank', rel: 'noopener noreferrer' },
  },
];

// https://astro.build/config
export default defineConfig({
  integrations: [
    stainlessDocs({
      ...(stainlessApiKey ? { apiKey: stainlessApiKey } : {}),
      experimental: {
        starlightCompat: {
          /** Simple light → dark → system toggle (replaces default `ThemeSelect` dropdown). */
          components: {
            ThemeSelect: './src/components/ThemeToggleSimple.astro',
            /** Drop HTTP/SDK sidebar dropdown; use per-language routes under API Reference. */
            Sidebar: './src/components/SidebarNoSdkSelect.astro',
          },
        },
      },
      contextMenu: false,
      /** Deeper “On this page” for long intro sections (Starlight default is h2–h3). */
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      apiReference: {
        stainlessProject: 'rails',
        // Bare `/api/...` URLs use language `http` in docs-ui `parseRoute`. `excludeLanguages: ['http']`
        // removes `http` from `virtual:stainless-apis-manifest` and breaks `getSDKJSONInSSR` in Docs.astro.
        // Code snippet base URLs come from the `environments` order in rails-sdks/.stainless/stainless.yml —
        // `production` must be listed first so generated curl/SDK snippets default to the production URL.
        defaultLanguage: 'typescript',
        propertySettings: {
          collapseDescription: false,
          expandDepth: 2,
        },
      },
      title: 'Rails',
      logo: {
        src: './src/assets/rails-logo.svg',
      },
      description: 'Rails banking infrastructure — API reference and guides.',
      fonts: {
        primary: {
          provider: fontProviders.google(),
          name: 'Inter',
          weights: ['400', '500', '600', '700'],
        },
        heading: {
          provider: fontProviders.google(),
          name: 'Space Grotesk',
          weights: ['400', '500', '600', '700'],
        },
        mono: {
          provider: fontProviders.google(),
          name: 'Noto Sans Mono',
          weights: ['400', '500', '600', '700'],
        },
      },
      customCss: ['./theme.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
          },
        },
        {
          tag: 'script',
          content: `(function(){var KEY='rails-docs-sidebar-collapsed';var MQ='(min-width: 50rem)';function mq(){try{return matchMedia(MQ).matches}catch(e){return true}}function read(){try{return localStorage.getItem(KEY)==='true'}catch(e){return false}}function apply(){document.documentElement.classList.toggle('rails-sidebar-collapsed',read()&&mq())}try{if(read()&&mq())document.documentElement.classList.add('rails-sidebar-collapsed')}catch(e){}function syncAria(){var c=document.documentElement.classList.contains('rails-sidebar-collapsed');document.querySelectorAll('[data-rails-sidebar-toggle]').forEach(function(btn){btn.setAttribute('aria-expanded',c?'false':'true');btn.setAttribute('aria-label',c?'Expand docs sidebar':'Collapse docs sidebar')})}function toggle(){var next=!document.documentElement.classList.contains('rails-sidebar-collapsed');document.documentElement.classList.toggle('rails-sidebar-collapsed',next);try{localStorage.setItem(KEY,next?'true':'false')}catch(e){}syncAria()}document.addEventListener('click',function(e){var t=e.target&&e.target.closest&&e.target.closest('[data-rails-sidebar-toggle]');if(!t)return;e.preventDefault();toggle()});var mql=matchMedia(MQ);function onMq(){apply();syncAria()}(mql.addEventListener?mql.addEventListener('change',onMq):mql.addListener(onMq));document.addEventListener('astro:page-load',function(){apply();syncAria()})})();`,
        },
      ],
      header: {
        layout: 'stacked',
        links: headerLinks,
      },
      tabs: [
        {
          label: 'Guides',
          link: '/',
          sidebar: [
            {
              label: 'Getting started',
              // Root `index.mdx` is not exposed as internal slug `index` in this Stainless+Starlight setup;
              // explicit `link` avoids Starlight resolving a missing collection id.
              items: [{ label: 'Introduction', link: '/' }],
            },
            {
              label: 'Guides',
              collapsed: false,
              items: [
                {
                  label: 'Quick start',
                  collapsed: false,
                  items: [
                    { label: 'Local', link: '/guides/quick-start' },
                    { label: 'TypeScript', link: '/api/typescript' },
                    { label: 'Go', link: '/api/go' },
                    { label: 'Java', link: '/api/java' },
                    { label: 'Kotlin', link: '/api/kotlin' },
                    { label: 'C#', link: '/api/csharp' },
                  ],
                },
                'guides/architecture',
              ],
            },
          ],
        },
        {
          label: 'API Reference',
          link: '/api',
          sidebar: generateAPIReferenceItems({
            excludeResourceOverviewPages: true,
          }),
        },
      ],
    }),
  ],
});
