import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterForm } from "../components/auth/RegisterForm";

export function Register() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">🚀</p>
          <h1 className="text-2xl font-bold text-gray-900">
            Crear cuenta
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Regístrate para crear y gestionar eventos
          </p>
        </div>

        <RegisterForm onSuccess={() => navigate("/")} />

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
