# BRAND+ Backend API — Módulo de Autorização de Acesso ao SaaS

Este módulo centraliza e isola o controle de acesso e autorização ao **SaaS Operacional da BRAND+**.

## URL de Entrada Operacional Centralizada
- **URL Padrão:** `https://app.brandplus.com.br/login/brand+`
- **Configuração:** `SAAS_CONFIG.ENTRY_URL` em `backend-api/config.ts`

## Autoridade de Acesso (Backend)
O frontend do Portal do Cliente **NUNCA** deve navegar diretamente para uma URL hardcoded. Ele obrigatoriamente consulta o backend:

```http
GET /api/v1/saas/access
```

### Regra Estrita de Liberação
O acesso ao SaaS é liberado **EXCLUSIVAMENTE** quando todos os critérios abaixo forem atendidos:
1. `subscriptionStatus === 'active'` (ou `trialing`)
2. `provisioningStatus === 'ready'`
3. `accessEnabled === true`

### Resposta JSON (Sucesso)
```json
{
  "accessEnabled": true,
  "accessUrl": "https://app.brandplus.com.br/login/brand+",
  "tenantId": "ten_requinte_01",
  "tenantSlug": "requinte-calcados",
  "subscriptionStatus": "active",
  "provisioningStatus": "ready",
  "message": "Acesso autorizado ao ambiente operacional BRAND+."
}
```

### Mensagens Específicas para Bloqueio
- **Assinatura Pendente:** `"Seu ambiente será liberado após a confirmação do pagamento."`
- **Ambiente Provisionando:** `"Estamos preparando seu ambiente BRAND+."`
- **Falha no Provisionamento:** `"Não foi possível preparar seu ambiente. Nossa equipe precisa verificar a ativação."`
- **Assinatura Inativa:** `"Assinatura inativa, cancelada ou suspensa. Entre em contato com o suporte."`

## Arquitetura de Autenticação Separada (SSO / OIDC Ready)
- **Portal do Cliente:** Autenticação comercial / administrativa independente.
- **SaaS Operacional:** Aplicação de PDV, catálogo, estoque e IA com controle de sessão próprio, preparado para futuro handshake via OIDC/SSO.
