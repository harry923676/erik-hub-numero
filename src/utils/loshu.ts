/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Lo Shu Grid & Multi-Plane Analytical Engine
 * Lead Architect & Numerology Codifier: Pawan Paji
 */

import { 
  LoShuCellInfo, 
  LoShuPlaneAnalysis, 
  LoShuMissingNumberRemedy, 
  LoShuGridResult,
  KuaAnalysisDetails,
  KuaDirectionDetail
} from '../types';
import { reduceToSingleDigit } from './numerology';

// Fixed Coordinates in the 3x3 Magic Square
export const LOSHU_COORDINATES: Record<number, { row: number; col: number; element: 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water'; direction: string; compassDegrees: string; significance: string; planetaryLord: string; color: string }> = {
  4: { row: 0, col: 0, element: 'Wood', direction: 'South-East', compassDegrees: '112.5° - 157.5°', significance: 'Wealth, Abundance & Financial Organization', planetaryLord: 'Rāhu (Indic) / Uranus', color: '#10b981' },
  9: { row: 0, col: 1, element: 'Fire', direction: 'South', compassDegrees: '157.5° - 202.5°', significance: 'Fame, High Ambition & Social Recognition', planetaryLord: 'Maṅgala (Mars)', color: '#ef4444' },
  2: { row: 0, col: 2, element: 'Earth', direction: 'South-West', compassDegrees: '202.5° - 247.5°', significance: 'Relationships, Sensitivity & Receptivity', planetaryLord: 'Chandra (Moon)', color: '#f59e0b' },
  3: { row: 1, col: 0, element: 'Wood', direction: 'East', compassDegrees: '67.5° - 112.5°', significance: 'Family, Health, Wisdom & Creative Growth', planetaryLord: 'Guru (Jupiter)', color: '#10b981' },
  5: { row: 1, col: 1, element: 'Earth', direction: 'Center (Brahmasthan)', compassDegrees: 'Core Equilibrium', significance: 'Balance, Emotional Stability & Core Adaptability', planetaryLord: 'Budha (Mercury)', color: '#eab308' },
  7: { row: 1, col: 2, element: 'Metal', direction: 'West', compassDegrees: '247.5° - 292.5°', significance: 'Spiritual Research, Intuition & Creative Descendants', planetaryLord: 'Ketu (Indic) / Neptune', color: '#94a3b8' },
  8: { row: 2, col: 0, element: 'Earth', direction: 'North-East', compassDegrees: '22.5° - 67.5°', significance: 'Knowledge, Deep Discipline & Strategic Foresight', planetaryLord: 'Śani (Saturn)', color: '#d97706' },
  1: { row: 2, col: 1, element: 'Water', direction: 'North', compassDegrees: '337.5° - 22.5°', significance: 'Career Path, Independent Drive & Opportunities', planetaryLord: 'Sūrya (Sun)', color: '#38bdf8' },
  6: { row: 2, col: 2, element: 'Metal', direction: 'North-West', compassDegrees: '292.5° - 337.5°', significance: 'Benefactors, Global Networking, Luxury & Travel', planetaryLord: 'Śukra (Venus)', color: '#cbd5e1' }
};

// Plane Configurations in Lo Shu
export interface PlaneDefinition {
  id: string;
  name: string;
  hindiName: string;
  type: 'horizontal' | 'vertical' | 'diagonal';
  numbers: [number, number, number];
  psychologicalImpact: string;
  strengths: string[];
  blindspots: string[];
  remedy: string;
}

export const LOSHU_PLANES_DEFINITIONS: PlaneDefinition[] = [
  // Horizontal Planes
  {
    id: 'mental_plane',
    name: 'Mental Plane (Upper Row)',
    hindiName: 'मानसिक तल (Manasik Tala)',
    type: 'horizontal',
    numbers: [4, 9, 2],
    psychologicalImpact: 'Governs intellectual grasp, memory retention, critical logic, and visionary imagination.',
    strengths: ['Exceptional mental recall & academic acumen', 'Strategic visualization', 'Ability to retain complex datasets'],
    blindspots: ['Risk of over-intellectualizing simple situations', 'Mental restlessness or insomnia when understimulated'],
    remedy: 'Ground intense mental energy through daily pranayama and nature walks.'
  },
  {
    id: 'emotional_plane',
    name: 'Emotional / Heart Plane (Middle Row)',
    hindiName: 'हृदय व भावनात्मक तल (Hridaya Tala)',
    type: 'horizontal',
    numbers: [3, 5, 7],
    psychologicalImpact: 'Governs emotional equilibrium, heart-centered empathy, spiritual intuition, and creative warmth.',
    strengths: ['Heightened emotional intelligence & compassion', 'Inner peace in crisis', 'Natural artistic and therapeutic aptitude'],
    blindspots: ['Over-absorption of surrounding environmental anxieties', 'Extreme sensitivity to relational discord'],
    remedy: 'Establish healthy emotional boundaries; wear a 5-Mukhi Rudraksha or silver ornament.'
  },
  {
    id: 'practical_plane',
    name: 'Practical / Physical Plane (Lower Row)',
    hindiName: 'व्यावहारिक / भौतिक तल (Vyavaharik Tala)',
    type: 'horizontal',
    numbers: [8, 1, 6],
    psychologicalImpact: 'Governs tangible execution, financial realism, manual/technological dexterity, and material grounding.',
    strengths: ['Hands-on craftsmanship & business stamina', 'Methodical execution of abstract theories', 'Financial resourcefulness'],
    blindspots: ['Excessive fixation on material guarantees', 'Skepticism toward intuitive or metaphysical insights'],
    remedy: 'Engage in charity (Seva) on Saturdays and maintain balance between work and rest.'
  },

  // Vertical Planes
  {
    id: 'thought_plane',
    name: 'Thought & Planning Plane (Left Column)',
    hindiName: 'विचार व नियोजन तल (Vichar Tala)',
    type: 'vertical',
    numbers: [4, 3, 8],
    psychologicalImpact: 'Governs structural ideation, blueprints, philosophical architecture, and long-range forethought.',
    strengths: ['Architectural foresight and master-planning', 'Deep strategic patience', 'Ability to anticipate bottlenecks'],
    blindspots: ['Paralysis by analysis — prolonged planning without taking the first step'],
    remedy: 'Commit to launching prototypes early before waiting for theoretical perfection.'
  },
  {
    id: 'will_plane',
    name: 'Will & Determination Plane (Center Column)',
    hindiName: 'संकल्प व इच्छाशक्ति तल (Sankalpa Tala)',
    type: 'vertical',
    numbers: [9, 5, 1],
    psychologicalImpact: 'Governs the core spiritual engine: grit, self-determination, perseverance against adversity, and personal leadership.',
    strengths: ['Indomitable willpower & resilience', 'Magnetic self-confidence', 'Capacity to lead large collectives through trials'],
    blindspots: ['Stubbornness or unwillingness to concede when a project needs tactical pivoting'],
    remedy: 'Practice active listening and seek counsel from trusted neutral advisors.'
  },
  {
    id: 'action_plane',
    name: 'Action & Execution Plane (Right Column)',
    hindiName: 'कर्म व क्रियान्वयन तल (Kriya Tala)',
    type: 'vertical',
    numbers: [2, 7, 6],
    psychologicalImpact: 'Governs dynamic kinetic execution, prompt reactions, spontaneous courage, and translating ideas into immediate reality.',
    strengths: ['Agile execution with zero hesitation', 'Social mobility & networking charisma', 'Fast kinetic problem-solving'],
    blindspots: ['Impulsiveness or leaping before looking; occasional burnout from non-stop physical drive'],
    remedy: 'Pause for 24 hours before signing major binding commitments.'
  },

  // Diagonal Yogas (Raj Yogas / Special Lines)
  {
    id: 'golden_raj_yoga',
    name: 'Golden Line / Raj Yoga of Prosperity',
    hindiName: 'स्वर्ण राजयोग (Swarna Raj Yoga)',
    type: 'diagonal',
    numbers: [4, 5, 6],
    psychologicalImpact: 'The most revered diagonal yoga in classical numerology. Links Wealth (4), Stability (5), and Luxury/Helpers (6).',
    strengths: ['Sustained material abundance & societal honors', 'Harmonious family life & luxury vehicles/properties', 'Immense resilience against financial bankruptcy'],
    blindspots: ['Complacency or taking privileged fortune for granted'],
    remedy: 'Dedicate a fixed percentage of income to educational endowments and feeding the needy.'
  },
  {
    id: 'silver_raj_yoga',
    name: 'Silver Line / Earth & Property Yoga',
    hindiName: 'रजत राजयोग / भूमि योग (Rajat / Bhumi Yoga)',
    type: 'diagonal',
    numbers: [2, 5, 8],
    psychologicalImpact: 'The primordial Earth-Element Trinity (2-5-8). Grants unshakeable patience, real estate mastery, and rooted stability.',
    strengths: ['Natural aptitude for real estate, agriculture, and infrastructure', 'Immense emotional gravity and patience', 'Accumulation of tangible physical assets'],
    blindspots: ['Resistance to sudden changes or innovative disruptions; slowness to adapt'],
    remedy: 'Keep North-East and South-West corners of residence uncluttered and well-lit.'
  }
];

