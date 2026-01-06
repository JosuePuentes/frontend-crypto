import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { authUtils } from '../utils/auth';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = authUtils.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Opcional: Verificar token con el backend
          await authAPI.verifyToken();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        authUtils.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    authUtils.logout();
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="main-title">ASTROCOIN</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      {user && (
        <div className="user-info">
          <h2>Tu Perfil</h2>
          <div className="info-card">
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.telefono && (
              <p><strong>Teléfono:</strong> {user.telefono}</p>
            )}
            <p><strong>Fecha de Registro:</strong> {
              new Date(user.fechaRegistro).toLocaleDateString('es-ES')
            }</p>
          </div>
        </div>
      )}

      <div className="crypto-info">
        <h2>🚀 La Criptomoneda del Futuro</h2>
        <p>Bienvenido a ASTROCOIN - Próximamente: Funcionalidades de trading, wallet, y más...</p>
      </div>
    </div>
  );
}

export default Dashboard;

