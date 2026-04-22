# AgendaPro – Sistema de Agendamento

Projeto full stack desenvolvido com as tecnologias solicitadas.

## Tecnologias utilizadas

* Front-end: React + Vite
* Back-end: Node.js + Express
* Autenticação: JWT (JSON Web Token)
* Criptografia: bcryptjs
* ORM: Prisma
* Banco de dados: SQLite (ambiente local) / PostgreSQL (produção)
* Documentação: Swagger

## Descrição

Sistema web completo para gerenciamento de agendamentos, com autenticação segura, controle de acesso por perfil e API documentada.

## Funcionalidades

* Cadastro de usuário
* Login com geração de token JWT
* Senha armazenada com criptografia (bcrypt)
* Controle de acesso por perfil (USER e ADMIN)
* Listagem de serviços disponíveis
* Criação de agendamentos
* Usuário visualiza seus próprios agendamentos
* Admin visualiza todos os agendamentos
* Admin altera status dos agendamentos
* Admin cadastra novos serviços
* Documentação completa da API com Swagger

## Autenticação

O sistema utiliza JWT (JSON Web Token) para autenticação.

Após o login, o token deve ser enviado no header das requisições protegidas:

Authorization: Bearer <token>

Rotas protegidas utilizam middleware para validação do token e controle de acesso por perfil.

## Estrutura do projeto

* backend/ → API em Node.js + Express + Prisma
* frontend/ → Aplicação React

## Como rodar o backend

cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev

Backend disponível em:

* API: https://sistema-de-agendamento-production-5801.up.railway.app
* Swagger: https://sistema-de-agendamento-production-5801.up.railway.app/api-docs

## Como rodar o frontend

cd frontend
npm install
npm run dev

Frontend disponível em:

https://sistema-de-agendamento-x6hg-steel.vercel.app/login

## Credenciais para teste

### Admin

Email: [admin@agenda.com]
Senha: admin123

### Usuário comum

Email: [user@agenda.com]
Senha: user123

## Deploy (produção)

Para ambiente de produção, recomenda-se:

* Backend: Railway
* Frontend: Vercel
* Banco de dados: PostgreSQL

Após o deploy, lembre-se de configurar as variáveis de ambiente:

Frontend:
VITE_API_URL = URL do backend publicado

Backend:
DATABASE_URL = conexão com PostgreSQL
JWT_SECRET = chave secreta

## Autor

Vinícius de Oliveira Silva.