// Number Repetition Meanings (1 to 9)
export const NUMBER_REPETITION_MEANINGS: Record<number, Record<number, string>> = {
  1: {
    1: 'Single 1: Thoughtful communicator, tends to internalize opinions, observes before speaking.',
    2: 'Double 1: Highly articulate, balanced communication, easily expresses thoughts with poise.',
    3: 'Triple 1: Talkative, persuasive orator, highly expressive, can dominate conversations.',
    4: 'Quadruple 1+: Intense drive to be heard, prone to self-righteous debate, strong ego energy.'
  },
  2: {
    1: 'Single 2: Sensitive, tactful, empathetic, good team player.',
    2: 'Double 2: Extremely intuitive, can sense others’ hidden intentions, emotionally attuned.',
    3: 'Triple 2: Over-sensitive, easily hurt by minor remarks, prone to emotional mood swings.',
    4: 'Quadruple 2+: Hyper-receptive, absorbs external tension, requires seclusion to detoxify.'
  },
  3: {
    1: 'Single 3: Good imagination, positive disposition, articulate in creative hobbies.',
    2: 'Double 3: Creative genius, vivid mental imagery, natural writing or artistic talent.',
    3: 'Triple 3: Daydreamer, overly idealistic, can scatter focus across ten unfinished creative projects.',
    4: 'Quadruple 3+: Highly eccentric imagination, detached from mundane realities.'
  },
  4: {
    1: 'Single 4: Systematic, organized, reliable, values tidy spaces and transparent rules.',
    2: 'Double 4: Perfectionist, high craftsmanship, exceptional organizational stamina.',
    3: 'Triple 4: Rigid, stubborn, hyper-critical of deviations from standard protocol.',
    4: 'Quadruple 4+: Trapped in routine, resistant to all innovation, micro-manager.'
  },
  5: {
    1: 'Single 5: Balanced freedom, versatile, adaptable to changing environments.',
    2: 'Double 5: Adventurous, magnetic risk-taker, loves travel, dislikes routine desk jobs.',
    3: 'Triple 5: Restless, impulsive gambler, prone to sensory indulgence and sudden whims.',
    4: 'Quadruple 5+: Extreme wanderlust, inability to hold steady commitments.'
  },
  6: {
    1: 'Single 6: Deep love for family, artistic appreciation, takes domestic duty seriously.',
    2: 'Double 6: Aesthetic perfectionist, high luxury standards, devoted caretaker and protector.',
    3: 'Triple 6: Over-possessive, micromanages loved ones, creates unnecessary household worry.',
    4: 'Quadruple 6+: Suffocating emotional protectiveness, hyper-anxious about household safety.'
  },
  7: {
    1: 'Single 7: Reflective learner, discovers truth through personal life lessons and research.',
    2: 'Double 7: Deep spiritual seeker, natural philosopher, acute occult or metaphysical intuition.',
    3: 'Triple 7: Severe emotional trials followed by transcendent wisdom; ascetic detachment.',
    4: 'Quadruple 7+: Complete spiritual disengagement from worldly ambition.'
  },
  8: {
    1: 'Single 8: Methodical, handles responsibility well, values financial self-reliance.',
    2: 'Double 8: Powerful executive capability, shrewd commercial acumen, deep resilience.',
    3: 'Triple 8: Workaholic, relentless materialism or fatalistic stubbornness.',
    4: 'Quadruple 8+: Tremendous ambition, risk of sudden systemic reversals if ethics slip.'
  },
  9: {
    1: 'Single 9: Humanitarian ideals, ambitious, eager to improve surrounding society.',
    2: 'Double 9: High idealism, critical intellect, natural leadership with elevated ethics.',
    3: 'Triple 9: Dramatic, hyper-demanding, expects perfection from all subordinates.',
    4: 'Quadruple 9+: Extreme rebel against societal norms, intense ideological fervor.'
  }
};

