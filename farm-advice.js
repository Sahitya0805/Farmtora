/**
 * FarmTora - 7-day farm advice from the Open-Meteo daily forecast.
 * Pure functions, usable in the browser (window.FarmAdvice) and in Node tests.
 */
(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.FarmAdvice = api;
})(typeof self !== 'undefined' ? self : this, function () {
    // Thresholds follow common agronomy rules of thumb.
    const LIMITS = {
        frostMin: 4,          // °C minimum: frost risk for sensitive crops
        heatMax: 38,          // °C maximum: heat stress
        sprayRainMax: 30,     // % rain chance: spraying is OK below this
        sprayWindMax: 15,     // km/h max wind: drift risk above this
        noSprayRain: 60,      // % rain chance: spray will likely wash off
        noSprayWind: 20,      // km/h: too windy to spray
        noSprayRainSum: 5,    // mm: enough rain to wash spray off
        sprayRainSumMax: 2,   // mm: spraying is OK below this
        irrigateTempMin: 30,  // °C: hot enough that dry days need irrigation
        dryRainSum: 1,        // mm: effectively no rain
        skipIrrigationRain: 10, // mm: enough rain to skip irrigation
        heavyRain: 25         // mm/day: check drainage
    };

    const TEXT = {
        en: {
            frost: 'Frost risk (min {min}°C): cover nursery beds and young plants, irrigate lightly in the evening.',
            heat: 'Heat stress (max {max}°C): irrigate early morning or evening and avoid field work at midday.',
            heavyRain: 'Heavy rain ({rain} mm): clear field drains and postpone fertiliser application.',
            sprayGood: 'Good day to spray: low rain chance ({prob}%) and light wind ({wind} km/h).',
            sprayAvoid: 'Avoid spraying: {reason}.',
            reasonRain: 'rain likely ({prob}%)',
            reasonRainSum: '{rain} mm of rain expected',
            reasonWind: 'strong wind ({wind} km/h)',
            irrigate: 'Dry and hot: plan irrigation.',
            skipIrrigation: 'Enough rain expected ({rain} mm): skip irrigation.',
            normal: 'No weather risks. Routine field work is fine.',
            bestSprayDays: 'Best spray days',
            none: 'None this week',
            title: '7-Day Farm Advice',
            note: 'Based on the Open-Meteo forecast. Always follow the label on the product you spray.'
        },
        kn: {
            frost: 'ಹಿಮದ ಅಪಾಯ (ಕನಿಷ್ಠ {min}°C): ಸಸಿಮಡಿ ಮತ್ತು ಎಳೆಯ ಗಿಡಗಳನ್ನು ಮುಚ್ಚಿ, ಸಂಜೆ ಲಘುವಾಗಿ ನೀರು ಹಾಯಿಸಿ.',
            heat: 'ಅತಿಯಾದ ಶಾಖ (ಗರಿಷ್ಠ {max}°C): ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ನೀರು ಹಾಯಿಸಿ, ಮಧ್ಯಾಹ್ನ ಹೊಲದ ಕೆಲಸ ತಪ್ಪಿಸಿ.',
            heavyRain: 'ಭಾರಿ ಮಳೆ ({rain} ಮಿ.ಮೀ): ಹೊಲದ ಕಾಲುವೆಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ, ಗೊಬ್ಬರ ಹಾಕುವುದನ್ನು ಮುಂದೂಡಿ.',
            sprayGood: 'ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತ ದಿನ: ಮಳೆ ಸಾಧ್ಯತೆ ಕಡಿಮೆ ({prob}%) ಮತ್ತು ಗಾಳಿ ಕಡಿಮೆ ({wind} ಕಿ.ಮೀ/ಗಂ).',
            sprayAvoid: 'ಸಿಂಪಡಣೆ ಬೇಡ: {reason}.',
            reasonRain: 'ಮಳೆ ಸಾಧ್ಯತೆ ({prob}%)',
            reasonRainSum: '{rain} ಮಿ.ಮೀ ಮಳೆ ನಿರೀಕ್ಷೆ',
            reasonWind: 'ಜೋರು ಗಾಳಿ ({wind} ಕಿ.ಮೀ/ಗಂ)',
            irrigate: 'ಒಣ ಮತ್ತು ಬಿಸಿ ದಿನ: ನೀರಾವರಿ ಯೋಜಿಸಿ.',
            skipIrrigation: 'ಸಾಕಷ್ಟು ಮಳೆ ನಿರೀಕ್ಷೆ ({rain} ಮಿ.ಮೀ): ನೀರಾವರಿ ಬೇಡ.',
            normal: 'ಹವಾಮಾನ ಅಪಾಯವಿಲ್ಲ. ಸಾಮಾನ್ಯ ಹೊಲದ ಕೆಲಸ ಮಾಡಬಹುದು.',
            bestSprayDays: 'ಸಿಂಪಡಣೆಗೆ ಉತ್ತಮ ದಿನಗಳು',
            none: 'ಈ ವಾರ ಇಲ್ಲ',
            title: '7 ದಿನಗಳ ಕೃಷಿ ಸಲಹೆ',
            note: 'Open-Meteo ಮುನ್ಸೂಚನೆ ಆಧಾರಿತ. ಸಿಂಪಡಿಸುವ ಉತ್ಪನ್ನದ ಲೇಬಲ್ ಸೂಚನೆಗಳನ್ನು ಯಾವಾಗಲೂ ಪಾಲಿಸಿ.'
        },
        hi: {
            frost: 'पाले का खतरा (न्यूनतम {min}°C): नर्सरी और छोटे पौधों को ढकें, शाम को हल्की सिंचाई करें।',
            heat: 'अधिक गर्मी (अधिकतम {max}°C): सुबह या शाम सिंचाई करें, दोपहर में खेत का काम न करें।',
            heavyRain: 'भारी बारिश ({rain} मिमी): खेत की नालियां साफ़ करें और खाद डालना टालें।',
            sprayGood: 'छिड़काव के लिए अच्छा दिन: बारिश की संभावना कम ({prob}%) और हवा धीमी ({wind} किमी/घं)।',
            sprayAvoid: 'छिड़काव न करें: {reason}।',
            reasonRain: 'बारिश की संभावना ({prob}%)',
            reasonRainSum: '{rain} मिमी बारिश की उम्मीद',
            reasonWind: 'तेज़ हवा ({wind} किमी/घं)',
            irrigate: 'सूखा और गर्म दिन: सिंचाई की योजना बनाएं।',
            skipIrrigation: 'पर्याप्त बारिश की उम्मीद ({rain} मिमी): सिंचाई न करें।',
            normal: 'मौसम का कोई खतरा नहीं। खेत का सामान्य काम कर सकते हैं।',
            bestSprayDays: 'छिड़काव के लिए अच्छे दिन',
            none: 'इस सप्ताह नहीं',
            title: '7 दिन की खेती सलाह',
            note: 'Open-Meteo पूर्वानुमान पर आधारित। छिड़काव वाले उत्पाद के लेबल के निर्देश हमेशा मानें।'
        }
    };

    function round(n) {
        return typeof n === 'number' && isFinite(n) ? Math.round(n) : null;
    }

    /** Advice items for one day: [{ code, level: 'risk'|'good'|'info', vars }] */
    function adviseDay(day) {
        const min = round(day.min);
        const max = round(day.max);
        const prob = round(day.rainProb) ?? 0;
        const rain = typeof day.rainSum === 'number' ? Math.round(day.rainSum * 10) / 10 : 0;
        const wind = round(day.windMax) ?? 0;
        const items = [];

        if (min !== null && min <= LIMITS.frostMin) items.push({ code: 'frost', level: 'risk', vars: { min } });
        if (max !== null && max >= LIMITS.heatMax) items.push({ code: 'heat', level: 'risk', vars: { max } });
        if (rain >= LIMITS.heavyRain) items.push({ code: 'heavyRain', level: 'risk', vars: { rain } });

        const rainy = prob >= LIMITS.noSprayRain || rain >= LIMITS.noSprayRainSum;
        if (rainy || wind >= LIMITS.noSprayWind) {
            const reasons = [];
            if (prob >= LIMITS.noSprayRain) reasons.push({ code: 'reasonRain', vars: { prob } });
            else if (rain >= LIMITS.noSprayRainSum) reasons.push({ code: 'reasonRainSum', vars: { rain } });
            if (wind >= LIMITS.noSprayWind) reasons.push({ code: 'reasonWind', vars: { wind } });
            items.push({ code: 'sprayAvoid', level: 'risk', vars: {}, reasons });
        } else if (prob < LIMITS.sprayRainMax && rain < LIMITS.sprayRainSumMax && wind < LIMITS.sprayWindMax) {
            items.push({ code: 'sprayGood', level: 'good', vars: { prob, wind } });
        }

        if (rain >= LIMITS.skipIrrigationRain) {
            items.push({ code: 'skipIrrigation', level: 'info', vars: { rain } });
        } else if (rain < LIMITS.dryRainSum && prob < LIMITS.sprayRainMax && max !== null && max >= LIMITS.irrigateTempMin) {
            items.push({ code: 'irrigate', level: 'info', vars: {} });
        }

        if (items.length === 0) items.push({ code: 'normal', level: 'info', vars: {} });
        return items;
    }

    /** Converts an Open-Meteo `daily` block into per-day advice. */
    function adviseWeek(daily) {
        if (!daily || !Array.isArray(daily.time)) return [];
        return daily.time.map((date, i) => {
            const day = {
                date,
                min: daily.temperature_2m_min?.[i],
                max: daily.temperature_2m_max?.[i],
                rainProb: daily.precipitation_probability_max?.[i],
                rainSum: daily.precipitation_sum?.[i],
                windMax: daily.wind_speed_10m_max?.[i]
            };
            return { ...day, advice: adviseDay(day) };
        });
    }

    function fill(template, vars) {
        return template.replace(/\{(\w+)\}/g, (_, key) => (vars && key in vars ? vars[key] : ''));
    }

    function text(code, lang, vars) {
        const table = TEXT[lang] || TEXT.en;
        return fill(table[code] || TEXT.en[code] || code, vars);
    }

    /** Human-readable sentence for one advice item. */
    function describe(item, lang) {
        if (item.code === 'sprayAvoid') {
            const reason = (item.reasons || []).map((r) => text(r.code, lang, r.vars)).join(', ');
            return text('sprayAvoid', lang, { reason });
        }
        return text(item.code, lang, item.vars);
    }

    function bestSprayDays(week) {
        return week.filter((d) => d.advice.some((a) => a.code === 'sprayGood')).map((d) => d.date);
    }

    return { LIMITS, TEXT, adviseDay, adviseWeek, describe, text, bestSprayDays };
});
