import { defineConfig, fontProviders } from 'astro/config';
import { generateAPIReferenceItems, stainlessDocs } from '@stainless-api/docs';

const marketingSite =
  typeof process.env.PUBLIC_MARKETING_SITE_URL === 'string' && process.env.PUBLIC_MARKETING_SITE_URL.length > 0
    ? process.env.PUBLIC_MARKETING_SITE_URL.replace(/\/$/, '')
    : 'http://localhost:3000';

// https://astro.build/config
export default defineConfig({
  integrations: [
    stainlessDocs({
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
          content: `(function(){var KEY='rails-docs-sidebar-collapsed';var MQ='(min-width: 50rem)';function mq(){try{return matchMedia(MQ).matches}catch(e){return true}}function read(){try{return localStorage.getItem(KEY)==='true'}catch(e){return false}}function apply(){document.documentElement.classList.toggle('rails-sidebar-collapsed',read()&&mq())}try{if(read()&&mq())document.documentElement.classList.add('rails-sidebar-collapsed')}catch(e){}function mount(){var pane=document.getElementById('starlight__sidebar');if(!pane||pane.querySelector('[data-rails-sidebar-toggle]'))return;var wrap=document.createElement('div');wrap.className='rails-sidebar-toggle-wrap';var btn=document.createElement('button');btn.type='button';btn.className='rails-sidebar-toggle';btn.setAttribute('data-rails-sidebar-toggle','');btn.setAttribute('aria-controls','starlight__sidebar');var icon=document.createElement('span');icon.className='material-symbols-sharp';icon.setAttribute('aria-hidden','true');btn.appendChild(icon);function updateBtn(){var c=document.documentElement.classList.contains('rails-sidebar-collapsed');btn.setAttribute('aria-expanded',c?'false':'true');btn.setAttribute('aria-label',c?'Expand docs sidebar':'Collapse docs sidebar');icon.textContent=c?'left_panel_open':'left_panel_close'}function toggle(){var next=!document.documentElement.classList.contains('rails-sidebar-collapsed');document.documentElement.classList.toggle('rails-sidebar-collapsed',next);try{localStorage.setItem(KEY,next?'true':'false')}catch(e){}updateBtn()}btn.addEventListener('click',toggle);updateBtn();wrap.appendChild(btn);pane.insertBefore(wrap,pane.firstChild);var mql=matchMedia(MQ);function onMq(){apply();updateBtn()}(mql.addEventListener?mql.addEventListener('change',onMq):mql.addListener(onMq))}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount()})();`,
        },
      ],
      header: {
        layout: 'stacked',
        links: [
          {
            label: 'Get started',
            link: '/',
          },
          {
            label: 'Website',
            link: marketingSite,
            attrs: { target: '_blank', rel: 'noopener noreferrer' },
          },
        ],
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
                  autogenerate: { directory: 'guides/quick-start' },
                },
                'guides/architecture',
                'guides/authentication',
                'guides/sdk-overview',
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
