/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Core Number & Compound Archetypes
 * Lead Architect & Numerology Researcher: Pawan Paji
 */

import { CompoundNumberData, SourceCategory } from '../types';

export interface SingleNumberProfile {
  digit: number;
  sanskritName: string;
  indicTitle: string;
  graha: string;
  deity: string;
  archetype: string;
  gemstone: string;
  favorableColors: string[];
  favorableDays: string[];
  friends: number[];
  neutrals: number[];
  enemies: number[];
  indicTradition: string;
  chaldeanTradition: string;
  pythagoreanTradition: string;
  sources: { title: string; category: SourceCategory }[];
}

export const SINGLE_NUMBERS: Record<number, SingleNumberProfile> = {
  1: {
    digit: 1,
    sanskritName: 'Eka (एक)',
    indicTitle: 'Surya — The Primordial Radiant Self',
    graha: 'Surya (The Sun)',
    deity: 'Aditya / Agni',
    archetype: 'The Sovereign Pioneer & Architect of Will',
    gemstone: 'Ruby (Manikya)',
    favorableColors: ['Crimson', 'Gold', 'Amber', 'Copper'],
    favorableDays: ['Sunday'],
    friends: [1, 2, 3, 9],
    neutrals: [5],
    enemies: [4, 6, 7, 8],
    indicTradition: 'Associated with the life-giving solar soul (Atman), commanding leadership, dignified self-respect, and generative authority.',
    chaldeanTradition: 'Represents the positive, primary creative spark, ambition, independent thought, and pioneering executive command.',
    pythagoreanTradition: 'The Monad — indivisible starting point of all creation, individuality, initiative, and intellectual self-direction.',
    sources: [
      { title: 'Bṛhat Saṁhitā (Adhyāya 4)', category: 'Category A' },
      { title: 'Cheiro’s Book of Numbers', category: 'Category D' },
      { title: 'Traditional Parāśara Ank Jyotish', category: 'Category C' }
    ]
  },
  2: {
    digit: 2,
    sanskritName: 'Dvi (द्वि)',
    indicTitle: 'Chandra — The Reflective Mind & Receptivity',
    graha: 'Chandra (The Moon)',
    deity: 'Soma / Parvati',
    archetype: 'The Intuitive Peacemaker & Empathic Mirror',
    gemstone: 'Natural Pearl (Mukta) or Moonstone',
    favorableColors: ['Pristine White', 'Silver', 'Cream', 'Pale Green'],
    favorableDays: ['Monday'],
    friends: [1, 2, 3, 5],
    neutrals: [9],
    enemies: [4, 6, 7, 8],
    indicTradition: 'Governs the lunar sensory mind (Manas), emotional rhythm, artistic subtlety, fluidity, and diplomacy.',
    chaldeanTradition: 'Feminine, magnetic, romantic, imaginative; powerful intuitive vision, sensitive to vibrations and collective harmony.',
    pythagoreanTradition: 'The Duad — duality, partnership, cooperation, harmony, sensitivity, and rhythmic balance.',
    sources: [
      { title: 'Bṛhat Saṁhitā (Adhyāya 5)', category: 'Category A' },
      { title: 'Cheiro’s Book of Numbers', category: 'Category D' }
    ]
  },
  3: {
    digit: 3,
    sanskritName: 'Tri (त्रि)',
    indicTitle: 'Brihaspati / Guru — Wisdom & Expansive Truth',
    graha: 'Brihaspati (Jupiter)',
    deity: 'Devaguru Brihaspati / Saraswati',
    archetype: 'The Wise Counselor, Scholar & Expressive Creator',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    favorableColors: ['Bright Yellow', 'Saffron', 'Golden Honey', 'Violet'],
    favorableDays: ['Thursday'],
    friends: [1, 2, 3, 9],
    neutrals: [5, 8],
    enemies: [6],
    indicTradition: 'Governs higher wisdom (Dharma), sacred knowledge, expansive intellectual vision, advisory grace, and truth.',
    chaldeanTradition: 'High ambition, dedication to duty, love of order, law, and philosophical inquiry; natural executive advisors.',
    pythagoreanTradition: 'The Triad — creative synthesis, joyful self-expression, communication, optimism, and spiritual fertility.',
    sources: [
      { title: 'Sāṅkhyakārikā & Parāśara Horā', category: 'Category A' },
      { title: 'The Philosophy of Numbers (Balliett)', category: 'Category D' }
    ]
  },
  4: {
    digit: 4,
    sanskritName: 'Chatur (चतुर्)',
    indicTitle: 'Rahu — Structural Genius & Unconventional Vision',
    graha: 'Rahu (North Lunar Node)',
    deity: 'Rahu / Bhairava',
    archetype: 'The Rebel Strategist & Structural Innovator',
    gemstone: 'Hessonite Garnet (Gomedha)',
    favorableColors: ['Smoky Grey', 'Electric Blue', 'Deep Slate', 'Indigo'],
    favorableDays: ['Sunday', 'Saturday'],
    friends: [5, 6, 7, 8],
    neutrals: [3],
    enemies: [1, 2, 9],
    indicTradition: 'Governs sudden paradigm shifts, technological insight, unconventional breakthroughs, and analytical mastery.',
    chaldeanTradition: 'Originality, rebellion against orthodoxy, viewing life from opposite viewpoints, sudden life turning points.',
    pythagoreanTradition: 'The Tetrad — stability, foundation, endurance, hard work, earthly manifestation, and logical order.',
    sources: [
      { title: 'Bṛhat Saṁhitā (Graha-Phala)', category: 'Category A' },
      { title: 'Cheiro’s Book of Numbers', category: 'Category D' }
    ]
  },
  5: {
    digit: 5,
    sanskritName: 'Pancha (पञ्च)',
    indicTitle: 'Budha — The Eloquent Intellect & Merchant Mind',
    graha: 'Budha (Mercury)',
    deity: 'Vishnu / Budha',
    archetype: 'The Versatile Communicator & Master Catalyst',
    gemstone: 'Emerald (Marakata)',
    favorableColors: ['Bright Emerald', 'Sage Green', 'Teal', 'Turquoise'],
    favorableDays: ['Wednesday'],
    friends: [1, 4, 5, 6],
    neutrals: [3, 8, 9],
    enemies: [2],
    indicTradition: 'Governs sharp analytical intellect (Buddhi), commercial adaptability, eloquent speech, and mathematical speed.',
    chaldeanTradition: 'Ever-active mental electricity, versatile resourcefulness, love of travel, resilience, and rapid recovery from setbacks.',
    pythagoreanTradition: 'The Pentad — freedom, exploration, curiosity, sensory awareness, adaptability, and progressive movement.',
    sources: [
      { title: 'Aryabhatiya Commentary', category: 'Category A' },
      { title: 'Traditional Ank Jyotish', category: 'Category C' }
    ]
  },
  6: {
    digit: 6,
    sanskritName: 'Shat (षट्)',
    indicTitle: 'Shukra — Harmonic Aesthetics & Cosmic Magnetism',
    graha: 'Shukra (Venus)',
    deity: 'Shukracharya / Lakshmi',
    archetype: 'The Harmonizer, Connoisseur & Healing Guardian',
    gemstone: 'Diamond (Heera) or White Zircon',
    favorableColors: ['Diamond White', 'Pastel Pink', 'Powder Blue', 'Rose'],
    favorableDays: ['Friday'],
    friends: [4, 5, 6, 7, 8],
    neutrals: [3, 9],
    enemies: [1, 2],
    indicTradition: 'Governs refined aesthetics, diplomacy, romantic magnetism, restorative medical knowledge, and gracious hospitality.',
    chaldeanTradition: 'Charismatic magnetism, intense love of harmony and artistic environments, loyalty to family, protective devotion.',
    pythagoreanTradition: 'The Hexad — balance, domestic responsibility, compassionate service, unconditional love, and structural symmetry.',
    sources: [
      { title: 'Bṛhat Saṁhitā', category: 'Category A' },
      { title: 'Cheiro’s Book of Numbers', category: 'Category D' }
    ]
  },
  7: {
    digit: 7,
    sanskritName: 'Sapta (सप्त)',
    indicTitle: 'Ketu — Mystical Depth & Philosophical Insight',
    graha: 'Ketu (South Lunar Node)',
    deity: 'Ganesha / Matsya',
    archetype: 'The Sage, Seeker of Secrets & Solitary Analyst',
    gemstone: 'Chrysoberyl Cat’s Eye (Vaidurya)',
    favorableColors: ['Sea Green', 'Off-White', 'Muted Gold', 'Earth Tones'],
    favorableDays: ['Monday', 'Thursday'],
    friends: [4, 6, 7, 8],
    neutrals: [3, 5],
    enemies: [1, 2, 9],
    indicTradition: 'Governs spiritual liberation (Moksha), detachment, esoteric mastery, deep meditative penetration, and research acumen.',
    chaldeanTradition: 'Philosophical, contemplative, gifted with vivid dreams and psychic perception; naturally drawn to occult arts.',
    pythagoreanTradition: 'The Heptad — the sacred bridge between matter and spirit, introspection, analytical skepticism, and wisdom.',
    sources: [
      { title: 'Sāṅkhyakārikā', category: 'Category A' },
      { title: 'Balliett Pythagorean Archives', category: 'Category D' }
    ]
  },
  8: {
    digit: 8,
    sanskritName: 'Ashta (अष्ट)',
    indicTitle: 'Shani — Lord of Karma, Discipline & Enduring Mastery',
    graha: 'Shani (Saturn)',
    deity: 'Shani Deva / Yama',
    archetype: 'The Stoic Realist, Karmic Judge & Empire Builder',
    gemstone: 'Blue Sapphire (Neelam)',
    favorableColors: ['Midnight Blue', 'Charcoal', 'Black', 'Deep Purple'],
    favorableDays: ['Saturday'],
    friends: [4, 5, 6, 7],
    neutrals: [3],
    enemies: [1, 2, 9],
    indicTradition: 'Governs karmic accountability, rigorous discipline, enduring resilience, patience through delays, and ultimate reward.',
    chaldeanTradition: 'Number of fate, profound duty, public trial followed by immense endurance; distinct double vibration of material/spiritual tension.',
    pythagoreanTradition: 'The Ogdoad — balance of scales, material manifestation, executive power, financial stewardship, and infinite loops.',
    sources: [
      { title: 'Bṛhat Saṁhitā (Shani-Charitam)', category: 'Category A' },
      { title: 'Cheiro’s Book of Numbers', category: 'Category D' }
    ]
  },
  9: {
    digit: 9,
    sanskritName: 'Nava (नव)',
    indicTitle: 'Mangal — Dynamic Courage & Universal Resolve',
    graha: 'Mangal (Mars)',
    deity: 'Kartikeya / Hanuman',
    archetype: 'The Noble Warrior, Champion of Causes & Visionary',
    gemstone: 'Red Coral (Pravala)',
    favorableColors: ['Scarlet Red', 'Crimson', 'Deep Coral', 'Vermillion'],
    favorableDays: ['Tuesday'],
    friends: [1, 2, 3],
    neutrals: [5, 8],
    enemies: [4, 6, 7],
    indicTradition: 'Governs warrior vitality (Tejas), defensive courage, brotherhood, engineering precision, and fierce protective righteousness.',
    chaldeanTradition: 'Indomitable stamina, heroic impulse, courage under crisis; not assigned to single alphabets in Chaldean as the sacred complete cycle.',
    pythagoreanTradition: 'The Ennead — completion, universal humanitarian love, wisdom encompassing all 1-8 prior numbers, and philanthropic release.',
    sources: [
      { title: 'Bṛhat Saṁhitā', category: 'Category A' },
      { title: 'Cheiro’s Book of Numbers', category: 'Category D' }
    ]
  }
};

