# Modelagem de dados — Carts

## Entidade `Cart`

Representa o carrinho atual do cliente.

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `users.id` |
| `created_at` | TIMESTAMP | Obrigatório |
| `updated_at` | TIMESTAMP | Obrigatório |

### Relacionamentos

```
User 1 ───── 1 Cart
Cart 1 ───── N CartItem
```

## Entidade `CartItem`

Representa um produto dentro do carrinho.

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `cart_id` | UUID | FK → `carts.id` |
| `product_id` | UUID | FK → `products.id` |
| `quantity` | INTEGER | `> 0` |
| `created_at` | TIMESTAMP | Obrigatório |
| `updated_at` | TIMESTAMP | Obrigatório |

### Unicidade

```
UNIQUE (cart_id, product_id)
```

Impede que o mesmo produto apareça duas vezes no mesmo carrinho. Se já existir, a quantidade é **incrementada**.

## Tabelas

```
┌─────────────────┐
│      carts      │
├─────────────────┤
│ id PK           │
│ user_id FK      │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐
│   cart_items    │
├─────────────────┤
│ id PK           │
│ cart_id FK      │
│ product_id FK   │
│ quantity        │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

## Regras de domínio

- Quantidade sempre `> 0`
- Quantidade não pode ultrapassar estoque disponível do produto
- Cliente só acessa o próprio carrinho
- Remover item do carrinho **não** altera estoque do produto
- Carrinho vazio impede checkout (validado em Orders)
