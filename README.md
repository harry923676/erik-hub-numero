# ERIK-HUB Numero (अङ्कवेद) — Numerology Intelligence Platform

> **Lead Architect & Developer**: **Pawan Paji**  
> *Systems Architect, Sanskrit & Indic Knowledge Researcher, and Full-Stack Engineer*

---

## 📜 Architectural Overview & Vision

**ERIK-HUB Numero** (formerly Ankaveda) is a source-aware, multi-tradition, AI-powered numerology intelligence platform designed and developed by **Pawan Paji**. Unlike conventional horoscope websites that output arbitrary predictions without methodological grounding, ERIK-HUB Numero bridges **ancient Sanskrit computational traditions (Katapayadi, Sāṅkhya, Jyotiṣa)** and **classical Western/Babylonian systems (Chaldean, Pythagorean)** with modern, transparent mathematical reductions, Ba Zhai Lo Shu Kua compass intelligence, and non-deterministic AI intelligence.

Every calculation is displayed with its mathematical derivation, and every interpretation is tagged with its authentic source taxonomy category.

---

## 🚀 GitHub Repository Setup & Push Guide

To push this project to your GitHub account:

```bash
# 1. Initialize git repository
git init -b main

# 2. Add all project files
git add .

# 3. Commit the baseline code
git commit -m "feat: Initial release of ERIK-HUB Numero platform"

# 4. Create repository on GitHub via GitHub CLI:
gh repo create erik-hub-numero --public --source=. --remote=origin --push

# OR via standard remote URL (replace YOUR_USERNAME with your GitHub handle):
# git remote add origin https://github.com/YOUR_USERNAME/erik-hub-numero.git
# git push -u origin main
```

---

## 🌐 Deploying to Vercel

This repository includes a ready-to-deploy `vercel.json` configuration and a serverless API function in `/api/ai/chat.ts`.

### Option A: Via GitHub (Recommended)
1. Push this repository to your GitHub account using the commands above.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **"Import Project"** and select your `erik-hub-numero` repository.
4. Set the Environment Variables:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API Key)*
5. Click **"Deploy"**. Vercel will build Vite and deploy the applet.

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from your workspace
vercel --prod
```

### Adding the Live URL to your GitHub Repository
Once your Vercel deployment completes, add the live production URL into your GitHub repository page:
1. In your GitHub repository, click the **⚙️ (Settings cog)** next to **"About"** on the right side of the main repository page.
2. Check the **"Website"** box and paste your live Vercel URL (e.g. `https://erik-hub-numero.vercel.app`).
3. Click **"Save changes"**.

---

## 👨‍💻 Key Contributions of Developer Pawan Paji

1. **Multi-System Calculation Architecture**:
   - Engineered independent, interoperable calculation modules for **Chaldean**, **Pythagorean**, **Indian Aṅka Jyotiṣa**, and Sanskrit **Katapayadi** phonemic mapping.
   - Designed mathematical step-by-step reduction traces showing the exact addition pipeline for birth dates and compound names.

2. **Source-First Knowledge Authenticity Engine**:
   - Codified the **5-Tier Source Hierarchy (Categories A to E)**:
     - **Category A**: Classical Sanskrit/Indic Treatises (*Bṛhat Saṁhitā*, *Aryabhatiya*, *Sāṅkhyakārikā*).
     - **Category B**: Peer-Reviewed Academic & Indological Publications (Oxford, Brill, Motilal Banarsidass).
     - **Category C**: Living Indian Aṅka Jyotiṣa Practitioner Lineages.
     - **Category D**: Modern 19th–20th Century Codifications (Cheiro, Sepharial, Balliett).
     - **Category E**: AI-Assisted Interpretations based strictly on retrieved knowledge graph constraints.

3. **Name Optimization Lab & Harmonic Comparator**:
   - Built the interactive sandbox allowing users to experiment with alternate spellings, vowel modifications, and phonetic additions, assessing cross-system impacts before and after modification.

4. **Indic Script & Transliteration Pipeline**:
   - Implemented multi-script recognition and phonetic analysis supporting Devanagari, Telugu, Tamil, Gurmukhi, and IAST romanization.

5. **AI Numerology Assistant (Google Gemini 3.8 Flash)**:
   - Built a server-side proxy ensuring zero browser exposure of secrets, with strict prompt constraints that ban fatalistic/deterministic claims and enforce source attribution.

6. **End-to-End Responsive Full-Stack Platform**:
   - Express + Vite middleware backend with React, TypeScript, Tailwind CSS, and Lucide icons, styled in an ancient-manuscript-meets-modern-minimalist aesthetic.

---

## 🏛️ Calculation Systems Codified

| System | Letter Mapping | Primary Focus | Key Source Reference |
| :--- | :--- | :--- | :--- |
| **Chaldean** | Sound values 1 to 8 (9 sacred) | Compound vibrations 10–52 & root vibration | Cheiro's Book of Numbers (1926) |
| **Pythagorean** | 1 to 9 sequentially (A=1... I=9) | Life Path, Expression, Soul Urge, Personality | L. Dow Balliett (1908) |
| **Indian Aṅka Jyotiṣa** | Date-based (Mūlāṅka, Bhāgyāṅka) | Graha (Planetary) alignments, Mitra/Shatru | Bṛhat Saṁhitā & Parāśara traditions |
| **Katapayadi System** | Sanskrit consonants to digits 0–9 | Classical encryption & mnemonic chronograms | Aryabhatiya & Sadratnamala |

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend / API**: Node.js, Express, tsx, esbuild
- **AI Engine**: `@google/genai` with `gemini-3.8-flash`
- **Architecture**: Modular, source-aware, fully responsive, zero-slop UI
