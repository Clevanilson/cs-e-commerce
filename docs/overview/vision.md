# Visão geral

## Contexto

Plataforma de e-commerce MVP desenvolvida como **monólito modular**, com Node.js + TypeScript e princípios de **Clean Architecture**.

## Objetivos de negócio

| Ator | Capacidade |
|------|------------|
| Cliente | Conta, catálogo, carrinho, checkout e acompanhamento de pedidos |
| Administrador | Cadastro de produtos e controle de estoque |

## Objetivos técnicos

O projeto também demonstra:

- Node.js e TypeScript
- API REST
- Clean Architecture
- Monólito modular
- Modelagem relacional (PostgreSQL)
- Autenticação e autorização
- Testes unitários e de integração
- Docker
- Documentação de API
- Controle transacional
- Tratamento de erros
- Preparação para evolução (Redis, mensageria, microsserviços)

## Resultado esperado

Mais do que uma API CRUD: um e-commerce pequeno, arquiteturalmente estruturado, com fronteiras claras para evolução futura (ex.: extrair `Payments` para microsserviço).
