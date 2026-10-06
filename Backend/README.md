# 🐧 Campanha do Agasalho - Backend

API backend do **Site da Campanha do Agasalho da USP**, desenvolvida para gerenciar os dados, rotas e a comunicação com o banco de dados da aplicação.

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB (Driver Nativo)](https://www.mongodb.com/)

## 📝 Como Rodar

Certifique-se de ter o `Node.js` e o `npm` instalados antes de prosseguir.

### 1. Configuração de Variáveis de Ambiente

Antes de iniciar o servidor, crie um arquivo `.env` na raiz da pasta `Backend` com base no seu ambiente de desenvolvimento:

```env
PORT=3000
MONGODB_URI=mongodb+srv://teste:teste123@teste.tvuiqbe.mongodb.net/teste?appName=Teste
```

### 2. Instalação das dependências

Acesse a pasta do backend e instale os pacotes:

```bash
cd Backend
npm install
```

### 3. Executando a Aplicação

#### Modo de Desenvolvimento

Utilize o script com tsx para executar o código TypeScript diretamente sem necessidade de compilação prévia:

```bash
npm run dev
```

#### Modo de Produção

Para compilar o código em TypeScript para JavaScript puro e executá-lo com o Node.js:

```bash
# Compila os arquivos .ts da pasta src/ para a pasta dist/
npm run build

# Executa o código compilado em JavaScript
npm start
```
