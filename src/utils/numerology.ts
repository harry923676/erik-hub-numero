/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Core Calculation & Transliteration Algorithms
 * Lead Architect & Numerology Researcher: Pawan Paji
 */

import { CalculationStep, CoreNumbersProfile, CompatibilityReport } from '../types';
import { SINGLE_NUMBERS } from '../data/numbers';

// Chaldean Letter Values (1 to 8; 9 is excluded from single letters as sacred)
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Pythagorean Letter Values (1 to 9)
export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

// Sanskrit Katapayadi Mapping
export const KATAPAYADI_CONSONANTS: Record<string, number> = {
  // ka-group: 1..9, 0
  'क': 1, 'ख': 2, 'ग': 3, 'घ': 4, 'ङ': 5,
  'च': 6, 'छ': 7, 'ज': 8, 'झ': 9, 'ञ': 0,
  // ta-group: 1..9, 0
  'ट': 1, 'ठ': 2, 'ड': 3, 'ढ': 4, 'ण': 5,
  'त': 6, 'थ': 7, 'द': 8, 'ध': 9, 'न': 0,
  // pa-group: 1..5
  'प': 1, 'फ': 2, 'ब': 3, 'भ': 4, 'म': 5,
  // ya-group: 1..8
  'य': 1, 'र': 2, 'ल': 3, 'व': 4, 'श': 5, 'ष': 6, 'स': 7, 'ह': 8,
  // Gurmukhi / Indic variants
  'ਕ': 1, 'ਖ': 2, 'ਗ': 3, 'ਘ': 4,
  'ਚ': 6, 'ਛ': 7, 'ਜ': 8, 'ਝ': 9,
  'ਟ': 1, 'ਠ': 2, 'ਡ': 3, 'ਢ': 4,
  'ਤ': 6, 'ਥ': 7, 'ਦ': 8, 'ਧ': 9, 'ਨ': 0,
  'ਪ': 1, 'ਫ': 2, 'ਬ': 3, 'ਭ': 4, 'ਮ': 5,
  'ਯ': 1, 'ਰ': 2, 'ਲ': 3, 'ਵ': 4, 'ਸ': 7, 'ਹ': 8
};

export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/**
 * Reduce a number to a single digit (1-9) or preserve Master Numbers (11, 22, 33) if requested.
 */
export function reduceToSingleDigit(num: number, preserveMaster: boolean = false): { root: number; steps: string[] } {
  const steps: string[] = [];
  let current = Math.abs(num);

  while (current > 9) {
    if (preserveMaster && (current === 11 || current === 22 || current === 33)) {
      break;
    }
    const digits = current.toString().split('').map(Number);
    const sum = digits.reduce((acc, d) => acc + d, 0);
    steps.push(`${digits.join(' + ')} = ${sum}`);
    current = sum;
  }

  return { root: current, steps };
}

/**
 * Calculate transparent reduction for a date string (YYYY-MM-DD)
 */
export function calculateDateNumbers(dateString: string) {
  const [yearStr, monthStr, dayStr] = dateString.split('-');
  const day = parseInt(dayStr, 10) || 1;
  const month = parseInt(monthStr, 10) || 1;
  const year = parseInt(yearStr, 10) || 2000;

  // Mulank (Day of Birth)
  const dayDigits = day.toString().split('').map(Number);
  const mulankSum = dayDigits.reduce((a, b) => a + b, 0);
  const mulankReduction = reduceToSingleDigit(mulankSum);
  const mulankStep: CalculationStep = {
    label: 'Mūlāṅka (Birth / Root Number)',
    rawExpression: `Day of Birth (${day})`,
    intermediate: dayDigits,
    sum: mulankSum,
    reductionStep: dayDigits.length > 1 ? `${dayDigits.join(' + ')} = ${mulankSum}` : undefined,
    finalNumber: mulankReduction.root
  };

  // Bhagyank (Life Path / Destiny Number)
  const allDigits = `${day}${month}${year}`.split('').map(Number);
  const totalSum = allDigits.reduce((a, b) => a + b, 0);
  const bhagyankReduction = reduceToSingleDigit(totalSum);
  const bhagyankStep: CalculationStep = {
    label: 'Bhāgyāṅka (Life Path / Destiny Number)',
    rawExpression: `${day} / ${month} / ${year}`,
    intermediate: allDigits,
    sum: totalSum,
    reductionStep: `${allDigits.join(' + ')} = ${totalSum} → ${bhagyankReduction.steps.join(' → ')}`,
    finalNumber: bhagyankReduction.root
  };

  return { day, month, year, mulankStep, bhagyankStep };
}

