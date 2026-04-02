# Dependency Removal Audit

## Executive Summary
This codebase has **minimal use** of these three dependencies. Only **1 file** actively uses `react-hook-form` with Zod validation. The other two dependencies have **very limited scope** and can be easily removed with simple replacements.

---

## 1. REACT-HOOK-FORM + @HOOKFORM/RESOLVERS

### Current Usage
**Only 1 file uses these packages:**
- `/src/app/assessment/unlock/page.tsx` (email gate form)

### What It Does
- Form state management with `useForm()`
- Zod schema validation with `zodResolver()`
- Field registration with `register()`
- Error handling and loading states

### Form Logic Details
```typescript
// Form Hook
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<EmailGateForm>({
  resolver: zodResolver(emailGateSchema),
});

// Validation Schema
const emailGateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});
```

### Form Fields & Validation
1. **firstName** - required text field, min 1 char
2. **email** - required email field with format validation

### Form Submission Flow
1. User submits form → `handleSubmit(onSubmit)`
2. Validation runs via zodResolver
3. On success → calls `submitAssessment()` server action
4. On error → displays error message
5. Shows loading state during submission
6. Redirects to results page on success

### Error Handling
- Field-level error display
- Server-side error handling with custom message
- Loading state during async submission

---

## 2. @BASE-UI/REACT (Button Primitive)

### Current Usage
**Only 1 file imports the base-ui button:**
- `/src/components/ui/button.tsx`

### What It Does
Provides a `ButtonPrimitive` component that wraps the native `<button>` element with keyboard handling and accessibility attributes.

### How It's Used
```typescript
import { Button as ButtonPrimitive } from "@base-ui/react/button"

function Button({
  className,
  variant = "default",
  size = "default",
  shape = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  )
}
```

### Props Passed
- `data-slot="button"` - For styling context
- `className` - From CVA variants + user className
- All other HTML button props (`...props`)

### Why It's Used
- Keyboard event handling (focus, spacebar, enter)
- Accessibility features (aria-* attributes)
- Proper button semantics

### Buttons Using It
- Email gate form submit button
- 18 other files import buttonVariants (style only, don't use ButtonPrimitive)

---

## 3. CLASS-VARIANCE-AUTHORITY (CVA)

### Current Usage
**2 files directly import CVA:**

#### a) `/src/components/ui/button-variants.ts`
Defines all button styles using `cva()`:
- 5 variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
- 7 sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`
- 2 shapes: `default`, `pill`
- 1 compound variant (pill + default shadow effect)

#### b) `/src/components/ui/button.tsx`
Imports `VariantProps` type for TypeScript prop typing:
```typescript
import type { VariantProps } from "class-variance-authority"

function Button({
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>)
```

### 18 Other Files Using buttonVariants
These files import `buttonVariants` for styling but don't directly use CVA:
```
src/components/landing/how-it-works.tsx
src/components/landing/hero.tsx
src/components/landing/scorecard-spotlight.tsx
src/components/landing/navigation.tsx
src/components/landing/sticky-mobile-cta.tsx
src/components/results/tier-cta.tsx
src/components/services/scorecard-bridge.tsx
src/components/services/services-cta.tsx
src/components/services/services-hero.tsx
src/app/error.tsx
src/app/not-found.tsx
src/components/about/about-cta.tsx
src/components/about/about-framework.tsx
src/app/assessment/page.tsx
src/app/assessment/unlock/page.tsx
src/components/blog/assessment-cta.tsx
```

### CVA Features Used
- Compiling variant classes at build time
- Type-safe variant props
- Compound variant support (conditional class combinations)
- Default variants

---

## UI Components in `/src/components/ui/`

All these components use **NO external dependencies** (only React, TypeScript, cn utility):

1. **button.tsx** - Uses @base-ui Button primitive + buttonVariants
2. **button-variants.ts** - Defines CVA button styles
3. **section.tsx** - Manual variant objects (no CVA)
4. **tagline.tsx** - Simple styled component
5. **glass-card.tsx** - Simple styled component with variant prop
6. **reveal.tsx** - Animation component
7. **icon-circle.tsx** - Simple styled component

---

## Other Form Files (NO DEPENDENCIES)

These forms use plain React state management - NO react-hook-form:

1. **`/src/components/newsletter-form.tsx`**
   - Manual form handling with `FormData` API
   - Simple useState for status tracking
   - No validation library

2. **`/src/components/landing/exit-intent-popup.tsx`**
   - Modal with form for newsletter signup
   - Manual form handling with `FormData`
   - No validation library

3. **`/src/app/contact/page.tsx`**
   - Contact form with 4 fields
   - Manual form handling with `FormData`
   - No validation library

---

## Removal Plan Summary

### react-hook-form + @hookform/resolvers
- **Affected files:** 1 file (`/src/app/assessment/unlock/page.tsx`)
- **Replacement:** Convert to manual form handling with `FormData` API
- **Complexity:** Low - just need to add Zod validation calls in submit handler
- **Files to modify:** 1

### @base-ui/react
- **Affected files:** 1 file (`/src/components/ui/button.tsx`)
- **Replacement:** Use native `<button>` element directly
- **Complexity:** Very low - just replace ButtonPrimitive with `button`
- **Files to modify:** 1

### class-variance-authority
- **Affected files:** 2 files directly, 18+ indirectly
- **Replacement:** Convert CVA to plain object mapping or Tailwind merge patterns
- **Complexity:** Low - CVA just generates className strings
- **Files to modify:** 1 (button-variants.ts) - others will auto-work
- **Option 1:** Manually create variant object with string values
- **Option 2:** Use a simple helper function to replace cva()

---

## Key Observations

1. **Minimal scope** - Only 1-2 core files use these dependencies
2. **No complex integrations** - Each dependency is used in isolated, straightforward ways
3. **Easy replacements available** - All three can be replaced with simple native equivalents
4. **18+ files use buttonVariants** but only for styles, not the library
5. **Other forms don't use react-hook-form** - they use plain state management
