# Blogs Api

## Sobre
Projeto desenvolvido durante o módulo de back-end do curso de desenvolvimento web da Trybe.

Foi desenvolvida uma API e um banco de dados para a produção de conteúdo para um blog.

Sendo usado Node.js na criação da aplicação e o ORM Sequelize para fazer um CRUD de posts, além disso, todo o desenvolvimento seguiu os princípios do REST e também foi usada a biblioteca JWT para a autenticação dos usuários.

A documentação do projeto foi feita com o uso do Swagger e pode ser acessada localmente na rota /doc. Ex.: http://localhost:3000/doc/.

### *Status do projeto*
Este projeto encontra-se finalizado, pretendo somente fazer o deploy dele numa VPS.


## Habilidades desenvolvidas
* Arquitetura MSC
* API REST com Express.js
* ORM - Interface da aplicação com o banco de dados
* Autenticação com JWT

## Tecnologias utilizadas
* Docker
* Docker Compose
* MySQL
* Node.js
* Express.js
* Sequelize ORM
* JWT (Json Web Token)
* Joi


## Executando a aplicação

<details>
  <summary><h2>Sem Docker</h2></summary>
É necessário ter instalado em sue computador o Node.js na versão 16.0.0 ou superior, assim como o MySQL.

### 1. Clone o repositório
```
git clone git@github.com:andreluialves/blogs-api.git
```

  * Entre na pasta do repositório que você acabou de clonar:
```
cd blogs-api
```

### 2. Instale as dependências:
```
npm install
```
### 3. Configurar o arquivo .env
Informe os dados relativos ao banco de dados MySQL, através das seguintes variáveis de ambiente:
**MYSQL_HOST**,
**MYSQL_PORT**,
**MYSQL_USER**,
**MYSQL_PASSWORD**.

Certifique-se que a porta 3000 do seu computador não esteja sendo usada ou, se preferir, altere a variável de ambiente **API_PORT**.

### 4. Execute a aplicação com o comando abaixo:
```
npm start
```
</details>

<details>
  <summary><h2>Com Docker</h2></summary>
É necessário ter Docker e o Docker Compose instalados no seu computador, sendo que o Docker Compose precisa estar na versão 1.29 ou superior.

Serão gerados dois containers, um com a imagem do MySql e outro com a imagem do Node.Js.

### 1. Clone o repositório
```
git clone git@github.com:andreluialves/blogs-api.git
```

  * Entre na pasta do repositório que você acabou de clonar:
```
cd blogs-api
```

### 2 - Gere os containers com o comando abaixo (execute o comando na pasta raiz da aplicação):
```
docker-compose up -d --build
```

### 3 - Execute o comando abaixo para abrir o terminal do container de nome "blogs_api" (Node.Js)
```
docker exec -it blogs_api bash

```

### 4 - No terminal do container, instale as dependências:
```
npm install
```

### 5. No terminal do container, execute a aplicação:
```
npm start
```
</details>

## Documentação
A documentação do projeto pode ser acessada localmente na rota /doc. Ex.: http://localhost:3000/doc/.
