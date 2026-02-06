
  
## Never do patchwork or patch fixes.
- If something is broken, fix the root cause.
- If something is missing, add it properly.

## Core
- TypeScript first, no `any`
- UI in components, logic in hooks
- One source of truth
- Mobile-first by default

## Types 
- Every API response typed
- Every form typed
- Use unions/enums, no magic strings

## Forms
- Zod **mandatory**
- React Hook Form **only**
- No `useState` for forms
- Zod schema = backend contract

## State
- `useState` → simple UI
- `useReducer` → complex / multi-field state
- Context → auth, user, app config only
- No API data in Context

## API
- API calls only in hooks
- Components never fetch
- Every hook must expose:
  - `data`
  - `isLoading`
  - `error`

## API States
- Disable actions on `isLoading`
- Show readable error on `error`
- Guard against empty `data`
- No implicit behavior

## Side-Effects
- Toasts in hooks only
- Use mutation lifecycle
- No toasts in components
- No side-effects in `useEffect`

## Styling
- No inline hex colors
- Use theme / Tailwind / tokens
- Don’t mix more than one system

## Routing
- `routeMeta` required for all routes
- Lazy load major routes
- Layout is data-driven

## Files / QR
- Download via Blob → Object URL
- No raw file URLs
- Use Web Share API when possible

## Performance
- Lazy load routes & heavy components
- Avoid unnecessary re-renders
- No inline functions in lists

## Errors
- Handle network + backend + empty state
- User-facing messages only

## Security
- No tokens in localStorage
- Zod validate all inputs
- No sensitive logs

## Review Gate
- Types present
- Zod + RHF used
- API states handled
- Toasts in hooks
- Mobile UX checked


## Api Flow
- APi function to hooks to components
- No direct API calls in components
-api related callign and all should be done from parent 


## Component Structure
- Presentational vs Container components'
- Presentational: UI only, no logic, reusable
- Container: data fetching, state management, passes props to Presentational components
- Keep components small and focused on a single responsibility