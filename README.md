# Salão Leila - Sistema de Agendamentos

Sistema web desenvolvido para o salão de beleza da Leila, permitindo que clientes realizem agendamentos online e que a proprietária gerencie seu negócio de forma prática e organizada.

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB (banco de dados em nuvem via MongoDB Atlas)
- Mongoose (ODM para modelagem dos dados)
- dotenv (gerenciamento de variáveis de ambiente)
- cors (liberação de acesso entre frontend e backend)
- nodemon (reinicialização automática do servidor em desenvolvimento)

### Frontend
- Angular 21
- TypeScript
- SCSS
- HttpClient (para comunicação com a API)

---

## Arquitetura do Projeto

O projeto está organizado em um único repositório com duas pastas principais:

```bash
salao-leila/
├── backend/
└── frontend/
```

### Backend

O backend segue uma arquitetura em camadas (MVC), separando as responsabilidades de cada parte do código:

```bash
backend/src/
├── config/        - Configuração da conexão com o banco de dados
├── controllers/   - Recebe as requisições e retorna as respostas
├── services/      - Contém as regras de negócio da aplicação
├── repositories/  - Responsável pelo acesso ao banco de dados
├── models/        - Define a estrutura dos dados (schemas do Mongoose)
├── routes/        - Define as rotas da API
└── middlewares/   - Tratamento de erros e validações
```

### Frontend

O frontend foi desenvolvido em Angular com componentes standalone, organizados por área de acesso:

```bash
frontend/src/app/
├── pages/
│   ├── cliente/
│   │   ├── cadastro/
│   │   ├── agendamento/
│   │   └── historico/
│   └── admin/
│       ├── agendamentos/
│       └── servicos/
└── services/      - Serviços responsáveis pelas chamadas à API
```

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)
- Conta no MongoDB Atlas (ou MongoDB instalado localmente)

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/salao-leila.git
cd salao-leila
```

### 2. Configurar e rodar o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/salao-leila
```

Substitua `USUARIO`, `SENHA` e o endereço do cluster pelos dados da sua conta no MongoDB Atlas.

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3000`.

### 3. Configurar e rodar o Frontend

Abra um novo terminal e execute:

```bash
cd frontend
npm install
ng serve
```

O frontend estará disponível em `http://localhost:4200`.

> Os dois servidores precisam estar rodando ao mesmo tempo para o sistema funcionar corretamente.

---

## Como Acessar o Sistema

### Acesso da Cliente

A cliente acessa o sistema pela rota principal:

```bash
http://localhost:4200
```

O fluxo de acesso é o seguinte:

1. A cliente preenche seu nome, e-mail e telefone na tela de cadastro e clica em "Entrar". Caso o e-mail já tenha sido cadastrado anteriormente, o sistema retorna um erro informando que o e-mail já está em uso.

2. Após o cadastro, ela é redirecionada automaticamente para a tela de agendamento, onde pode escolher um ou mais serviços, selecionar a data e o horário desejados e adicionar uma observação opcional.

3. Caso já exista um agendamento na mesma semana, o sistema exibe uma sugestão para que os serviços sejam agendados na mesma data do agendamento existente.

4. Após confirmar o agendamento, a cliente pode acessar seu histórico clicando em "Meus agendamentos" no cabeçalho.

5. No histórico, é possível visualizar todos os agendamentos realizados, com data, serviços, observação e status. Agendamentos com status "pendente" podem ser editados, desde que a data seja superior a 2 dias a partir do momento atual. Caso contrário, o sistema exibe uma mensagem informando que a alteração deve ser feita por telefone.

### Acesso da Leila (Administradora)

O acesso administrativo é feito por uma rota separada, conhecida apenas pela proprietária:

```bash
http://localhost:4200/admin/agendamentos
```

Não há autenticação implementada nesta versão, pois não era um requisito do projeto. Em um ambiente de produção, essa rota seria protegida por login com senha e autenticação via JWT.

Na área administrativa, a Leila tem acesso a:

- Listagem completa de todos os agendamentos, com nome e telefone do cliente, data, serviços solicitados, observação e status atual.
- Ações disponíveis por agendamento: confirmar (quando pendente), concluir (quando confirmado), cancelar e editar (data, serviços e observação).
- Gerenciamento de serviços, acessível pelo botão "Gerenciar serviços" no cabeçalho, onde é possível cadastrar novos serviços, editar serviços existentes e remover serviços do catálogo.

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/usuarios | Cadastrar usuário |
| GET | /api/usuarios | Listar usuários |
| GET | /api/usuarios/:id | Buscar usuário por ID |
| POST | /api/servicos | Cadastrar serviço |
| GET | /api/servicos | Listar serviços ativos |
| PUT | /api/servicos/:id | Atualizar serviço |
| DELETE | /api/servicos/:id | Remover serviço |
| POST | /api/agendamentos | Criar agendamento |
| GET | /api/agendamentos | Listar todos os agendamentos |
| GET | /api/agendamentos/:id | Buscar agendamento por ID |
| GET | /api/agendamentos/cliente/:clienteId | Agendamentos de um cliente |
| PUT | /api/agendamentos/:id | Atualizar agendamento |

---

## Regras de Negócio Implementadas

- Um cliente só pode alterar seu agendamento com mais de 2 dias de antecedência. Caso contrário, o sistema bloqueia a alteração e orienta o cliente a entrar em contato por telefone.
- Ao criar um agendamento, o sistema verifica se o cliente já possui outro agendamento na mesma semana. Se sim, exibe uma sugestão para que os serviços sejam agendados na mesma data.
- Não é possível criar agendamentos para datas no passado.
- Serviços removidos não são excluídos permanentemente do banco de dados, apenas marcados como inativos, preservando o histórico dos agendamentos existentes.

---

## Controle de Versao

O projeto foi desenvolvido em branch unica (main) por se tratar de um teste tecnico individual com prazo reduzido. Em um projeto real em equipe, seriam utilizadas branches separadas por funcionalidade (feature branches) seguindo um fluxo como o Git Flow.

---

## Observações

- A autenticação não foi implementada por não ser um requisito do projeto. Em produção, seria utilizado JWT para proteger as rotas administrativas e identificar o usuário logado.
- O sistema foi desenvolvido com foco em organização, boas práticas e manutenibilidade do código, seguindo a arquitetura em camadas no backend e o padrão de componentes standalone no frontend.
