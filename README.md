# 🕵️ DevFinder Pro

![GitHub repo size](https://img.shields.io/github/repo-size/Eenzo71/devfinder-explorer?style=for-the-badge)
![Languages](https://img.shields.io/github/languages/count/Eenzo71/devfinder-explorer?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-green?style=for-the-badge)

> Uma interface moderna, responsiva e elegante para explorar perfis de desenvolvedores e repositórios utilizando a API pública do GitHub.

![Preview do Projeto](./image.png)

Você pode visualizar o projeto através [deste link]().

---

## 💻 Sobre o Projeto

O **DevFinder Pro** não é apenas um buscador; é uma experiência visual polida desenvolvida para facilitar a análise rápida de perfis no GitHub. Diferente de buscadores simples, este projeto foca na persistência de dados (histórico) e feedback visual (animações e estados de carregamento), garantindo que o usuário nunca fique "perdido" durante a navegação.

O projeto foi construído com foco em **Mobile First** e estética **Dark Mode** nativa.

## ✨ Funcionalidades Principais

* 🔍 **Busca Inteligente:** Integração direta com a API de usuários do GitHub.
* 📊 **Estatísticas Visuais:** Exibição clara de seguidores, repositórios e dados bio.
* 💾 **Histórico Persistente:** O sistema salva automaticamente as últimas 5 pesquisas no `LocalStorage` do navegador.
* ⚡ **Acesso Rápido:** Clique nas tags de histórico para refazer uma busca instantaneamente.
* 🎨 **UI/UX Aprimorada:**
    * Design totalmente responsivo (Mobile/Desktop).
    * Animações suaves (`fade-in`) ao carregar dados.
    * Feedback de carregamento (spinners) e tratamento de erros amigável.
* 📂 **Top Repositórios:** Listagem automática dos 5 repositórios mais recentes, ordenados por atualização.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando tecnologias web modernas e práticas de Clean Code:

* **HTML5 Semântico**: Estruturação acessível e organizada.
* **Tailwind CSS (via CDN)**: Estilização utilitária rápida, paleta de cores `slate` (Dark Theme) e responsividade.
* **JavaScript (ES6+)**:
    * `Async/Await` para consumo de APIs.
    * `Fetch API` para requisições HTTP.
    * `LocalStorage API` para persistência de dados.
    * Manipulação avançada do DOM.
* **FontAwesome**: Ícones vetoriais para interface.

---

## 🚀 Como Executar

Como o projeto utiliza tecnologias nativas e CDN, não é necessário instalar dependências pesadas (como `node_modules`).

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Eenzo71/devfinder-explorer.git
