# Módulo Users

Responsável por **identidade e autenticação**.

## Responsabilidades

- Cadastro de usuários
- Login
- Hash de senha
- Perfil / papel (`CUSTOMER` | `ADMIN`)
- Autorização baseada em role

## Estrutura

```
users/
├── domain/
│   ├── entities/
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

| ID | Feature | Documento |
|----|---------|-----------|
| US01 | Cadastro | [features/register.md](./features/register.md) |
| US02 | Login | [features/login.md](./features/login.md) |

## Endpoints

| Método | Path | Auth |
|--------|------|------|
| `POST` | `/api/auth/register` | Público |
| `POST` | `/api/auth/login` | Público |

## Relacionamentos com outros módulos

- `User 1 ── N Order`
- `User 1 ── 1 Cart`
- Orders e Carts referenciam `user_id`; não acessam o repository interno de Users diretamente além das abstrações necessárias (ex.: identidade via JWT).
