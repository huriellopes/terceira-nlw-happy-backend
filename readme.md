<p align="center">
  <img src="archives/happy.png" alt="Next Level Week" />
</p>

# Happy Web Application - 3° Next Level Week

> Aplicação foi pensada em orfanatos e abrigos para crianças, ajudar pessoas que querem visitar e contribuir com as instituições de caridade!

## O que foi utilizado:

- Node.Js
- Express
- Typescript
- Typeorm
- Cors
- Yup
- Crypto
- Multer
- express-async-errors
- DotEnv
- Sqlite3
- Eslint
- Prettier

## 🛠 Mão na massa:

Clone o repositório:

````
git clone https://github.com/huriellopes/
terceira-nlw-happy-backend.git
````

Para baixar o zip: https://github.com/huriellopes/terceira-nlw-happy-backend/archive/master.zip

### 💻 Executando o projeto:

#### Na raiz do projeto, execute o comando:

````
# Para instalar as dependências
yarn ou npm install
````

#### Configuração do .env:

> Copie o .env de exemplo:

```
# Cópia do arquivo
cp .env.example .env

# Configuração, Caso queira usar sqlite:
DB_CONNECTION="sqlite"
DB_NAME="./src/database/database.sqlite"

# Caso queira usar o postgreSQL, e for usar o docker, rode o seguinte comando:
docker run --name database -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres

# Caso tenha o postgreSQL local, apenas configure as variaveis de ambiente!
```

> Caso tenha escolhido docker, depois do container criado e startado, abra o postgresql em um SGBD e crie um banco de dados como configurou no .env!

Em seguida rode o seguinte comando para as migrations:

````
yarn typeorm migration:run ou npm typeorm migration:run
````

Caso precise desfazer as migrações, execute o seguinte comando:

````
yarn typeorm migration:revert ou npm typeorm migration:revert
````

## 🚀 Rodando o servidor

#### Para rodar o servidor, execute o comando:

````
yarn dev:server
````

#### Teste de Api

> Para testar a api, pegue o arquivo do endpoint e importe para o insomnia!

## 📑 Licença

Este projeto está sob a licença MIT. Veja aqui [Licença](LICENSE)
