# US01 — Cadastro

## História

**Como** visitante,  
**quero** criar uma conta,  
**para** poder realizar compras.

## Ator

Visitante (não autenticado)

## Endpoint

```
POST /auth/register
```

## Dados envolvidos

Entidade: [`User`](../data-model.md)

Campos de entrada (conceitual):

| Campo | Obrigatório | Observação |
|-------|-------------|------------|
| `name` | Sim | Nome do usuário |
| `email` | Sim | Deve ser válido e único |
| `password` | Sim | Política mínima de senha |

Persistência:

| Campo | Origem |
|-------|--------|
| `id` | Gerado (UUID) |
| `password_hash` | Hash da senha informada |
| `role` | Fixo: `CUSTOMER` |
| `created_at` / `updated_at` | Sistema |

## Critérios de aceitação

- [ ] Nome deve ser informado
- [ ] E-mail deve ser válido
- [ ] E-mail não pode estar cadastrado
- [ ] Senha deve respeitar a política mínima
- [ ] Senha deve ser armazenada com hash
- [ ] Usuário criado recebe role `CUSTOMER`

## Erros esperados

| Código | Situação |
|--------|----------|
| `USER_ALREADY_EXISTS` | E-mail já cadastrado |
| `VALIDATION_ERROR` | Nome/e-mail/senha inválidos |

## Observações

Após o cadastro, o cliente autentica-se via [US02 — Login](./login.md).
