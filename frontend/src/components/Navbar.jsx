import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-title">AgendaPro</span>
        <span className="brand-subtitle">Sistema de agendamento de atendimentos</span>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">{user.name} • {user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</span>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === 'ADMIN' && <Link to="/admin">Painel Admin</Link>}
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            {!isAuthPage && <Link to="/login">Entrar</Link>}
            <Link to="/register">Criar conta</Link>
          </>
        )}
      </div>
    </nav>
  );
}
