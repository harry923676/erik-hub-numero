/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Numerology Intelligence Platform
 * Lead Architect & Developer: Pawan Paji
 */

export type NumerologySystem = 'chaldean' | 'pythagorean' | 'ank_jyotish' | 'katapayadi';

export type SourceCategory = 
  | 'Category A' // Classical / Primary Tradition (Sanskrit, Prakrit, Tamil, Historical Manuscripts)
  | 'Category B' // Scholarly Interpretation (Academic, Peer-Reviewed, Critical Editions)
  | 'Category C' // Traditional Practice (Living Indian Traditions, Ank Jyotish Schools)
  | 'Category D' // Modern Numerology (Chaldean, Pythagorean, Cheiro, Sepharial)
  | 'Category E'; // AI Interpretation ("AI-assisted interpretation based on selected numerology system")

export interface SourceCitation {
  id: string;
  title: string;
  tradition: string;
  system: string;
  historicalPeriod: string;
  language: string;
  originalScript?: string;
  transliteration?: string;
  translation?: string;
  sourceType: 'Primary' | 'Academic' | 'Institutional' | 'Traditional' | 'Modern';
  author: string;
  textOrManuscript: string;
  academicReference: string;
  confidenceLevel: 'High' | 'Moderate' | 'Traditional Attribution';
  category: SourceCategory;
  lastReviewedDate: string;
}

export interface CalculationStep {
  label: string;
  rawExpression: string;
  intermediate: number[];
  sum: number;
  reductionStep?: string;
  finalNumber: number;
  isMasterNumber?: boolean;
}

export interface CoreNumbersProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  day: number;
  month: number;
  year: number;

  // Indian Ank Jyotish
  mulank: {
    value: number;
    calculation: CalculationStep;
    rulingPlanet: string;
    sanskritPlanet: string;
    deity: string;
    gemstone: string;
    favorableDays: string[];
    favorableColors: string[];
  };

  bhagyank: {
    value: number;
    calculation: CalculationStep;
    lifeTheme: string;
    karmicLesson: string;
  };

  // Name Numbers
  chaldeanName: {
    compoundValue: number;
    rootValue: number;
    letterBreakdown: { char: string; value: number }[];
    calculation: CalculationStep;
  };

  pythagoreanExpression: {
    compoundValue: number;
    rootValue: number;
    letterBreakdown: { char: string; value: number }[];
    calculation: CalculationStep;
  };

  soulUrge: {
    value: number;
    vowels: string[];
    calculation: CalculationStep;
  };

  personality: {
    value: number;
    consonants: string[];
    calculation: CalculationStep;
  };

  maturityNumber: {
    value: number;
    calculation: CalculationStep;
  };

  personalCycles: {
    universalYear: number;
    universalDay: number;
    personalYear: number;
    personalMonth: number;
    personalDay: number;
    personalYearTheme: string;
    dailyFocus: string;
  };
}

export interface CompoundNumberData {
  number: number;
  root: number;
  title: string;
  archetype: string;
  symbolism: string;
  positiveVibrations: string[];
  challenges: string[];
  careerTendencies: string[];
  practicalGuidance: string;
  sourceCategory: SourceCategory;
  primaryReference: string;
}

export interface NameComparisonItem {
  id: string;
  name: string;
  chaldeanCompound: number;
  chaldeanRoot: number;
  pythagoreanCompound: number;
  pythagoreanRoot: number;
  katapayadiRoot?: number;
  harmonyWithBirth: 'High' | 'Medium' | 'Challenging';
  harmonyScore: number; // 0-100%
  notes: string;
}

export interface NameOptimizationSuggestion {
  originalName: string;
  suggestedName: string;
  modificationType: 'Letter Added' | 'Letter Altered' | 'Vowel Extended' | 'Initial Added';
  originalCompound: number;
  newCompound: number;
  originalRoot: number;
  newRoot: number;
  vibrationalImpact: string;
  birthAlignment: 'Harmonious' | 'Neutral' | 'Dynamic';
}

export interface CompatibilityReport {
  personA: { name: string; birthDate: string; mulank: number; bhagyank: number; namank: number };
  personB: { name: string; birthDate: string; mulank: number; bhagyank: number; namank: number };
  overallScore: number;
  communicationScore: number;
  emotionalScore: number;
  workScore: number;
  socialScore: number;
  vedicGrahaRelation: 'Mitra (Friend)' | 'Sama (Neutral)' | 'Shatru (Enemy)';
  dynamicsAnalysis: string;
  sourceTradition: string;
}

