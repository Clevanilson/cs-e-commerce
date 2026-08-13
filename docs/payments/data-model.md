# Modelagem de dados — Payments

## Entidade `Payment`

Pagamento simplificado associado a um pedido.

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `order_id` | UUID | FK → `orders.id` (1:1) |
| `amount` | DECIMAL | Obrigatório (igual ao `Order.total`) |
| `status` | ENUM | `PENDING` \| `APPROVED` \| `REJECTED` |
| `created_at` | TIMESTAMP | Obrigatório |

## Relacionamentos

```
Order 1 ───── 1 Payment
```

## Tabela `payments`

```
┌─────────────────┐
│    payments     │
├─────────────────┤
│ id PK           │
│ order_id FK     │
│ amount          │
│ status          │
│ created_at      │
└─────────────────┘
```

## Status

| Status | Significado |
|--------|-------------|
| `PENDING` | Aguardando simulação / decisão |
| `APPROVED` | Pagamento aprovado (simulado) |
| `REJECTED` | Pagamento rejeitado (simulado) |

## Regras de domínio

- Um pedido possui no máximo um pagamento no MVP
- `amount` deve refletir o total do pedido no momento da criação
- Aprovação deve levar o pedido a `PAID`
- Rejeição pode manter/levar o pedido a estado coerente (`PENDING` ou `CANCELLED`, conforme regra definida na implementação — documentar a escolha na feature)
