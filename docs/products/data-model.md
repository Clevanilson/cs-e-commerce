# Modelagem de dados — Products

## Entidade `Product`

Representa um produto disponível no catálogo.

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `name` | VARCHAR | Obrigatório |
| `description` | TEXT | Opcional |
| `price` | DECIMAL | `> 0` |
| `stock` | INTEGER | `>= 0` |
| `active` | BOOLEAN | Obrigatório |
| `created_at` | TIMESTAMP | Obrigatório |
| `updated_at` | TIMESTAMP | Obrigatório |

## Relacionamentos

```
Product 1 ───── N CartItem
Product 1 ───── N OrderItem
```

## Tabela `products`

```
┌─────────────────┐
│    products     │
├─────────────────┤
│ id PK           │
│ name            │
│ description     │
│ price           │
│ stock           │
│ active          │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

## Regras de domínio

- Preço sempre maior que zero
- Estoque nunca pode ficar negativo
- Produto novo inicia `active = true` (salvo regra explícita em contrário)
- Baixa de estoque no checkout deve ser atômica com a criação do pedido
- Listagem para cliente exibe apenas produtos `active = true`

## Comportamento de estoque (exemplo unitário)

```
Product.decreaseStock()

10 unidades - 3 = 7  → ok
10 unidades - 11     → erro (PRODUCT_OUT_OF_STOCK)
```
