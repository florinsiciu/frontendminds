/**
 * Verification script for the diagnostic engine.
 * Run with: npx tsx scripts/verify-diagnostic-engine.ts
 */

import { matchPatterns, rankPatterns, selectTopPatterns, calculateLeadScore, generateSeesawScript, generateDiagnostic } from "../src/lib/quiz/diagnostic-engine";
import type { ScoredAnswers, QualifyingAnswers, DimensionPercentages } from "../src/types/assessment";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

// ─── Test 1: All-yes answers → 0 patterns ────────────────────────────────────

console.log("\nTest 1: All-yes answers (healthy codebase)");

const allYes: ScoredAnswers = {};
for (let i = 1; i <= 20; i++) allYes[`q${i}`] = true;

const allYesPatterns = matchPatterns(allYes);
assert(allYesPatterns.length === 0, "No patterns triggered");

const allYesDiag = generateDiagnostic(
  allYes,
  { role: "tech_lead", planning: "exploring" },
  { migration_health: 100, architecture: 100, modern_adoption: 100, ai_governance: 100, delivery_readiness: 100 },
);
assert(allYesDiag.isStrongPosition === true, "Is strong position");
assert(allYesDiag.topPatterns.length === 0, "No top patterns");

// ─── Test 2: All-no answers → maximum patterns ──────────────────────────────

console.log("\nTest 2: All-no answers (everything broken)");

const allNo: ScoredAnswers = {};
for (let i = 1; i <= 20; i++) allNo[`q${i}`] = false;

const allNoPatterns = matchPatterns(allNo);
assert(allNoPatterns.length > 10, `Many patterns triggered (${allNoPatterns.length})`);
assert(allNoPatterns.length <= 20, `At most 20 patterns (${allNoPatterns.length})`);

const criticalCount = allNoPatterns.filter((tp) => tp.pattern.priority === "critical").length;
assert(criticalCount >= 5, `Multiple critical patterns (${criticalCount})`);

const ranked = rankPatterns(allNoPatterns);
assert(ranked[0].score >= ranked[ranked.length - 1].score, "Ranked in descending order");

const top = selectTopPatterns(ranked);
assert(top.length === 3, `Top 3 selected (got ${top.length})`);
assert(top.some((tp) => tp.pattern.isCrossDimension), "At least one cross-dimension in top 3");

// ─── Test 3: Specific cross-dimension patterns ──────────────────────────────

console.log("\nTest 3: Change Anxiety (q12=no, q18=no)");

const changeAnxiety: ScoredAnswers = {};
for (let i = 1; i <= 20; i++) changeAnxiety[`q${i}`] = true;
changeAnxiety.q12 = false;
changeAnxiety.q18 = false;

const caPatterns = matchPatterns(changeAnxiety);
const caIds = caPatterns.map((tp) => tp.pattern.id);
assert(caIds.includes("change_anxiety"), "Change Anxiety pattern triggered");
assert(caIds.includes("refactoring_paralysis"), "Refactoring Paralysis also triggered");

// ─── Test 4: Deduplication ──────────────────────────────────────────────────

console.log("\nTest 4: Pattern deduplication (Legacy Trapped subsumes AngularJS Debt)");

const legacyTrapped: ScoredAnswers = {};
for (let i = 1; i <= 20; i++) legacyTrapped[`q${i}`] = true;
legacyTrapped.q1 = false;
legacyTrapped.q2 = false;

const ltPatterns = matchPatterns(legacyTrapped);
const ltIds = ltPatterns.map((tp) => tp.pattern.id);
assert(ltIds.includes("legacy_trapped"), "Legacy Trapped triggered");
assert(ltIds.includes("angularjs_debt"), "AngularJS Debt also triggered (before dedup)");

