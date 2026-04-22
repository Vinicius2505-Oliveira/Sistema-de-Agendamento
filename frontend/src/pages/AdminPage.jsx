import { useEffect, useMemo, useState } from 'react';
import api from '../api/api';

function getStatusClass(status) {
  if (status === 'APPROVED') return 'badge badge-approved';
  if (status === 'CANCELED') return 'badge badge-canceled';
  return 'badge badge-pending';
}

function getStatusLabel(status) {
  if (status === 'APPROVED') return 'Confirmado';
  if (status === 'CANCELED') return 'Cancelado';
  return 'Pendente';
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState([]);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', duration: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  async function loadAppointments() {
    const { data } = await api.get('/appointments');
    setAppointments(data);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const stats = useMemo(() => {
    const approved = appointments.filter((a) => a.status === 'APPROVED').length;
    const pending = appointments.filter((a) => a.status === 'PENDING').length;
    const canceled = appointments.filter((a) => a.status === 'CANCELED').length;
    const uniqueUsers = new Set(appointments.map((a) => a.user.email)).size;

    return {
      total: appointments.length,
      approved,
      pending,
      canceled,
      uniqueUsers,
    };
  }, [appointments]);

  async function createService(e) {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await api.post('/services', {
        ...serviceForm,
        duration: Number(serviceForm.duration),
      });
      setServiceForm({ title: '', description: '', duration: '' });
      setMessage({ type: 'success', text: 'Serviço criado com sucesso.' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Erro ao criar serviço.',
      });
    }
  }

  async function updateStatus(id, status) {
    await api.patch(`/appointments/${id}/status`, { status });
    loadAppointments();
  }

  return (
    <div className="page-container">
      <section className="hero-panel">
        <div className="hero-card">
          <h1>Painel administrativo</h1>
          <p>
            Gerencie serviços, acompanhe a movimentação do sistema e altere o status dos
            agendamentos de forma rápida para apresentação e testes.
          </p>

          <div className="hero-chip-row">
            <span className="hero-chip">Controle de serviços</span>
            <span className="hero-chip">Aprovação e cancelamento</span>
            <span className="hero-chip">Visão geral do sistema</span>
          </div>
        </div>

        <div className="card info-panel">
          <div className="section-heading">
            <div>
              <h2>Visão administrativa</h2>
              <p>Indicadores rápidos para demonstrar o projeto.</p>
            </div>
          </div>
          <div className="info-row">
            <span className="muted">Usuários com pedidos</span>
            <strong>{stats.uniqueUsers}</strong>
          </div>
          <div className="info-row">
            <span className="muted">Data da consulta</span>
            <strong>{new Date().toLocaleDateString('pt-BR')}</strong>
          </div>
          <div className="info-row">
            <span className="muted">Fluxo principal</span>
            <strong>Criação, análise e atualização</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total de agendamentos</p>
          <p className="stat-value">{stats.total}</p>
          <p className="stat-helper">Pedidos cadastrados no sistema.</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pendentes</p>
          <p className="stat-value">{stats.pending}</p>
          <p className="stat-helper">Aguardando ação administrativa.</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Confirmados</p>
          <p className="stat-value">{stats.approved}</p>
          <p className="stat-helper">Pedidos já aprovados.</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Cancelados</p>
          <p className="stat-value">{stats.canceled}</p>
          <p className="stat-helper">Solicitações encerradas ou recusadas.</p>
        </div>
      </section>

      <section className="grid-2">
        <form className="card" onSubmit={createService}>
          <div className="section-heading">
            <div>
              <h2>Cadastrar novo serviço</h2>
              <p>Adicione opções para os usuários solicitarem atendimento.</p>
            </div>
          </div>

          <div className="form-stack">
            <div>
              <label className="label">Título do serviço</label>
              <input
                type="text"
                placeholder="Ex.: Atendimento acadêmico"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Descrição</label>
              <textarea
                placeholder="Descreva o objetivo do atendimento"
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Duração em minutos</label>
              <input
                type="number"
                placeholder="60"
                value={serviceForm.duration}
                onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
              />
            </div>

            {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

            <button type="submit">Cadastrar serviço</button>
          </div>
        </form>

        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Resumo operacional</h2>
              <p>Indicadores úteis durante a apresentação.</p>
            </div>
          </div>

          <div className="info-panel">
            <div className="info-row">
              <span className="muted">Taxa de aprovação</span>
              <strong>
                {stats.total === 0 ? '0%' : `${Math.round((stats.approved / stats.total) * 100)}%`}
              </strong>
            </div>
            <div className="info-row">
              <span className="muted">Solicitações pendentes</span>
              <strong>{stats.pending}</strong>
            </div>
            <div className="info-row">
              <span className="muted">Solicitações canceladas</span>
              <strong>{stats.canceled}</strong>
            </div>
            <div className="info-row">
              <span className="muted">Volume de usuários</span>
              <strong>{stats.uniqueUsers}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <h2>Todos os agendamentos</h2>
            <p>Controle central dos pedidos criados pelos usuários.</p>
          </div>
          <span className="pill">{appointments.length} registros</span>
        </div>

        {appointments.length === 0 ? (
          <div className="empty-state">Nenhum agendamento cadastrado no momento.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Usuário</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Observações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <strong>{appointment.service.title}</strong>
                    </td>
                    <td>
                      <strong>{appointment.user.name}</strong>
                      <div className="muted">{appointment.user.email}</div>
                    </td>
                    <td>{new Date(appointment.date).toLocaleString('pt-BR')}</td>
                    <td>
                      <span className={getStatusClass(appointment.status)}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </td>
                    <td>{appointment.notes || 'Sem observações'}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => updateStatus(appointment.id, 'APPROVED')}>
                          Aprovar
                        </button>
                        <button
                          className="btn-warning"
                          onClick={() => updateStatus(appointment.id, 'PENDING')}
                        >
                          Pendente
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => updateStatus(appointment.id, 'CANCELED')}
                        >
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
