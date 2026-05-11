import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginForm } from "../components/auth/LoginForm";

export function Login() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">🔐</p>
          <h1 className="text-2xl font-bold text-gray-900">
            Iniciar sesión
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Accede a tu cuenta para gestionar eventos
          </p>
        </div>

        <LoginForm onSuccess={() => navigate("/")} />

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
