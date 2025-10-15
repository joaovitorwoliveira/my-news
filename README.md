# MyNews - Aplicativo de Notícias

Aplicativo de notícias em tempo real construído com React Native e Expo, integrado com a [NewsAPI](https://newsapi.org/).

## Funcionalidades

- 📰 Notícias em tempo real do Brasil e do mundo
- 🔄 Pull to refresh para atualizar notícias
- 🔐 Sistema de autenticação
- 📱 Interface moderna e responsiva
- 🌐 Integração com NewsAPI para conteúdo atualizado

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
NEWS_API_KEY=sua_chave_api_aqui
```

⚠️ **Importante**: O arquivo `.env` não deve ser commitado no Git. Ele já está incluído no `.gitignore`.

### 3. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Estrutura do Projeto

```
my-news/
├── app/                    # Rotas e telas do app (expo-router)
│   ├── (auth)/            # Telas de autenticação
│   └── (tabs)/            # Telas principais com navegação
├── components/            # Componentes reutilizáveis
├── hooks/                 # Custom hooks (useAuth, useNews)
├── services/              # Serviços de API (auth, news)
├── types/                 # Definições de tipos TypeScript
└── utils/                 # Utilitários e dados mockados
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

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