// Remedies for Missing Numbers
export const MISSING_NUMBER_REMEDIES: Record<number, LoShuMissingNumberRemedy> = {
  1: {
    number: 1,
    element: 'Water',
    direction: 'North',
    rulingPlanet: 'Sūrya (Sun) / Career Flow',
    impactDescription: 'Challenges in asserting individuality, indecisiveness in career direction, difficulty communicating personal voice.',
    practicalCures: [
      'Place a running water feature or gentle aquarium in the North sector of your living space.',
      'Drink water stored in a pure copper vessel in the morning.',
      'Wear a brass or gold watch on the left wrist.'
    ],
    crystalOrGem: 'Ruby, Red Garnet, or Sunstone',
    colorRemedy: 'Incorporate touches of bright Royal Blue or Sunlit Gold.',
    vastuElementCorrection: 'Ensure North wall is free from heavy clutter and tall cupboards.',
    mantraOrAffirmation: 'Oṁ Sūryāya Namaḥ — "I step boldly into my rightful executive power."'
  },
  2: {
    number: 2,
    element: 'Earth',
    direction: 'South-West',
    rulingPlanet: 'Chandra (Moon) / Relationships',
    impactDescription: 'Lack of patience, occasional difficulty in empathetic listening, relationship friction, or intuitive hesitation.',
    practicalCures: [
      'Place two natural rose quartz or clear quartz spheres in the South-West corner.',
      'Wear a genuine silver ring or silver bangle.',
      'Honor your mother and elders; gift silver or milk on Mondays.'
    ],
    crystalOrGem: 'Natural Pearl (Mukta) or Moonstone',
    colorRemedy: 'Soothing Silvery-White and Soft Cream tones.',
    vastuElementCorrection: 'Keep the South-West sector heavy, stable, and warm.',
    mantraOrAffirmation: 'Oṁ Somāya Namaḥ — "My heart is calm, receptive, and in deep equilibrium."'
  },
  3: {
    number: 3,
    element: 'Wood',
    direction: 'East',
    rulingPlanet: 'Guru (Jupiter) / Wisdom & Growth',
    impactDescription: 'Difficulty expressing creative concepts, self-doubt in scholarly matters, or feeling undervalued by mentors.',
    practicalCures: [
      'Keep lush green indoor plants (like Jade, Basil/Tulsi, or Bamboo) in the East.',
      'Wear a 5-Mukhi certified Nepal Rudraksha around the neck.',
      'Study philosophical texts or learn a new classical musical instrument.'
    ],
    crystalOrGem: 'Yellow Sapphire (Pukhraj), Citrine, or Yellow Topaz',
    colorRemedy: 'Rich Emerald Green and Golden Turmeric Yellow.',
    vastuElementCorrection: 'Open windows in the East at dawn to absorb the vital morning Prāṇa.',
    mantraOrAffirmation: 'Oṁ Bṛhaspataye Namaḥ — "Divine wisdom flows through my speech and intellect."'
  },
  4: {
    number: 4,
    element: 'Wood',
    direction: 'South-East',
    rulingPlanet: 'Rāhu / Structural Wealth',
    impactDescription: 'Disorganization, fluctuating savings discipline, restlessness, or impatience with methodical routines.',
    practicalCures: [
      'Hang a 4-rod wooden wind chime in the South-East corner.',
      'Keep your financial records, ledgers, and physical keys meticulously categorized.',
      'Wear a natural Green Aventurine or wooden wrist mala.'
    ],
    crystalOrGem: 'Hessonite Garnet (Gomed) or Green Tourmaline',
    colorRemedy: 'Forest Green and Earthy Khaki.',
    vastuElementCorrection: 'Avoid keeping water features in the South-East (fire-wood junction).',
    mantraOrAffirmation: 'Oṁ Rāhave Namaḥ — "I construct lasting structures of wealth with unwavering focus."'
  },
  5: {
    number: 5,
    element: 'Earth',
    direction: 'Center (Brahmasthan)',
    rulingPlanet: 'Budha (Mercury) / Core Equilibrium',
    impactDescription: 'Missing the central cosmic anchor: swinging between extremes, lack of drive follow-through, or feeling ungrounded.',
    practicalCures: [
      'Keep the exact center of your home (Brahmasthan) bright, clean, and completely unblocked.',
      'Carry a small Yellow Jade or Citrine tumble stone in your pocket.',
      'Eat fresh green vegetables and practice grounding meditation standing barefoot on soil.'
    ],
    crystalOrGem: 'Emerald (Panna) or Natural Citrine',
    colorRemedy: 'Bright Sunny Yellow and Lime Green.',
    vastuElementCorrection: 'Never place heavy machinery, pillars, or staircases directly in the home center.',
    mantraOrAffirmation: 'Oṁ Budhāya Namaḥ — "I stand centered, adaptable, and unshakable in my truth."'
  },
  6: {
    number: 6,
    element: 'Metal',
    direction: 'North-West',
    rulingPlanet: 'Śukra (Venus) / Luxury & Benefactors',
    impactDescription: 'Lack of influential mentors/benefactors, feeling disconnected from luxury aesthetics, or struggles in domestic harmony.',
    practicalCures: [
      'Hang a 6-rod hollow brass or metal wind chime in the North-West sector.',
      'Wear a stainless steel or silver chain with a clean round pendant.',
      'Use natural botanical fragrances (sandalwood, jasmine, or rose attar).'
    ],
    crystalOrGem: 'Diamond, White Zircon, or Clear Optical Calcite',
    colorRemedy: 'Bright Pristine White, Silver, and Cream.',
    vastuElementCorrection: 'Ensure North-West has optimal airflow and ventilation.',
    mantraOrAffirmation: 'Oṁ Śukrāya Namaḥ — "Benefactors and refined grace naturally manifest in my path."'
  },
  7: {
    number: 7,
    element: 'Metal',
    direction: 'West',
    rulingPlanet: 'Ketu / Spiritual Depth',
    impactDescription: 'Difficulty trusting intuition, skepticism toward metaphysical truths, or repeated feelings of emotional alienation.',
    practicalCures: [
      'Place a bronze or silver singing bowl in the West corner and sound it at twilight.',
      'Feed street dogs or animals on Tuesdays and Saturdays.',
      'Practice silence (Mauna) for at least 15 minutes every morning.'
    ],
    crystalOrGem: "Cat's Eye (Lehsunia) or Smoky Quartz",
    colorRemedy: 'Pewter Grey, Silver, and Soft Lavender.',
    vastuElementCorrection: 'Place round metal photo frames in the West sector.',
    mantraOrAffirmation: 'Oṁ Ketave Namaḥ — "My inner vision penetrates beyond appearances into profound truth."'
  },
  8: {
    number: 8,
    element: 'Earth',
    direction: 'North-East',
    rulingPlanet: 'Śani (Saturn) / Karma & Forethought',
    impactDescription: 'Impatient execution, carelessness in legal paperwork, aversion to solitary contemplation or long apprenticeships.',
    practicalCures: [
      'Maintain the North-East (Ishan) corner of your home immaculately sacred and uncluttered.',
      'Place a small clear quartz crystal pyramid in the North-East.',
      'Help manual laborers, cleaners, and the elderly with respectful donations.'
    ],
    crystalOrGem: 'Blue Sapphire (Neelam) or Amethyst',
    colorRemedy: 'Deep Navy Blue, Charcoal, and Indigo.',
    vastuElementCorrection: 'Keep North-East lightweight with natural light or a copper vessel of pure water.',
    mantraOrAffirmation: 'Oṁ Śaṁ Śanaiścarāya Namaḥ — "I honor divine time, righteous duty, and structural patience."'
  },
  9: {
    number: 9,
    element: 'Fire',
    direction: 'South',
    rulingPlanet: 'Maṅgala (Mars) / Recognition & Courage',
    impactDescription: 'Difficulty receiving public recognition, low physical stamina, shyness in standing up for principles, or lack of enthusiasm.',
    practicalCures: [
      'Install a warm red night lamp or brass oil lamp in the South sector.',
      'Hang framed certificates, awards, or red-hued artwork on the South wall.',
      'Wear a natural red carnelian bracelet on the right wrist.'
    ],
    crystalOrGem: 'Red Coral (Moonga) or Carnelian',
    colorRemedy: 'Crimson Red, Scarlet, and Warm Terracotta.',
    vastuElementCorrection: 'Keep the South wall taller and denser than the North.',
    mantraOrAffirmation: 'Oṁ Maṅgalāya Namaḥ — "My courage shines bright, inspiring honorable leadership."'
  }
};

