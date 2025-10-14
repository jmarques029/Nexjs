# JC Encadernados - Sistema de Capas com Next.js e TypeScript

Este é um projeto Next.js com TypeScript configurado para testes e Docker, implementando um sistema de gerenciamento de capas personalizadas com arquitetura Domain-Driven Design (DDD).

## Tecnologias Utilizadas
- Next.js 14 com App Router
- TypeScript para tipagem estática
- Jest para testes unitários
- React Testing Library para testes de componentes
- Docker para containerização
- Tailwind CSS para estilização
- Styled Components para CSS-in-JS

## Arquitetura do Projeto
- **Domain Layer**: Entidades, Value Objects, Repositórios e Use Cases
- **Infrastructure Layer**: Implementações de repositórios e serviços externos
- **Application Layer**: Componentes React, páginas e UI
- **Test Layer**: Testes unitários, de integração e componentes

## Estrutura de Testes
- `/src/test/` - Testes unitários de domínio
- `/src/components/__tests__/` - Testes de componentes React
- `/tests/` - Testes de integração
- Coverage configurado para todas as camadas

## Comandos Importantes
- `npm install` - Instalar dependências
- `npm run dev` - Servidor de desenvolvimento
- `npm run test` - Executar todos os testes
- `npm run test:watch` - Testes em modo watch
- `npm run test:coverage` - Relatório de cobertura
- `npm run test:console` - Testes de domínio no console
- `npm run build` - Build de produção
- `npm run lint` - Linting do código
- `docker-compose up` - Executar com Docker
- `docker-compose up jc-encadernados-test` - Executar apenas testes

## Padrões de Desenvolvimento
- Domain-Driven Design (DDD)
- Test-Driven Development (TDD)
- Clean Architecture
- SOLID Principles
- Responsive Design com Tailwind CSS

## Entidades e Value Objects
- **Capa**: Entidade principal com validações de negócio
- **Rating**: Value Object para avaliações (1-5)
- **PrecoValue**: Value Object para preços com formatação
- **ImagemValue**: Value Object para URLs de imagens

## Casos de Uso Implementados
- Listar todas as capas
- Listar capas populares
- Listar capas recomendadas
- Filtrar por categoria
- Buscar capas

## Docker Configuration
- Ambiente de desenvolvimento isolado
- Node.js 22.19.0
- Usuário não-root para segurança
- Hot reload habilitado
- Serviço separado para testes