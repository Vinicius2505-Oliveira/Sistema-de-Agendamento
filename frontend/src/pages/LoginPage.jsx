import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login.');
    }
  }

  return (
    <div className="auth-container">
      <section className="auth-hero">
        <span className="auth-eyebrow">Projeto final • React + Node + Prisma</span>
        <h1>Organize agendamentos com um visual mais profissional.</h1>
        <p>
          O AgendaPro reúne autenticação com JWT, criptografia de senha, painel administrativo e
          gestão de agendamentos em uma interface mais bonita e apresentável.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <strong>Autenticação segura</strong>
            <span>Login com JWT, autorização por perfil e proteção de rotas no front e no back.</span>
          </div>
          <div className="feature-card">
            <strong>Painel administrativo</strong>
            <span>Controle de serviços, agendamentos e mudança rápida de status.</span>
          </div>
          <div className="feature-card">
            <strong>Documentação Swagger</strong>
            <span>API documentada para demonstrar organização e facilidade de teste.</span>
          </div>
          <div className="feature-card">
            <strong>Experiência moderna</strong>
            <span>Cards, dashboard, métricas e status visuais para valorizar a apresentação.</span>
          </div>
        </div>
      </section>

      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>Entrar na plataforma</h2>
        <p className="subtitle">Acesse sua conta para criar agendamentos e acompanhar solicitações.</p>

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
          placeholder="Digite sua senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="message error">{error}</p>}

        <button type="submit">Entrar</button>

        <p className="auth-footer">
          Ainda não tem conta? <Link to="/register">Criar cadastro</Link>
        </p>
      </form>
    </div>
  );
}
