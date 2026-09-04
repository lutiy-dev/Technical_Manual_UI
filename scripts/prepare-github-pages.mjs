import { copyFile, cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

if (!basePath?.startsWith('/')) {
  throw new Error('NEXT_PUBLIC_BASE_PATH must be an absolute project path such as /owner-repo.');
}

const projectSegment = basePath.replace(/^\/+|\/+$/g, '');
const clientDirectory = path.resolve('dist/client');
const pagesDirectory = path.join(clientDirectory, projectSegment);

await mkdir(pagesDirectory, { recursive: true });

for (const directory of ['assets', 'resources']) {
  await cp(path.join(clientDirectory, directory), path.join(pagesDirectory, directory), {
    recursive: true,
    force: true,
  });
}

for (const file of ['favicon.svg', '404.html']) {
  await copyFile(path.join(clientDirectory, file), path.join(pagesDirectory, file));
}

await copyFile(
  path.join(clientDirectory, `${projectSegment}.html`),
  path.join(pagesDirectory, 'index.html'),
);
await copyFile(
  path.join(clientDirectory, `${projectSegment}.rsc`),
  path.join(pagesDirectory, 'index.rsc'),
);

const routeFiles = await readdir(pagesDirectory, { withFileTypes: true });
for (const entry of routeFiles) {
  if (!entry.isFile() || !entry.name.endsWith('.html') || entry.name === 'index.html' || entry.name === '404.html') {
    continue;
  }

  const routeName = entry.name.slice(0, -'.html'.length);
  const routeDirectory = path.join(pagesDirectory, routeName);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(path.join(pagesDirectory, entry.name), path.join(routeDirectory, 'index.html'));
}

await writeFile(path.join(pagesDirectory, '.nojekyll'), '', 'utf8');

console.log(`GitHub Pages artifact prepared at ${pagesDirectory}`);
