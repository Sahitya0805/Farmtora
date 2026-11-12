const test = require('node:test');
const assert = require('node:assert/strict');
const FarmAdvice = require('../farm-advice.js');

const codes = (day) => FarmAdvice.adviseDay(day).map((a) => a.code);

test('calm dry day is good for spraying', () => {
  assert.deepEqual(codes({ min: 18, max: 28, rainProb: 5, rainSum: 0, windMax: 8 }), ['sprayGood']);
});

test('rain or strong wind means no spraying', () => {
  assert.ok(codes({ min: 18, max: 28, rainProb: 80, rainSum: 4, windMax: 5 }).includes('sprayAvoid'));
  assert.ok(codes({ min: 18, max: 28, rainProb: 5, rainSum: 0, windMax: 25 }).includes('sprayAvoid'));
});

test('a low rain chance with a lot of rain still means no spraying', () => {
  const c = codes({ min: 4, max: 15, rainProb: 29, rainSum: 12.8, windMax: 11 });
  assert.ok(c.includes('sprayAvoid'));
  assert.ok(!c.includes('sprayGood'));
});

test('frost, heat and heavy rain are flagged as risks', () => {
  assert.ok(codes({ min: 2, max: 14, rainProb: 0, rainSum: 0, windMax: 5 }).includes('frost'));
  assert.ok(codes({ min: 28, max: 41, rainProb: 0, rainSum: 0, windMax: 5 }).includes('heat'));
  assert.ok(codes({ min: 22, max: 27, rainProb: 95, rainSum: 40, windMax: 10 }).includes('heavyRain'));
});

test('hot dry day suggests irrigation, wet day skips it', () => {
  assert.ok(codes({ min: 24, max: 34, rainProb: 5, rainSum: 0, windMax: 5 }).includes('irrigate'));
  assert.ok(codes({ min: 22, max: 27, rainProb: 90, rainSum: 15, windMax: 5 }).includes('skipIrrigation'));
});

test('moderate day with nothing notable says routine work is fine', () => {
  assert.deepEqual(codes({ min: 18, max: 26, rainProb: 45, rainSum: 2, windMax: 16 }), ['normal']);
});

test('adviseWeek reads the Open-Meteo daily block and finds spray days', () => {
  const week = FarmAdvice.adviseWeek({
    time: ['2026-11-12', '2026-11-13'],
    temperature_2m_min: [18, 18],
    temperature_2m_max: [28, 28],
    precipitation_probability_max: [5, 85],
    precipitation_sum: [0, 12],
    wind_speed_10m_max: [6, 6]
  });
  assert.equal(week.length, 2);
  assert.deepEqual(FarmAdvice.bestSprayDays(week), ['2026-11-12']);
});

test('every advice text exists in English, Kannada and Hindi', () => {
  const en = Object.keys(FarmAdvice.TEXT.en).sort();
  assert.deepEqual(Object.keys(FarmAdvice.TEXT.kn).sort(), en);
  assert.deepEqual(Object.keys(FarmAdvice.TEXT.hi).sort(), en);
  const text = FarmAdvice.describe({ code: 'sprayAvoid', reasons: [{ code: 'reasonWind', vars: { wind: 25 } }] }, 'hi');
  assert.match(text, /25/);
  assert.doesNotMatch(text, /\{/);
});