/**
 * Calculate Chaldean and Pythagorean Name Numbers with letter breakdown
 */
export function calculateNameNumbers(name: string) {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const letters = cleanName.split('');

  // Chaldean
  const chaldeanBreakdown: { char: string; value: number }[] = [];
  let chaldeanCompound = 0;
  letters.forEach(char => {
    const val = CHALDEAN_MAP[char] || 0;
    chaldeanBreakdown.push({ char, value: val });
    chaldeanCompound += val;
  });
  const chaldeanRoot = reduceToSingleDigit(chaldeanCompound).root;

  // Pythagorean
  const pythagoreanBreakdown: { char: string; value: number }[] = [];
  let pythagoreanCompound = 0;
  const vowelsList: string[] = [];
  const consonantsList: string[] = [];
  let vowelsSum = 0;
  let consonantsSum = 0;

  letters.forEach(char => {
    const val = PYTHAGOREAN_MAP[char] || 0;
    pythagoreanBreakdown.push({ char, value: val });
    pythagoreanCompound += val;

    if (VOWELS.has(char)) {
      vowelsList.push(char);
      vowelsSum += val;
    } else {
      consonantsList.push(char);
      consonantsSum += val;
    }
  });

  const pythagoreanRoot = reduceToSingleDigit(pythagoreanCompound).root;
  const soulUrgeRoot = reduceToSingleDigit(vowelsSum).root;
  const personalityRoot = reduceToSingleDigit(consonantsSum).root;

  return {
    chaldean: {
      compound: chaldeanCompound,
      root: chaldeanRoot,
      breakdown: chaldeanBreakdown
    },
    pythagorean: {
      compound: pythagoreanCompound,
      root: pythagoreanRoot,
      breakdown: pythagoreanBreakdown
    },
    soulUrge: {
      vowels: vowelsList,
      sum: vowelsSum,
      root: soulUrgeRoot
    },
    personality: {
      consonants: consonantsList,
      sum: consonantsSum,
      root: personalityRoot
    }
  };
}

/**
 * Katapayadi Phonemic Calculator
 */
export function calculateKatapayadi(text: string) {
  const chars = text.split('');
  const matched: { char: string; value: number }[] = [];
  let sum = 0;

  chars.forEach(char => {
    if (KATAPAYADI_CONSONANTS[char] !== undefined) {
      const val = KATAPAYADI_CONSONANTS[char];
      matched.push({ char, value: val });
      sum += val;
    }
  });

  const root = reduceToSingleDigit(sum).root;
  return { matched, sum, root };
}

/**
 * Generate full core profile with transparent calculations
 */