// Authentic Kua / Personal Trigram (Gua) Metadata
export const KUA_METADATA: Record<number, {
  name: string;
  trigramChinese: string;
  trigramVedic: string;
  trigramSymbol: string;
  element: 'Water' | 'Earth' | 'Wood' | 'Metal' | 'Fire';
  direction: string;
  rulingPlanet: string;
  group: 'East Group (Dong Si Ming)' | 'West Group (Xi Si Ming)';
  luckyColors: string[];
  unluckyColors: string[];
  luckyNumbers: number[];
  auspiciousDirections: KuaDirectionDetail[];
  inauspiciousDirections: KuaDirectionDetail[];
}> = {
  1: {
    name: 'Kan (The Abysmal Water)',
    trigramChinese: '坎 (Kǎn)',
    trigramVedic: 'जल (Jala / Sūrya & Varuṇa)',
    trigramSymbol: '☵',
    element: 'Water',
    direction: 'North',
    rulingPlanet: 'Sūrya / Mercury (Deep Flow & Career Intellect)',
    group: 'East Group (Dong Si Ming)',
    luckyColors: ['Deep Blue', 'Midnight Black', 'Pearl White', 'Silver'],
    unluckyColors: ['Earthy Yellow', 'Beige', 'Brown'],
    luckyNumbers: [1, 6, 7],
    auspiciousDirections: [
      {
        type: 'Sheng Chi',
        sanskritOrChineseName: '生氣 (Shēng Qì) / Lābha',
        englishTitle: 'Prosperity & Vital Success',
        direction: 'South-East',
        compassDegree: '112.5° - 157.5°',
        description: 'Prime wealth generator; optimal for main office doors, cash registers, and executive work desks.',
        nature: 'Auspicious'
      },
      {
        type: 'Tian Yi',
        sanskritOrChineseName: '天醫 (Tiān Yī) / Ārogya',
        englishTitle: 'Heavenly Doctor & Healing',
        direction: 'East',
        compassDegree: '67.5° - 112.5°',
        description: 'Deep physical rejuvenation; face East while recuperating, sleeping, or seeking medical counsel.',
        nature: 'Auspicious'
      },
      {
        type: 'Yan Nian',
        sanskritOrChineseName: '延年 (Yán Nián) / Maitrī',
        englishTitle: 'Longevity & Harmonious Relations',
        direction: 'South',
        compassDegree: '157.5° - 202.5°',
        description: 'Fortifies marital romance, family bonds, and diplomatic negotiations.',
        nature: 'Auspicious'
      },
      {
        type: 'Fu Wei',
        sanskritOrChineseName: '伏位 (Fú Wèi) / Sthiratā',
        englishTitle: 'Stability & Inner Cultivation',
        direction: 'North',
        compassDegree: '337.5° - 22.5°',
        description: 'Ideal direction for meditation, academic study, and grounding emotional balance.',
        nature: 'Auspicious'
      }
    ],
    inauspiciousDirections: [
      {
        type: 'Huo Hai',
        sanskritOrChineseName: '禍害 (Huò Hài)',
        englishTitle: 'Mishaps & Petty Irritations',
        direction: 'West',
        compassDegree: '247.5° - 292.5°',
        description: 'Causes small bureaucratic delays, trivial misunderstandings, and fatigue.',
        nature: 'Inauspicious'
      },
      {
        type: 'Wu Gui',
        sanskritOrChineseName: '五鬼 (Wǔ Guǐ)',
        englishTitle: 'Five Ghosts & Discord',
        direction: 'North-East',
        compassDegree: '22.5° - 67.5°',
        description: 'Fosters office politics, theft, sudden disputes, or suspicious companions.',
        nature: 'Inauspicious'
      },
      {
        type: 'Liu Sha',
        sanskritOrChineseName: '六煞 (Liù Shà)',
        englishTitle: 'Six Killings & Legal Snags',
        direction: 'North-West',
        compassDegree: '292.5° - 337.5°',
        description: 'Generates gossip, contractual quarrels, and relationship volatility.',
        nature: 'Inauspicious'
      },
      {
        type: 'Jue Ming',
        sanskritOrChineseName: '絕命 (Jué Mìng)',
        englishTitle: 'Total Loss & Calamity',
        direction: 'South-West',
        compassDegree: '202.5° - 247.5°',
        description: 'Most severe negative vector; never position your bedhead or primary desk facing South-West.',
        nature: 'Inauspicious'
      }
    ]
  },
  2: {
    name: 'Kun (The Receptive Earth)',
    trigramChinese: '坤 (Kūn)',
    trigramVedic: 'भूमि / पृथ्वी (Pṛthvī / Candra)',
    trigramSymbol: '☷',
    element: 'Earth',
    direction: 'South-West',
    rulingPlanet: 'Chandra / Venus (Motherly Care & Tangible Stability)',
    group: 'West Group (Xi Si Ming)',
    luckyColors: ['Ochre Yellow', 'Warm Terracotta', 'Sand', 'Red', 'Rose'],
    unluckyColors: ['Vibrant Green', 'Forest Jade'],
    luckyNumbers: [2, 5, 8, 9],
    auspiciousDirections: [
      {
        type: 'Sheng Chi',
        sanskritOrChineseName: '生氣 (Shēng Qì) / Lābha',
        englishTitle: 'Prosperity & Vital Success',
        direction: 'North-East',
        compassDegree: '22.5° - 67.5°',
        description: 'Unlocks land acquisition, steady capital accumulation, and leadership authority.',
        nature: 'Auspicious'
      },
      {
        type: 'Tian Yi',
        sanskritOrChineseName: '天醫 (Tiān Yī) / Ārogya',
        englishTitle: 'Heavenly Doctor & Healing',
        direction: 'West',
        compassDegree: '247.5° - 292.5°',
        description: 'Strengthens digestion, soothes chronic ailments, and supports restorative sleep.',
        nature: 'Auspicious'
      },
      {
        type: 'Yan Nian',
        sanskritOrChineseName: '延年 (Yán Nián) / Maitrī',
        englishTitle: 'Longevity & Harmonious Relations',
        direction: 'North-West',
        compassDegree: '292.5° - 337.5°',
        description: 'Brings elder patronage, institutional goodwill, and deep marital affection.',
        nature: 'Auspicious'
      },
      {
        type: 'Fu Wei',
        sanskritOrChineseName: '伏位 (Fú Wèi) / Sthiratā',
        englishTitle: 'Stability & Inner Cultivation',
        direction: 'South-West',
        compassDegree: '202.5° - 247.5°',
        description: 'Cultivates maternal composure, emotional resilience, and deep grounding.',
        nature: 'Auspicious'
      }
    ],
    inauspiciousDirections: [
      {
        type: 'Huo Hai',
        sanskritOrChineseName: '禍害 (Huò Hài)',
        englishTitle: 'Mishaps & Petty Irritations',
        direction: 'East',
        compassDegree: '67.5° - 112.5°',
        description: 'Tends to provoke sudden domestic irritations and minor financial drains.',
        nature: 'Inauspicious'
      },
      {
        type: 'Wu Gui',
        sanskritOrChineseName: '五鬼 (Wǔ Guǐ)',
        englishTitle: 'Five Ghosts & Discord',
        direction: 'South-East',
        compassDegree: '112.5° - 157.5°',
        description: 'Can trigger unreliable advisors, property paperwork disputes, or fires.',
        nature: 'Inauspicious'
      },
      {
        type: 'Liu Sha',
        sanskritOrChineseName: '六煞 (Liù Shà)',
        englishTitle: 'Six Killings & Legal Snags',
        direction: 'South',
        compassDegree: '157.5° - 202.5°',
        description: 'Increases reputational friction and emotional agitation.',
        nature: 'Inauspicious'
      },
      {
        type: 'Jue Ming',
        sanskritOrChineseName: '絕命 (Jué Mìng)',
        englishTitle: 'Total Loss & Calamity',
        direction: 'North',
        compassDegree: '337.5° - 22.5°',
        description: 'Direct drain on vitality; strictly avoid facing North for long periods.',
        nature: 'Inauspicious'
      }
    ]
  },
  3: {
    name: 'Zhen (The Arousing Thunder)',
    trigramChinese: '震 (Zhèn)',
    trigramVedic: 'विद्युत / गुरु (Vidyut / Guru)',
    trigramSymbol: '☳',
    element: 'Wood',
    direction: 'East',
    rulingPlanet: 'Guru (Jupiter - Expansion, Wisdom & Momentum)',
    group: 'East Group (Dong Si Ming)',
    luckyColors: ['Emerald Green', 'Teal', 'Deep Blue', 'Navy'],
    unluckyColors: ['Bright White', 'Metallic Silver', 'Gold'],
    luckyNumbers: [3, 4, 1],
    auspiciousDirections: [
      { type: 'Sheng Chi', sanskritOrChineseName: '生氣 (Shēng Qì)', englishTitle: 'Prosperity & Vital Success', direction: 'South', compassDegree: '157.5° - 202.5°', description: 'Catalyzes career ascendance, public recognition, and business growth.', nature: 'Auspicious' },
      { type: 'Tian Yi', sanskritOrChineseName: '天醫 (Tiān Yī)', englishTitle: 'Heavenly Doctor & Healing', direction: 'North', compassDegree: '337.5° - 22.5°', description: 'Revitalizes the nervous system and fosters sound mental recovery.', nature: 'Auspicious' },
      { type: 'Yan Nian', sanskritOrChineseName: '延年 (Yán Nián)', englishTitle: 'Longevity & Harmonious Relations', direction: 'South-East', compassDegree: '112.5° - 157.5°', description: 'Strengthens enduring commercial alliances and family harmony.', nature: 'Auspicious' },
      { type: 'Fu Wei', sanskritOrChineseName: '伏位 (Fú Wèi)', englishTitle: 'Stability & Inner Cultivation', direction: 'East', compassDegree: '67.5° - 112.5°', description: 'Excellent for personal ambition, higher learning, and spiritual focus.', nature: 'Auspicious' }
    ],
    inauspiciousDirections: [
      { type: 'Huo Hai', sanskritOrChineseName: '禍害 (Huò Hài)', englishTitle: 'Mishaps & Petty Irritations', direction: 'South-West', compassDegree: '202.5° - 247.5°', description: 'Draws petty arguments and micro-management bottlenecks.', nature: 'Inauspicious' },
      { type: 'Wu Gui', sanskritOrChineseName: '五鬼 (Wǔ Guǐ)', englishTitle: 'Five Ghosts & Discord', direction: 'North-West', compassDegree: '292.5° - 337.5°', description: 'Can introduce clashes with authorities or patriarchal mentors.', nature: 'Inauspicious' },
      { type: 'Liu Sha', sanskritOrChineseName: '六煞 (Liù Shà)', englishTitle: 'Six Killings & Legal Snags', direction: 'North-East', compassDegree: '22.5° - 67.5°', description: 'Encourages indecisiveness and intellectual restlessness.', nature: 'Inauspicious' },
      { type: 'Jue Ming', sanskritOrChineseName: '絕命 (Jué Mìng)', englishTitle: 'Total Loss & Calamity', direction: 'West', compassDegree: '247.5° - 292.5°', description: 'Most debilitating sector; avoid doors and desks facing West.', nature: 'Inauspicious' }
    ]
  },
  4: {
    name: 'Xun (The Gentle Wind)',
    trigramChinese: '巽 (Xùn)',
    trigramVedic: 'वायु / राहु (Vāyu / Rāhu)',
    trigramSymbol: '☴',
    element: 'Wood',
    direction: 'South-East',
    rulingPlanet: 'Rāhu / Mercury (Flexibility, Growth & Strategy)',
    group: 'East Group (Dong Si Ming)',
    luckyColors: ['Forest Green', 'Jade', 'Sky Blue', 'Black'],
    unluckyColors: ['Metallic Silver', 'Platinum White'],
    luckyNumbers: [4, 3, 1],
    auspiciousDirections: [
      { type: 'Sheng Chi', sanskritOrChineseName: '生氣 (Shēng Qì)', englishTitle: 'Prosperity & Vital Success', direction: 'North', compassDegree: '337.5° - 22.5°', description: 'Brings steady financial flow, artistic commission, and intellectual triumphs.', nature: 'Auspicious' },
      { type: 'Tian Yi', sanskritOrChineseName: '天醫 (Tiān Yī)', englishTitle: 'Heavenly Doctor & Healing', direction: 'South', compassDegree: '157.5° - 202.5°', description: 'Nurtures cardiovascular health, emotional peace, and restful sleep.', nature: 'Auspicious' },
      { type: 'Yan Nian', sanskritOrChineseName: '延年 (Yán Nián)', englishTitle: 'Longevity & Harmonious Relations', direction: 'East', compassDegree: '67.5° - 112.5°', description: 'Fosters sweet relationships, faithful partners, and warm social circles.', nature: 'Auspicious' },
      { type: 'Fu Wei', sanskritOrChineseName: '伏位 (Fú Wèi)', englishTitle: 'Stability & Inner Cultivation', direction: 'South-East', compassDegree: '112.5° - 157.5°', description: 'Sharpens creative writing, mathematical skills, and mindful contemplation.', nature: 'Auspicious' }
    ],
    inauspiciousDirections: [
      { type: 'Huo Hai', sanskritOrChineseName: '禍害 (Huò Hài)', englishTitle: 'Mishaps & Petty Irritations', direction: 'North-West', compassDegree: '292.5° - 337.5°', description: 'Prompts unexpected travel cancellations and small expenses.', nature: 'Inauspicious' },
      { type: 'Wu Gui', sanskritOrChineseName: '五鬼 (Wǔ Guǐ)', englishTitle: 'Five Ghosts & Discord', direction: 'South-West', compassDegree: '202.5° - 247.5°', description: 'Sparks envy and unwarranted domestic tension.', nature: 'Inauspicious' },
      { type: 'Liu Sha', sanskritOrChineseName: '六煞 (Liù Shà)', englishTitle: 'Six Killings & Legal Snags', direction: 'West', compassDegree: '247.5° - 292.5°', description: 'Can introduce unreliable vendors or legal ambiguities.', nature: 'Inauspicious' },
      { type: 'Jue Ming', sanskritOrChineseName: '絕命 (Jué Mìng)', englishTitle: 'Total Loss & Calamity', direction: 'North-East', compassDegree: '22.5° - 67.5°', description: 'Severe energy drain; keep workspaces and entryways oriented elsewhere.', nature: 'Inauspicious' }
    ]
  },
  6: {
    name: 'Qian (The Creative Heaven)',
    trigramChinese: '乾 (Qián)',
    trigramVedic: 'आकाश / शुक्र (Ākāśa / Śukra)',
    trigramSymbol: '☰',
    element: 'Metal',
    direction: 'North-West',
    rulingPlanet: 'Śukra / Ketu (Mentorship, Noblesse & Executive Command)',
    group: 'West Group (Xi Si Ming)',
    luckyColors: ['Gold', 'Silver', 'Pristine White', 'Warm Ochre', 'Khaki'],
    unluckyColors: ['Crimson Red', 'Neon Pink', 'Purple'],
    luckyNumbers: [6, 7, 2, 8],
    auspiciousDirections: [
      { type: 'Sheng Chi', sanskritOrChineseName: '生氣 (Shēng Qì)', englishTitle: 'Prosperity & Vital Success', direction: 'West', compassDegree: '247.5° - 292.5°', description: 'Empowers high executive office, corporate funding, and strategic investments.', nature: 'Auspicious' },
      { type: 'Tian Yi', sanskritOrChineseName: '天醫 (Tiān Yī)', englishTitle: 'Heavenly Doctor & Healing', direction: 'North-East', compassDegree: '22.5° - 67.5°', description: 'Protects respiratory and skeletal systems, attracting noble benefactors.', nature: 'Auspicious' },
      { type: 'Yan Nian', sanskritOrChineseName: '延年 (Yán Nián)', englishTitle: 'Longevity & Harmonious Relations', direction: 'South-West', compassDegree: '202.5° - 247.5°', description: 'Fosters steadfast marital respect and corporate investor trust.', nature: 'Auspicious' },
      { type: 'Fu Wei', sanskritOrChineseName: '伏位 (Fú Wèi)', englishTitle: 'Stability & Inner Cultivation', direction: 'North-West', compassDegree: '292.5° - 337.5°', description: 'Strengthens self-mastery, administrative discipline, and ethical dignity.', nature: 'Auspicious' }
    ],
    inauspiciousDirections: [
      { type: 'Huo Hai', sanskritOrChineseName: '禍害 (Huò Hài)', englishTitle: 'Mishaps & Petty Irritations', direction: 'South-East', compassDegree: '112.5° - 157.5°', description: 'Can lead to clerical oversights and minor equipment breakdowns.', nature: 'Inauspicious' },
      { type: 'Wu Gui', sanskritOrChineseName: '五鬼 (Wǔ Guǐ)', englishTitle: 'Five Ghosts & Discord', direction: 'East', compassDegree: '67.5° - 112.5°', description: 'Can cause unexpected financial volatility or insubordination.', nature: 'Inauspicious' },
      { type: 'Liu Sha', sanskritOrChineseName: '六煞 (Liù Shà)', englishTitle: 'Six Killings & Legal Snags', direction: 'North', compassDegree: '337.5° - 22.5°', description: 'Encourages coldness or emotional estrangement from team members.', nature: 'Inauspicious' },
      { type: 'Jue Ming', sanskritOrChineseName: '絕命 (Jué Mìng)', englishTitle: 'Total Loss & Calamity', direction: 'South', compassDegree: '157.5° - 202.5°', description: 'High-risk direction; do not place headboards or boardroom seats facing South.', nature: 'Inauspicious' }
    ]
  },
  7: {
    name: 'Dui (The Joyous Lake)',
    trigramChinese: '兌 (Duì)',
    trigramVedic: 'हर्ष / केतु (Harṣa / Ketu)',
    trigramSymbol: '☱',
    element: 'Metal',
    direction: 'West',
    rulingPlanet: 'Ketu / Moon (Eloquence, Charm & Innovation)',
    group: 'West Group (Xi Si Ming)',
    luckyColors: ['Silver', 'White', 'Bronze', 'Yellow', 'Desert Tan'],
    unluckyColors: ['Fiery Red', 'Hot Orange'],
    luckyNumbers: [7, 6, 2, 8],
    auspiciousDirections: [
      { type: 'Sheng Chi', sanskritOrChineseName: '生氣 (Shēng Qì)', englishTitle: 'Prosperity & Vital Success', direction: 'North-West', compassDegree: '292.5° - 337.5°', description: 'Propels keynote speaking, media visibility, and lucrative trade.', nature: 'Auspicious' },
      { type: 'Tian Yi', sanskritOrChineseName: '天醫 (Tiān Yī)', englishTitle: 'Heavenly Doctor & Healing', direction: 'South-West', compassDegree: '202.5° - 247.5°', description: 'Fortifies throat, teeth, and vocal vitality; speeds recovery from illnesses.', nature: 'Auspicious' },
      { type: 'Yan Nian', sanskritOrChineseName: '延年 (Yán Nián)', englishTitle: 'Longevity & Harmonious Relations', direction: 'North-East', compassDegree: '22.5° - 67.5°', description: 'Guarantees social popularity, artistic acclaim, and romantic joy.', nature: 'Auspicious' },
      { type: 'Fu Wei', sanskritOrChineseName: '伏位 (Fú Wèi)', englishTitle: 'Stability & Inner Cultivation', direction: 'West', compassDegree: '247.5° - 292.5°', description: 'Superb for vocal rehearsal, musical composition, and personal happiness.', nature: 'Auspicious' }
    ],
    inauspiciousDirections: [
      { type: 'Huo Hai', sanskritOrChineseName: '禍害 (Huò Hài)', englishTitle: 'Mishaps & Petty Irritations', direction: 'North', compassDegree: '337.5° - 22.5°', description: 'Brings unnecessary chatter, small spats, and voice exhaustion.', nature: 'Inauspicious' },
      { type: 'Wu Gui', sanskritOrChineseName: '五鬼 (Wǔ Guǐ)', englishTitle: 'Five Ghosts & Discord', direction: 'South', compassDegree: '157.5° - 202.5°', description: 'Risk of fire hazards, heated arguments, or breach of trust.', nature: 'Inauspicious' },
      { type: 'Liu Sha', sanskritOrChineseName: '六煞 (Liù Shà)', englishTitle: 'Six Killings & Legal Snags', direction: 'South-East', compassDegree: '112.5° - 157.5°', description: 'Generates rumors, jealousy, and social misunderstandings.', nature: 'Inauspicious' },
      { type: 'Jue Ming', sanskritOrChineseName: '絕命 (Jué Mìng)', englishTitle: 'Total Loss & Calamity', direction: 'East', compassDegree: '67.5° - 112.5°', description: 'Direct energy sink; strictly avoid positioning master bed toward East.', nature: 'Inauspicious' }
    ]
  },
  8: {
    name: 'Gen (The Keeping Still Mountain)',
    trigramChinese: '艮 (Gèn)',
    trigramVedic: 'पर्वत / शनि (Parvata / Śani)',
    trigramSymbol: '☶',
    element: 'Earth',
    direction: 'North-East',
    rulingPlanet: 'Śani / Jupiter (Intellectual Gravity, Property & Stillness)',
    group: 'West Group (Xi Si Ming)',
    luckyColors: ['Beige', 'Sand', 'Terracotta', 'Clay', 'Red'],
    unluckyColors: ['Forest Green', 'Dark Moss'],
    luckyNumbers: [8, 2, 5, 9],
    auspiciousDirections: [
      { type: 'Sheng Chi', sanskritOrChineseName: '生氣 (Shēng Qì)', englishTitle: 'Prosperity & Vital Success', direction: 'South-West', compassDegree: '202.5° - 247.5°', description: 'Bestows real estate acquisitions, long-range wealth, and rock-solid assets.', nature: 'Auspicious' },
      { type: 'Tian Yi', sanskritOrChineseName: '天醫 (Tiān Yī)', englishTitle: 'Heavenly Doctor & Healing', direction: 'North-West', compassDegree: '292.5° - 337.5°', description: 'Aids spinal alignment, joint recovery, and deep contemplative calm.', nature: 'Auspicious' },
      { type: 'Yan Nian', sanskritOrChineseName: '延年 (Yán Nián)', englishTitle: 'Longevity & Harmonious Relations', direction: 'West', compassDegree: '247.5° - 292.5°', description: 'Nurtures loyal partnerships, enduring marriages, and reliable friendships.', nature: 'Auspicious' },
      { type: 'Fu Wei', sanskritOrChineseName: '伏位 (Fú Wèi)', englishTitle: 'Stability & Inner Cultivation', direction: 'North-East', compassDegree: '22.5° - 67.5°', description: 'Optimal for intensive research, deep meditation, and spiritual scholarship.', nature: 'Auspicious' }
    ],
    inauspiciousDirections: [
      { type: 'Huo Hai', sanskritOrChineseName: '禍害 (Huò Hài)', englishTitle: 'Mishaps & Petty Irritations', direction: 'South', compassDegree: '157.5° - 202.5°', description: 'Stirs stubbornness, rigid opinions, and minor muscular stiffness.', nature: 'Inauspicious' },
      { type: 'Wu Gui', sanskritOrChineseName: '五鬼 (Wǔ Guǐ)', englishTitle: 'Five Ghosts & Discord', direction: 'North', compassDegree: '337.5° - 22.5°', description: 'Can create hidden opposition or stalled commercial approvals.', nature: 'Inauspicious' },
      { type: 'Liu Sha', sanskritOrChineseName: '六煞 (Liù Shà)', englishTitle: 'Six Killings & Legal Snags', direction: 'East', compassDegree: '67.5° - 112.5°', description: 'Causes strained sibling dynamics and delayed construction work.', nature: 'Inauspicious' },
      { type: 'Jue Ming', sanskritOrChineseName: '絕命 (Jué Mìng)', englishTitle: 'Total Loss & Calamity', direction: 'South-East', compassDegree: '112.5° - 157.5°', description: 'Extreme loss direction; avoid front doors or study tables facing South-East.', nature: 'Inauspicious' }
    ]
  },
  9: {
    name: 'Li (The Clinging Fire)',
    trigramChinese: '離 (Lí)',
    trigramVedic: 'तेजस् / मङ्गल (Tejas / Maṅgala)',
    trigramSymbol: '☲',
    element: 'Fire',
    direction: 'South',
    rulingPlanet: 'Maṅgala / Sun (Fame, Radiance, Illumination & Charisma)',
    group: 'East Group (Dong Si Ming)',
    luckyColors: ['Ruby Red', 'Scarlet', 'Amethyst Purple', 'Warm Orange', 'Wood Green'],
    unluckyColors: ['Watery Blue', 'Deep Black'],
    luckyNumbers: [9, 3, 4],
    auspiciousDirections: [
      { type: 'Sheng Chi', sanskritOrChineseName: '生氣 (Shēng Qì)', englishTitle: 'Prosperity & Vital Success', direction: 'East', compassDegree: '67.5° - 112.5°', description: 'Ignites public fame, widespread commercial success, and charismatic influence.', nature: 'Auspicious' },
      { type: 'Tian Yi', sanskritOrChineseName: '天醫 (Tiān Yī)', englishTitle: 'Heavenly Doctor & Healing', direction: 'South-East', compassDegree: '112.5° - 157.5°', description: 'Harmonizes eyesight, cardiovascular rhythm, and metabolic vitality.', nature: 'Auspicious' },
      { type: 'Yan Nian', sanskritOrChineseName: '延年 (Yán Nián)', englishTitle: 'Longevity & Harmonious Relations', direction: 'North', compassDegree: '337.5° - 22.5°', description: 'Attracts social celebrations, enduring adoration, and strong allies.', nature: 'Auspicious' },
      { type: 'Fu Wei', sanskritOrChineseName: '伏位 (Fú Wèi)', englishTitle: 'Stability & Inner Cultivation', direction: 'South', compassDegree: '157.5° - 202.5°', description: 'Empowers self-belief, creative expression, and spiritual joy.', nature: 'Auspicious' }
    ],
    inauspiciousDirections: [
      { type: 'Huo Hai', sanskritOrChineseName: '禍害 (Huò Hài)', englishTitle: 'Mishaps & Petty Irritations', direction: 'North-East', compassDegree: '22.5° - 67.5°', description: 'Triggers impatient outbursts, heated debates, and temporary setbacks.', nature: 'Inauspicious' },
      { type: 'Wu Gui', sanskritOrChineseName: '五鬼 (Wǔ Guǐ)', englishTitle: 'Five Ghosts & Discord', direction: 'West', compassDegree: '247.5° - 292.5°', description: 'Can invite dishonesty, contract breaches, and sudden financial leaks.', nature: 'Inauspicious' },
      { type: 'Liu Sha', sanskritOrChineseName: '六煞 (Liù Shà)', englishTitle: 'Six Killings & Legal Snags', direction: 'South-West', compassDegree: '202.5° - 247.5°', description: 'Leads to relationship drama, insomnia, and emotional over-exhaustion.', nature: 'Inauspicious' },
      { type: 'Jue Ming', sanskritOrChineseName: '絕命 (Jué Mìng)', englishTitle: 'Total Loss & Calamity', direction: 'North-West', compassDegree: '292.5° - 337.5°', description: 'Most debilitating sector; strictly avoid working or sleeping facing North-West.', nature: 'Inauspicious' }
    ]
  }
};

