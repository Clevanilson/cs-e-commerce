# Feature — Criar / simular pagamento

## História

**Como** cliente,  
**quero** registrar/simular o pagamento do meu pedido,  
**para** concluir a compra sem integração real de gateway.

## Ator

Cliente autenticado (`CUSTOMER`) — dono do pedido  
Sistema — cria pagamento `PENDING` durante o checkout

## Endpoints

```
GET  /api/orders/:orderId/payment
POST /api/orders/:orderId/payment
```

## Fluxo no MVP

1. No [checkout](../../orders/features/checkout.md), o sistema cria `Payment` com status `PENDING` e `amount = order.total` (dentro da mesma transação).
2. Via `POST /api/orders/:orderId/payment`, o cliente (ou ambiente de teste) simula:
   - aprovação → `Payment.status = APPROVED` e `Order.status = PAID`
   - rejeição → `Payment.status = REJECTED` (e política de pedido associada)

## Dados envolvidos

Entidade: [`Payment`](../data-model.md)

| Campo | Origem |
|-------|--------|
| `order_id` | Pedido existente do usuário |
| `amount` | `Order.total` |
| `status` | `PENDING` → `APPROVED` \| `REJECTED` |

## Critérios de aceitação

- [ ] Pagamento é associado a um único pedido
- [ ] Valor do pagamento corresponde ao total do pedido
- [ ] É possível consultar o pagamento do pedido
- [ ] É possível simular aprovação
- [ ] É possível simular rejeição
- [ ] Cliente só acessa pagamento dos próprios pedidos
- [ ] Aprovação atualiza o status do pedido para `PAID`

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem autenticação |
| `ORDER_NOT_FOUND` | Pedido inexistente |
| `FORBIDDEN` | Pedido de outro usuário |
| `VALIDATION_ERROR` | Pagamento já finalizado / transição inválida |

## Observações

Não há cobrança real, captura de cartão ou PIX. O objetivo é exercitar o ciclo pedido ↔ pagamento e a fronteira do módulo para futura extração.