export function generateCoreProfile(name: string, birthDate: string): CoreNumbersProfile {
  const { day, month, year, mulankStep, bhagyankStep } = calculateDateNumbers(birthDate);
  const nameResults = calculateNameNumbers(name);
  const mulankProfile = SINGLE_NUMBERS[mulankStep.finalNumber] || SINGLE_NUMBERS[1];

  // Maturity Number = Life Path + Expression
  const maturitySum = bhagyankStep.finalNumber + nameResults.pythagorean.root;
  const maturityRoot = reduceToSingleDigit(maturitySum).root;

  // Personal Cycles (using year 2026 as current year)
  const currentYear = 2026;
  const currentMonth = 9;
  const currentDay = 2;

  // Universal Year 2026: 2+0+2+6 = 10 -> 1
  const universalYear = reduceToSingleDigit(2 + 0 + 2 + 6).root;
  // Personal Year = Day + Month + Universal Year
  const personalYearSum = day + month + universalYear;
  const personalYear = reduceToSingleDigit(personalYearSum).root;
  // Personal Month = Personal Year + Current Month
  const personalMonth = reduceToSingleDigit(personalYear + currentMonth).root;
  // Personal Day = Personal Month + Current Day
  const personalDay = reduceToSingleDigit(personalMonth + currentDay).root;

  const themes: Record<number, { theme: string; focus: string }> = {
    1: { theme: 'New Beginnings, Initiative & Seed Planting', focus: 'Lead boldly, launch new ventures, clarify independent goals.' },
    2: { theme: 'Partnership, Receptive Patience & Diplomatic Balance', focus: 'Collaborate gracefully, trust intuitive timing, cultivate relationships.' },
    3: { theme: 'Creative Expression, Social Joy & Communication', focus: 'Write, publish, express visionary counsel, embrace optimistic expansion.' },
    4: { theme: 'Foundation Building, Structural Discipline & Order', focus: 'Consolidate security, systematize routines, finish long-standing work.' },
    5: { theme: 'Dynamic Transformation, Freedom & Adaptive Evolution', focus: 'Welcome travel, explore progressive shifts, embrace flexible strategies.' },
    6: { theme: 'Domestic Harmony, Compassionate Service & Equilibrium', focus: 'Heal family bonds, refine living spaces, offer supportive mentorship.' },
    7: { theme: 'Introspection, Spiritual Deepening & Sacred Research', focus: 'Study philosophical sources, meditate, withdraw from superficial noise.' },
    8: { theme: 'Karmic Harvest, Material Responsibility & Authority', focus: 'Master executive stewardship, execute legal/commercial agreements with rigor.' },
    9: { theme: 'Completion, Universal Compassion & Releasing the Past', focus: 'Forgive debts, conclude obsolete obligations, prepare ground for renewal.' }
  };

  const currentTheme = themes[personalYear] || themes[1];

  return {
    name,
    birthDate,
    day,
    month,
    year,
    mulank: {
      value: mulankStep.finalNumber,
      calculation: mulankStep,
      rulingPlanet: mulankProfile.graha,
      sanskritPlanet: mulankProfile.sanskritName,
      deity: mulankProfile.deity,
      gemstone: mulankProfile.gemstone,
      favorableDays: mulankProfile.favorableDays,
      favorableColors: mulankProfile.favorableColors
    },
    bhagyank: {
      value: bhagyankStep.finalNumber,
      calculation: bhagyankStep,
      lifeTheme: `${mulankProfile.indicTitle} evolving through destiny`,
      karmicLesson: `Balancing inner solar will with ${mulankProfile.graha}'s universal responsibility.`
    },
    chaldeanName: {
      compoundValue: nameResults.chaldean.compound,
      rootValue: nameResults.chaldean.root,
      letterBreakdown: nameResults.chaldean.breakdown,
      calculation: {
        label: 'Chaldean Name Calculation',
        rawExpression: nameResults.chaldean.breakdown.map(b => `${b.char}(${b.value})`).join(' + '),
        intermediate: nameResults.chaldean.breakdown.map(b => b.value),
        sum: nameResults.chaldean.compound,
        reductionStep: `${nameResults.chaldean.compound} → ${reduceToSingleDigit(nameResults.chaldean.compound).steps.join(' → ')}`,
        finalNumber: nameResults.chaldean.root
      }
    },
    pythagoreanExpression: {
      compoundValue: nameResults.pythagorean.compound,
      rootValue: nameResults.pythagorean.root,
      letterBreakdown: nameResults.pythagorean.breakdown,
      calculation: {
        label: 'Pythagorean Expression Calculation',
        rawExpression: nameResults.pythagorean.breakdown.map(b => `${b.char}(${b.value})`).join(' + '),
        intermediate: nameResults.pythagorean.breakdown.map(b => b.value),
        sum: nameResults.pythagorean.compound,
        reductionStep: `${nameResults.pythagorean.compound} → ${reduceToSingleDigit(nameResults.pythagorean.compound).steps.join(' → ')}`,
        finalNumber: nameResults.pythagorean.root
      }
    },
    soulUrge: {
      value: nameResults.soulUrge.root,
      vowels: nameResults.soulUrge.vowels,
      calculation: {
        label: 'Soul Urge / Heart’s Desire (Vowels)',
        rawExpression: nameResults.soulUrge.vowels.join(' + '),
        intermediate: nameResults.soulUrge.vowels.map(v => PYTHAGOREAN_MAP[v] || 0),
        sum: nameResults.soulUrge.sum,
        finalNumber: nameResults.soulUrge.root
      }
    },
    personality: {
      value: nameResults.personality.root,
      consonants: nameResults.personality.consonants,
      calculation: {
        label: 'Personality Number (Consonants)',
        rawExpression: nameResults.personality.consonants.join(' + '),
        intermediate: nameResults.personality.consonants.map(c => PYTHAGOREAN_MAP[c] || 0),
        sum: nameResults.personality.sum,
        finalNumber: nameResults.personality.root
      }
    },
    maturityNumber: {
      value: maturityRoot,
      calculation: {
        label: 'Maturity Number (Life Path + Expression)',
        rawExpression: `${bhagyankStep.finalNumber} + ${nameResults.pythagorean.root}`,
        intermediate: [bhagyankStep.finalNumber, nameResults.pythagorean.root],
        sum: maturitySum,
        finalNumber: maturityRoot
      }
    },
    personalCycles: {
      universalYear,
      universalDay: reduceToSingleDigit(currentDay + currentMonth + universalYear).root,
      personalYear,
      personalMonth,
      personalDay,
      personalYearTheme: currentTheme.theme,
      dailyFocus: currentTheme.focus
    }
  };
}

