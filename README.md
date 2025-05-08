# Gerenciador de Finanças Pessoais

Sistema de controle financeiro pessoal desenvolvido como teste técnico, utilizando React, Chakra UI, React Query e consumindo uma API REST com Node.js.

## Tecnologias Utilizadas

- **Frontend**:
  - React 19
  - Chakra UI para interface
  - React Router para navegação
  - React Query para gerenciamento de estado e chamadas à API
  - React Hook Form para formulários
  - Axios para requisições HTTP
  - Recharts para gráficos

## Estrutura do Projeto

O projeto segue uma estrutura organizada por responsabilidades:

- `/src/components`: Componentes reutilizáveis
- `/src/context`: Contextos React (ex: autenticação)
- `/src/hooks`: Custom hooks
- `/src/pages`: Páginas da aplicação
- `/src/routes`: Configuração de rotas
- `/src/services`: Serviços para comunicação com a API
- `/src/theme`: Configuração do tema Chakra UI
- `/src/utils`: Funções utilitárias

## Funcionalidades

- ✅ Autenticação de usuários (login/registro)
- ✅ Gerenciamento de categorias financeiras
- ✅ Controle de lançamentos (receitas e despesas)
- ✅ Dashboard com resumos e gráficos financeiros

## Etapas Concluídas

- [x] **Etapa 1**: Inicialização do projeto
- [x] **Etapa 2**: Estruturação do projeto (configuração de rotas, temas, serviços)

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```
