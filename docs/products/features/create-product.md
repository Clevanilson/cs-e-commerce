# US04 — Criar produto

## História

**Como** administrador,  
**quero** cadastrar um produto,  
**para** disponibilizá-lo no catálogo.

## Ator

Administrador (`ADMIN`)

## Endpoints

```
POST /api/products
PATCH /api/products/:id          # atualização
DELETE /api/products/:id         # desativação/remoção lógica conforme implementação
```

Esta história cobre principalmente a **criação**. Atualização e ativação/desativação compartilham as mesmas regras de autorização e validação de domínio.

## Dados envolvidos

Entidade: [`Product`](../data-model.md)

Entrada (criação):

| Campo | Obrigatório | Regra |
|-------|-------------|-------|
| `name` | Sim | — |
| `description` | Não | — |
| `price` | Sim | `> 0` |
| `stock` | Sim | `>= 0` |

Persistência inicial:

| Campo | Valor |
|-------|-------|
| `active` | `true` |
| `id` | UUID gerado |
| `created_at` / `updated_at` | Sistema |

## Critérios de aceitação

- [ ] Somente `ADMIN` pode criar
- [ ] Nome obrigatório
- [ ] Preço maior que zero
- [ ] Estoque maior ou igual a zero
- [ ] Produto inicia ativo

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem token |
| `FORBIDDEN` | Role diferente de `ADMIN` |
| `VALIDATION_ERROR` | Preço/estoque/nome inválidos |
