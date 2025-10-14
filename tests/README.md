# Estrutura de Testes

Esta pasta contém todos os testes do projeto organizados por categoria e responsabilidade.

## 📁 Estrutura

```
tests/
├── domain/                 # Testes da camada de domínio
│   ├── value-objects/     # Testes dos Value Objects
│   │   ├── rating.test.ts           # Rating (1-5 estrelas)
│   │   └── preco-value.test.ts      # PrecoValue (formatação, validação)
│   ├── entities/          # Testes das Entidades
│   │   └── capa.test.ts             # Entidade Capa
│   └── use-cases/         # Testes dos Casos de Uso
│       └── listar-capas.test.ts     # Use Case ListarCapas
├── components/            # Testes dos Componentes React
│   ├── button.test.tsx              # Componente Button
│   └── capa-card.test.tsx           # Componente CapaCard
└── api/                   # Testes das APIs/Routes
    └── capas.test.ts                # Endpoint /api/capas
```

## 🧪 Tipos de Teste

### **Domain Tests** (Lógica de Negócio)
- **Value Objects**: Validação, formatação, regras de negócio
- **Entities**: Criação, comportamento, invariantes
- **Use Cases**: Orquestração, fluxos de negócio

### **Component Tests** (Interface)
- **UI Components**: Renderização, interação, propriedades
- **Integration**: Integração entre componentes

### **API Tests** (Endpoints)
- **Routes**: Responses, status codes, query parameters
- **Error Handling**: Tratamento de erros e edge cases

## 🏃‍♂️ Executar Testes

```bash
# Todos os testes
npm test

# Testes específicos por categoria
npm test -- tests/domain
npm test -- tests/components  
npm test -- tests/api

# Testes específicos por arquivo
npm test -- rating.test.ts
npm test -- capa.test.ts

# Com coverage
npm run test:coverage

# Em modo watch
npm run test:watch
```

## 📊 Cobertura Esperada

- **Domain Layer**: 100% (lógica crítica de negócio)
- **Components**: 90%+ (interações principais)
- **API Routes**: 85%+ (responses e error handling)

## 🔧 Configuração

- **Jest**: Framework de testes principal
- **React Testing Library**: Testes de componentes
- **@testing-library/jest-dom**: Matchers customizados
- **ts-jest**: Transpilação TypeScript

## 📝 Padrões de Nomenclatura

- **Arquivos**: `[nome].test.ts` ou `[nome].test.tsx`
- **Describes**: Nome da entidade/componente testado
- **It blocks**: Comportamento esperado em português
- **Mocks**: Prefixo `mock` + nome da dependência

## 🎯 Boas Práticas

1. **AAA Pattern**: Arrange, Act, Assert
2. **Testes isolados**: Cada teste independente
3. **Mocks apropriados**: Mock dependências externas
4. **Nomes descritivos**: Testes autoexplicativos
5. **Edge cases**: Testar cenários limite
6. **Setup/Teardown**: beforeEach/afterEach quando necessário