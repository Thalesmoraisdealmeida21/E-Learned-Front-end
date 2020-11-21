



<center>

  ![Logo do R](src/assets/logoConteined.png)
  
   
</center>

<h4 align="center">
    Uma plataforma web para assistir e vender palestras online.
</h4>

<p align="center">


  <img alt="Repository size" src="https://img.shields.io/github/repo-size/thalesmoraisdealmeida21/E-Learned-Front-end?style=for-the-badge">


  <a href="https://github.com/tgmarinho/README-ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/thalesmoraisdealmeida21/E-Learned-Front-end?style=for-the-badge">
  </a>
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge">


  <a href="#">
    <img alt="Feito pela Thales Morais" src="https://img.shields.io/badge/feito%20por-Thales%20Morais-%237519C1?style=for-the-badge">
  </a>




</p>

<h4 align="center">
	🚧   Em Desenvolvimento  🚧
</h4>
<h2 align="center">
	 <a align="center" href="https://trusting-bell-3d530b.netlify.app/">
      <b> Acessar demonstração da aplicação </b>
      </a>
</h2>

<img src="https://media.giphy.com/media/DRjAtPivUIHtpkPLfe/giphy.gif"  height="100%" width="100%"/>
  


Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)
   * [Tecnologias](#-tecnologias)
   * [Como excutar ?](#Como-executar-o-projeto)
   * [Como contribuir no projeto](#-como-contribuir-no-projeto)
   * [Autor](#-autor)
   * [Licença](#user-content--licença)
<!--te-->


## 💻 Sobre o projeto

 E Learned - É um projeto que visa a criação de um plataforma para vender e assistir cursos / palestras online. Contemplando desde o cadastro de usuário até a compra e pagamento da palestra.


Este repositório contempla a aplicação Web desenvolvida em React,para que ela funcione corretamente é necessário baixar a aplicação backend desenvolvido em node.js podendo ser acessada pelo repositorio
  <a href="https://github.com/Thalesmoraisdealmeida21/E-Learned-Back-end">
    Repositorio Back-end Web (Node.js)
  </a>

---

## ⚙️ Funcionalidades

- [x] Criação e autenticação de usuários
  - [x] Atualização de perfil do usuário
  - [x] Login do usuário (JWT)
  - [ ] Recuperação de senha


- [x] Criação e edição de palestras / Cursos
  - [x] Criação de palestras para venda (titulo, resumo, descrição, preço)
  - [x] Edição das palestras cadastradas

- [x] Compra de palestras
  - [x] Adição das palestras ao carrinho de compras
  - [x] Pagamento da palestra por boleto ou cartão de crédito (Foi implementado a API do pagar.me)
  - [x] Exclusão de items do carrinho

- [x] Criação de post para o blog (Criação de publicações para um blog que pode servir de referencia para vendas dos cursos)
  - [x] Criação do post (imagem, resumo, body)

- [x] Criação de depoimentos para uma página de vendas (Cria depoimentos para serem gerados em um página de vendas)
---






## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Frontend (Este repositório)
<a href="https://github.com/Thalesmoraisdealmeida21/E-Learned-Back-end">
  2. Frontend
</a>



### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Ambiente de desenvolvimento
Para rodar a aplicação em sua maquina é necessário também configurar o arquivo .env para isto basta renomear o arquivo [.env.example](./.env.example) para .env e alterar as variaveis para o seu ambiente

```
  REACT_APP_API_URL=http://localhost:3333
  REACT_APP_PAGARME_ENCRYPTION_KEY=APP_KEY_PAGARME
```

<b>OBS: É necessário configurar o .env tanto paraaplicação front-end quanto para a back-end</b>

#### 🎲 Rodando o Backend (Este repositório)

```bash

# Clone este repositório
$ git clone https://github.com/Thalesmoraisdealmeida21/E-Learned-Back-end.git

# Acesse a pasta do projeto no terminal/cmd
$ cd E-Learned-Back-end

# Execute o comando npm install ou yarn caso utilize ele
$ npm install ou yarn


# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server ou yarn dev:server

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```




#### 🧭 Rodando a aplicação web (Frontend)



```bash

# Clone este repositório
$ git clone https://github.com/Thalesmoraisdealmeida21/E-Learned-Front-end.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd E-Learned-Front-end

# Instale as depedencias do projeto
$ npm install ou yarn



# Execute a aplicação em modo de desenvolvimento
$ npm start ou yarn start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:


####   ([React](https://pt-br.reactjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[TinyMCE](https://www.tiny.cloud/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[styled-components](https://styled-components.com/)**

> Veja o arquivo  [package.json](https://github.com/Thalesmoraisdealmeida21/E-Learned-Front-end/blob/master/package.json)





## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`


---

## 🦸 Autor


 <img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/12722629?s=400&u=c3d3e1b1fccb1da4b9b7c906393a24d507adae36&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Thales Morais</b></sub>
 <br />


---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Thales Morais 👋🏽 [Entre em contato!](https://www.linkedin.com/in/thales-morais/)


