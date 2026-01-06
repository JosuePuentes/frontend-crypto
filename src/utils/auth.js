export const authUtils = {
  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si el usuario es admin
  isAdmin: () => {
    const user = authUtils.getCurrentUser();
    if (!user) return false;
    // Detectar admin por email (emails que contengan 'admin' o terminen en '@admin.com')
    const email = user.email?.toLowerCase() || '';
    return email.includes('admin') || email.endsWith('@admin.com') || email === 'admin@astrocoin.com';
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};

