# FinTrack - Aplicação de Controle Financeiro

Aplicação web para gerenciamento de transações financeiras, construída com React, Vite e Tailwind CSS.

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn

### Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento (abre automaticamente no navegador)
npm run dev

# 3. Construir para produção
npm run build

# 4. Visualizar build de produção
npm run preview

# 5. Verificar linting
npm run lint
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

---

## 📁 Estrutura do Projeto

```
fintrack-pratice/
├── public/                          # Arquivos estáticos
├── src/
│   ├── components/                  # Componentes React reutilizáveis
│   │   ├── ui/                      # Componentes UI base (Radix UI)
│   │   │   ├── avatar.jsx
│   │   │   ├── balance-item.jsx
│   │   │   ├── button.jsx
│   │   │   ├── calendar.jsx
│   │   │   ├── card.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── data-table.jsx
│   │   │   ├── date-picker-demo.jsx
│   │   │   ├── date-picker-with-range.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── form.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── popover.jsx
│   │   │   ├── scroll-area.jsx
│   │   │   ├── sheet.jsx
│   │   │   ├── sonner.jsx
│   │   │   └── table.jsx
│   │   ├── add-transaction-button.jsx      # Botão para adicionar transações
│   │   ├── balance.jsx                     # Componente de exibição de saldo
│   │   ├── date-selection.jsx              # Seletor de datas
│   │   ├── edit-transaction-button.jsx     # Botão para editar transações
│   │   ├── header.jsx                      # Cabeçalho da aplicação
│   │   ├── input-password.jsx              # Input de senha personalizado
│   │   ├── transaction-type-badge.jsx      # Badge para tipo de transação
│   │   └── transactions-table.jsx          # Tabela de transações
│   │
│   ├── pages/                       # Páginas da aplicação
│   │   ├── home.jsx                 # Página inicial
│   │   ├── signin-page.jsx          # Página de login
│   │   ├── signup-page.jsx          # Página de cadastro
│   │   └── not-found.jsx            # Página 404
│   │
│   ├── api/                         # Integração com backend
│   │   ├── hooks/                   # Custom hooks para requisições
│   │   │   ├── transaction.js       # Hooks para transações
│   │   │   └── user.js              # Hooks para usuário
│   │   └── services/                # Serviços de API
│   │       ├── transaction.js       # Serviço de transações
│   │       └── user.js              # Serviço de usuário
│   │
│   ├── routes/
│   │   └── main-router.jsx          # Configuração de rotas da aplicação
│   │
│   ├── contexts/
│   │   └── auth.jsx                 # Context de autenticação
│   │
│   ├── form/                        # Configuração de formulários
│   │   ├── hooks/
│   │   │   ├── signin.js            # Hook do formulário de login
│   │   │   ├── signup.js            # Hook do formulário de cadastro
│   │   │   └── transactions.js      # Hook do formulário de transações
│   │   └── schemas/                 # Schemas de validação (Zod)
│   │       ├── signin-schema.js
│   │       ├── signup-schema.js
│   │       └── transaction-schema.js
│   │
│   ├── lib/                         # Utilitários e configurações
│   │   ├── axios.js                 # Instância configurada do Axios
│   │   └── utils.js                 # Funções utilitárias gerais
│   │
│   ├── constants/
│   │   └── localstorage-keys.js     # Chaves para localStorage
│   │
│   ├── helpers/
│   │   └── formatCurrency.js        # Função para formatar moeda
│   │
│   ├── assets/
│   │   └── images/                  # Imagens da aplicação
│   │
│   ├── App.jsx                      # Componente raiz da aplicação
│   ├── main.jsx                     # Ponto de entrada da aplicação
│   └── index.css                    # Estilos globais
│
├── components.json                  # Configuração de componentes
├── vite.config.js                   # Configuração do Vite
├── jsconfig.json                    # Configuração de path aliases
├── eslint.config.js                 # Configuração de linting
├── vercel.json                      # Configuração para deploy no Vercel
├── package.json                     # Dependências e scripts
└── package-lock.json                # Lock de versões das dependências
```

---

## 📚 Bibliotecas Utilizadas

### React & Renderização

- **react** - Framework principal
- **react-dom** - Renderização no DOM
- **react-router-dom** - Roteamento entre páginas

### Estilos

- **tailwindcss** - Framework CSS utilitário
- **@tailwindcss/vite** - Plugin Vite para Tailwind
- **tailwind-merge** - Utilitário para mesclar classes Tailwind
- **clsx**  - Utilitário para classes CSS condicionais

### Formulários

- **react-hook-form** - Gerenciamento eficiente de formulários
- **@hookform/resolvers** - Integradores de validação (Zod)
- **zod** - Validação de schemas em TypeScript

### Data & Tempo

- **date-fns** - Utilitários para manipulação de datas
- **react-day-picker** - Componente de seleção de dias

### Requisições HTTP

- **axios** - Cliente HTTP para requisições ao backend

### Gerenciamento de Estado & Cache

- **@tanstack/react-query** - Gerenciamento de estado assíncrono e cache
- **@tanstack/react-query-devtools** - Ferramentas de debug do React Query
- **@tanstack/react-table** - Utilitário para tabelas headless

### Utilitários

- **class-variance-authority** - Criação de componentes variantes
- **lucide-react** - Ícones SVG React
- **sonner** - Toasts/notificações elegantes
- **react-number-format** - Formatação de números em inputs

---

## 🎯 Funcionalidades Principais

### Autenticação

- Página de login (Sign In)
- Página de cadastro (Sign Up)
- Contexto de autenticação para gerenciar estado do usuário

### Transações

- Listar todas as transações
- Adicionar nova transação
- Editar transação existente
- Excluir transação existente
- Tabela de transações
- Seleção de datas para filtrar transações
- Badge para identificar tipo de transação (Entrada/Saída)

### Dashboard

- Exibição de saldo atual
- Itens de saldo (receita, despesa, etc)
- Cabeçalho com informações do usuário

### Validações

- Validação de formulários com Zod
- Campos específicos para cada tipo de formulário
- Feedback de erros em tempo real

---

## 🛠️ Configuração Técnica

### Vite

- **Dev Server**: Abre automaticamente no navegador
- **Alias**: `@` mapeia para `/src`
- **Hot Module Reload (HMR)**: Recarga automática durante desenvolvimento

### Tailwind CSS v4

- Integração direta via plugin Vite
- Animações customizadas

### Path Aliases

- `@/*` → `./src/*` - Permite imports limpos como `@/components/Button`

### Vercel

- Configuração de rewrites para SPA (Single Page Application)
- Todas as rotas direcionam para `index.html`

---

## 🔐 Segurança & Boas Práticas

- **Linting**: ESLint com regras React e React Hooks
- **Formatação**: Prettier com plugin Tailwind
- **Git Hooks**: Husky valida commits antes de fazer push
- **Mensagens de Commit**: Validação com git-commit-msg-linter

---

## 📊 Fluxo de Dados

```
API Services (axios)
    ↓
Custom Hooks (React Query)
    ↓
Components (React)
    ↓
Form Hooks (React Hook Form + Zod)
    ↓
Auth Context
    ↓
Pages & UI Components
```

---

## 💾 Storage

- **localStorage**: Armazenamento de preferências e dados do usuário
  - Chaves definidas em `constants/localstorage-keys.js`

---

**Desenvolvido com ❤️ usando React + Vite + Tailwind CSS**
