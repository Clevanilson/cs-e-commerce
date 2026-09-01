# US07 — Remover produto do carrinho

## História

**Como** cliente,  
**quero** remover um produto,  
**para** não comprá-lo.

## Ator

Cliente autenticado (`CUSTOMER`)

## Endpoint

```
DELETE /api/cart/items/:id
```

## Dados envolvidos

Entidade: [`CartItem`](../data-model.md)

| Campo | Uso |
|-------|-----|
| `id` | Identificador do item |
| `cart_id` | Deve pertencer ao carrinho do cliente autenticado |

## Critérios de aceitação

- [ ] Item deve pertencer ao carrinho do cliente
- [ ] Item deve ser removido
- [ ] Estoque do produto **não** deve ser alterado

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem autenticação |
| `NOT_FOUND` / `FORBIDDEN` | Item inexistente ou de outro usuário |

## Observações

Remoção é apenas sobre o carrinho. Estoque só muda no checkout (Orders) ou via atualização administrativa (Products / US10).
