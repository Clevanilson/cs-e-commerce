# US02 — Login

## História

**Como** cliente,  
**quero** realizar login,  
**para** acessar minha conta.

## Ator

Cliente (`CUSTOMER`) ou Administrador (`ADMIN`)

## Endpoint

```
POST /auth/login
```

## Fluxo

```
POST /auth/login
        │
        ▼
Valida credenciais
        │
        ▼
Gera JWT
        │
        ▼
Cliente usa Authorization: Bearer <token>
```

## Dados envolvidos

Entidade: [`User`](../data-model.md)

Entrada:

| Campo | Obrigatório |
|-------|-------------|
| `email` | Sim |
| `password` | Sim |

Saída:

| Campo | Descrição |
|-------|-----------|
| `token` | JWT com `sub` (user id) e `role` |

## Critérios de aceitação

- [ ] E-mail deve existir
- [ ] Senha deve ser validada contra o `password_hash`
- [ ] Credenciais inválidas retornam erro
- [ ] API retorna token
- [ ] Endpoints protegidos exigem autenticação (`Authorization: Bearer`)

## Erros esperados

| Código | Situação |
|--------|----------|
| `INVALID_CREDENTIALS` | E-mail inexistente ou senha incorreta |
| `UNAUTHORIZED` | Token ausente/inválido em rotas protegidas |
| `FORBIDDEN` | Role insuficiente para a operação |

## Observações

- Não revelar se o e-mail existe ou não (mensagem genérica de credenciais inválidas).
- Autorização posterior é baseada em `role` do token.
