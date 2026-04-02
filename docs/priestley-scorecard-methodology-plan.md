---
# Priestley Scorecard Methodology Implementation Plan
**Created:** March 22, 2026  
**Status:** Planning  
**Reference:** Daniel Priestley's ScoreApp methodology
---
## Overview
This document outlines the implementation plan to align the Angular Modernization Assessment site with Daniel Priestley's ScoreApp methodology. The goal is to optimize the funnel for lead generation and conversion using proven scorecard marketing principles.
---
## Current State vs. Target State
### Current Flow (Problems Identified)
Homepage (/)
├── Hero (mixed messaging)
├── WhatYouDiscover section
├── HowItWorksLanding section
└── FinalCta
    ↓
/assessment page
├── Quiz (18 scored + 3 qualifying questions)
├── Email Gate (AFTER quiz, before results) ← WRONG PLACEMENT
├── Results (basic text + bar charts)
├── Services section (visible during quiz) ← DISTRACTION
├── Process section
├── ReadinessChecklist
├── Contact/FAQ sections
└── Footer
**Issues:**
1. Homepage not focused purely on conversion
2. Email collected AFTER quiz (loses leads who don't complete)
3. Only email collected, not name (can't personalize)
4. Results feel generic, not premium
5. Service sections visible during quiz (distracting)
### Target Flow (Priestley Method)
Homepage (/)
├── Hero (problem-focused, single CTA)
└── FinalCta (repeat CTA only)
    ↓
/assessment page
├── Email Gate (BEFORE quiz: First Name + Email)
├── Quiz (full-screen, distraction-free)
├── Results (personalized, premium feel)
│   └── "You're in the Tier stage, FirstName."
└── Post-Results Content (revealed after completion)
    ├── Services
    ├── Process
    ├── ReadinessChecklist
    └── FAQ
---
## Priestley ScoreApp Formula
### Landing Page Elements (9 Key Components)
Based on ScoreApp's documentation and live examples:
1. **Main Headline** - Problem-focused, power words (Discover, Uncover, Free)
2. **Sub-Heading** - Must include: time commitment, free, one key benefit
3. **3 Bullet Points** - Formula:
   - What they do (number of questions)
   - What they're scored against (categories)
   - What they leave with (deliverable)
4. **CTA Button** - Action-driven ("Get your score", not "Click here")
5. **Hero Image** - Optional for your case
6. **Testimonials** - Skip (you have none yet)
7. **Bonuses** - Skip (not applicable)
8. **Bio/About** - Skip for homepage (keep assessment focused)
9. **Credibility Logos** - Skip (you have none yet)
### Email Gate (BEFORE Quiz)
ScoreApp flow observed:
- Modal/overlay appears after clicking CTA
- Fields: **First Name (required) + Email (required)**
- Simple "Start" button
- Privacy Policy link
- Framing: "Enter your details to start the scorecard"
### Quiz Experience
- Full-screen, distraction-free
- One question at a time
- Large answer buttons (click to advance immediately)
- Progress bar at bottom (percentage complete)
- "Previous Question" back option
- No other page content visible during quiz
### Results Page
- Personalized headline with user's name
- Tier visual indicator (3 states highlighted)
- Large percentage/score display
- Category breakdown with visual gauges
- Written diagnosis specific to tier
- Clear CTA based on tier
---
## Implementation Phases
### Phase 1: Homepage Redesign (Pure Conversion)
**Goal:** Single purpose - get visitors to start the assessment
#### File: `src/pages/index.astro`
**Current:**
```astro
<Layout>
  <Navigation page="landing" />
  <main id="main-content">
    <LandingHero />
    <WhatYouDiscover />      <!-- REMOVE -->
    <HowItWorksLanding />    <!-- REMOVE -->
    <FinalCta />
  </main>
  <Footer />
  <StickyCta />
</Layout>
Target:
<Layout>
  <Navigation page="landing" />
  <main id="main-content">
    <LandingHero />          <!-- Redesigned -->
    <FinalCta />             <!-- Simplified -->
  </main>
  <Footer />
  <StickyCta />
</Layout>
File: src/components/LandingHero.astro
Current Copy:
- Headline: "Your Angular App Is Slowing Your Team Down."
- Sub: "Find out exactly why. Take a 3-minute diagnostic..."
- CTA: "Start Free Assessment"
Target Copy (ScoreApp Formula):
Eyebrow: Angular Modernization Assessment
Headline: Your Angular App Is Slowing Your Team Down.
(Keep - it's problem-focused and strong)
Sub-heading: In under 3 minutes, discover your free Angular 
Modernization Score — showing exactly where you're stuck 
and what to do next.
3 Bullets:
• Answer 18 quick questions about your Angular setup and team
• Get scored across 3 critical areas: Audit Readiness, Upgrade Path, 
  and Code Modernization  
• Receive a personalized report with your score, gaps, and 
  recommended next step
CTA: Get My Readiness Score →
Trust text: Free. Takes under 3 minutes. No spam.
Visual Changes:
- Remove right-side preview card (simplify to single-column hero)
- Or: Keep preview card but make it cleaner
File: src/components/FinalCta.astro
Simplify to just repeat the main CTA - no additional content.
---
Phase 2: Assessment Page Restructure
Goal: Email gate first, distraction-free quiz, post-results content reveal
File: src/pages/assessment.astro
Current:
<main id="main-content">
  <Scorecard />
  <Services />
  <Process />
  <ReadinessChecklist />
  <Contact />
  <FAQ />
</main>
Target:
<main id="main-content">
  <Scorecard />
</main>
<!-- Hidden until results shown -->
<div id="post-results-content" class="hidden">
  <Services />
  <Process />
  <ReadinessChecklist id="readiness-checklist" />
  <FAQ />
</div>
<script>
  // Reveal post-results content when quiz completes
  document.addEventListener('scorecard:complete', () => {
    document.getElementById('post-results-content')?.classList.remove('hidden');
  });
</script>
---
Phase 3: Scorecard Component Refactor
Goal: Add pre-quiz email gate, remove post-quiz email gate, enhance results
File: src/components/Scorecard.astro
New Panel Structure
Current Panels:
1. scorecard-quiz - Quiz questions
2. scorecard-email - Email gate AFTER quiz
3. scorecard-result - Results
Target Panels:
1. scorecard-start - NEW Email gate BEFORE quiz
2. scorecard-quiz - Quiz questions (UX improvements)
3. scorecard-email - REMOVE
4. scorecard-result - Enhanced results with personalization
New Email Gate Panel (scorecard-start)
<div id="scorecard-start" class="scorecard-panel">
  <div class="start-content">
    <p class="section-eyebrow">Free Assessment</p>
    <h2 class="section-heading">Get Your Angular Modernization Score</h2>
    <p class="section-subheading">
      Answer 18 questions. Get your personalized readiness score, 
      category breakdown, and recommended next step.
    </p>
    
    <form id="scorecard-start-form" class="start-form">
      <div class="form-field">
        <label for="start-firstName">First name</label>
        <input 
          type="text" 
          id="start-firstName" 
          name="firstName" 
          required 
          autocomplete="given-name"
          placeholder="Your first name"
        />
      </div>
      <div class="form-field">
        <label for="start-email">Work email</label>
        <input 
          type="email" 
          id="start-email" 
          name="email" 
          required 
          autocomplete="email"
          placeholder="you@company.com"
        />
      </div>
      <button type="submit" class="btn-primary">
        Start Assessment →
      </button>
    </form>
    
    <p class="trust-text">Free. No spam. Unsubscribe anytime.</p>
  </div>
</div>
State Management Updates
interface ScorecardState {
  // NEW - Captured before quiz
  firstName: string;
  email: string;
  
  // Existing
  started: boolean;
  currentIndex: number;
  answers: (number | null)[];
  qualifyingAnswers: (string | null)[];
  completed: boolean;
  result: ScorecardResult | null;
}
const initialState: ScorecardState = {
  firstName: '',
  email: '',
  started: false,
  currentIndex: 0,
  answers: Array(18).fill(null),
  qualifyingAnswers: Array(3).fill(null),
  completed: false,
  result: null
};
Flow Logic Updates
// On page load
function initScorecard() {
  loadState();
  
  if (!state.firstName || !state.email) {
    showPanel('scorecard-start');
  } else if (!state.completed) {
    showPanel('scorecard-quiz');
    renderQuestion(state.currentIndex);
  } else {
    showPanel('scorecard-result');
    renderResult();
  }
}
// On start form submit
function handleStartSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  
  state.firstName = formData.get('firstName') as string;
  state.email = formData.get('email') as string;
  state.started = true;
  
  saveState();
  
  showPanel('scorecard-quiz');
  renderQuestion(0);
  
  // Track event
  dispatchEvent(new CustomEvent('lp:quiz_started'));
}
// On quiz complete (after question 21)
function handleQuizComplete() {
  const result = computeFullResult(state.answers);
  state.result = result;
  state.completed = true;
  saveState();
  
  // Submit form data in background
  submitFormData();
  
  // Show results immediately (no email gate)
  showPanel('scorecard-result');
  renderResult();
  
  // Reveal post-results content
  document.dispatchEvent(new CustomEvent('scorecard:complete'));
}
Quiz UX Improvements
1. Progress bar at bottom (not top)
2. Larger answer buttons (full-width cards, not radio buttons)
3. Click to advance (remove "Continue" button for scored questions)
4. Add "← Previous Question" back link
5. Hide all other page content during quiz
<!-- Quiz panel structure -->
<div id="scorecard-quiz" class="scorecard-panel hidden">
  <div class="quiz-container">
    <!-- Question content -->
    <div id="quiz-question" class="quiz-question">
      <p class="question-category">Audit Readiness</p>
      <h3 class="question-prompt">Question text here</h3>
      
      <div class="answer-options">
        <!-- Large clickable buttons -->
        <button class="answer-btn" data-points="5">Yes, quite a few</button>
        <button class="answer-btn" data-points="3">A handful</button>
        <button class="answer-btn" data-points="1">Not really</button>
      </div>
    </div>
    
    <!-- Navigation -->
    <div class="quiz-nav">
      <button id="quiz-back" class="quiz-back-btn">
        ← Previous Question
      </button>
    </div>
    
    <!-- Progress bar at bottom -->
    <div class="quiz-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 15%"></div>
      </div>
      <p class="progress-text">15% Complete</p>
    </div>
  </div>
</div>
---
Phase 4: Results Experience Upgrade
Goal: Premium, personalized report feel
Results Panel Structure
<div id="scorecard-result" class="scorecard-panel hidden">
  <!-- Personalized Header -->
  <div class="result-header">
    <p class="result-eyebrow">Your Results</p>
    <h2 class="result-headline">
      You're in the <span class="tier-name">Progressing</span> stage, 
      <span class="user-name">Sarah</span>.
    </h2>
  </div>
  
  <!-- Tier Visual Indicator -->
  <div class="tier-indicator">
    <div class="tier-option" data-tier="foundational">
      <span class="tier-label">Foundational</span>
    </div>
    <div class="tier-option active" data-tier="progressing">
      <span class="tier-label">Progressing</span>
      <span class="tier-marker">★ YOU</span>
    </div>
    <div class="tier-option" data-tier="scale-ready">
      <span class="tier-label">Scale-Ready</span>
    </div>
  </div>
  
  <!-- Large Score Display -->
  <div class="score-display">
    <p class="score-label">Your Readiness Score</p>
    <div class="score-number">
      <span class="score-value">47</span>
      <span class="score-max">out of 75</span>
    </div>
  </div>
  
  <!-- Category Breakdown -->
  <div class="category-breakdown">
    <h3>Score by Category</h3>
    <div class="category-cards">
      <div class="category-card" data-status="moderate">
        <div class="category-icon">🔍</div>
        <h4>Audit Readiness</h4>
        <div class="category-score">
          <span class="score">17</span>/25
        </div>
        <div class="category-bar">
          <div class="bar-fill" style="width: 68%"></div>
        </div>
        <span class="status-badge moderate">Moderate</span>
      </div>
      <!-- Repeat for other categories -->
    </div>
  </div>
  
  <!-- Diagnosis -->
  <div class="result-diagnosis">
    <h3>Your Diagnosis</h3>
    <p class="diagnosis-text">
      You are in the progressing stage. Audit Readiness is your main 
      constraint. A fixed-scope clarity sprint will help you define 
      scope, priorities, and risk before implementation.
    </p>
  </div>
  
  <!-- Tier-Specific CTA -->
  <div class="result-cta">
    <!-- For Foundational -->
    <div class="cta-foundational hidden">
      <p>Your next step: Remove blockers before investing in implementation.</p>
      <a href="#readiness-checklist" class="btn-secondary">
        View Your Prep Checklist →
      </a>
    </div>
    
    <!-- For Progressing/Scale-Ready -->
    <div class="cta-sprint">
      <div class="offer-card">
        <span class="offer-badge">3 founding spots remaining</span>
        <h4>Founding Client Clarity Sprint</h4>
        <p class="offer-price">$500 fixed</p>
        <p class="offer-duration">5 business days</p>
        <ul class="offer-deliverables">
          <li>Current-state architecture diagnosis</li>
          <li>Prioritized modernization roadmap</li>
          <li>Scope options with effort ranges</li>
          <li>Clear go/no-go recommendation</li>
        </ul>
        <p class="offer-guarantee">
          If you don't get a clear actionable roadmap, you don't pay.
        </p>
        <button class="btn-primary calendly-trigger">
          Book Your Clarity Sprint →
        </button>
      </div>
    </div>
  </div>
</div>
---

Phase 5: Styling Updates
File: src/styles/global.css
Add new styles for:
1. Start Panel (Email Gate)
.start-form {
  max-width: 400px;
  margin: 2rem auto;
}
.form-field {
  margin-bottom: 1rem;
}
.form-field label {
  display: block;
  font-size: 0.875rem;
  color: var(--gray-300);
  margin-bottom: 0.5rem;
}
.form-field input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--color-gray-700);
  border-radius: 0.5rem;
  background: var(--color-dark);
  color: white;
  font-size: 1rem;
}
.form-field input:focus {
  outline: none;
  border-color: var(--color-accent);
}
.trust-text {
  font-size: 0.8rem;
  color: var(--gray-400);
  margin-top: 1rem;
  text-align: center;
}
2. Quiz Answer Buttons
.answer-btn {
  display: block;
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--color-gray-700);
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.65);
  color: white;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.answer-btn:hover {
  border-color: var(--color-accent);
  background: rgba(221, 0, 49, 0.1);
}
.answer-btn.selected {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.14);
}
3. Tier Indicator
.tier-indicator {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}
.tier-option {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-gray-700);
  border-radius: 0.5rem;
  text-align: center;
  opacity: 0.5;
  transition: all 0.3s;
}
.tier-option.active {
  opacity: 1;
  border-color: var(--color-accent);
  background: rgba(221, 0, 49, 0.1);
}
.tier-label {
  display: block;
  font-size: 0.875rem;
  color: white;
}
.tier-marker {
  display: block;
  font-size: 0.75rem;
  color: var(--color-accent);
  margin-top: 0.25rem;
}
4. Score Display
.score-display {
  text-align: center;
  padding: 2rem;
}
.score-label {
  font-size: 0.875rem;
  color: var(--gray-400);
  margin-bottom: 0.5rem;
}
.score-number {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}
.score-value {
  font-size: 4rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}
.score-max {
  font-size: 1.25rem;
  color: var(--gray-400);
}
5. Category Cards
.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.category-card {
  padding: 1.5rem;
  border: 1px solid var(--color-gray-700);
  border-radius: 1rem;
  background: rgba(15, 23, 42, 0.65);
}
.category-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.category-bar {
  height: 8px;
  background: var(--color-gray-800);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.75rem 0;
}
.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease-out;
}
.bar-fill.strong { background: #22c55e; }
.bar-fill.moderate { background: #eab308; }
.bar-fill.needs-attention { background: #ef4444; }
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}
.status-badge.strong { 
  background: rgba(34, 197, 94, 0.2); 
  color: #22c55e; 
}
.status-badge.moderate { 
  background: rgba(234, 179, 8, 0.2); 
  color: #eab308; 
}
.status-badge.needs-attention { 
  background: rgba(239, 68, 68, 0.2); 
  color: #ef4444; 
}
6. Offer Card
.offer-card {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid var(--color-accent-dim);
  border-radius: 1rem;
  background: rgba(221, 0, 49, 0.05);
  text-align: center;
}
.offer-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 1rem;
  margin-bottom: 1rem;
}
.offer-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}
.offer-duration {
  font-size: 0.875rem;
  color: var(--gray-400);
}
.offer-deliverables {
  text-align: left;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}
.offer-deliverables li {
  margin-bottom: 0.5rem;
  color: var(--gray-300);
}
.offer-guarantee {
  font-size: 0.8rem;
  color: var(--gray-400);
  margin-bottom: 1.5rem;
}
---
File Changes Summary
File
src/pages/index.astro
src/components/LandingHero.astro
src/components/WhatYouDiscover.astro
src/components/HowItWorksLanding.astro
src/components/FinalCta.astro
src/pages/assessment.astro
src/components/Scorecard.astro
src/styles/global.css
src/data/scorecard.ts
---
## Testing Checklist
### Flow Testing
- [ ] Homepage CTA navigates to /assessment
- [ ] Email gate appears first on /assessment
- [ ] Form validation works (required fields)
- [ ] Quiz starts after email submission
- [ ] Progress bar updates correctly
- [ ] Previous question navigation works
- [ ] Results appear immediately after last question
- [ ] Results show user's first name
- [ ] Tier indicator highlights correct tier
- [ ] Category scores display correctly
- [ ] CTA matches user's tier
- [ ] Post-results content reveals after completion
- [ ] Form data submits successfully
- [ ] LocalStorage persistence works (page refresh)
- [ ] Restart flow works correctly
### Visual Testing
- [ ] Mobile responsive (375px)
- [ ] Tablet responsive (768px)
- [ ] Desktop (1280px+)
- [ ] Answer buttons large enough for touch
- [ ] Progress bar visible on all devices
- [ ] Results page looks premium
- [ ] Animations smooth (prefers-reduced-motion respected)
### Accessibility Testing
- [ ] Form labels connected to inputs
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Screen reader announces question changes
- [ ] Color contrast sufficient
---
Key Corrections from Current Implementation
Before
Email collected after quiz
Email only
"Unlock your result" framing
Services visible during quiz
Generic results
Results gated behind email
Same CTA for all tiers
---
## References
- ScoreApp Landing Page Tips: https://www.scoreapp.com/quiz-landing-page-tips/
- ScoreApp How It Works: https://www.scoreapp.com/how-it-works/
- ScoreApp Lead Form Placement: https://www.scoreapp.com/quiz-leads-form/
- Example: LAPS Scorecard: https://laps.scoreapp.com/
- Example: Quiz Marketing Readiness: https://quizmarketing.scoreapp.com/
---
Notes
- No testimonials yet: Skip social proof sections until you have client results
- No credibility logos yet: Skip "as seen in" sections
- Founding client positioning: Keep the urgency ("3 spots") but ensure it's genuine
- PDF report option: Future enhancement - could email PDF summary
- Analytics events: Maintain existing event dispatching for tracking
---
Revision History
Date
2026-03-22
---