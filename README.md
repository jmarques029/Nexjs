# JC Encadernados - Sistema de Capas com Next.js e TypeScript

Este projeto implementa um sistema de gerenciamento de capas personalizadas usando Next.js 14, TypeScript, e arquitetura Domain-Driven Design (DDD) com testes abrangentes.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React para aplicações web
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Jest** - Framework de testes unitários
- **React Testing Library** - Testes de componentes React
- **Docker** - Containerização da aplicação
- **Tailwind CSS** - Framework CSS para estilização
- **Styled Components** - CSS-in-JS para componentes estilizados

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router do Next.js 14
│   ├── layout.tsx               # Layout raiz da aplicação
│   ├── page.tsx                 # Página principal
│   └── globals.css              # Estilos globais
├── components/                   # Componentes React
│   ├── ui/                      # Componentes de UI reutilizáveis
│   └── __tests__/               # Testes dos componentes
├── domain/                       # Camada de domínio (DDD)
│   ├── entities/                # Entidades de negócio
│   │   └── Capa.ts
│   ├── value-objects/           # Objetos de valor
│   │   ├── Rating.ts
│   │   ├── PrecoValue.ts
│   │   └── ImagemValue.ts
│   ├── repositories/            # Interfaces dos repositórios
│   │   └── CapaRepository.ts
│   └── use-cases/               # Casos de uso da aplicação
│       └── ListarCapas.ts
├── inframocks/                   # Implementações mock
│   ├── MockCapaRepository.ts
│   └── CapasExemplo.ts
├── test/                         # Testes unitários
│   ├── Capa.test.ts
│   └── Rating.test.ts
└── lib/                          # Utilitários
    └── utils.ts
```

## 🧪 Estrutura de Testes

### Testes Unitários
- **Entidades**: Testam a lógica de negócio das entidades
- **Value Objects**: Validam as regras dos objetos de valor
- **Use Cases**: Verificam a execução dos casos de uso

### Testes de Componentes
- **Renderização**: Verificam se os componentes renderizam corretamente
- **Interação**: Testam a interação do usuário com os componentes
- **Props**: Validam o comportamento com diferentes propriedades

### Tipos de Teste por Pasta

```
/tests/                           # Testes de integração
├── integration/                  # Testes de integração entre camadas
└── e2e/                         # Testes end-to-end (futuro)

/src/test/                        # Testes unitários de domínio
├── Capa.test.ts                 # Testes da entidade Capa
├── Rating.test.ts               # Testes do value object Rating
└── executarTodos.ts             # Script para executar todos os testes

/src/components/__tests__/        # Testes de componentes React
├── button.test.tsx              # Testes do componente Button
└── ...                          # Outros testes de componentes
```

## 🐳 Configuração Docker

### Dockerfile
- Baseado em Node.js 22.19.0
- Configuração de usuário não-root para segurança
- Otimizado para desenvolvimento

### Docker Compose
- **jc-encadernados-app**: Serviço principal da aplicação
- **jc-encadernados-test**: Serviço dedicado para execução de testes
- Rede isolada para comunicação entre serviços

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linting do código

# Testes
npm run test         # Executa todos os testes Jest
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Gera relatório de cobertura
npm run test:console # Executa testes de domínio no console

# Docker
docker-compose up              # Inicia aplicação com Docker
docker-compose up jc-encadernados-test  # Executa apenas os testes
```

## 🎯 Casos de Uso Implementados

### Domínio de Capas
- **Listar Capas**: Recupera todas as capas disponíveis
- **Listar Capas Populares**: Filtra capas marcadas como populares
- **Listar Capas Recomendadas**: Filtra capas recomendadas
- **Listar por Categoria**: Filtra capas por categoria específica
- **Buscar Capas**: Pesquisa capas por nome ou categoria

### Validações Implementadas
- **Rating**: Valores entre 1-5, números inteiros
- **Preço**: Valores não negativos, formatação brasileira
- **Imagem**: URLs válidas, extensões permitidas
- **Capa**: Campos obrigatórios, regras de negócio

## 🧪 Exemplos de Testes

### Teste de Entidade
```typescript
describe('Capa Entity', () => {
  it('deve criar uma capa válida', () => {
    const capa = Capa.create(
      'test-id',
      'Capa Teste',
      ImagemValue.create('./image/teste.png'),
      Rating.create(4),
      PrecoValue.create(25.90),
      'Teste'
    );

    expect(capa.nome).toBe('Capa Teste');
    expect(capa.popular).toBe(false);
  });
});
```

### Teste de Componente
```typescript
describe('Button Component', () => {
  it('deve renderizar o botão com texto', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toBeInTheDocument();
  });
});
```

## 🌐 Funcionalidades da Interface

### Página Principal
- Listagem de capas em grid responsivo
- Exibição de informações: nome, categoria, preço, rating
- Badges para capas populares e recomendadas
- Loading state durante carregamento dos dados

### Componentes Reutilizáveis
- **Button**: Componente de botão com variações de estilo
- **Card**: Componente para exibição de informações das capas
- **Loading**: Componente de carregamento

## 🔧 Configurações de Desenvolvimento

### TypeScript
- Configuração rigorosa de tipos
- Path mapping para imports absolutos (`@/`)
- Tipos para Jest e React Testing Library

### Jest
- Ambiente jsdom para testes de componentes
- Configuração customizada para Next.js
- Cobertura de código habilitada
- Setup automático do Testing Library

### ESLint
- Regras do Next.js e TypeScript
- Configuração para testes
- Ignora arquivos de build

## 🎨 Estilização

### Tailwind CSS
- Framework utilitário para CSS
- Configuração responsiva
- Dark mode habilitado

### Styled Components
- CSS-in-JS para componentes específicos
- Baseado no design do projeto original
- Temas e variáveis de cor

## 📊 Cobertura de Testes

O projeto visa manter alta cobertura de testes:

- **Domínio**: 100% das entidades e value objects
- **Use Cases**: 100% dos casos de uso
- **Componentes**: Mínimo 80% dos componentes UI
- **Integração**: Fluxos principais da aplicação

## 🚀 Deploy

### Desenvolvimento Local
```bash
# Com npm
npm install
npm run dev

# Com Docker
docker-compose up
```

### Produção
```bash
npm run build
npm start
```

### Docker Produção
```dockerfile
# Build de produção
docker build -t jc-encadernados .
docker run -p 3000:3000 jc-encadernados
```

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Execute os testes (`npm test`)
4. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: [Seu Nome]
- **Arquitetura**: Domain-Driven Design
- **Testes**: Jest + React Testing Library
- **Deploy**: Docker + Next.js

---

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: suporte@jcencadernados.com
- GitHub Issues: [Criar Issue](https://github.com/seu-usuario/jc-encadernados/issues)

---

*Desenvolvido com ❤️ usando Next.js, TypeScript e as melhores práticas de desenvolvimento*