# Modelagem de dados (visão geral)

## Entidades e relacionamentos

```
User
 │
 ├──< Order ──< OrderItem >── Product
 │       │
 │       └── Payment
 │
 └── Cart
       │
       └──< CartItem >── Product
```

## Diagrama do banco

```
┌─────────────────┐
│      users      │
├─────────────────┤
│ id PK           │
│ name            │
│ email UNIQUE    │
│ password_hash   │
│ role            │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    │ 1:N     │ 1:1
    ▼         ▼
┌─────────┐ ┌─────────┐
│ orders  │ │  carts  │
└────┬────┘ └────┬────┘
     │           │
     │ 1:N       │ 1:N
     ▼           ▼
┌─────────────┐ ┌─────────────┐
│ order_items │ │ cart_items  │
└──────┬──────┘ └──────┬──────┘
       │               │
       │ N:1           │ N:1
       └───────┬───────┘
               ▼
        ┌─────────────┐
        │  products   │
        └─────────────┘

┌─────────────────┐
│    payments     │
├─────────────────┤
│ id PK           │
│ order_id FK (1:1)│
│ amount          │
│ status          │
└─────────────────┘
```

## Detalhamento por módulo

| Entidade | Documento |
|----------|-----------|
| User | [users/data-model.md](../users/data-model.md) |
| Product | [products/data-model.md](../products/data-model.md) |
| Cart, CartItem | [carts/data-model.md](../carts/data-model.md) |
| Order, OrderItem | [orders/data-model.md](../orders/data-model.md) |
| Payment | [payments/data-model.md](../payments/data-model.md) |

## API REST (resumo)

| Área | Endpoints |
|------|-----------|
| Auth | `POST /api/auth/register`, `POST /api/auth/login` |
| Products | `GET/POST /api/products`, `GET/PATCH/DELETE /api/products/:id`, `PATCH /api/products/:id/stock` |
| Cart | `GET /api/cart`, `POST /api/cart/items`, `PATCH/DELETE /api/cart/items/:id` |
| Orders | `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id` |
| Payments | `GET/POST /api/orders/:orderId/payment` |
