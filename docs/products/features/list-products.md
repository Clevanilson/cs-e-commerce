# US03 — Listar produtos

## História

**Como** cliente,  
**quero** visualizar produtos disponíveis,  
**para** escolher o que comprar.

## Ator

Cliente (e visitante, se a listagem for pública no MVP)

## Endpoints

```
GET /api/products
GET /api/products/:id
```

## Dados envolvidos

Entidade: [`Product`](../data-model.md)

Campos apresentados na listagem:

| Campo | Obrigatório na resposta |
|-------|-------------------------|
| `name` | Sim |
| `price` | Sim |
| `stock` | Opcional (pode ser apresentado) |
| `description` | No detalhe |
| `active` | Filtrado (somente ativos) |

## Critérios de aceitação

- [ ] Somente produtos ativos aparecem
- [ ] Produtos devem apresentar nome
- [ ] Preço deve ser apresentado
- [ ] Estoque pode ser apresentado
- [ ] Endpoint deve permitir paginação

## Erros esperados

| Código | Situação |
|--------|----------|
| `PRODUCT_NOT_FOUND` | `GET /api/products/:id` com id inexistente ou inativo para o cliente |

## Observações

- Paginação: query params típicos (`page`, `limit` ou cursor) — detalhe de contrato na OpenAPI.
- Administrador pode ter visão adicional de produtos inativos em endpoint/filtro administrativo (fora do foco desta US de cliente).
