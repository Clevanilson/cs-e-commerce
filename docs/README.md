# Documentação — E-commerce MVP

Documentação do MVP de e-commerce como **monólito modular** (Node.js + TypeScript + Clean Architecture).

## Objetivo do MVP

Permitir que um cliente:

1. Crie uma conta
2. Consulte produtos
3. Adicione produtos ao carrinho
4. Finalize uma compra
5. Acompanhe seus pedidos

Administradores poderão cadastrar produtos e controlar o estoque.

## Índice por módulo

| Módulo | Responsabilidade | Features |
|--------|------------------|----------|
| [Users](./users/README.md) | Identidade e autenticação | [Cadastro](./users/features/register.md), [Login](./users/features/login.md) |
| [Products](./products/README.md) | Catálogo e estoque | [Listar](./products/features/list-products.md), [Criar](./products/features/create-product.md), [Atualizar estoque](./products/features/update-stock.md) |
| [Carts](./carts/README.md) | Carrinho de compras | [Adicionar](./carts/features/add-item.md), [Alterar](./carts/features/update-item.md), [Remover](./carts/features/remove-item.md) |
| [Orders](./orders/README.md) | Ciclo de vida da compra | [Checkout](./orders/features/checkout.md), [Consultar pedidos](./orders/features/list-orders.md) |
| [Payments](./payments/README.md) | Pagamento simulado | [Criar/simular pagamento](./payments/features/simulate-payment.md) |

## Visão geral

- [Visão e objetivos](./overview/vision.md)
- [Escopo do MVP](./overview/scope.md)
- [Atores](./overview/actors.md)
- [Arquitetura e módulos](./overview/architecture.md)
- [Modelagem de dados (diagrama geral)](./overview/data-model.md)

## Stack sugerida

| Camada | Tecnologia |
|--------|------------|
| Backend | Node.js + TypeScript |
| HTTP | Fastify ou NestJS |
| Banco | PostgreSQL |
| ORM | Prisma |
| Auth | JWT |
| Testes | Vitest + Supertest |
| Docs API | OpenAPI / Swagger |
| Infra | Docker + Docker Compose |
| CI | GitHub Actions |

## Critério de conclusão

O MVP está concluído quando o fluxo abaixo funcionar de ponta a ponta, com regras de negócio isoladas, módulos desacoplados, checkout transacional, autorização por perfil e execução local via Docker:

```
Cadastro → Login → Produtos → Carrinho → Checkout → Pedido → Pagamento
```
