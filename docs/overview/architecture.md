# Arquitetura

## Monólito modular

```
src/
└── modules/
    ├── users/
    ├── products/
    ├── carts/
    ├── orders/
    └── payments/
```

Cada módulo segue:

```
module/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── repositories/
├── application/
│   └── use-cases/
└── infra/
    ├── database/
    └── http/
```

## Responsabilidades dos módulos

| Módulo | Responsabilidade |
|--------|------------------|
| **Users** | Cadastro, login, senha, perfil, autorização |
| **Products** | Criação, atualização, consulta, ativação/desativação, estoque |
| **Carts** | Criar carrinho, adicionar/remover item, alterar quantidade, consultar |
| **Orders** | Criar pedido, calcular total, snapshot de itens, reserva/baixa de estoque, status |
| **Payments** | Criar pagamento, associar ao pedido, simular aprovação/rejeição |

## Relacionamentos entre módulos

```
                    ┌───────────┐
                    │   Users   │
                    └─────┬─────┘
                          │
                    ┌─────▼─────┐
                    │   Orders  │
                    └─────┬─────┘
                          │
              ┌───────────┼───────────┐
              │                       │
              ▼                       ▼
        ┌───────────┐           ┌───────────┐
        │  Products │           │ Payments  │
        └───────────┘           └───────────┘
              ▲
              │
        ┌─────┴─────┐
        │   Carts   │
        └───────────┘
```

## Regra arquitetural

> Um módulo **não** deve acessar diretamente tabelas ou repositories internos de outro módulo.

Exemplo: `Orders` não faz `prisma.product.findUnique(...)`. Depende de uma abstração (`ProductGateway`).

## Regras de dependência

```
Infrastructure → Application → Domain
```

O domínio **não** conhece infraestrutura (Prisma, HTTP, etc.).

## Comunicação entre módulos

No MVP (mesmo processo):

```
Orders → ProductGateway → Products Module
```

Futuro (microsserviço):

```
Orders → ProductGateway ──HTTP──► Products Service
```

O use case permanece praticamente igual.

## Autenticação

- JWT com claims mínimos: `{ sub, role }`
- Papéis: `CUSTOMER` | `ADMIN`

## Tratamento de erros

Respostas padronizadas:

```json
{
  "error": {
    "code": "PRODUCT_OUT_OF_STOCK",
    "message": "Produto sem estoque suficiente"
  }
}
```

Códigos comuns: `INVALID_CREDENTIALS`, `USER_ALREADY_EXISTS`, `PRODUCT_NOT_FOUND`, `PRODUCT_INACTIVE`, `PRODUCT_OUT_OF_STOCK`, `CART_EMPTY`, `ORDER_NOT_FOUND`, `UNAUTHORIZED`, `FORBIDDEN`.
