-- Migrate scoring from raw counts (0–20 / 0–4) to weighted percentages (0–100)
-- Part of the Priestley scorecard methodology alignment

-- 1. Rename columns
alter table assessments rename column total_score to total_percentage;
alter table assessments rename column dimension_scores to dimension_percentages;

-- 2. Drop old constraint and add percentage constraint (0–100)
alter table assessments drop constraint assessments_total_score_check;
alter table assessments add constraint assessments_total_percentage_check
  check (total_percentage between 0 and 100);

-- 3. Convert existing data: old values were 0–20, new values are 0–100
--    Multiply by 5 to approximate (20 * 5 = 100)
update assessments
set total_percentage = total_percentage * 5
where total_percentage <= 20;

-- 4. Convert dimension_percentages: old values were 0–4 per dimension
--    Multiply each value by 25 to approximate (4 * 25 = 100)
update assessments
set dimension_percentages = jsonb_build_object(
  'migration_health', (dimension_percentages->>'migration_health')::int * 25,
  'architecture', (dimension_percentages->>'architecture')::int * 25,
  'modern_adoption', (dimension_percentages->>'modern_adoption')::int * 25,
  'ai_governance', (dimension_percentages->>'ai_governance')::int * 25,
  'delivery_readiness', (dimension_percentages->>'delivery_readiness')::int * 25
)
where dimension_percentages is not null;
