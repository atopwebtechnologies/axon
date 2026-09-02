import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

assert.match(html, /<header[\s>]/i, 'includes a header');
assert.match(html, /<main[\s>]/i, 'includes a main landmark');
assert.match(html, /<section[^>]+id="features"/i, 'includes a features section');
assert.match(html, /<section[^>]+id="pricing"/i, 'includes a pricing section');
assert.match(html, /<table[\s>]/i, 'includes a pricing table');
assert.match(css, /--color-accent:/, 'defines design tokens');
assert.match(css, /@media[\s\S]*max-width/, 'includes responsive rules');
assert.match(css, /prefers-reduced-motion/, 'respects reduced-motion preferences');
assert.match(html, /href="#features"/, 'links to the features section');
assert.match(html, /href="#pricing"/, 'links to the pricing section');
