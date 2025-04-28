

# API de Filmes 🎬 - Node.js + MongoDB

Este projeto é uma API RESTful para gerenciamento de filmes, construída utilizando Node.js, Express.js e MongoDB. Ela oferece funcionalidades como criação, consulta, atualização e exclusão de filmes, além de filtros avançados de busca.

## 📋 Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Validações](#validações)
- [Limitações e Observações](#limitações-e-observações)
- [Exemplos de Uso](#exemplos-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local ou em nuvem, ex: MongoDB Atlas)

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repo-filmes.git
   cd seu-repo-filmes
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   A API estará disponível em `http://localhost:3000/` (ou a porta configurada).

## 🛠️ Configuração do Banco de Dados

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```dotenv
MONGO_URI=sua_uri_do_mongodb
PORT=3000
```

Exemplo de conexão MongoDB Atlas:

```
MONGO_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/nomedobanco?retryWrites=true&w=majority
```

## 📂 Estrutura do Projeto

```
.
├── node_modules/
├── src/
│   ├── config/
│   │   └── db.js           # Conexão com o MongoDB
│   ├── controllers/
│   │   └── filmesController.js  # Lógica dos filmes
│   ├── middlewares/
│   │   └── validateRequest.js   # Middleware de validação
│   ├── routes/
│   │   └── filmesRoutes.js      # Definições de rotas
│   ├── validations/
│   │   └── validateFilme.js     # Validações dos filmes
│   └── app.js              # Inicialização do servidor Express
├── .env
├── package.json
├── README.md

```

## 🗺️ Endpoints da API

### **Filmes**

- `POST /api/filmes`
  - Cadastra um novo filme.

- `GET /api/filmes`
  - Lista todos os filmes (com suporte a paginação, filtros e ordenação).
  - Query parameters:
    - `page`, `limit`, `nome`, `sort`, `order`, `data_lancamento_inicio`, `data_lancamento_fim`

- `GET /api/filmes/getByAno`
  - Lista filmes lançados entre dois anos específicos.
  - Query parameters:
    - `anoDe`, `anoAte`

- `GET /api/filmes/:id`
  - Busca um filme pelo seu ID.

- `PUT /api/filmes/:id`
  - Atualiza os dados de um filme.

- `DELETE /api/filmes/:id`
  - Remove um filme do banco.

## ✅ Validações

- **Nome**: obrigatório
- **Nota**: obrigatório, número entre 0 e 10
- **Descrição**: obrigatório
- **Gênero**: obrigatório
- **Data de Lançamento**: obrigatório
- **Classificação Etária**: opcional, se informado deve ser um número inteiro positivo
- **ID (param)**: verificado se é um `ObjectId` válido (24 caracteres hexadecimais)

As validações são realizadas utilizando `express-validator`.

## ⚠️ Limitações e Observações

- Esta API foi desenvolvida para fins de estudo e desenvolvimento.
- O projeto assume que todos os dados enviados têm formatação e tipos corretos conforme o esperado.

## 💡 Exemplos de Uso

**Cadastrar um filme (com curl):**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "nome": "Interestelar",
  "descricao": "Viagem no espaço-tempo",
  "genero": "Ficção Científica",
  "nota": 9.0,
  "data_lancamento": "2014-11-07",
  "classificacao_etaria": 12
}' http://localhost:3000/api/filmes
```

**Buscar filmes lançados entre 2020 e 2022:**

```bash
curl "http://localhost:3000/api/filmes/getByAno?anoDe=2020&anoAte=2022"
```

**Atualizar um filme:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "nome": "Atualizado",
  "descricao": "Nova descrição",
  "genero": "Drama",
  "nota": 8.5,
  "data_lancamento": "2021-08-15",
  "classificacao_etaria": 14
}' http://localhost:3000/api/filmes/680f7cb0fec82d0c81fd880b
```

**Excluir um filme:**

```bash
curl -X DELETE http://localhost:3000/api/filmes/680f7cb0fec82d0c81fd880b
```

## 🤝 Contribuição

Contribuições são bem-vindas!  
Abra issues para relatar problemas ou envie pull requests com melhorias.

## 📜 Licença

Este projeto está licenciado sob a licença MIT.

## 👨 Autor

Desenvolvido por Henrique Vidotto Vinico Neto.

