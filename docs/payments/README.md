# Módulo Payments

No MVP, representa o pagamento de forma **simplificada / simulada**.

## Responsabilidades

- Criar pagamento
- Associar pagamento ao pedido
- Simular aprovação ou rejeição
- (Indiretamente) contribuir para atualização de status do pedido

## Estrutura

```
payments/
├── domain/
│   ├── entities/          # Payment
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

| Feature | Documento |
|---------|-----------|
| Criar / simular pagamento | [features/simulate-payment.md](./features/simulate-payment.md) |

## Endpoints

| Método | Path | Auth |
|--------|------|------|
| `GET` | `/api/orders/:orderId/payment` | Sim |
| `POST` | `/api/orders/:orderId/payment` | Sim |

## Fronteira clara para evolução

Este módulo é o melhor candidato a extração futura:

```
Antes:  Orders ──► Payments (mesmo processo)
Depois: Orders ──HTTP/Events──► Payment Service
```

## Fora do MVP

- Integração real com cartão
- PIX real
- Gateway de pagamento de terceiros
