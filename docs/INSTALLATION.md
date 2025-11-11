# 🚀 Guia de Instalação - CRM System

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

**OU**

- **Docker** e **Docker Compose** ([Download](https://www.docker.com/))

---

## 🐳 Opção 1: Instalação com Docker (Recomendado)

### Passo 1: Clone o repositório
```bash
git clone <seu-repositorio>
cd crm-system
```

### Passo 2: Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` e altere:
- `DB_PASSWORD`: Senha do banco de dados
- `JWT_SECRET`: Chave secreta para JWT (use uma string aleatória longa)
- `FRONTEND_URL`: URL do seu domínio (ex: https://crm.seudominio.com)

### Passo 3: Inicie os containers
```bash
docker-compose up -d
```

### Passo 4: Execute as migrações do banco de dados
```bash
docker exec -it crm-backend npm run migrate
docker exec -it crm-backend npm run seed
```

### Passo 5: Acesse a aplicação
- Frontend: http://localhost
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Usuários padrão criados:
- **Admin**: admin@crm.com / admin123
- **Cliente**: joao@empresa.com / client123

---

## 💻 Opção 2: Instalação Manual

### Passo 1: Clone o repositório
```bash
git clone <seu-repositorio>
cd crm-system
```

### Passo 2: Configure o PostgreSQL

Crie o banco de dados:
```sql
CREATE DATABASE crm_database;
CREATE USER crm_user WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE crm_database TO crm_user;
```

### Passo 3: Configure o Backend

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3001
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crm_database
DB_USER=crm_user
DB_PASSWORD=sua_senha_aqui
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

Instale as dependências e execute as migrações:
```bash
npm install
npm run migrate
npm run seed
npm start
```

### Passo 4: Configure o Frontend

```bash
cd ../frontend
npm install
```

Edite o arquivo `src/config/api.ts` e configure a URL da API:
```typescript
export const API_BASE_URL = 'http://localhost:3001/api';
```

Build e inicie:
```bash
npm run build
npm run preview
```

---

## 🌐 Deploy no VPS Hostinger

### Passo 1: Conecte ao seu VPS via SSH
```bash
ssh root@seu-ip-vps
```

### Passo 2: Instale o Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Passo 3: Clone o repositório
```bash
git clone <seu-repositorio>
cd crm-system
```

### Passo 4: Configure as variáveis de ambiente
```bash
cp .env.example .env
nano .env
```

Altere:
- `DB_PASSWORD`: Senha forte
- `JWT_SECRET`: Chave secreta forte (gere com: `openssl rand -base64 32`)
- `FRONTEND_URL`: Seu domínio (ex: https://crm.seudominio.com)

### Passo 5: Inicie a aplicação
```bash
docker-compose up -d
```

### Passo 6: Execute as migrações
```bash
docker exec -it crm-backend npm run migrate
docker exec -it crm-backend npm run seed
```

### Passo 7: Configure o domínio

No painel da Hostinger, aponte seu domínio para o IP do VPS.

### Passo 8: Configure SSL (Opcional mas recomendado)

Instale o Certbot:
```bash
apt-get update
apt-get install certbot python3-certbot-nginx
certbot --nginx -d crm.seudominio.com
```

---

## 🔧 Comandos Úteis

### Docker
```bash
# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Reiniciar containers
docker-compose restart

# Rebuild containers
docker-compose up -d --build

# Acessar banco de dados
docker exec -it crm-postgres psql -U crm_user -d crm_database
```

### Backend
```bash
# Executar migrações
npm run migrate

# Popular banco com dados de exemplo
npm run seed

# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

### Frontend
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 🔒 Segurança

### Checklist de Segurança para Produção:

- [ ] Alterar `DB_PASSWORD` para uma senha forte
- [ ] Alterar `JWT_SECRET` para uma chave aleatória longa
- [ ] Configurar CORS apenas para seu domínio
- [ ] Habilitar HTTPS/SSL
- [ ] Configurar firewall (permitir apenas portas 80, 443, 22)
- [ ] Alterar senha padrão do admin
- [ ] Configurar backup automático do banco de dados
- [ ] Configurar logs de auditoria
- [ ] Limitar tentativas de login

---

## 📊 Monitoramento

### Verificar status dos serviços:
```bash
docker-compose ps
```

### Ver logs em tempo real:
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Health Check:
```bash
curl http://localhost:3001/health
```

---

## 🐛 Troubleshooting

### Problema: Backend não conecta ao banco
**Solução**: Verifique se o PostgreSQL está rodando e as credenciais estão corretas no `.env`

### Problema: CORS error no frontend
**Solução**: Configure `CORS_ORIGIN` no backend com a URL correta do frontend

### Problema: JWT inválido
**Solução**: Certifique-se que o `JWT_SECRET` é o mesmo no backend

### Problema: Porta já em uso
**Solução**: Altere as portas no `docker-compose.yml` ou pare o serviço que está usando a porta

---

## 📞 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.

---

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes.