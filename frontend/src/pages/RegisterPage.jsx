import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar.');
    }
  }

  return (
    <div className="auth-container">
      <section className="auth-hero">
        <span className="auth-eyebrow">Cadastro rápido • Interface moderna</span>
        <h1>Crie sua conta e comece a gerenciar atendimentos em poucos passos.</h1>
        <p>
          Esse projeto foi pensado para demonstrar uma aplicação full stack completa, com front em
          React, back em Node, banco com Prisma e regras de acesso por perfil.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <strong>Fluxo direto</strong>
            <span>Cadastro simples para o usuário entrar e já acessar o dashboard principal.</span>
          </div>
          <div className="feature-card">
            <strong>Escalável</strong>
            <span>Estrutura pronta para receber novos tipos de serviços e relatórios.</span>
          </div>
          <div className="feature-card">
            <strong>Organização visual</strong>
            <span>Layout limpo, responsivo e mais agradável para apresentação ao professor.</span>
          </div>
          <div className="feature-card">
            <strong>Requisitos atendidos</strong>
            <span>JWT, bcrypt, Prisma, React, Node e Swagger integrados ao sistema.</span>
          </div>
        </div>
      </section>

      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Criar nova conta</h2>
        <p className="subtitle">Cadastre-se para acessar o sistema de agendamento.</p>

        <label className="label">Nome completo</label>
        <input
          type="text"
          placeholder="Seu nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="label">Email</label>
        <input
          type="email"
          placeholder="seuemail@exemplo.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="label">Senha</label>
        <input
          type="password"
          placeholder="Crie uma senha segura"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="message error">{error}</p>}

        <button type="submit">Cadastrar</button>

        <p className="auth-footer">
          Já possui conta? <Link to="/login">Fazer login</Link>
        </p>
      </form>
    </div>
  );
}
