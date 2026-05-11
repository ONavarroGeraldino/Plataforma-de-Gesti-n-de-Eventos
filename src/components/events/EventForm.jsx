import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { eventSchema } from "../../lib/validations";
import { Input, Select, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";

const categories = [
  { value: "tecnologia", label: "Tecnología" },
  { value: "taller", label: "Taller" },
  { value: "networking", label: "Networking" },
  { value: "hackathon", label: "Hackathon" },
  { value: "conferencia", label: "Conferencia" },
  { value: "social", label: "Social" },
];

export function EventForm({ onSubmit, loading = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      capacity: "",
      image: "",
    },
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-md p-6 space-y-4"
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {defaultValues ? "Editar Evento" : "Crear Nuevo Evento"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="space-y-4">
          <Input
            label="Título del evento"
            name="title"
            placeholder="Nombre del evento"
            register={register}
            error={errors.title?.message}
          />

          <Input
            label="Fecha"
            name="date"
            type="date"
            register={register}
            error={errors.date?.message}
          />

          <Input
            label="Hora"
            name="time"
            type="time"
            register={register}
            error={errors.time?.message}
          />

          <Input
            label="Ubicación"
            name="location"
            placeholder="Dirección del evento"
            register={register}
            error={errors.location?.message}
          />
        </div>

        <div className="space-y-4">
          <Select
            label="Categoría"
            name="category"
            register={register}
            error={errors.category?.message}
            options={categories}
            placeholder="Selecciona una categoría"
          />

          <Input
            label="Capacidad máxima"
            name="capacity"
            type="number"
            placeholder="Número de asistentes"
            register={register}
            error={errors.capacity?.message}
          />

          <Input
            label="URL de imagen (opcional)"
            name="image"
            placeholder="https://ejemplo.com/imagen.jpg"
            register={register}
            error={errors.image?.message}
          />
        </div>
      </div>

      <Textarea
        label="Descripción"
        name="description"
        placeholder="Describe tu evento en detalle..."
        rows={5}
        register={register}
        error={errors.description?.message}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={loading} size="lg">
          {defaultValues ? "Guardar cambios" : "Publicar evento"}
        </Button>
      </div>
    </motion.form>
  );
}
