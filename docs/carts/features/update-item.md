# US06 — Alterar carrinho

## História

**Como** cliente,  
**quero** alterar a quantidade de produtos,  
**para** ajustar minha compra.

## Ator

Cliente autenticado (`CUSTOMER`)

## Endpoint

```
PATCH /cart/items/:id
```

Também relacionado:

```
GET /cart
```

## Dados envolvidos

Entidade: [`CartItem`](../data-model.md)

| Campo | Regra |
|-------|-------|
| `id` | Item deve pertencer ao carrinho do usuário autenticado |
| `quantity` | `> 0` e `<= stock` do produto |

## Critérios de aceitação

- [ ] Quantidade deve ser maior que zero
- [ ] Quantidade não pode ultrapassar estoque
- [ ] Cliente só pode alterar seu próprio carrinho

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem autenticação |
| `FORBIDDEN` / `NOT_FOUND` | Item de outro usuário |
| `PRODUCT_OUT_OF_STOCK` | Quantidade acima do estoque |
| `VALIDATION_ERROR` | Quantidade `<= 0` |

## Observações

Para zerar a quantidade, o fluxo esperado é [US07 — Remover](./remove-item.md), não `quantity = 0`.
