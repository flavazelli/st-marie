import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { render } = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
const routes = ['/', '/about', '/catalog', '/catalog/breads', '/catalog/empanadas', '/catalog/cookies', '/catalog/heat-and-eat', '/catalog/cakes', '/catalog/special-orders'];
for (const route of routes) {
  const html = render(route);
  const metadataPattern = /<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g;
  const metadata = [...html.matchAll(metadataPattern)].map(match => match[0]).join('');
  const content = html.replace(metadataPattern, '');
  const output = path.join('dist', route.slice(1), 'index.html');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, template.replace(/<title>[\s\S]*?<\/title>/, '').replace('</head>', `${metadata}</head>`).replace('<!--app-html-->', content));
}
await rm('.ssr', { recursive: true, force: true });
console.log(`Generated ${routes.length} static pages.`);