export const COMPOUND_NUMBERS: Record<number, CompoundNumberData> = {
  10: {
    number: 10,
    root: 1,
    title: 'The Wheel of Fortune',
    archetype: 'Rise through Self-Creation',
    symbolism: 'A single pillar followed by the cosmic zero of potential. Represents cyclic elevation through personal rectitude.',
    positiveVibrations: ['Leadership', 'Revival after change', 'High honor', 'Clear purpose'],
    challenges: ['Complacency when on top of cycle', 'Over-pride'],
    careerTendencies: ['Corporate Leadership', 'Government', 'Entrepreneurship'],
    practicalGuidance: 'Your ideas will succeed if you maintain ethical discipline. You turn setbacks into launching pads.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers & Sepharial'
  },
  11: {
    number: 11,
    root: 2,
    title: 'The Clenched Hand / The Illuminated Messenger',
    archetype: 'Master Intuitive & Spiritual Channel',
    symbolism: 'Two pillars standing parallel. In modern numerology a Master Number; in ancient Chaldean, a warning of hidden trials and moral tests.',
    positiveVibrations: ['Visionary intuition', 'Electrifying inspiration', 'Moral idealism'],
    challenges: ['Nervous tension', 'Deception from unreliable associates', 'Extreme sensitivity'],
    careerTendencies: ['Spiritual Leadership', 'Philosophical Writing', 'Innovative Arts'],
    practicalGuidance: 'Trust your first intuitive flashes, but verify legal and financial details with steady advisors.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro & Balliett Pythagorean codifications'
  },
  12: {
    number: 12,
    root: 3,
    title: 'The Sacrifice / The Observer',
    archetype: 'Wisdom Gained Through Service',
    symbolism: 'The Sun (1) meets the Moon (2) yielding Jupiter (3). One who sacrifices personal comfort for group advancement.',
    positiveVibrations: ['Intellectual patience', 'Empathy for others', 'Artistic depth'],
    challenges: ['Feeling taken advantage of', 'Self-effacement', 'Hesitation'],
    careerTendencies: ['Diplomacy', 'Education', 'Social Reform', 'Medical Science'],
    practicalGuidance: 'Establish firm boundaries so your generous nature is not consumed by ungrateful endeavors.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers'
  },
  13: {
    number: 13,
    root: 4,
    title: 'Regeneration & Transmutation',
    archetype: 'The Phoenix of Structural Rebirth',
    symbolism: 'Not an omen of misfortune, but a symbol of power used to transmute old structures into revolutionary new forms.',
    positiveVibrations: ['Endurance under pressure', 'Architectural mastery', 'Radical reinvention'],
    challenges: ['Resistance to sudden changes', 'Misunderstood motives'],
    careerTendencies: ['Engineering', 'Crisis Management', 'Technological Pioneering'],
    practicalGuidance: 'Embrace transformation rather than resisting it; you possess unique strength to rebuild from foundations.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro & Classical Hermetic Tablets'
  },
  14: {
    number: 14,
    root: 5,
    title: 'Movement, Travel & Calculated Risk',
    archetype: 'The Dynamic Negotiator',
    symbolism: 'Combines the Sun (1) with Rahu (4) reducing to Mercury (5). Success through international commerce and adaptable tactics.',
    positiveVibrations: ['Resourcefulness', 'Magnetic persuasion', 'Commercial dexterity'],
    challenges: ['Restlessness', 'Impulsive financial speculation', 'Scattered energies'],
    careerTendencies: ['Global Trade', 'Media & Broadcasting', 'Aviation & Logistics'],
    practicalGuidance: 'Ground your ventures in solid contracts; avoid speculative gambles based on fleeting excitement.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers'
  },
  15: {
    number: 15,
    root: 6,
    title: 'The Magician & Charismatic Orator',
    archetype: 'The Hypnotic Harmonizer',
    symbolism: 'The Sun (1) and Mercury (5) fuse into Venus (6). Deeply magnetic, naturally endowed with charm and eloquence.',
    positiveVibrations: ['Artistic talent', 'Persuasive speaking', 'Financial generosity'],
    challenges: ['Vulnerability to flattery', 'Indulgence in sensory pleasures'],
    careerTendencies: ['Entertainment', 'Public Relations', 'Luxury Branding', 'Healing Arts'],
    practicalGuidance: 'Channel your charismatic charm toward noble, community-benefiting goals.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro & Sepharial'
  },
  19: {
    number: 19,
    root: 1,
    title: 'The Prince of Heaven',
    archetype: 'Triumphant Fulfillment & Victorious Light',
    symbolism: 'The Sun (1) joined with Mars (9) reducing to Sun (1). One of the most auspicious compounds in Chaldean lore.',
    positiveVibrations: ['Victorious honor', 'Universal esteem', 'Unshakable self-confidence'],
    challenges: ['Overbearing authority', 'Impatience with slow colleagues'],
    careerTendencies: ['Public Statesmanship', 'High Judicial Offices', 'Venture Leadership'],
    practicalGuidance: 'Lead with benevolence; your vision will find support from influential benefactors.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers'
  },
  23: {
    number: 23,
    root: 5,
    title: 'The Royal Star of the Lion',
    archetype: 'Success Through Royal Protection & Merit',
    symbolism: 'Moon (2) and Jupiter (3) combine into Mercury (5). A promise of success, high status, and protection from superiors.',
    positiveVibrations: ['Charismatic favor', 'Protection against hidden obstacles', 'Brilliant intellect'],
    challenges: ['Resting on past laurels', 'Over-reliance on patronage'],
    careerTendencies: ['High Tech & Innovation', 'International Diplomacy', 'Executive Publishing'],
    practicalGuidance: 'A fortunate name and vibration; use your social standing to uplift promising talent around you.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers'
  },
  24: {
    number: 24,
    root: 6,
    title: 'Love, Assistance & Generous Patronage',
    archetype: 'The Cherished Benefactor',
    symbolism: 'Moon (2) meets Rahu (4) harmonized into Venus (6). Gaining affectionate help from persons of elevated rank.',
    positiveVibrations: ['Warm domestic harmony', 'Support from elders and mentors', 'Financial security'],
    challenges: ['Difficulty refusing unhelpful requests', 'Passive reliance on others'],
    careerTendencies: ['Philanthropy', 'Hospitality', 'Creative Direction', 'Architecture'],
    practicalGuidance: 'Your success blossoms through reciprocal warmth and collaborative loyalty.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers'
  },
  27: {
    number: 27,
    root: 9,
    title: 'The Sceptre of Command',
    archetype: 'Strategic Intellect & Executive Courage',
    symbolism: 'Moon (2) and Ketu (7) culminate in Mars (9). Unyielding intellect, broad humanitarian vision, and strategic authority.',
    positiveVibrations: ['Analytical command', 'Original ideas that endure', 'Inspiring leadership'],
    challenges: ['Isolationism', 'Uncompromising bluntness in communication'],
    careerTendencies: ['Scientific Research', 'Defense Architecture', 'Literary Mastery'],
    practicalGuidance: 'Trust your independent assessments; you achieve greatest clarity when leading your own initiatives.',
    sourceCategory: 'Category D',
    primaryReference: 'Cheiro’s Book of Numbers'
  },
  33: {
    number: 33,
    root: 6,
    title: 'The Master Teacher & Avatar of Compassion',
    archetype: 'Universal Guardian & Enlightened Educator',
    symbolism: 'Double Jupiter (3-3) synthesizing into Venus (6). The highest expression of altruistic mentorship and healing mastery.',
    positiveVibrations: ['Selfless compassion', 'Inspiring millions', 'Artistic sublimity'],
    challenges: ['Bearing the emotional weight of communities', 'Burnout'],
    careerTendencies: ['World Education', 'Holistic Medicine', 'Cultural Reform'],
    practicalGuidance: 'Balance personal rejuvenation with global service; you anchor harmony wherever you tread.',
    sourceCategory: 'Category D',
    primaryReference: 'Modern Pythagorean & Esoteric Codification'
  }
};
