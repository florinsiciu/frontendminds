# Angular Project — AI Instructions

<!-- Setup: Save this file as CLAUDE.md in your project root. -->
<!-- Claude Code reads it automatically at the start of every session. -->
<!-- Source: Adapted from angular.dev/assets/context/best-practices.md -->
<!-- Guide: https://frontendminds.com/blog/why-ai-writes-outdated-angular-code -->

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Conventions

- Always use standalone components — do NOT set `standalone: true` in decorators (it is the default since Angular 19)
- Use signals for state management (`signal()`, `computed()`, `effect()`)
- Use `inject()` function for dependency injection, not constructor injection
- Use `input()` and `output()` functions, not `@Input()` and `@Output()` decorators
- Use native control flow (`@if`, `@for`, `@switch`), not `*ngIf`, `*ngFor`, `*ngSwitch`
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on all components
- Use `NgOptimizedImage` for static images
- Do NOT use `ngClass`/`ngStyle` — use native `[class.*]` and `[style.*]` bindings
- Do NOT use `@HostBinding`/`@HostListener` — use the `host` object in decorators
- Use `providedIn: 'root'` for singleton services
- Implement lazy loading for feature routes
- Prefer Reactive Forms over Template-driven forms

## Accessibility

- Follow WCAG AA standards
- Ensure proper focus management, color contrast, and ARIA attributes

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Do NOT use `mutate` on signals — use `update` or `set`
- Prefer signals over BehaviorSubject for component-level state

## Testing

- Write tests using the project's configured test runner
- Use `TestBed.configureTestingModule` with standalone components
- Mock services using `inject()` patterns