export interface BabyNameEntry {
  id: string;
  name: string;
  script: string;
  language: 'Sanskrit' | 'Hindi' | 'Telugu' | 'Tamil' | 'Punjabi' | 'Bengali' | 'Jain' | 'Buddhist';
  gender: 'Male' | 'Female' | 'Unisex';
  meaning: string;
  chaldeanCompound: number;
  chaldeanRoot: number;
  pythagoreanRoot: number;
  rulingPlanet: string;
  culturalOrigin: string;
  sourceReference: string;
}

export interface BusinessAnalysis {
  entityName: string;
  category: 'Company' | 'Brand' | 'Product' | 'App' | 'Domain';
  chaldeanCompound: number;
  chaldeanRoot: number;
  pythagoreanCompound: number;
  pythagoreanRoot: number;
  phoneticRhythm: string;
  memorabilityIndex: number; // 0-100
  recommendedIndustries: string[];
  strategicGuidance: string;
  favorableLaunchDays: string[];
}

export interface ContributorInfo {
  name: string;
  honorificTitle: string;
  role: string;
  contributions: string[];
  researchAreas: string[];
  architecturalVision: string;
}

// Lo Shu Grid & Plane Analysis Types
export interface LoShuCellInfo {
  number: number;
  row: number; // 0, 1, 2
  col: number; // 0, 1, 2
  count: number;
  digits: number[];
  element: 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
  direction: string;
  compassDegrees: string;
  significance: string;
  planetaryLord: string;
  color: string;
  sourceBreakdown: {
    fromDob: number;
    fromMulank: number;
    fromBhagyank: number;
    fromKua: number;
  };
}

export interface LoShuPlaneAnalysis {
  id: string;
  name: string;
  hindiName: string;
  type: 'horizontal' | 'vertical' | 'diagonal';
  numbers: [number, number, number];
  numbersPresent: number[];
  missingInPlane: number[];
  countTotal: number;
  completionPercentage: number; // 0, 33, 67, 100
  status: 'Complete' | 'Partial' | 'Absent';
  energyLevel: 'Dominant' | 'Balanced' | 'Latent' | 'Void';
  psychologicalImpact: string;
  practicalStrengths: string[];
  potentialBlindspots: string[];
  vedicRemedy?: string;
}

export interface LoShuMissingNumberRemedy {
  number: number;
  element: string;
  direction: string;
  rulingPlanet: string;
  impactDescription: string;
  practicalCures: string[];
  crystalOrGem: string;
  colorRemedy: string;
  vastuElementCorrection: string;
  mantraOrAffirmation: string;
}

export interface LoShuGridResult {
  dob: string;
  digitsUsed: number[];
  mulankValue: number;
  bhagyankValue: number;
  kuaNumber?: number;
  gender?: 'Male' | 'Female' | 'Other';
  calculationMode: 'vedic_hybrid' | 'pure_dob' | 'with_kua';
  cells: Record<number, LoShuCellInfo>;
  planes: LoShuPlaneAnalysis[];
  presentNumbers: number[];
  missingNumbers: number[];
  repeatedNumbers: { number: number; count: number; meaning: string }[];
  yogas: {
    goldenRajYoga: boolean; // 4-5-6
    silverRajYoga: boolean; // 2-5-8
    mentalPlane: boolean; // 4-9-2
    emotionalPlane: boolean; // 3-5-7
    practicalPlane: boolean; // 8-1-6
    thoughtPlane: boolean; // 4-3-8
    willPlane: boolean; // 9-5-1
    actionPlane: boolean; // 2-7-6
  };
  remedies: LoShuMissingNumberRemedy[];
  kuaDetails?: KuaAnalysisDetails;
}

export interface KuaDirectionDetail {
  type: string;
  sanskritOrChineseName: string;
  englishTitle: string;
  direction: string;
  compassDegree: string;
  description: string;
  nature: 'Auspicious' | 'Inauspicious';
}

export interface KuaAnalysisDetails {
  kuaNumber: number;
  originalCalculatedNumber: number;
  transformedFromFive: boolean;
  kuaFactor: number; // Single-digit sum of last 2 digits of birth year
  gregorianYear: number;
  solarYear: number;
  isSolarAdjusted: boolean; // Born before Feb 4
  gender: 'Male' | 'Female' | 'Other';
  era: 'Before 2000' | '2000 & After';
  formulaUsed: string;
  stepByStep: string[];
  group: 'East Group (Dong Si Ming)' | 'West Group (Xi Si Ming)';
  trigram: string; // e.g. ☵ Kan, ☷ Kun, etc.
  trigramChinese: string;
  trigramVedic: string;
  element: 'Water' | 'Earth' | 'Wood' | 'Metal' | 'Fire';
  direction: string;
  rulingPlanet: string;
  luckyColors: string[];
  luckyNumbers: number[];
  unluckyColors: string[];
  auspiciousDirections: KuaDirectionDetail[];
  inauspiciousDirections: KuaDirectionDetail[];
}

