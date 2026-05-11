import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";

const categoryLabels = {
  tecnologia: "Tecnología",
  taller: "Taller",
  networking: "Networking",
  hackathon: "Hackathon",
  conferencia: "Conferencia",
  social: "Social",
};

export function EventDetail({ event, message, onRegister, registering, onDelete, deleting }) {
  const { isAuthenticated, user } = useAuth();
  const isOwner = isAuthenticated && user?.email === event.organizer;
  const isFull = event.attendees >= event.capacity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg mb-6 font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-sm font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {categoryLabels[event.category] || event.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Acerca de este evento
            </h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-medium">Fecha</p>
              <p className="text-gray-900 font-semibold mt-1">{event.date}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-medium">Hora</p>
              <p className="text-gray-900 font-semibold mt-1">{event.time}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-medium">Ubicación</p>
              <p className="text-gray-900 font-semibold mt-1 truncate">{event.location}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-medium">Capacidad</p>
              <p className="text-gray-900 font-semibold mt-1">
                {event.attendees}/{event.capacity}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {isOwner && (
            <Button
              variant="danger"
              className="w-full"
              onClick={() => onDelete(event.id)}
              loading={deleting}
            >
              Eliminar evento
            </Button>
          )}

          {!isOwner && isAuthenticated && (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => onRegister(event.id, user.name, user.email)}
              loading={registering}
              disabled={isFull}
            >
              {isFull ? "Evento lleno" : "Registrarse"}
            </Button>
          )}

          {!isAuthenticated && (
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-sm text-indigo-700">
                <a href="/login" className="font-semibold underline">
                  Inicia sesión
                </a>{" "}
                para registrarte en este evento
              </p>
            </div>
          )}

          {event.organizer && (
            <p className="text-xs text-gray-400 text-center">
              Organizado por: {event.organizer}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
