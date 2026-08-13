# Módulo Orders

Responsável pelo **ciclo de vida da compra** — o coração do MVP.

## Responsabilidades

- Criação do pedido (checkout)
- Cálculo do total
- Criação dos itens com snapshot
- Reserva / baixa de estoque
- Consulta do pedido
- Alteração de status

## Estrutura

```
orders/
├── domain/
│   ├── entities/          # Order, OrderItem
│   ├── value-objects/
│   └── repositories/
├── application/
│   └── use-cases/         # CreateOrder, ListOrders, GetOrder...
└── infra/
    ├── database/
    └── http/
```

## Modelagem

→ [data-model.md](./data-model.md)

## Features

| ID | Feature | Documento |
|----|---------|-----------|
| US08 | Finalizar compra (checkout) | [features/checkout.md](./features/checkout.md) |
| US09 | Consultar pedidos | [features/list-orders.md](./features/list-orders.md) |

## Endpoints

| Método | Path | Auth |
|--------|------|------|
| `POST` | `/orders` | Sim (`CUSTOMER`) |
| `GET` | `/orders` | Sim |
| `GET` | `/orders/:id` | Sim |

## Dependências (via abstrações)

```
Orders
  ├── Users      (identidade do comprador)
  ├── Carts      (itens do checkout)
  ├── Products   (ProductGateway: preço, estoque, ativo)
  └── Payments   (criação do pagamento simulado)
```

## Status do pedido (MVP)

| Status | Significado |
|--------|-------------|
| `PENDING` | Criado, aguardando pagamento |
| `PAID` | Pagamento aprovado |
| `CANCELLED` | Cancelado |
