# US09 — Consultar pedidos

## História

**Como** cliente,  
**quero** visualizar meus pedidos,  
**para** acompanhar minhas compras.

## Ator

Cliente autenticado (`CUSTOMER`)  
Administrador pode consultar pedidos (escopo administrativo).

## Endpoints

```
GET /api/orders
GET /api/orders/:id
```

## Dados envolvidos

Entidades: [`Order`](../data-model.md), [`OrderItem`](../data-model.md)

Resposta deve incluir:

| Informação | Origem |
|------------|--------|
| Status | `Order.status` |
| Total | `Order.total` |
| Itens | `OrderItem[]` (nome, preço unitário, quantidade, subtotal) |

## Critérios de aceitação

- [ ] Cliente só pode visualizar seus próprios pedidos
- [ ] Pedidos devem apresentar status
- [ ] Pedido deve apresentar itens
- [ ] Pedido deve apresentar total

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem autenticação |
| `ORDER_NOT_FOUND` | Pedido inexistente |
| `FORBIDDEN` | Tentativa de acessar pedido de outro usuário |

## Observações

Itens refletem o **snapshot** da compra, não o preço/nome atuais do catálogo.
