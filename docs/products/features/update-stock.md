# US10 — Atualizar estoque

## História

**Como** administrador,  
**quero** atualizar o estoque,  
**para** manter a disponibilidade dos produtos correta.

## Ator

Administrador (`ADMIN`)

## Endpoint

```
PATCH /products/:id/stock
```

## Dados envolvidos

Entidade: [`Product`](../data-model.md)

| Campo | Uso |
|-------|-----|
| `id` | Identificar o produto |
| `stock` | Novo valor (ou delta, conforme contrato da API) |

## Critérios de aceitação

- [ ] Somente `ADMIN` pode realizar a operação
- [ ] Estoque não pode ficar negativo
- [ ] Alteração deve ser persistida

## Erros esperados

| Código | Situação |
|--------|----------|
| `FORBIDDEN` | Não é ADMIN |
| `PRODUCT_NOT_FOUND` | Produto inexistente |
| `VALIDATION_ERROR` / `PRODUCT_OUT_OF_STOCK` | Tentativa de estoque negativo |

## Observações

- A baixa de estoque no **checkout** é responsabilidade do fluxo de Orders (via `ProductGateway.decreaseStock`), em transação — não substitui este endpoint administrativo.
- Consulta de estoque pode ser feita via `GET /products/:id` ou listagem administrativa.
