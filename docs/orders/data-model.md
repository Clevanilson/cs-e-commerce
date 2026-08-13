# Modelagem de dados — Orders

## Entidade `Order`

Representa uma compra realizada.

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `users.id` |
| `status` | ENUM | `PENDING` \| `PAID` \| `CANCELLED` |
| `total` | DECIMAL | `>= 0` |
| `created_at` | TIMESTAMP | Obrigatório |
| `updated_at` | TIMESTAMP | Obrigatório |

### Relacionamentos

```
User 1 ───── N Order
Order 1 ───── N OrderItem
Order 1 ───── 1 Payment
```

## Entidade `OrderItem`

Representa os produtos comprados (**snapshot** da compra).

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `order_id` | UUID | FK → `orders.id` |
| `product_id` | UUID | FK → `products.id` |
| `product_name` | VARCHAR | Obrigatório |
| `unit_price` | DECIMAL | Obrigatório |
| `quantity` | INTEGER | `> 0` |
| `subtotal` | DECIMAL | Obrigatório (`unit_price * quantity`) |

### Por que `product_name` e `unit_price`?

O pedido preserva o histórico da compra, independente de alterações futuras no catálogo.

Exemplo:

| Momento | Preço do Notebook |
|---------|-------------------|
| Compra | R$ 3.000 |
| Depois | R$ 3.500 |

O `OrderItem` permanece com `unit_price = 3000`.

## Tabelas

```
┌─────────────────┐
│     orders      │
├─────────────────┤
│ id PK           │
│ user_id FK      │
│ status          │
│ total           │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐
│  order_items    │
├─────────────────┤
│ id PK           │
│ order_id FK     │
│ product_id FK   │
│ product_name    │
│ unit_price      │
│ quantity        │
│ subtotal        │
└─────────────────┘
```

## Regras de consistência (checkout)

Tudo em **uma transação**:

```
BEGIN
  Criar Order
  Criar OrderItems
  Atualizar estoque
  Criar Payment
  Limpar Cart
COMMIT
```

Qualquer falha → `ROLLBACK`.
