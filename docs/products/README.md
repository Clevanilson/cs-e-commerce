# Módulo Products

Responsável pelo **catálogo** e **estoque**.

## Responsabilidades

- Criação e atualização de produtos
- Consulta (lista e detalhe)
- Ativação / desativação
- Controle de estoque

## Estrutura

```
products/
├── domain/
│   ├── entities/          # Product
│   ├── value-objects/     # Money (exemplo)
│   └── repositories/      # ProductRepository
├── application/
│   └── use-cases/         # CreateProduct, ListProducts, UpdateStock...
└── infra/
    ├── database/          # PrismaProductRepository
    └── http/              # ProductController, routes
```

## Modelagem

→ [data-model.md](./data-model.md)

## Features

| ID | Feature | Documento |
|----|---------|-----------|
| US03 | Listar produtos | [features/list-products.md](./features/list-products.md) |
| US04 | Criar produto | [features/create-product.md](./features/create-product.md) |
| US10 | Atualizar estoque | [features/update-stock.md](./features/update-stock.md) |

## Endpoints

| Método | Path | Auth | Role |
|--------|------|------|------|
| `GET` | `/api/products` | Público / autenticado* | — |
| `GET` | `/api/products/:id` | Público / autenticado* | — |
| `POST` | `/api/products` | Sim | `ADMIN` |
| `PATCH` | `/api/products/:id` | Sim | `ADMIN` |
| `PATCH` | `/api/products/:id/stock` | Sim | `ADMIN` |
| `DELETE` | `/api/products/:id` | Sim | `ADMIN` |

\* No MVP, listagem/detalhe podem ser públicos; itens inativos não aparecem para o cliente.

## Fronteira com outros módulos

Outros módulos (Orders, Carts) acessam Products via **gateway/abstração**, nunca via Prisma/repository interno:

```ts
interface ProductGateway {
  getProduct(id: string): Promise<{
    id: string;
    name: string;
    price: number;
    stock: number;
    active: boolean;
  } | null>;

  decreaseStock(id: string, quantity: number): Promise<void>;
}
```
