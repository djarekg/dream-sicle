---
applyTo: 'apps/api/src/**/*.ts'
---

Use this guidance when creating or updating API endpoints in `apps/api`.

Reference implementation:

- `apps/api/src/controllers/customers.ts`
- `apps/api/src/routes/customer.ts`

## Endpoint Structure

For each new resource, follow the same split used by customers:

- Controller logic in `apps/api/src/controllers/<resource>.ts`
- Route map in `apps/api/src/routes/<resource>.ts`
- Route registration in `apps/api/src/server.ts`

Keep routes thin and put request validation, data access, and response shaping in controllers.

## Route Conventions

- Wrap every route handler with `withCors(...)` from `@/middleware/with-cors.ts`.
- Use Bun route map patterns like:
  - `'/resources': withCors(async () => getResources())`
  - `'/resources/:id': { GET, POST, DELETE }` or a single wrapped handler when only one method is supported.
- Keep route handlers as pass-through wrappers that call controller functions.

Example:

```ts
export const customerRoutes = {
  '/customers': withCors(async () => getCustomers()),
  '/customers/:id': {
    GET: withCors(async req => getCustomer(req)),
    POST: withCors(async req => updateCustomer(req)),
    DELETE: withCors(async req => deleteCustomer(req)),
  },
};
```

## Controller Conventions

- Import DTO types from `@ds/contracts` and model types from `@ds/db`.
- Use `prisma` from `@/db.ts` for data access.
- Use `parseParams<{ id: string }>(req)` to read route parameters.
- Validate required params (and body fields when needed) before calling Prisma.
- Throw `new ApiError(ApiStatus.badRequest, ...)` for invalid input.
- Throw `new ApiError(ApiStatus.notFound, ...)` when records are missing.
- Return JSON via `Response.json(...)`.

## DTO Mapping Rules

- Define a local mapper (`to<Resource>Dto`) in the controller.
- Convert `Date` values to ISO strings with `.toISOString()`.
- Normalize nullable DB fields to optional DTO fields where applicable (for example, `value || undefined`).
- Return DTOs, not raw Prisma model objects.

## Update/Delete Patterns

- For update handlers:
  - Parse `id` from params.
  - Parse request JSON with a typed payload.
  - Pass only allowed fields to `prisma.<model>.update({ data: ... })`.
- For delete handlers:
  - Parse and validate `id`.
  - Return the deleted entity mapped to DTO.

## Registration and Naming

- Use plural resource names in route paths (for example, `/customers`, `/products`).
- Keep naming consistent:
  - `get<Resource>` for single entity
  - `get<Resources>` for collection
  - `update<Resource>` and `delete<Resource>` for mutations
- Ensure the new route map is spread into `routes` in `apps/api/src/server.ts`.

## Error Handling

- Do not manually wrap controllers with try/catch for standard API errors.
- Let errors propagate to shared middleware (`executeHandler` and `handleError`) via `withCors`.

## Style Expectations

- Match existing import style and path aliases (`@/...`).
- Add short JSDoc comments for exported controller functions and route map blocks.
- Keep functions focused and avoid embedding business logic in route definitions.
