#!/bin/bash

# CRM System - Deploy Script
# Este script automatiza o deploy no VPS

set -e

echo "🚀 Iniciando deploy do CRM System..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para printar com cor
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar se .env existe
if [ ! -f .env ]; then
    print_error "Arquivo .env não encontrado!"
    echo "Copie .env.example para .env e configure suas variáveis:"
    echo "cp .env.example .env"
    exit 1
fi

print_success "Arquivo .env encontrado"

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    echo "Instale o Docker com: curl -fsSL https://get.docker.com | sh"
    exit 1
fi

print_success "Docker instalado"

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado!"
    exit 1
fi

print_success "Docker Compose instalado"

# Parar containers existentes
echo ""
echo "🛑 Parando containers existentes..."
docker-compose down

# Build das imagens
echo ""
echo "🔨 Construindo imagens Docker..."
docker-compose build

# Iniciar containers
echo ""
echo "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar banco de dados ficar pronto
echo ""
echo "⏳ Aguardando banco de dados ficar pronto..."
sleep 10

# Executar migrações
echo ""
echo "📊 Executando migrações do banco de dados..."
docker exec crm-backend npm run migrate

# Executar seed (apenas se for primeira instalação)
read -p "Deseja popular o banco com dados de exemplo? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "🌱 Populando banco de dados..."
    docker exec crm-backend npm run seed
    print_success "Banco de dados populado com sucesso!"
    echo ""
    echo "👤 Usuários criados:"
    echo "   Admin: admin@crm.com / admin123"
    echo "   Cliente: joao@empresa.com / client123"
fi

# Verificar status dos containers
echo ""
echo "📋 Status dos containers:"
docker-compose ps

# Health check
echo ""
echo "🏥 Verificando saúde da aplicação..."
sleep 5

if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    print_success "Backend está respondendo!"
else
    print_error "Backend não está respondendo!"
    echo "Verifique os logs com: docker-compose logs backend"
fi

if curl -f http://localhost > /dev/null 2>&1; then
    print_success "Frontend está respondendo!"
else
    print_warning "Frontend pode não estar acessível ainda"
fi

echo ""
print_success "Deploy concluído!"
echo ""
echo "📱 Acesse a aplicação:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:3001"
echo "   Health Check: http://localhost:3001/health"
echo ""
echo "📝 Comandos úteis:"
echo "   Ver logs: docker-compose logs -f"
echo "   Parar: docker-compose down"
echo "   Reiniciar: docker-compose restart"
echo ""
print_warning "IMPORTANTE: Altere as senhas padrão em produção!"