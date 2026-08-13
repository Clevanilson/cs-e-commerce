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
| Auth | `POST /auth/register`, `POST /auth/login` |
| Products | `GET/POST /products`, `GET/PATCH/DELETE /products/:id`, `PATCH /products/:id/stock` |
| Cart | `GET /cart`, `POST /cart/items`, `PATCH/DELETE /cart/items/:id` |
| Orders | `POST /orders`, `GET /orders`, `GET /orders/:id` |
| Payments | `GET/POST /orders/:orderId/payment` |
