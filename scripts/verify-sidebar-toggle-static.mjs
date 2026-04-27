/**
 * Guards against regressions: sidebar collapse control must be SSR’d (no DOM insert),
 * which avoids a first-paint layout shift / “twitch” in the nav column.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const sidebar = readFileSync(join(root, '../src/components/SidebarNoSdkSelect.astro'), 'utf8');
const cfg = readFileSync(join(root, '../astro.config.ts'), 'utf8');

const errors = [];
if (!sidebar.includes('rails-sidebar-toggle-wrap')) {
  errors.push('SidebarNoSdkSelect.astro must include static .rails-sidebar-toggle-wrap markup.');
}
if (!sidebar.includes('data-rails-sidebar-toggle')) {
  errors.push('SidebarNoSdkSelect.astro must include data-rails-sidebar-toggle on the button.');
}
if (cfg.includes('insertBefore')) {
  errors.push('astro.config.ts sidebar script must not use insertBefore (use SSR toggle + delegation).');
}
if (!cfg.includes("document.addEventListener('click'") && !cfg.includes('document.addEventListener("click"')) {
  errors.push('astro.config.ts must register delegated click for [data-rails-sidebar-toggle].');
}
if (!cfg.includes('astro:page-load')) {
  errors.push('astro.config.ts must sync sidebar state on astro:page-load after client navigations.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('verify-sidebar-toggle-static: ok');
