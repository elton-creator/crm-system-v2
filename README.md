# 🚀 CRM System - Sistema Completo de Gestão de Leads

Sistema completo de CRM (Customer Relationship Management) com frontend React, backend Node.js e banco de dados PostgreSQL.

## 📋 Funcionalidades

### Para Clientes:
- ✅ Gestão completa de leads (criar, editar, excluir)
- ✅ Funil de vendas Kanban com drag & drop
- ✅ Gerenciamento de origens de leads
- ✅ Sistema de tags para organização
- ✅ Filtros avançados (origem, data de entrada, data de alteração)
- ✅ Histórico de mudanças de estágio
- ✅ Múltiplos funis personalizáveis

### Para Administradores:
- ✅ Gerenciamento de usuários
- ✅ Controle de status de clientes
- ✅ Visão geral de todos os clientes
- ✅ Acesso a dados de todos os leads

## 🛠️ Tecnologias Utilizadas

### Frontend:
- **React 18** com TypeScript
- **Vite** para build otimizado
- **Tailwind CSS** para estilização
- **Shadcn/ui** para componentes
- **React Router** para navegação
- **React DnD** para drag & drop

### Backend:
- **Node.js** com Express
- **PostgreSQL** para banco de dados
- **JWT** para autenticação
- **bcryptjs** para hash de senhas

### DevOps:
- **Docker** e **Docker Compose**
- **Nginx** para servir frontend
- **PM2** para gerenciamento de processos (opcional)

## 📦 Estrutura do Projeto

```
crm-system/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── config/         # Configurações (DB, etc)
│   │   ├── database/       # Migrations e seeds
│   │   ├── middleware/     # Autenticação, etc
│   │   ├── routes/         # Rotas da API
│   │   └── server.js       # Servidor principal
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── contexts/      # Context API
│   │   ├── services/      # Serviços de API
│   │   ├── config/        # Configurações
│   │   └── lib/           # Utilitários
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── docs/                   # Documentação
│   ├── INSTALLATION.md    # Guia de instalação
│   └── API_DOCUMENTATION.md # Documentação da API
│
├── docker-compose.yml     # Orquestração Docker
├── nginx.conf            # Configuração Nginx
├── .env.example          # Variáveis de ambiente
└── README.md             # Este arquivo
```

## 🚀 Instalação Rápida

### Opção 1: Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone <seu-repositorio>
cd crm-system

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 3. Inicie os containers
docker-compose up -d

# 4. Execute as migrações
docker exec -it crm-backend npm run migrate
docker exec -it crm-backend npm run seed

# 5. Acesse a aplicação
# Frontend: http://localhost
# Backend: http://localhost:3001
```

### Opção 2: Manual

Veja o guia completo em [docs/INSTALLATION.md](docs/INSTALLATION.md)

## 👤 Usuários Padrão

Após executar o seed, você terá:

**Administrador:**
- Email: `admin@crm.com`
- Senha: `admin123`

**Cliente:**
- Email: `joao@empresa.com`
- Senha: `client123`

⚠️ **IMPORTANTE**: Altere essas senhas em produção!

## 📚 Documentação

- [Guia de Instalação Completo](docs/INSTALLATION.md)
- [Documentação da API](docs/API_DOCUMENTATION.md)

## 🔒 Segurança

Antes de colocar em produção:

- [ ] Altere todas as senhas padrão
- [ ] Configure `JWT_SECRET` com valor aleatório forte
- [ ] Configure `DB_PASSWORD` com senha forte
- [ ] Habilite HTTPS/SSL
- [ ] Configure CORS apenas para seu domínio
- [ ] Configure firewall no VPS
- [ ] Configure backup automático do banco

## 🌐 Deploy no VPS Hostinger

```bash
# 1. Conecte via SSH
ssh root@seu-ip-vps

# 2. Instale Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Clone e configure
git clone <seu-repositorio>
cd crm-system
cp .env.example .env
nano .env  # Configure suas variáveis

# 4. Inicie
docker-compose up -d
docker exec -it crm-backend npm run migrate
docker exec -it crm-backend npm run seed

# 5. Configure SSL (opcional mas recomendado)
apt-get install certbot python3-certbot-nginx
certbot --nginx -d crm.seudominio.com
```

## 🔧 Comandos Úteis

```bash
# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Reiniciar
docker-compose restart

# Rebuild
docker-compose up -d --build

# Acessar banco de dados
docker exec -it crm-postgres psql -U crm_user -d crm_database

# Backup do banco
docker exec crm-postgres pg_dump -U crm_user crm_database > backup.sql

# Restaurar backup
docker exec -i crm-postgres psql -U crm_user crm_database < backup.sql
```

## 📊 API Endpoints

Base URL: `http://localhost:3001/api`

### Autenticação
- `POST /auth/login` - Login
- `GET /auth/me` - Usuário atual

### Leads
- `GET /leads` - Listar leads
- `POST /leads` - Criar lead
- `PUT /leads/:id` - Atualizar lead
- `DELETE /leads/:id` - Excluir lead
- `GET /leads/:id/history` - Histórico

### Origens
- `GET /origins` - Listar origens
- `POST /origins` - Criar origem
- `PUT /origins/:id` - Atualizar origem
- `DELETE /origins/:id` - Excluir origem

### Funis
- `GET /funnels` - Listar funis
- `POST /funnels` - Criar funil
- `PUT /funnels/:id` - Atualizar funil
- `DELETE /funnels/:id` - Excluir funil

### Usuários (Admin)
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `PATCH /users/:id/status` - Atualizar status
- `DELETE /users/:id` - Excluir usuário

Documentação completa: [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

## 🐛 Troubleshooting

### Backend não conecta ao banco
```bash
# Verifique se o PostgreSQL está rodando
docker-compose ps

# Verifique os logs
docker-compose logs postgres
docker-compose logs backend

# Verifique as credenciais no .env
```

### CORS Error
```bash
# Configure CORS_ORIGIN no backend/.env
CORS_ORIGIN=http://seu-dominio.com
```

### Porta já em uso
```bash
# Altere as portas no docker-compose.yml
# ou pare o serviço que está usando a porta
```

## 📈 Próximas Funcionalidades

- [ ] Dashboard com estatísticas
- [ ] Relatórios e exportação de dados
- [ ] Notificações por email
- [ ] Integração com WhatsApp
- [ ] App mobile
- [ ] Automações de marketing

## 📝 Licença

MIT License

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para gestão eficiente de leads**