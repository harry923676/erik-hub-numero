/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ANKAVEDA — Business & Brand Numerology Intelligence
 * Researched by Pawan Paji
 */

export interface IndustryVibration {
  rootNumber: number;
  archetype: string;
  recommendedIndustries: string[];
  brandingTone: string;
  idealFor: string;
  favorableDays: string[];
}

export const INDUSTRY_VIBRATIONS: Record<number, IndustryVibration> = {
  1: {
    rootNumber: 1,
    archetype: 'The Pioneer & Market Leader',
    recommendedIndustries: ['Executive Consulting', 'Venture Capital', 'High-Tech Hardware', 'Aerospace', 'Luxury Goods'],
    brandingTone: 'Authoritative, pristine, visionary, commanding',
    idealFor: 'Market leaders, flagship parent brands, high-stakes innovations',
    favorableDays: ['Sunday']
  },
  2: {
    rootNumber: 2,
    archetype: 'The Cooperative & Empathetic Platform',
    recommendedIndustries: ['Mediation & Legal Arbitration', 'Hospitality & Boutique Hotels', 'Mental Health & Wellness', 'Childcare'],
    brandingTone: 'Warm, welcoming, calming, attentive',
    idealFor: 'Partnership platforms, community networks, organic food brands',
    favorableDays: ['Monday']
  },
  3: {
    rootNumber: 3,
    archetype: 'The Expressive Innovator & Creative Powerhouse',
    recommendedIndustries: ['Media & Entertainment', 'Advertising Agencies', 'Education & EdTech', 'Publishing Houses', 'Culinary Arts'],
    brandingTone: 'Dynamic, colorful, witty, expansive, optimistic',
    idealFor: 'Creative studios, public communication platforms, academy brands',
    favorableDays: ['Thursday']
  },
  4: {
    rootNumber: 4,
    archetype: 'The Structural Pillar & Engineering Master',
    recommendedIndustries: ['Civil Construction', 'Cybersecurity', 'Financial Auditing', 'Industrial Manufacturing', 'Logistics Warehousing'],
    brandingTone: 'Solid, reliable, disciplined, uncompromisingly secure',
    idealFor: 'Infrastructure companies, security software, heavy engineering',
    favorableDays: ['Sunday', 'Saturday']
  },
  5: {
    rootNumber: 5,
    archetype: 'The Global Catalyst & High-Speed Connector',
    recommendedIndustries: ['E-Commerce', 'Fintech', 'Travel & Tourism', 'Telecommunications', 'Social Networking Apps'],
    brandingTone: 'Fast, versatile, modern, adventurous, hyper-connected',
    idealFor: 'Fast-growth startups, trading networks, mobility apps',
    favorableDays: ['Wednesday']
  },
  6: {
    rootNumber: 6,
    archetype: 'The Harmonic Connoisseur & Luxury Healer',
    recommendedIndustries: ['Cosmetics & Skincare', 'Interior Design & Architecture', 'Fashion Houses', 'Healthcare & Clinics', 'Home Goods'],
    brandingTone: 'Refined, elegant, caring, sensory, timeless',
    idealFor: 'Beauty brands, wellness spas, boutique architectural practices',
    favorableDays: ['Friday']
  },
  7: {
    rootNumber: 7,
    archetype: 'The Research Institute & Deep Tech Specialist',
    recommendedIndustries: ['Artificial Intelligence & R&D', 'Pharmaceutical Research', 'Scientific Instrumentation', 'Specialized Academies'],
    brandingTone: 'Intellectual, mysterious, analytical, elite, research-driven',
    idealFor: 'AI research labs, analytics platforms, specialized consultancies',
    favorableDays: ['Monday', 'Thursday']
  },
  8: {
    rootNumber: 8,
    archetype: 'The Corporate Titan & Financial Empire',
    recommendedIndustries: ['Commercial Banking', 'Real Estate Development', 'Heavy Mining & Energy', 'Asset Management', 'Legal Powerhouses'],
    brandingTone: 'Monumental, prestigious, enduring, pragmatic, results-focused',
    idealFor: 'Investment banks, multinational holding entities, industrial conglomerates',
    favorableDays: ['Saturday']
  },
  9: {
    rootNumber: 9,
    archetype: 'The Global Humanitarian & Visionary Movement',
    recommendedIndustries: ['Global Non-Profits', 'Environmental Technology', 'Public Health Initiatives', 'International Cultural Centers'],
    brandingTone: 'Inspirational, noble, passionate, selfless, universally resonant',
    idealFor: 'Impact funds, sustainability brands, cultural heritage foundations',
    favorableDays: ['Tuesday']
  }
};
