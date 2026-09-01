# US05 — Adicionar ao carrinho

## História

**Como** cliente,  
**quero** adicionar um produto ao carrinho,  
**para** comprá-lo posteriormente.

## Ator

Cliente autenticado (`CUSTOMER`)

## Endpoint

```
POST /api/cart/items
```

## Dados envolvidos

Entidades: [`Cart`](../data-model.md), [`CartItem`](../data-model.md)  
Dependência: Product (via gateway)

Entrada (conceitual):

| Campo | Obrigatório | Regra |
|-------|-------------|-------|
| `productId` | Sim | Produto existente e ativo |
| `quantity` | Sim | `> 0` e `<= stock` |

Comportamento:

1. Garante que o usuário possui um carrinho (cria se necessário)
2. Se `(cart_id, product_id)` já existir → incrementa `quantity`
3. Caso contrário → cria novo `CartItem`

## Critérios de aceitação

- [ ] Usuário precisa estar autenticado
- [ ] Produto precisa existir
- [ ] Produto precisa estar ativo
- [ ] Quantidade deve ser maior que zero
- [ ] Quantidade não pode ultrapassar estoque
- [ ] Se produto já estiver no carrinho, sua quantidade deve ser incrementada

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem autenticação |
| `PRODUCT_NOT_FOUND` | Produto inexistente |
| `PRODUCT_INACTIVE` | Produto inativo |
| `PRODUCT_OUT_OF_STOCK` | Quantidade maior que estoque |

## Observações

Adicionar ao carrinho **não reserva** estoque. A reserva/baixa ocorre no checkout.
