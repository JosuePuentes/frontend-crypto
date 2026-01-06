import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';
import { authAPI } from '../services/api';
import './AdminPanel.css';

function AdminPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = authUtils.getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        // Verificar si es admin
        if (!authUtils.isAdmin()) {
          navigate('/dashboard');
          return;
        }
        
        setUser(currentUser);
        await authAPI.verifyToken();
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

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      // Nota: Necesitarías crear un endpoint en el backend para obtener todos los usuarios
      // Por ahora, esto es solo un ejemplo
      const response = await authAPI.getProfile();
      // Aquí deberías llamar a un endpoint como: await api.get('/admin/users');
      console.log('Cargar usuarios - endpoint pendiente de implementar en backend');
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="main-title">ASTROCOIN</h1>
          <p className="admin-badge">🔐 Panel de Administración</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      {user && (
        <div className="admin-info">
          <h2>Bienvenido, {user.nombre}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> Administrador</p>
        </div>
      )}

      <div className="admin-sections">
        <div className="admin-card">
          <h3>👥 Gestión de Usuarios</h3>
          <p>Gestiona los usuarios del sistema</p>
          <button onClick={loadUsers} className="admin-button" disabled={loadingUsers}>
            {loadingUsers ? 'Cargando...' : 'Ver Usuarios'}
          </button>
        </div>

        <div className="admin-card">
          <h3>📊 Estadísticas</h3>
          <p>Visualiza estadísticas del sistema</p>
          <button className="admin-button" disabled>
            Próximamente
          </button>
        </div>

        <div className="admin-card">
          <h3>⚙️ Configuración</h3>
          <p>Configuración del sistema</p>
          <button className="admin-button" disabled>
            Próximamente
          </button>
        </div>
      </div>

      {users.length > 0 && (
        <div className="users-list">
          <h3>Lista de Usuarios</h3>
          <div className="users-table">
            {users.map((u) => (
              <div key={u.id} className="user-item">
                <p><strong>{u.nombre}</strong> - {u.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;

