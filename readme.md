# SauceDemo App Test

Projeto de testes automatizados end-to-end para a aplicação [SauceDemo](https://www.saucedemo.com/), desenvolvido com [Playwright](https://playwright.dev/) e TypeScript.

## Tecnologias

- [Playwright](https://playwright.dev/) — framework de testes E2E
- [TypeScript](https://www.typescriptlang.org/)
- [@faker-js/faker](https://fakerjs.dev/) — geração de dados dinâmicos nos testes
- [dotenv](https://github.com/motdotla/dotenv) — gerenciamento de variáveis de ambiente

## Pré-requisitos

- Node.js >= 18
- npm

## Instalação

```bash
npm install
npx playwright install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
INVALID_PASSWORD=invalid_password
INVALID_USERNAME=invalid_user
```

> ⚠️ Nunca suba o arquivo `.env` para o repositório. Ele já está no `.gitignore`.

## Executando os testes

```bash
# Todos os testes (Chromium, Firefox e WebKit)
npx playwright test

# Apenas um browser
npx playwright test --project=chromium

# Com interface visual
npx playwright test --ui

# Relatório HTML após execução
npx playwright show-report
```

## Estrutura do projeto

```
├── docs/                    # Documentação (histórias, cenários e critérios de aceite)
├── helpers/                 # Dados auxiliares dos testes (ex: lista de produtos)
├── page-objects/            # Page Object Model (POM) de cada página
├── tests/
│   └── index.spec.ts        # Arquivo principal de testes
├── test-options.ts          # Fixtures customizadas do Playwright
├── playwright.config.ts     # Configuração do Playwright
└── .env                     # Variáveis de ambiente (não versionado)
```

## Cobertura de testes

| Módulo                        | Cenários cobertos                                                                 |
|-------------------------------|-----------------------------------------------------------------------------------|
| Login                         | Login válido, senha incorreta, campos obrigatórios vazios                        |
| Inventário                    | Adicionar/remover produtos, atualização do contador e dos botões                 |
| Carrinho                      | Exibição de produtos, remoção, bloqueio de checkout com carrinho vazio           |
| Checkout: Your Information    | Envio com sucesso, validação de campos obrigatórios                              |
| Checkout: Overview            | Exibição de produtos, cálculo de subtotal, taxa e total, finalização do pedido   |

Para mais detalhes, consulte a pasta [`docs/`](./docs/).

## Padrão de projeto

Os testes utilizam o padrão **Page Object Model (POM)** através da classe `PageManager`, que centraliza o acesso a todas as páginas:

```ts
const pm = new PageManager(page);
await pm.onLoginPage().login({ username, password });
await pm.onInventoryPage().addItemToCart(products);
```