/**
 * Calculates the Kua (Gua) Number according to authentic Eight Mansions (Ba Zhai) Feng Shui & Lo Shu principles.
 * 
 * Rules:
 * 1. Solar Year (Li Chun): If born before Feb 4, effective birth year is year - 1.
 * 2. Kua Factor: Take the LAST TWO DIGITS of the effective solar year and sum them.
 *    If the sum is a 2-digit number, add its digits again until a single digit (0-9).
 * 3. Gender & Era Formulas:
 *    - Male born before 2000: 10 - Kua Factor
 *    - Male born 2000 or later: 9 - Kua Factor (if <= 0, add 9)
 *    - Female born before 2000: Kua Factor + 5 (reduced to single digit)
 *    - Female born 2000 or later: Kua Factor + 6 (reduced to single digit)
 * 4. Special Transformation Rule for Number 5:
 *    In the 8 Trigrams, 5 sits at the Taiji / Center (Earth) with no outer direction/trigram:
 *    - For Males: 5 transforms into 2 (Kun Trigram / South-West Earth)
 *    - For Females: 5 transforms into 8 (Gen Trigram / North-East Earth)
 *    - For Other: defaults to 2 (with note that 8 is feminine alternative)
 */
export function calculateKuaDetails(
  dob: string,
  gender: 'Male' | 'Female' | 'Other' = 'Male',
  options: { forceSolarAdjustment?: boolean } = {}
): KuaAnalysisDetails {
  const parts = dob.split('-').map(p => parseInt(p, 10));
  const gregorianYear = parts[0] || 1990;
  const month = parts[1] || 1;
  const day = parts[2] || 1;

  // 1. Solar Year Cutoff (Li Chun / Start of Spring falls on Feb 4)
  const isBeforeFeb4 = month < 2 || (month === 2 && day < 4);
  const useSolarAdjustment = options.forceSolarAdjustment !== undefined 
    ? options.forceSolarAdjustment 
    : isBeforeFeb4;
  
  const solarYear = useSolarAdjustment ? gregorianYear - 1 : gregorianYear;

  // 2. Kua Factor: Last Two Digits of Solar Year
  const lastTwoDigits = solarYear % 100;
  const tens = Math.floor(lastTwoDigits / 10);
  const ones = lastTwoDigits % 10;
  let factorSum = tens + ones;
  while (factorSum > 9) {
    factorSum = Math.floor(factorSum / 10) + (factorSum % 10);
  }
  const kuaFactor = factorSum; // 0 to 9

  const isBefore2000 = solarYear < 2000;
  const era: 'Before 2000' | '2000 & After' = isBefore2000 ? 'Before 2000' : '2000 & After';

  let rawCalculated = 0;
  let formulaUsed = '';
  const stepByStep: string[] = [];

  stepByStep.push(
    `1. Gregorian Birth Year: ${gregorianYear}${useSolarAdjustment ? ` (Born before Feb 4 Li Chun cutoff → Solar Year = ${solarYear})` : ''}.`
  );
  stepByStep.push(
    `2. Last Two Digits of Solar Year: ${lastTwoDigits.toString().padStart(2, '0')} → ${tens} + ${ones} = ${tens + ones}${tens + ones > 9 ? ` → reduced to single digit ${kuaFactor}` : ''} (Kua Factor = ${kuaFactor}).`
  );

  const effectiveGender = gender === 'Other' ? 'Male' : gender;

  if (effectiveGender === 'Male') {
    if (isBefore2000) {
      formulaUsed = '10 − Kua Factor';
      rawCalculated = 10 - kuaFactor;
      if (rawCalculated === 10) rawCalculated = 1;
      if (rawCalculated <= 0) rawCalculated += 9;
      stepByStep.push(`3. Male born before 2000 formula: 10 − ${kuaFactor} = ${rawCalculated}.`);
    } else {
      formulaUsed = '9 − Kua Factor';
      rawCalculated = 9 - kuaFactor;
      if (rawCalculated <= 0) rawCalculated += 9;
      stepByStep.push(`3. Male born in/after 2000 formula: 9 − ${kuaFactor} = ${rawCalculated <= 0 ? `${rawCalculated} (wrapped to ${rawCalculated + 9})` : rawCalculated}.`);
    }
  } else {
    // Female
    if (isBefore2000) {
      formulaUsed = 'Kua Factor + 5';
      const initial = kuaFactor + 5;
      rawCalculated = initial > 9 ? Math.floor(initial / 10) + (initial % 10) : initial;
      stepByStep.push(`3. Female born before 2000 formula: ${kuaFactor} + 5 = ${initial}${initial > 9 ? ` → reduced to ${rawCalculated}` : ''}.`);
    } else {
      formulaUsed = 'Kua Factor + 6';
      const initial = kuaFactor + 6;
      rawCalculated = initial > 9 ? Math.floor(initial / 10) + (initial % 10) : initial;
      stepByStep.push(`3. Female born in/after 2000 formula: ${kuaFactor} + 6 = ${initial}${initial > 9 ? ` → reduced to ${rawCalculated}` : ''}.`);
    }
  }

  // 4. Special Transformation for Number 5
  let transformedFromFive = false;
  let finalKua = rawCalculated;

  if (rawCalculated === 5) {
    transformedFromFive = true;
    if (effectiveGender === 'Male') {
      finalKua = 2; // Male 5 transforms to 2 (Kun Trigram)
      stepByStep.push('4. Number 5 Exception: Number 5 sits in the Central Earth Palace with no separate outer trigram. For Males, 5 transforms into Kua 2 (Kun / Earth / South-West).');
    } else {
      finalKua = 8; // Female 5 transforms to 8 (Gen Trigram)
      stepByStep.push('4. Number 5 Exception: Number 5 sits in the Central Earth Palace with no separate outer trigram. For Females, 5 transforms into Kua 8 (Gen / Earth / North-East).');
    }
  } else {
    stepByStep.push(`4. Final Kua Number confirmed as ${finalKua}.`);
  }

  const meta = KUA_METADATA[finalKua] || KUA_METADATA[1];

  return {
    kuaNumber: finalKua,
    originalCalculatedNumber: rawCalculated,
    transformedFromFive,
    kuaFactor,
    gregorianYear,
    solarYear,
    isSolarAdjusted: useSolarAdjustment,
    gender,
    era,
    formulaUsed,
    stepByStep,
    group: meta.group,
    trigram: `${meta.trigramSymbol} ${meta.name}`,
    trigramChinese: meta.trigramChinese,
    trigramVedic: meta.trigramVedic,
    element: meta.element,
    direction: meta.direction,
    rulingPlanet: meta.rulingPlanet,
    luckyColors: meta.luckyColors,
    luckyNumbers: meta.luckyNumbers,
    unluckyColors: meta.unluckyColors,
    auspiciousDirections: meta.auspiciousDirections,
    inauspiciousDirections: meta.inauspiciousDirections
  };
}

