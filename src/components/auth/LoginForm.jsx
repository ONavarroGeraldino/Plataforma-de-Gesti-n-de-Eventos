import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { loginSchema } from "../../lib/validations";
import { loginUser } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useState } from "react";

export function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const user = await loginUser(data.email, data.password);
      login(user);
      onSuccess?.();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="tu@ejemplo.com"
        register={register}
        error={errors.email?.message}
      />

      <Input
        label="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        register={register}
        error={errors.password?.message}
      />

      {serverError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 bg-red-50 p-2 rounded"
        >
          {serverError}
        </motion.p>
      )}

      <Button type="submit" loading={isSubmitting} className="w-full">
        Iniciar sesión
      </Button>
    </motion.form>
  );
}
