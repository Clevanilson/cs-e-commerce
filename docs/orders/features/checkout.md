# US08 — Finalizar compra (Checkout)

## História

**Como** cliente,  
**quero** finalizar meu carrinho,  
**para** criar um pedido.

## Ator

Cliente autenticado (`CUSTOMER`)

## Endpoint

```
POST /api/orders
Authorization: Bearer <token>
```

## Fluxo principal

```
Cliente
   │
   ▼
POST /api/orders
   │
   ▼
CreateOrder
   │
   ├── valida usuário
   ├── valida carrinho
   ├── verifica produtos
   ├── verifica estoque
   ├── calcula total
   ├── cria Order
   ├── cria OrderItems (snapshot)
   ├── baixa estoque
   ├── cria Payment
   └── limpa carrinho
```

### Diagrama de decisão

```
              Carrinho existe?
                 /        \
               não        sim
                │          │
                ▼          ▼
              Erro    Carrinho vazio?
                           │
                      ┌────┴────┐
                     sim        não
                      │          │
                      ▼          ▼
                    Erro    Validar produtos
                                │
                                ▼
                         Verificar estoque
                                │
                                ▼
                          Calcular total
                                │
                                ▼
                         Criar Order + Items
                                │
                                ▼
                         Baixar estoque
                                │
                                ▼
                         Criar Payment
                                │
                                ▼
                         Limpar carrinho
                                │
                                ▼
                         Retornar pedido
```

## Atomicidade

Cenário **proibido**:

```
Order criado → OrderItem criado → estoque não atualizado → erro
```

O sistema garante atomicidade com transação de banco.

## Dados envolvidos

Entidades: [`Order`](../data-model.md), [`OrderItem`](../data-model.md)  
Também: Cart/CartItem, Product (gateway), Payment

### Exemplo de request

```json
{
  "items": [
    { "productId": "9e3c...", "quantity": 2 },
    { "productId": "2a71...", "quantity": 1 }
  ]
}
```

> Alternativa válida no MVP: derivar itens exclusivamente do carrinho persistido, sem body de `items`. Se ambos existirem no contrato, o documento de API deve definir a fonte da verdade. O fluxo de negócio permanece o mesmo.

### Exemplo de response

```json
{
  "id": "order-123",
  "status": "PENDING",
  "items": [
    {
      "productId": "9e3c...",
      "productName": "Teclado",
      "unitPrice": 250,
      "quantity": 2,
      "subtotal": 500
    },
    {
      "productId": "2a71...",
      "productName": "Mouse",
      "unitPrice": 100,
      "quantity": 1,
      "subtotal": 100
    }
  ],
  "total": 600
}
```

## Critérios de aceitação

- [ ] Carrinho não pode estar vazio
- [ ] Todos os produtos precisam estar ativos
- [ ] Estoque deve ser suficiente
- [ ] Preço utilizado deve ser o preço **atual** no momento do checkout
- [ ] Pedido deve armazenar snapshot dos produtos (`product_name`, `unit_price`)
- [ ] Estoque deve ser atualizado
- [ ] Operação deve ser transacional

## Erros esperados

| Código | Situação |
|--------|----------|
| `UNAUTHORIZED` | Sem autenticação |
| `CART_EMPTY` | Carrinho vazio |
| `PRODUCT_NOT_FOUND` | Produto removido |
| `PRODUCT_INACTIVE` | Produto inativo |
| `PRODUCT_OUT_OF_STOCK` | Estoque insuficiente |

## Observações

Status inicial do pedido: `PENDING`. Atualização para `PAID` / rejeição ocorre no módulo [Payments](../../payments/README.md).
