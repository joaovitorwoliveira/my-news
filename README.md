# MyNews - Aplicativo de Notícias

Aplicativo de notícias em tempo real construído com React Native e Expo, integrado com a [NewsAPI](https://newsapi.org/).

## Funcionalidades

- 📰 Notícias em tempo real do Brasil e do mundo
- 🔄 Pull to refresh para atualizar notícias
- 🔐 Sistema completo de autenticação (login/cadastro)
- 📱 Interface moderna e responsiva com NativeWind/Tailwind
- 🌐 Integração com NewsAPI para conteúdo atualizado
- ⚙️ Sistema de preferências personalizáveis por categoria
- 📖 Visualização detalhada de notícias
- 💾 Cache inteligente para melhor performance
- 🔍 Filtros de notícias por categoria

## Configuração

### 1. Install dependencies

```bash
npm install
```

### 2. Configurar NewsAPI

1. Crie uma conta gratuita em [newsapi.org](https://newsapi.org/)
2. Obtenha sua API key no dashboard
3. Crie um arquivo `.env` na raiz do projeto:

```bash
EXPO_PUBLIC_API_URL="SUA CHAVE DA API"
EXPO_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Start the app

```bash
npx expo start
```

## Estrutura do Projeto

```
my-news/
├── app/                    # Rotas e telas do app (expo-router)
│   ├── (auth)/            # Telas de autenticação (login, cadastro)
│   └── (tabs)/            # Telas principais com navegação
│       ├── index.tsx      # Home - todas as notícias
│       ├── assinaturas/   # Notícias filtradas por preferências
│       ├── configuracoes/ # Configurações e preferências do usuário
│       └── noticia/[id]   # Visualização detalhada de notícias
├── components/            # Componentes reutilizáveis
│   ├── NewsCard.tsx       # Card de notícia
│   └── ui/                # Componentes de interface (Button, TextInput)
├── hooks/                 # Custom hooks
│   ├── useAuth.ts         # Gerenciamento de autenticação
│   └── useNews.ts         # Gerenciamento de notícias e cache
├── services/              # Serviços de API
│   ├── auth.ts            # Serviço de autenticação
│   ├── news.ts            # Serviço de notícias (NewsAPI)
│   ├── cache.ts           # Gerenciamento de cache
│   └── preferences.ts     # Gerenciamento de preferências
├── types/                 # Definições de tipos TypeScript
│   ├── login/             # Tipos de autenticação
│   └── news/              # Tipos de notícias
└── utils/                 # Utilitários
    ├── formats.ts         # Formatação de dados
    ├── mockData.ts        # Dados mockados para fallback
    └── news.ts            # Utilitários de notícias
```

## API de Notícias

O app utiliza a [NewsAPI](https://newsapi.org/docs/get-started) para buscar notícias. Principais endpoints utilizados:

- **Top Headlines** (`/v2/top-headlines`): Principais manchetes do Brasil
- **Everything** (`/v2/everything`): Busca de notícias por palavra-chave

### Limitações da API (Plano Gratuito)

- Máximo de 100 requisições por dia
- Notícias até 24 horas atrás apenas
- Sem acesso a algumas fontes premium

### Fallback

O app possui dados mockados como fallback caso:

- A API key não esteja configurada
- O limite de requisições seja atingido
- Ocorra erro de conexão

## Tecnologias Utilizadas

- **React Native** com **Expo** - Framework principal
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação baseada em arquivos
- **NativeWind** - Estilização com Tailwind CSS
- **AsyncStorage** - Armazenamento local
- **Axios** - Requisições HTTP
- **JSON Server** - Mock de API para desenvolvimento

## Principais Funcionalidades Implementadas

### 🔐 Autenticação

- Login e cadastro de usuários
- Validação de formulários
- Gerenciamento de sessão com AsyncStorage
- Redirecionamento automático baseado no status de autenticação

### 📰 Sistema de Notícias

- Busca de notícias em tempo real via NewsAPI
- Cache inteligente para melhor performance
- Sistema de fallback com dados mockados
- Categorização automática de notícias

### ⚙️ Preferências Personalizáveis

- Seleção de categorias de interesse
- Filtros personalizados na tela de assinaturas
- Persistência das preferências do usuário

### 📱 Interface e Navegação

- Navegação por abas (Home, Assinaturas, Configurações)
- Pull-to-refresh em todas as telas de notícias
- Visualização detalhada de notícias
- Design responsivo e moderno
