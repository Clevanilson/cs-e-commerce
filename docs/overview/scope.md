# Escopo do MVP

## Dentro do escopo

### Cliente

- Cadastro
- Login / autenticação
- Visualização de produtos e detalhes
- Carrinho (adicionar, remover, alterar quantidade)
- Checkout / criação de pedido
- Consulta dos próprios pedidos

### Administrador

- Cadastro e atualização de produtos
- Ativação / desativação de produtos
- Consulta e atualização de estoque

### Sistema

- Controle de estoque
- Cálculo do total do pedido
- Persistência em PostgreSQL
- Controle de transações
- Validação de dados
- Tratamento de erros
- Autorização por perfil

## Fora do escopo (versões futuras)

- Pagamento real (cartão, PIX)
- Cálculo de frete / transportadoras
- Cupons
- Avaliações de produtos
- Wishlist
- Recomendação de produtos
- Marketplace / múltiplos vendedores
- Notificações por WhatsApp
- Microsserviços, Kafka, Elasticsearch

> No MVP, o pagamento é **simulado**.
