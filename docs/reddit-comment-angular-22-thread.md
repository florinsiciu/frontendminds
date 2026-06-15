# Reddit Comment — for thread "Now that Angular 22 is released and key experimental APIs are..."
# URL: https://www.reddit.com/r/angular/comments/1tya8w5/now_that_angular_22_is_released_and_key/

**Comment:**

From the enterprise side, the three biggest changes in v22 for teams I work with:

1. **Signal Forms being stable is the real headline.** Reactive Forms work fine, but Signal Forms are dramatically simpler for new development. If you're starting a new form-heavy feature, use Signal Forms. For existing reactive forms — migrate incrementally during maintenance cycles, don't rewrite.

2. **OnPush by default changes the conversation.** It's only for new components, so nothing breaks. But it means the framework is now actively pushing teams toward signal-based reactivity. If your team is still relying on Zone.js change detection patterns, this is the signal (pun intended) to prioritize that migration.

3. **The @Service decorator is underrated.** Small API improvement, but it clarifies intent in large codebases where you have hundreds of injectables and not all of them are "services" in the traditional sense.

The upgrade from 21 to 22 was the smoothest in the 14-to-22 range in my experience — 1-3 days for most applications. The hard ones are still 16->17 and 19->20.

I wrote up a full breakdown of what each v22 feature means for enterprise teams if anyone wants the deep dive: https://frontendminds.com/blog/angular-22-release