/**
 * Calculate Compatibility between Person A and Person B
 */
export function calculateCompatibility(
  nameA: string, dobA: string,
  nameB: string, dobB: string
): CompatibilityReport {
  const profA = generateCoreProfile(nameA, dobA);
  const profB = generateCoreProfile(nameB, dobB);

  const numA = profA.mulank.value;
  const numB = profB.mulank.value;
  const pA = SINGLE_NUMBERS[numA] || SINGLE_NUMBERS[1];

  let vedicRelation: 'Mitra (Friend)' | 'Sama (Neutral)' | 'Shatru (Enemy)' = 'Sama (Neutral)';
  let baseScore = 70;

  if (pA.friends.includes(numB)) {
    vedicRelation = 'Mitra (Friend)';
    baseScore = 88;
  } else if (pA.enemies.includes(numB)) {
    vedicRelation = 'Shatru (Enemy)';
    baseScore = 48;
  } else {
    vedicRelation = 'Sama (Neutral)';
    baseScore = 74;
  }

  // Expression harmony bonus
  const expMatch = Math.abs(profA.chaldeanName.rootValue - profB.chaldeanName.rootValue) <= 2 ? 6 : -4;
  const overallScore = Math.min(98, Math.max(35, baseScore + expMatch));

  return {
    personA: { name: nameA, birthDate: dobA, mulank: numA, bhagyank: profA.bhagyank.value, namank: profA.chaldeanName.rootValue },
    personB: { name: nameB, birthDate: dobB, mulank: numB, bhagyank: profB.bhagyank.value, namank: profB.chaldeanName.rootValue },
    overallScore,
    communicationScore: Math.min(96, Math.max(40, baseScore + 4)),
    emotionalScore: Math.min(95, Math.max(30, baseScore - (vedicRelation === 'Shatru (Enemy)' ? 12 : 2))),
    workScore: Math.min(98, Math.max(45, baseScore + 8)),
    socialScore: Math.min(94, Math.max(40, baseScore + 2)),
    vedicGrahaRelation: vedicRelation,
    dynamicsAnalysis: `Planetary interaction between ${pA.graha} (Number ${numA}) and ${SINGLE_NUMBERS[numB]?.graha || 'Graha'} (Number ${numB}). Within the classical Parāśara relational framework, this pair holds a ${vedicRelation} resonance.`,
    sourceTradition: 'Classical Parāśara Horā Shāstra & Traditional Aṅka Jyotiṣa (Category A & C)'
  };
}
