---
title: "Angular 22 Is Out — Here's What Actually Matters for Enterprise Teams"
published: true
tags: angular, webdev, javascript, typescript
canonical_url: https://frontendminds.com/blog/angular-22-release
---

Angular 22 dropped June 3. This isn't incremental. This is the release where Angular's signal-based architecture stops being "the future direction" and becomes the production default -- across forms, change detection, and async data fetching. If your team has been waiting for signals to stabilize before committing, that window just closed.

I've led 19 enterprise Angular upgrades over the past three years. Angular 22 is the first version where I'm telling every team the same thing: you need a signal adoption plan, not a "should we adopt signals" discussion. The framework's defaults now assume signal-based patterns. Teams that delay will increasingly fight the framework instead of working with it.

Here are the five features that actually matter.

## 1. Signal Forms -- The Headline Feature

Signal Forms replace reactive forms with a signal-driven API that is composable, type-safe, and dramatically simpler. They were experimental in Angular 21. In Angular 22, they are stable and production-ready.

```typescript
import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-payment',
  imports: [FormField],
  templateUrl: './app-payment.html',
})
class Payment {
  readonly paymentModel = signal({
    paymentType: '',
    amount: 0,
  });

  readonly f = form(this.paymentModel, {
    required(schema.paymentType, {
      message: 'Required field',
    }),
  });
}
```

Notice what's missing: no `FormBuilder`, no `FormGroup`, no `FormControl` wrapping. You declare a signal with your model shape, pass it to `form()`, and add validators declaratively. The signal graph handles change tracking, dirty state, and validation reactivity automatically.

Reactive forms are not deprecated in Angular 22. Both APIs coexist. But my recommendation is clear: all new form development should target Signal Forms. Migrate existing reactive forms incrementally during maintenance cycles. Do not start a new form with `FormGroup` in 2026.

## 2. Angular ARIA -- Accessible Components That Ship Ready

Angular ARIA provides accessible component primitives out of the box. Not experimental, not developer preview -- production-ready.

This matters more than most teams realize. WCAG 2.1 AA compliance is increasingly required by procurement contracts and legal requirements. If your enterprise team has been hand-rolling ARIA attributes on every component, Angular ARIA gives you correct, tested building blocks. Less code to write, fewer accessibility audit failures.

## 3. OnPush Change Detection by Default

New components in Angular 22 use `OnPush` change detection by default. This is significant:

- **Before Angular 22:** New components used `Default` change detection (Zone.js-triggered)
- **Angular 22:** New components use `OnPush` (signal-triggered)

The old `Default` strategy has been renamed to `Eager` for clarity. Existing components are unaffected -- this only applies to newly generated components.

If your team is already using signals, this is a non-event. If you're still relying on Zone.js patterns for change detection, read this as a clear signal (yes, pun intended) that migration should be prioritized. Angular's direction is zoneless-first. The framework won't break your Zone.js code today, but the defaults are no longer designed around it.

## 4. Async Signals with resource()

The `resource()` and `httpResource()` APIs are now stable. These bring async data fetching into the signal graph:

```typescript
const selectedCity = signal('Chicago');

const weatherResource = resource({
  params: () => ({ city: selectedCity() }),
  loader: (params) => fetchWeatherForecast(params.city),
});

const currentTemperature = computed(() => {
  if (weatherResource.hasValue()) {
    return weatherResource.value().temperature;
  }
});
```

This replaces the pattern of subscribing to observables, manually managing loading states, and handling unsubscription. For enterprise apps with heavy API integration -- and that's most of them -- `resource()` cuts a significant amount of boilerplate. The reactive graph just works.

## 5. The @Service Decorator

Angular 22 introduces `@Service` as a new decorator for injectable services. `@Injectable()` still works, but `@Service` provides a more descriptive, intent-revealing API for the most common use case. It's a small change that makes codebases more readable, especially for large teams where clarity in service architecture matters.

## Who Should Upgrade and When

Three decisions to make:

**When to upgrade.** If you're on Angular 19 or older, you're running end-of-life software with no security patches. Upgrade now -- target Angular 22. From Angular 21, the upgrade is straightforward: `ng update @angular/core@22 @angular/cli@22`. Expect 1-3 days for most applications.

**When to adopt Signal Forms.** Today, for new forms. Incrementally, for existing reactive forms during maintenance cycles.

**When to go zoneless.** Angular 22 makes OnPush the default, but Zone.js apps continue to work. Plan your zoneless migration for 2026-2027 -- don't rush it, but don't ignore it.

## The Bottom Line

Angular 22 draws a clear line: the signal era is production-ready. Signal Forms, OnPush by default, stable `resource()` -- these aren't experiments. They're the new standard. Enterprise teams that plan their adoption now will have an easier path forward than those who wait until Angular 23 or 24 forces the issue.

I wrote a full breakdown with version tables, upgrade paths, and what each feature means for enterprise teams -- [Full Angular 22 Enterprise Guide](https://frontendminds.com/blog/angular-22-release)
