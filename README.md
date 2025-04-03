# Gerenciamento de Produtos - API

Este projeto é uma API para gerenciamento de produtos, construída com **Node.js**, **Express**, **MongoDB** e documentada com **Swagger**. A API oferece operações CRUD (Criar, Ler, Atualizar e Deletar) para gerenciar produtos.

## Requisitos

Antes de rodar a aplicação, você precisará garantir que possui as seguintes dependências instaladas:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/) (instância local ou remota)

## Instalação

1. **Clone e entre no repositório**:

   ```bash
   git clone https://github.com/vinirlmarques/crudProdutos.git
   cd crodProdutos
   ```

2. **Instale as dependências**:

   Certifique-se de estar no diretório do projeto e execute:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

   ```env
   MONGO_URI=mongodb://localhost:27017/produtosDB
   ```

   - Substitua o valor de `MONGO_URI` com a URI do seu banco de dados MongoDB, caso esteja usando um MongoDB remoto.

4. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

   O servidor será iniciado em `http://localhost:4000`.

## Documentação da API

A documentação da API é gerada automaticamente com **Swagger**. Para visualizar e testar a API, siga os passos:

1. Acesse a documentação no navegador:

   ```
   http://localhost:4000/api-docs
   ```

2. Use a interface do Swagger para testar os endpoints da API diretamente.

## Endpoints

### Produtos

- **POST /api/products**: Cria um novo produto.
- **GET /api/products**: Retorna todos os produtos.
- **GET /api/products/{id}**: Retorna um produto pelo ID.
- **PUT /api/products/{id}**: Atualiza um produto pelo ID.
- **DELETE /api/products/{id}**: Deleta um produto pelo ID.

### Exemplo de Produto (JSON)

```json
{
  "name": "Produto Teste",
  "price": 49.99,
  "description": "Descrição do produto"
}
```

## Banco de Dados

O projeto utiliza o **MongoDB** para armazenar as informações dos produtos. Por padrão, a conexão está configurada para `mongodb://localhost:27017/produtosDB`. Se necessário, você pode alterar essa configuração no arquivo `.env`.

## Scripts Disponíveis

- **`npm run dev`**: Roda o servidor em modo de desenvolvimento com recarregamento automático.
- **`npm run build`**: Compila o projeto TypeScript para JavaScript (pronto para produção).
- **`npm start`**: Inicia o servidor com os arquivos compilados (modo de produção).

## Testando a API

Você pode testar a API utilizando ferramentas como o **Postman** ou o próprio **Swagger UI**. Aqui está um exemplo de requisição para adicionar um novo produto:

```bash
curl -X POST http://localhost:4000/api/servers \
-H "Content-Type: application/json" \
-d '{
  "name": "Produto Exemplo",
  "price": 49.99,
  "description": "Descrição do produto"
}'
```
