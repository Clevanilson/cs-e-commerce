# Modelagem de dados — Users

## Entidade `User`

Representa o cliente ou administrador.

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | UUID | PK |
| `name` | VARCHAR | Obrigatório |
| `email` | VARCHAR | Obrigatório, único |
| `password_hash` | VARCHAR | Obrigatório |
| `role` | ENUM | `CUSTOMER` \| `ADMIN` |
| `created_at` | TIMESTAMP | Obrigatório |
| `updated_at` | TIMESTAMP | Obrigatório |

## Relacionamentos

```
User 1 ───── N Order
User 1 ───── 1 Cart
```

## Tabela `users`

```
┌─────────────────┐
│      users      │
├─────────────────┤
│ id PK           │
│ name            │
│ email UNIQUE    │
│ password_hash   │
│ role            │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

## Regras de domínio

- E-mail deve ser único no sistema
- Senha nunca é persistida em texto puro — apenas `password_hash`
- Novo cadastro via API pública recebe role `CUSTOMER`
- Role `ADMIN` é atribuída por mecanismo controlado (seed/operacional), não pelo fluxo público de registro do MVP

## JWT (claims mínimos)

```json
{
  "sub": "user-id",
  "role": "CUSTOMER"
}
```
