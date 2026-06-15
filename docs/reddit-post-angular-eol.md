# Reddit r/angular — Self Post

**Title:** Angular 19 hit EOL on May 19 — here's the full version status table for every release from v14 to v22

**Body:**

With Angular 22 dropping on June 3 and Angular 19 LTS ending just two weeks before that, I put together a reference table for anyone trying to figure out where their version stands.

## Angular Version Status (June 2026)

| Version | Released | Support Ended | Status |
|---------|----------|--------------|--------|
| Angular 14 | June 2022 | November 2023 | End-of-life |
| Angular 15 | November 2022 | May 2024 | End-of-life |
| Angular 16 | May 2023 | November 2024 | End-of-life |
| Angular 17 | November 2023 | May 2025 | End-of-life |
| Angular 18 | May 2024 | November 2025 | End-of-life |
| Angular 19 | November 2024 | May 19, 2026 | End-of-life |
| Angular 20 | May 2025 | November 2026 | LTS |
| Angular 21 | November 2025 | May 2027 | LTS |
| Angular 22 | June 3, 2026 | ~June 2028 | Active |

**What EOL actually means:** no security patches, no bug fixes, nothing. Any CVE discovered after EOL is your team's problem.

**The upgrade math:** Angular enforces one-version-at-a-time upgrades. Going from v14 to v22 means walking through 14->15->16->17->18->19->20->21->22. Each step has its own breaking changes. The two worst jumps are 16->17 (TypeScript 5.x required, Node 16 dropped, standalone becomes default) and 19->20 (Node 18 dropped).

I've been leading enterprise Angular upgrades for a while now (19 projects) and wrote up the full details — upgrade paths, breaking changes per version, realistic timelines — if anyone needs the reference: https://frontendminds.com/blog/angular-end-of-life-2026

What version is everyone running? Curious how many teams are still on v19 or older.
