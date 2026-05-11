import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/events/EventCard";
import { SkeletonCard } from "../components/ui/Skeleton";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { events, loading } = useEvents();
  const { isAuthenticated } = useAuth();
  const featured = events?.slice(0, 3) || [];

  return (
    <div className="space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 md:py-24"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Gestiona y descubre{" "}
          <span className="text-indigo-600">eventos increíbles</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Crea, organiza y encuentra los mejores eventos tecnológicos. Conéctate
          con la comunidad y lleva tus proyectos al siguiente nivel.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/events">
            <Button variant="primary" size="lg">
              Explorar eventos
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Crear cuenta gratis
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/create-event">
              <Button variant="secondary" size="lg">
                Crear evento
              </Button>
            </Link>
          )}
        </div>
      </motion.section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Eventos destacados
          </h2>
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para organizar tu evento?
        </h2>
        <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
          Crea tu evento en minutos, gestiona asistentes y promociona tu
          actividad con nuestra plataforma.
        </p>
        <Link to={isAuthenticated ? "/create-event" : "/register"}>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-indigo-600 hover:bg-indigo-50"
          >
            Comenzar ahora
          </Button>
        </Link>
      </motion.section>
    </div>
  );
}
