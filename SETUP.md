# Script de Configuração do Projeto JC Encadernados

## Pré-requisitos

Este projeto requer Node.js versão 18 ou superior.

### 1. Instalar Node.js

**Windows:**
1. Acesse https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador
4. Reinicie o PowerShell/VS Code

**Verificação:**
```bash
node --version
npm --version
```

### 2. Instalar Dependências

Após instalar o Node.js:

```bash
# Instalar todas as dependências
npm install

# Verificar se instalou corretamente
npm list
```

### 3. Executar o Projeto

```bash
# Servidor de desenvolvimento
npm run dev

# Executar testes
npm test

# Testes em modo watch
npm run test:watch

# Build de produção
npm run build
```

### 4. Docker (Alternativa)

Se preferir usar Docker:

```bash
# Construir e executar
docker-compose up --build

# Apenas testes
docker-compose up jc-encadernados-test
```

### 5. Verificação da Instalação

Execute este comando para verificar se tudo está funcionando:

```bash
npm run test:console
```

### 6. Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (porta 3000)
- `npm run build` - Gera build de produção  
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm test` - Executa todos os testes Jest
- `npm run test:watch` - Testes em modo watch
- `npm run test:coverage` - Relatório de cobertura
- `npm run test:console` - Testes de domínio no console

### Problemas Comuns

**Erro: 'npm' não é reconhecido**
- Node.js não está instalado ou não está no PATH
- Solução: Instalar Node.js e reiniciar terminal

**Erro: Cannot find module**
- Dependências não instaladas
- Solução: `npm install`

**Erro: Port 3000 already in use**
- Porta já está sendo usada
- Solução: `npx kill-port 3000` ou usar porta diferente

### Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
├── components/            # Componentes React
├── domain/               # Lógica de negócio (DDD)
├── inframocks/          # Implementações mock
├── test/                # Testes unitários
└── types/              # Definições de tipos
```