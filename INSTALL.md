# 🚀 Instalação e Configuração do Node.js

## Passo 1: Instalar Node.js

### Windows (Método Recomendado)

**Opção A: Via winget (Windows 10/11)**
```powershell
winget install OpenJS.NodeJS
```

**Opção B: Download Manual**
1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (Long Term Support)
3. Execute o instalador
4. Siga as instruções padrão

### Verificar Instalação

Após a instalação, **reinicie o VS Code** e abra um novo terminal:

```powershell
node --version
npm --version
```

Você deve ver algo como:
```
v20.x.x
10.x.x
```

## Passo 2: Instalar Dependências do Projeto

No terminal do VS Code (dentro da pasta do projeto):

```powershell
npm install
```

Este comando irá:
- Baixar todas as dependências do `package.json`
- Criar a pasta `node_modules`
- Gerar o arquivo `package-lock.json`

## Passo 3: Verificar se Tudo Funciona

### Teste básico do domínio:
```powershell
npm run test:domain
```

### Executar servidor de desenvolvimento:
```powershell
npm run dev
```

### Executar testes:
```powershell
npm test
```

## Passo 4: Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor desenvolvimento (localhost:3000) |
| `npm run build` | Build para produção |
| `npm test` | Todos os testes Jest |
| `npm run test:domain` | Teste básico do domínio |
| `npm run lint` | Verificar código |

## Problemas Comuns

### ❌ "npm não é reconhecido"
**Causa**: Node.js não instalado ou não no PATH
**Solução**: 
1. Instalar Node.js
2. Reiniciar VS Code
3. Abrir novo terminal

### ❌ "Cannot find module"
**Causa**: Dependências não instaladas
**Solução**: `npm install`

### ❌ "Port 3000 already in use"
**Causa**: Outro processo usando a porta
**Solução**: 
```powershell
npx kill-port 3000
# ou
npm run dev -- --port 3001
```

### ❌ Erros de TypeScript
**Causa**: Dependências não instaladas
**Solução**: 
```powershell
npm install
npm run build
```

## Next Steps

Após a instalação bem-sucedida:

1. ✅ `npm run test:domain` - Verificar domínio
2. ✅ `npm run dev` - Iniciar desenvolvimento  
3. ✅ Abrir http://localhost:3000
4. ✅ `npm test` - Executar testes completos

## Estrutura de Desenvolvimento

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── page.tsx        # Página principal
│   └── layout.tsx      # Layout global
├── components/         # Componentes React
├── domain/            # Lógica de negócio
├── inframocks/        # Dados de exemplo
└── lib/              # Utilitários
```