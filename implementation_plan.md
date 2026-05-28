# Implementation Plan

Fix blank page on `/collection/:slug` caused by missing single root element in Vue template, which conflicts with Nuxt page transitions.

The page `pages/collection/[id].vue` renders completely empty because three sibling `<main>` elements (loading, error, and detail states) violate Nuxt's requirement for a single root node when page transitions are enabled. Nuxt's `<NuxtPage>` with `pageTransition` wraps the component in a `<Transition>` component, which in Vue 3 requires a single root element for the transition to work correctly. Without it, Vue fails to mount the component's DOM properly. The fix requires wrapping all conditional branches in a single parent `<div>`.

[Types]
No type changes needed.

No interfaces, enums, or data structures are being introduced or modified; the change is purely structural in the template.

[Files]
Only one file will be modified.

- `pages/collection/[id].vue`:
  - Current: Three sibling `<main>` elements at root level:
    ```html
    <main v-if="loading">...Загрузка...</main>
    <main v-else-if="error || !collection">...Ошибка...</main>
    <main v-else>...Детальная информация...</main>
    ```
  - Fix: Wrap all three in a single root `<div>`:
    ```html
    <div class="page-wrapper">
      <main v-if="loading">...Загрузка...</main>
      <main v-else-if="error || !collection">...Ошибка...</main>
      <main v-else>...Детальная информация...</main>
    </div>
    ```
  - No other files are affected.

[Functions]
No function modifications needed.

No functions are being created, modified, or removed. The `addItemToCart`, `addAllToCart`, and lifecycle hooks remain unchanged.

[Classes]
No class modifications needed.

No classes are being created, modified, or removed.

[Dependencies]
No dependency modifications needed.

No packages, version changes, or integrations are required.

[Testing]
Open the browser to `/collection/:slug` and verify the page renders with content (not blank). Also verify that navigation from `/collections` to `/collection/:slug` and back works correctly with page transitions.

[Implementation Order]
Single-step change — wrap root elements in a shared parent `<div>` in one file.

1. Edit `pages/collection/[id].vue`: wrap all three `<main>` elements in a single `<div>` root element.