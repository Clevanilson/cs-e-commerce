# Módulo Carts

Responsável pelo **carrinho de compras**.

## Responsabilidades

- Criar carrinho (um por usuário no MVP)
- Adicionar item
- Remover item
- Alterar quantidade
- Consultar carrinho

## Estrutura

```
carts/
├── domain/
│   ├── entities/          # Cart, CartItem
│   ├── value-objects/
│   └── repositories/
├── application/
│   └── use-cases/
└── infra/
    ├── database/
    └── http/
```

## Modelagem

→ [data-model.md](./data-model.md)

## Features

| ID | Feature | Documento |
|----|---------|-----------|
| US05 | Adicionar ao carrinho | [features/add-item.md](./features/add-item.md) |
| US06 | Alterar quantidade | [features/update-item.md](./features/update-item.md) |
| US07 | Remover produto | [features/remove-item.md](./features/remove-item.md) |

## Endpoints

| Método | Path | Auth |
|--------|------|------|
| `GET` | `/api/cart` | Sim (`CUSTOMER`) |
| `POST` | `/api/cart/items` | Sim |
| `PATCH` | `/api/cart/items/:id` | Sim |
| `DELETE` | `/api/cart/items/:id` | Sim |

## Relacionamentos

- Depende de **Users** (`user_id`)
- Depende de **Products** (via gateway: existência, ativo, estoque)
- É consumido por **Orders** no checkout

## Regra do MVP

Um usuário possui **apenas um carrinho ativo**.
