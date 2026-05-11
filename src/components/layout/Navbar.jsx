import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <span className="font-bold text-xl text-gray-900">
              Gestión de Eventos
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/events"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
              Eventos
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                >
                  Mi Panel
                </Link>
                <Link to="/create-event">
                  <Button variant="primary" size="sm">
                    Crear Evento
                  </Button>
                </Link>
                <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                  <span className="text-sm text-gray-600">{user?.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Salir
                  </Button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                >
                  Iniciar sesión
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="px-4 py-3 space-y-2">
            <Link to="/events" className="block py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Eventos</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Mi Panel</Link>
                <Link to="/create-event" className="block py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Crear Evento</Link>
                <hr className="my-2" />
                <span className="block py-1 text-sm text-gray-500">{user?.name}</span>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block py-2 text-red-600">Salir</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-600" onClick={() => setMobileOpen(false)}>Iniciar sesión</Link>
                <Link to="/register" className="block py-2 text-indigo-600 font-medium" onClick={() => setMobileOpen(false)}>Registrarse</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