/**
 * Calculates the Kua Number according to authentic Feng Shui / Lo Shu system.
 * Backward-compatible helper that accepts year (number) or full DOB string.
 */
export function calculateKuaNumber(
  yearOrDob: number | string,
  gender: 'Male' | 'Female' | 'Other' = 'Male',
  month?: number,
  day?: number
): number {
  if (typeof yearOrDob === 'string' && yearOrDob.includes('-')) {
    return calculateKuaDetails(yearOrDob, gender).kuaNumber;
  }
  const year = typeof yearOrDob === 'number' ? yearOrDob : parseInt(yearOrDob, 10);
  const m = month || 6;
  const d = day || 15;
  const formattedDob = `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return calculateKuaDetails(formattedDob, gender).kuaNumber;
}

/**
 * Core Algorithm: Generate Full Lo Shu Grid & Plane Analysis
 */
export function generateLoShuAnalysis(
  dob: string,
  options: {
    mode?: 'vedic_hybrid' | 'pure_dob' | 'with_kua';
    gender?: 'Male' | 'Female' | 'Other';
    forceSolarAdjustment?: boolean;
  } = {}
): LoShuGridResult {
  const mode = options.mode || 'vedic_hybrid';
  const gender = options.gender || 'Male';

  // Parse Date of Birth (YYYY-MM-DD)
  const parts = dob.split('-').map(p => parseInt(p, 10));
  const year = parts[0] || 1990;
  const month = parts[1] || 1;
  const day = parts[2] || 1;

  // Extract raw digits (excluding zeroes as zero has no cell in 3x3 Lo Shu)
  const dobDigits = dob
    .replace(/[^1-9]/g, '')
    .split('')
    .map(Number);

  // Compute Mūlāṅka (Root Number from Day)
  const daySum = day.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  const mulankValue = reduceToSingleDigit(daySum).root;

  // Compute Bhāgyāṅka (Destiny Number from full DOB)
  const fullSum = dobDigits.reduce((acc, val) => acc + val, 0);
  const bhagyankValue = reduceToSingleDigit(fullSum).root;

  // Compute Kua with authentic method & complete directional metadata
  const kuaDetails = calculateKuaDetails(dob, gender, { forceSolarAdjustment: options.forceSolarAdjustment });
  const kuaNumber = kuaDetails.kuaNumber;

  // Initialize cells 1 to 9
  const cells: Record<number, LoShuCellInfo> = {} as any;
  for (let num = 1; num <= 9; num++) {
    const meta = LOSHU_COORDINATES[num];
    cells[num] = {
      number: num,
      row: meta.row,
      col: meta.col,
      count: 0,
      digits: [],
      element: meta.element,
      direction: meta.direction,
      compassDegrees: meta.compassDegrees,
      significance: meta.significance,
      planetaryLord: meta.planetaryLord,
      color: meta.color,
      sourceBreakdown: {
        fromDob: 0,
        fromMulank: 0,
        fromBhagyank: 0,
        fromKua: 0
      }
    };
  }

  // Populate digits from DOB
  dobDigits.forEach(num => {
    if (cells[num]) {
      cells[num].count += 1;
      cells[num].digits.push(num);
      cells[num].sourceBreakdown.fromDob += 1;
    }
  });

  // Mode: Vedic Hybrid adds Mūlāṅka and Bhāgyāṅka
  if (mode === 'vedic_hybrid' || mode === 'with_kua') {
    if (cells[mulankValue]) {
      cells[mulankValue].count += 1;
      cells[mulankValue].digits.push(mulankValue);
      cells[mulankValue].sourceBreakdown.fromMulank += 1;
    }
    if (cells[bhagyankValue]) {
      cells[bhagyankValue].count += 1;
      cells[bhagyankValue].digits.push(bhagyankValue);
      cells[bhagyankValue].sourceBreakdown.fromBhagyank += 1;
    }
  }

  // Mode: With Kua also adds Kua number
  if (mode === 'with_kua') {
    if (cells[kuaNumber]) {
      cells[kuaNumber].count += 1;
      cells[kuaNumber].digits.push(kuaNumber);
      cells[kuaNumber].sourceBreakdown.fromKua += 1;
    }
  }

  // Compile present and missing numbers
  const presentNumbers: number[] = [];
  const missingNumbers: number[] = [];
  const repeatedNumbers: { number: number; count: number; meaning: string }[] = [];

  for (let num = 1; num <= 9; num++) {
    const cell = cells[num];
    if (cell.count > 0) {
      presentNumbers.push(num);
      if (cell.count >= 1) {
        const key = Math.min(cell.count, 4);
        const meaning = NUMBER_REPETITION_MEANINGS[num]?.[key] || `${cell.count} occurrences of number ${num}`;
        repeatedNumbers.push({ number: num, count: cell.count, meaning });
      }
    } else {
      missingNumbers.push(num);
    }
  }

  // Plane Analysis
  const planes: LoShuPlaneAnalysis[] = LOSHU_PLANES_DEFINITIONS.map(def => {
    const presentInPlane = def.numbers.filter(n => cells[n].count > 0);
    const missingInPlane = def.numbers.filter(n => cells[n].count === 0);
    const totalCount = def.numbers.reduce((acc, n) => acc + cells[n].count, 0);

    const completionPercentage = Math.round((presentInPlane.length / 3) * 100);
    let status: 'Complete' | 'Partial' | 'Absent' = 'Absent';
    if (completionPercentage === 100) status = 'Complete';
    else if (completionPercentage > 0) status = 'Partial';

    let energyLevel: 'Dominant' | 'Balanced' | 'Latent' | 'Void' = 'Void';
    if (completionPercentage === 100) {
      energyLevel = totalCount >= 5 ? 'Dominant' : 'Balanced';
    } else if (completionPercentage >= 33) {
      energyLevel = 'Latent';
    }

    return {
      id: def.id,
      name: def.name,
      hindiName: def.hindiName,
      type: def.type,
      numbers: def.numbers,
      numbersPresent: presentInPlane,
      missingInPlane,
      countTotal: totalCount,
      completionPercentage,
      status,
      energyLevel,
      psychologicalImpact: def.psychologicalImpact,
      practicalStrengths: def.strengths,
      potentialBlindspots: def.blindspots,
      vedicRemedy: def.remedy
    };
  });

  // Calculate Yogas status
  const yogas = {
    goldenRajYoga: cells[4].count > 0 && cells[5].count > 0 && cells[6].count > 0,
    silverRajYoga: cells[2].count > 0 && cells[5].count > 0 && cells[8].count > 0,
    mentalPlane: cells[4].count > 0 && cells[9].count > 0 && cells[2].count > 0,
    emotionalPlane: cells[3].count > 0 && cells[5].count > 0 && cells[7].count > 0,
    practicalPlane: cells[8].count > 0 && cells[1].count > 0 && cells[6].count > 0,
    thoughtPlane: cells[4].count > 0 && cells[3].count > 0 && cells[8].count > 0,
    willPlane: cells[9].count > 0 && cells[5].count > 0 && cells[1].count > 0,
    actionPlane: cells[2].count > 0 && cells[7].count > 0 && cells[6].count > 0
  };

  // Compile Remedies for all missing numbers
  const remedies = missingNumbers.map(num => MISSING_NUMBER_REMEDIES[num]).filter(Boolean);

  return {
    dob,
    digitsUsed: dobDigits,
    mulankValue,
    bhagyankValue,
    kuaNumber,
    kuaDetails,
    gender,
    calculationMode: mode,
    cells,
    planes,
    presentNumbers,
    missingNumbers,
    repeatedNumbers,
    yogas,
    remedies
  };
}
