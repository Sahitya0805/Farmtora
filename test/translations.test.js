const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Loads the TRANSLATIONS object out of the browser script without running the app.
function loadTranslations() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
  const start = src.indexOf('const TRANSLATIONS = ') + 'const TRANSLATIONS = '.length;
  const end = src.indexOf('\n};', start) + 2;
  return new Function(`return (${src.slice(start, end)});`)();
}

test('English, Kannada and Hindi have the same UI text keys', () => {
  const t = loadTranslations();
  const en = Object.keys(t.en).sort();
  assert.ok(en.length > 100);
  assert.deepEqual(Object.keys(t.kn).sort(), en, 'Kannada keys');
  assert.deepEqual(Object.keys(t.hi).sort(), en, 'Hindi keys');
});

test('no translation is empty', () => {
  const t = loadTranslations();
  for (const lang of ['en', 'kn', 'hi']) {
    for (const [key, value] of Object.entries(t[lang])) {
      assert.ok(String(value).trim().length > 0, `${lang}.${key}`);
    }
  }
});

test('the app no longer claims AI diagnosis or live prices', () => {
  const t = loadTranslations();
  const english = Object.values(t.en).join(' ');
  assert.doesNotMatch(english, /visual transformer|deterministic computer vision|live agricultural/i);
});
