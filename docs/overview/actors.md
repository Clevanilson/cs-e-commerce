# Atores

## Cliente (`CUSTOMER`)

Pode:

- Criar conta
- Fazer login
- Consultar produtos
- Gerenciar o próprio carrinho
- Realizar pedidos
- Consultar seus pedidos

## Administrador (`ADMIN`)

Pode:

- Gerenciar produtos
- Gerenciar estoque
- Consultar pedidos

## Sistema

Responsável por:

- Validar regras de negócio
- Controlar estoque
- Calcular valores
- Criar pedidos
- Manter consistência dos dados (incluindo atomicidade no checkout)