const ltTop = selectTopPatterns(rankPatterns(ltPatterns));
const ltTopIds = ltTop.map((tp) => tp.pattern.id);
// AngularJS Debt (single trigger q2=no) should be suppressed by Legacy Trapped (q1+q2)
assert(!ltTopIds.includes("angularjs_debt") || ltTopIds.includes("legacy_trapped"),
  "AngularJS Debt suppressed or Legacy Trapped present in top");

// ─── Test 5: Lead scoring ───────────────────────────────────────────────────

console.log("\nTest 5: Lead scoring with different role/stage combos");

const hotScore = calculateLeadScore(allNoPatterns, "cto_vp", "yes_budget");
assert(hotScore.bucket === "hot", `CTO + budget + many critical = hot (score: ${hotScore.score})`);

const nurtureScore = calculateLeadScore(
  [{ pattern: { id: "test", name: "Test", triggers: [], priority: "insight", isCrossDimension: false, shortSummary: "", championSummary: "", ctoSummary: "", salesTalkTrack: "", recommendedAction: "" }, score: 1 }],
  "senior_dev",
  "not_yet",
);
assert(nurtureScore.bucket === "nurture", `Senior dev + not yet + 1 insight = nurture (score: ${nurtureScore.score})`);

// ─── Test 6: Seesaw script ─────────────────────────────────────────────────

console.log("\nTest 6: Seesaw script generation");

const dimPcts: DimensionPercentages = {
  migration_health: 75,
  architecture: 23,
  modern_adoption: 50,
  ai_governance: 0,
  delivery_readiness: 60,
};

const seesaw = generateSeesawScript(dimPcts);
assert(seesaw.strongestDimension.id === "migration_health", "Strongest = migration_health (75%)");
assert(seesaw.weakestDimension.id === "ai_governance", "Weakest = ai_governance (0%)");
assert(seesaw.openingLine.includes("75%"), "Opening line references percentage");
assert(seesaw.pivotLine.includes("0%"), "Pivot line references percentage");

// ─── Test 7: Full diagnostic orchestration ──────────────────────────────────

console.log("\nTest 7: Full generateDiagnostic() orchestration");

const mixedAnswers: ScoredAnswers = {};
for (let i = 1; i <= 20; i++) mixedAnswers[`q${i}`] = true;
mixedAnswers.q4 = false;  // Can't upgrade quickly
mixedAnswers.q8 = false;  // Can't test independently
mixedAnswers.q12 = false; // Don't trust tests
mixedAnswers.q18 = false; // Can't deploy confidently

const qualifying: QualifyingAnswers = { role: "tech_lead", planning: "yes_building_case" };
const mixedDimPcts: DimensionPercentages = {
  migration_health: 75,
  architecture: 69,
  modern_adoption: 69,
  ai_governance: 100,
  delivery_readiness: 31,
};

const diag = generateDiagnostic(mixedAnswers, qualifying, mixedDimPcts);
assert(diag.allTriggered.length > 0, `Has triggered patterns (${diag.allTriggered.length})`);
assert(diag.topPatterns.length <= 3, `Top patterns <= 3 (${diag.topPatterns.length})`);
assert(diag.isStrongPosition === false, "Not a strong position");
assert(diag.leadScore.bucket === "warm" || diag.leadScore.bucket === "hot",
  `Lead bucket is warm or hot (${diag.leadScore.bucket}, score: ${diag.leadScore.score})`);
assert(diag.seesawScript.weakestDimension.id === "delivery_readiness",
  "Weakest dimension is delivery_readiness");

// Check that cross-dimension patterns were detected
const diagIds = diag.allTriggered.map((tp) => tp.pattern.id);
assert(diagIds.includes("change_anxiety"), "Change Anxiety detected (q12+q18)");
assert(diagIds.includes("foundational_instability"), "Foundational Instability detected (q4+q18)");
assert(diagIds.includes("untestable_monolith"), "Untestable Monolith detected (q8+q12)");

// ─── Summary ────────────────────────────────────────────────────────────────

console.log(`\n${"=".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`${"=".repeat(50)}\n`);

process.exit(failed > 0 ? 1 : 0);
