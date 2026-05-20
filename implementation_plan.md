# Implementation Plan

Fix the order creation bug (missing `productId` mapping), add contact data storage to orders, and build admin order detail view + API.

The checkout flow currently fails because the frontend sends cart items with field `id` but the Mongoose schema requires `productId`. Additionally, no contact info (firstName, lastName, phone, email) is stored on the order, and the admin panel lacks a dedicated order detail view. The fix involves: (1) mapping `id` → `productId` on the client side before submission, (2) extending the Order model with contact fields, (3) updating API endpoints to accept and return those fields, (4) adding a server-side order detail API endpoint, (5) creating an admin order detail page, and (6) enhancing the admin orders tab with a detail button.

[Types]

Add `firstName`, `lastName`, `phone`, `email` fields to both the `IOrder` interface and the Mongoose `OrderSchema`.

Updated `IOrderItem` (no changes needed — it already contains `productId`, `name`, `price`, `quantity`, `image`, `article`, `colorName?`, `colorClass?`).

Updated `IOrder`:
- `firstName: string` (required)
- `lastName: string` (required)
- `phone: string` (required)
- `email: string` (required)
- Everything else unchanged

[Files]

Modify 7 files: 1 server model, 2 server API endpoints, 1 client composable, 1 client page, and 1 new server API endpoint + 1 new admin page.

- **`server/models/Order.ts`** — Add `firstName`, `lastName`, `phone`, `email` fields to `IOrder` interface and `OrderSchema`.
- **`server/api/orders.post.ts`** — Accept `firstName`, `lastName`, `phone`, `email` from request body and save to order document.
- **`composables/useCart.ts`** — Extend `submitOrder` signature to accept `items`, `deliveryAddress`, `comment`, `firstName`, `lastName`, `phone`, `email`. Map `id` → `productId` on each cart item before sending. Remove hardcoded `cart.value` reference and accept items as a parameter.
- **`pages/checkout.vue`** — Update `handleSubmit` to pass all form fields to `submitOrder`. Pass `cart` items array explicitly with the `id` → `productId` mapping.
- **`server/api/orders/[id].get.ts`** (NEW) — Create a new API endpoint that returns a single order by ID. Requires admin authentication. Uses `Order.findById(id).populate('userId', 'phone firstName lastName').lean()`.
- **`pages/admin/order/[id].vue`** (NEW) — Create a new admin page that displays full order details: items with images, colors, quantities, prices; client contact info (name, phone, email); delivery address; status with editable dropdown; comment; timestamps.
- **`pages/admin.vue`** — In the ORDERS tab, add a "Подробнее" / "Открыть" button next to each order that navigates to `/admin/order/${order._id}`. Keep the existing inline order cards but simplify them to a compact list.

[Functions]

- **`composables/useCart.ts` → `submitOrder`** (modified)
  - Old signature: `submitOrder(deliveryAddress: string, comment: string) => Promise<any>`
  - New signature: `submitOrder(items: CartItem[], deliveryAddress: string, comment: string, contact: { firstName: string, lastName: string, phone: string, email: string }) => Promise<any>`
  - Old body: sends `{ items: cart.value, deliveryAddress, comment }`
  - New body: maps `items` to replace `id` with `productId`, then sends `{ items: mappedItems, deliveryAddress, comment, ...contact }`, then calls `clearCart()`.
- **`pages/checkout.vue` → `handleSubmit`** (modified)
  - Before: `const order = await cartSubmitOrder(address, comment)`
  - After: `const order = await cartSubmitOrder(cart, address, comment, { firstName: form.value.firstName, lastName: form.value.lastName, phone: form.value.phone, email: form.value.email })`
- **`server/api/orders.post.ts`** (modified handler)
  - Before: reads `body.items`, `body.deliveryAddress`, `body.comment` and creates order with those + computed `totalPrice`.
  - After: additionally reads `body.firstName`, `body.lastName`, `body.phone`, `body.email` and includes them in `orderData`.

[Classes]

No class modifications required.

[Dependencies]

No new npm packages required. The project already uses `h3`, `mongoose`, `jsonwebtoken`, `vue`, `nuxt`.

[Testing]

1. Start the dev server and open checkout page with items in cart.
2. Fill all form fields and submit. Verify the order is created without validation errors.
3. Check MongoDB `orders` collection — verify `productId` is present on all items, and `firstName`, `lastName`, `phone`, `email` are stored.
4. Navigate to admin panel → Orders tab. Verify each order has a "Подробнее" button.
5. Click "Подробнее" on an order. Verify the detail page shows all item data, client info, delivery address, status, comment.
6. Change order status on the detail page. Verify it updates and reflects in the orders list.
7. Test with unauthenticated user — verify order creation still works (userId will be null, but contact fields will be filled).

[Implementation Order]

Single linear sequence — each step builds on the previous one without conflicts.

1. Extend `server/models/Order.ts` with `firstName`, `lastName`, `phone`, `email` fields.
2. Update `server/api/orders.post.ts` to accept and save contact fields.
3. Update `composables/useCart.ts` — change `submitOrder` signature and add `id` → `productId` mapping.
4. Update `pages/checkout.vue` — pass full contact data to `submitOrder`.
5. Create `server/api/orders/[id].get.ts` — new API endpoint for single order by ID (admin only).
6. Create `pages/admin/order/[id].vue` — new admin order detail page.
7. Update `pages/admin.vue` — add "Подробнее" links to order cards.