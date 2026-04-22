import { useEffect, useMemo, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

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

export default function DashboardPage() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ serviceId: '', date: '', notes: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  async function loadData() {
    const [servicesRes, appointmentsRes] = await Promise.all([
      api.get('/services'),
      api.get('/appointments/me'),
    ]);

    setServices(servicesRes.data);
    setAppointments(appointmentsRes.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const stats = useMemo(() => {
    const pending = appointments.filter((item) => item.status === 'PENDING').length;
    const approved = appointments.filter((item) => item.status === 'APPROVED').length;
    const canceled = appointments.filter((item) => item.status === 'CANCELED').length;

    return {
      total: appointments.length,
      pending,
      approved,
      canceled,
    };
  }, [appointments]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      await api.post('/appointments', form);
      setForm({ serviceId: '', date: '', notes: '' });
      setMessage({ type: 'success', text: 'Agendamento realizado com sucesso.' });
      loadData();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Erro ao agendar.',
      });
    }
  }

  return (
    <div className="page-container">
      <section className="hero-panel">
        <div className="hero-card">
          <h1>Bem-vindo, {user?.name}.</h1>
          <p>
            Organize seus atendimentos, acompanhe o status dos pedidos e visualize os serviços
            disponíveis em um painel mais claro e profissional.
          </p>

          <div className="hero-chip-row">
            <span className="hero-chip">JWT e autorização por perfil</span>
            <span className="hero-chip">Prisma + banco de dados</span>
            <span className="hero-chip">Front-end React</span>
          </div>
        </div>

        <div className="card info-panel">
          <div className="section-heading">
            <div>
              <h2>Resumo da conta</h2>
              <p>Visão rápida do seu uso no sistema.</p>
            </div>
          </div>

          <div className="info-row">
            <span className="muted">Perfil de acesso</span>
            <strong>{user?.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</strong>
          </div>
          <div className="info-row">
            <span className="muted">Serviços disponíveis</span>
            <strong>{services.length}</strong>
          </div>
          <div className="info-row">
            <span className="muted">Última atualização</span>
            <strong>{new Date().toLocaleDateString('pt-BR')}</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total de agendamentos</p>
          <p className="stat-value">{stats.total}</p>
          <p className="stat-helper">Todos os seus pedidos registrados.</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pendentes</p>
          <p className="stat-value">{stats.pending}</p>
          <p className="stat-helper">Aguardando aprovação do administrador.</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Confirmados</p>
          <p className="stat-value">{stats.approved}</p>
          <p className="stat-helper">Atendimentos já aprovados.</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Cancelados</p>
          <p className="stat-value">{stats.canceled}</p>
          <p className="stat-helper">Pedidos que não seguiram adiante.</p>
        </div>
      </section>

      <section className="grid-2">
        <form className="card" onSubmit={handleSubmit}>
          <div className="section-heading">
            <div>
              <h2>Novo agendamento</h2>
              <p>Escolha um serviço, data e adicione observações.</p>
            </div>
          </div>

          <div className="form-stack">
            <div>
              <label className="label">Serviço</label>
              <select
                value={form.serviceId}
                onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title} • {service.duration} min
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Data e horário</label>
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Observações</label>
              <textarea
                placeholder="Descreva algo importante para o atendimento"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

            <button type="submit">Solicitar agendamento</button>
          </div>
        </form>

        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Serviços disponíveis</h2>
              <p>Opções cadastradas para atendimento.</p>
            </div>
            <span className="pill">{services.length} serviços</span>
          </div>

          {services.length === 0 ? (
            <div className="empty-state">Nenhum serviço cadastrado no momento.</div>
          ) : (
            <div className="service-list">
              {services.map((service) => (
                <article key={service.id} className="service-card">
                  <h3>{service.title}</h3>
                  <p className="muted">{service.description}</p>
                  <div className="service-meta">
                    <span className="pill">Duração: {service.duration} min</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <h2>Meus agendamentos</h2>
            <p>Acompanhe os horários e o status de cada solicitação.</p>
          </div>
          <span className="pill">{appointments.length} registros</span>
        </div>

        {appointments.length === 0 ? (
          <div className="empty-state">Você ainda não possui agendamentos cadastrados.</div>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <article key={appointment.id} className="appointment-card">
                <h3>{appointment.service.title}</h3>
                <div className="appointment-meta">
                  <span className="pill">{new Date(appointment.date).toLocaleString('pt-BR')}</span>
                  <span className={getStatusClass(appointment.status)}>
                    {getStatusLabel(appointment.status)}
                  </span>
                </div>
                {appointment.notes && (
                  <p className="muted" style={{ marginTop: '12px' }}>
                    Observações: {appointment.notes}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
