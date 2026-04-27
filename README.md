# 📦 StockManagerAPI

##  Descrição do Projeto
O **StockManagerAPI** é uma API REST desenvolvida para gerenciar o controle de estoque de produtos. A aplicação permite realizar operações como cadastro, atualização, consulta e remoção de itens, oferecendo uma solução prática e eficiente para sistemas de inventário.

---

##  Objetivo da Aplicação
O objetivo principal da aplicação é fornecer um backend robusto para:

- Gerenciamento de produtos em estoque
- Controle de entradas e saídas
- Consulta de dados de inventário

---

##  Tecnologias Utilizadas

- Java 17+
- React (JSX)
- PostgreSQL
- Spring Boot
- Spring Data JPA
- Spring Web
- Docker
- Docker Compose
- JavaScript

---

## Instruções para Execução

###  Pré-requisitos

- Docker
- Docker Compose

---

### 🐳 Executando com Docker

#### 1. Clone o repositório

```bash
git clone https://github.com/rafaellucas30290/StockManagerAPI.git

cd StockManagerAPI
```
### 2. Use o Docker Compose Para Subir o Projeto
```bash
docker compose up --build
```
### 3. Acessar a Aplicação
    A aplicação estará hospedada em localhost
---

## Estrutura do Projeto
````
ItemStockAPI/
│
├── back-end/                # API Spring Boot
│   ├── src/main/java/com/projetoDevOps/ItemStockAPI/
│   │   ├── product/
│   │   │   ├── controller/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   ├── ItemStockAPIApplication.java
│   ├── Dockerfile
│   ├── pom.xml
│   └── mvnw
│
├── front-end/               # Aplicação React
│   ├── src/
│   │   ├── api/
│   │   │   └── produtos.js
│   │   ├── components/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── index.css
│   ├── nginx.config
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── DockerFile
└── docker-compose.yml
````
---
## Equipe

```
Rafael Lucas
Fellype Gabriel 
Fernando Batista
```