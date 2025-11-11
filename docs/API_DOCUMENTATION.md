# 📚 Documentação da API - CRM System

Base URL: `http://localhost:3001/api`

---

## 🔐 Autenticação

Todas as rotas (exceto login) requerem autenticação via JWT token no header:
```
Authorization: Bearer <token>
```

---

## 📋 Endpoints

### **Auth**

#### POST `/api/auth/login`
Fazer login e obter token JWT

**Request Body:**
```json
{
  "email": "joao@empresa.com",
  "password": "client123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "joao@empresa.com",
    "name": "João Silva",
    "role": "client"
  }
}
```

#### GET `/api/auth/me`
Obter dados do usuário logado

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": "uuid",
  "email": "joao@empresa.com",
  "name": "João Silva",
  "role": "client",
  "status": "active"
}
```

---

### **Users** (Admin only)

#### GET `/api/users`
Listar todos os usuários

**Response (200):**
```json
[
  {
    "id": "uuid",
    "email": "admin@crm.com",
    "name": "Administrador",
    "role": "admin",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### POST `/api/users`
Criar novo usuário

**Request Body:**
```json
{
  "email": "novo@email.com",
  "password": "senha123",
  "name": "Novo Usuário",
  "role": "client"
}
```

#### PATCH `/api/users/:id/status`
Atualizar status do usuário

**Request Body:**
```json
{
  "status": "inactive"
}
```

#### DELETE `/api/users/:id`
Excluir usuário

---

### **Leads**

#### GET `/api/leads`
Listar todos os leads do usuário

**Query Params:**
- `clientId` (admin only): ID do cliente

**Response (200):**
```json
[
  {
    "id": "uuid",
    "client_id": "uuid",
    "funnel_id": "uuid",
    "funnel_name": "Funil Padrão",
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": "(11) 98765-4321",
    "origin": "Google Ads",
    "stage": "novo",
    "tags": ["urgente", "vip"],
    "notes": "Cliente interessado em...",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### GET `/api/leads/:id`
Obter detalhes de um lead

**Response (200):**
```json
{
  "id": "uuid",
  "client_id": "uuid",
  "funnel_id": "uuid",
  "funnel_name": "Funil Padrão",
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "(11) 98765-4321",
  "origin": "Google Ads",
  "stage": "novo",
  "tags": ["urgente", "vip"],
  "notes": "Cliente interessado em...",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### POST `/api/leads`
Criar novo lead

**Request Body:**
```json
{
  "funnelId": "uuid",
  "name": "Pedro Oliveira",
  "email": "pedro@email.com",
  "phone": "(11) 97654-3210",
  "origin": "Indicação",
  "stage": "novo",
  "tags": ["interessado"],
  "notes": "Indicação de João"
}
```

#### PUT `/api/leads/:id`
Atualizar lead

**Request Body:**
```json
{
  "name": "Pedro Oliveira Silva",
  "email": "pedro.silva@email.com",
  "phone": "(11) 97654-3210",
  "origin": "Indicação",
  "stage": "contato",
  "tags": ["interessado", "qualificado"],
  "notes": "Primeiro contato realizado"
}
```

#### DELETE `/api/leads/:id`
Excluir lead

**Response (200):**
```json
{
  "message": "Lead excluído com sucesso"
}
```

#### GET `/api/leads/:id/history`
Obter histórico de mudanças de estágio

**Response (200):**
```json
[
  {
    "id": "uuid",
    "lead_id": "uuid",
    "from_stage": "novo",
    "to_stage": "contato",
    "changed_by": "uuid",
    "changed_by_name": "João Silva",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

---

### **Origins**

#### GET `/api/origins`
Listar todas as origens do usuário

**Response (200):**
```json
[
  {
    "id": "uuid",
    "client_id": "uuid",
    "name": "Google Ads",
    "color": "#4285f4",
    "is_default": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### POST `/api/origins`
Criar nova origem

**Request Body:**
```json
{
  "name": "Instagram",
  "color": "#E4405F"
}
```

#### PUT `/api/origins/:id`
Atualizar origem

**Request Body:**
```json
{
  "name": "Instagram Ads",
  "color": "#E4405F"
}
```

#### DELETE `/api/origins/:id`
Excluir origem (não pode excluir origens padrão)

---

### **Funnels**

#### GET `/api/funnels`
Listar todos os funis do usuário

**Response (200):**
```json
[
  {
    "id": "uuid",
    "client_id": "uuid",
    "name": "Funil Padrão",
    "stages": [
      {
        "id": "novo",
        "name": "Novo Lead",
        "color": "#3b82f6"
      },
      {
        "id": "contato",
        "name": "Primeiro Contato",
        "color": "#8b5cf6"
      }
    ],
    "is_default": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### GET `/api/funnels/:id`
Obter detalhes de um funil

#### POST `/api/funnels`
Criar novo funil

**Request Body:**
```json
{
  "name": "Funil de Vendas B2B",
  "stages": [
    {
      "id": "prospeccao",
      "name": "Prospecção",
      "color": "#3b82f6"
    },
    {
      "id": "qualificacao",
      "name": "Qualificação",
      "color": "#8b5cf6"
    }
  ]
}
```

#### PUT `/api/funnels/:id`
Atualizar funil

#### DELETE `/api/funnels/:id`
Excluir funil (não pode excluir funis padrão)

---

## 📊 Códigos de Status HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔒 Roles e Permissões

### Admin
- Acesso total a todos os endpoints
- Pode gerenciar usuários
- Pode ver dados de todos os clientes

### Client
- Acesso apenas aos próprios dados
- Pode gerenciar leads, origens e funis
- Não pode acessar rotas de gerenciamento de usuários

---

## 🧪 Exemplos de Uso

### JavaScript/Fetch
```javascript
// Login
const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'joao@empresa.com',
    password: 'client123'
  })
});
const { token } = await response.json();

// Buscar leads
const leads = await fetch('http://localhost:3001/api/leads', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### cURL
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@empresa.com","password":"client123"}'

# Buscar leads
curl http://localhost:3001/api/leads \
  -H "Authorization: Bearer <token>"
```

---

## 🐛 Tratamento de Erros

Todas as respostas de erro seguem o formato:
```json
{
  "error": "Mensagem de erro descritiva"
}
```

Exemplos:
- `"Token não fornecido"` - Falta o header Authorization
- `"Token inválido"` - Token JWT expirado ou inválido
- `"Credenciais inválidas"` - Email ou senha incorretos
- `"Acesso negado"` - Usuário não tem permissão
- `"Não encontrado"` - Recurso não existe