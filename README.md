# 🚀 AgendaPro – Sistema de Agendamento

React
Node.js
Express
Prisma
PostgreSQL
JWT
Vercel
Railway

---

## 📌 Descrição

Sistema web completo para gerenciamento de agendamentos, com autenticação segura, controle de acesso por perfil e API documentada com Swagger.

---

## 🛠 Tecnologias utilizadas

- Frontend: React + Vite  
- Backend: Node.js + Express  
- Autenticação: JWT (JSON Web Token)  
- Criptografia: bcryptjs  
- ORM: Prisma  
- Banco de dados: PostgreSQL (produção) e SQLite (desenvolvimento local)  
- Documentação: Swagger  

---

## ⚙️ Funcionalidades

- Cadastro de usuário  
- Login com geração de token JWT  
- Senha criptografada (bcrypt)  
- Controle de acesso por perfil (USER e ADMIN)  
- Listagem de serviços disponíveis  
- Criação de agendamentos  
- Usuário visualiza seus próprios agendamentos  
- Admin visualiza todos os agendamentos  
- Admin altera status dos agendamentos  
- Admin cadastra novos serviços  
- Documentação completa da API  

---

## 🔐 Autenticação

Após o login, o token deve ser enviado no header:

Authorization: Bearer <token>

---

## 📂 Estrutura do projeto

backend/ → API Node.js + Express + Prisma  
frontend/ → Aplicação React  

---

## 🚀 Acesso online

- Frontend:  
  https://sistema-de-agendamento-x6hg-steel.vercel.app/  

- API:  
  https://sistema-de-agendamento-production-5801.up.railway.app  

- Swagger:  
  https://sistema-de-agendamento-production-5801.up.railway.app/api-docs  

---

## 🔑 Credenciais para teste

### 👑 Admin
- Email: admin@agenda.com  
- Senha: admin123  

### 👤 Usuário comum
- Email: user@agenda.com  
- Senha: user123  

---

## ▶️ Como rodar o backend

bash cd backend  # Copie manualmente o arquivo .env.example para .env  npm install npx prisma generate npx prisma migrate dev --name init npm run prisma:seed npm run dev 

---

## ▶️ Como rodar o frontend

bash cd frontend npm install npm run dev 

---

## ☁️ Deploy

- Frontend: Vercel  
- Backend: Railway  
- Banco de dados: PostgreSQL  

### Variáveis de ambiente

Frontend:  
VITE_API_URL = URL do backend publicado

Backend:  
DATABASE_URL = conexão com PostgreSQL  
JWT_SECRET = chave secreta  

---

## 👨‍💻 Autor

**Vinícius de Oliveira Silva
