import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useMyRegistrations, useMyEvents } from "../hooks/useEvents";
import { EventCard } from "../components/events/EventCard";
import { SkeletonCard } from "../components/ui/Skeleton";

function Loader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("my-events");

  const { data: myEvents, loading: loadingMy, execute: loadMy } = useMyEvents(user?.email);
  const { data: registrations, loading: loadingRegs, execute: loadRegs } = useMyRegistrations(user?.email);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadMy();
    loadRegs();
  }, [authLoading, isAuthenticated, loadMy, loadRegs, navigate]);

  if (authLoading || !user) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user.name}
        </h1>
        <p className="text-gray-600 mt-1">Gestiona tus eventos y registros</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setTab("my-events")}
          className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
            tab === "my-events"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Mis eventos
        </button>
        <button
          onClick={() => setTab("registrations")}
          className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
            tab === "registrations"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Mis registros
        </button>
      </div>

      {tab === "my-events" && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Tus eventos creados
            </h2>
            <Link
              to="/create-event"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              + Crear nuevo
            </Link>
          </div>

          {loadingMy ? (
            <Loader />
          ) : myEvents && myEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-4xl mb-3">🎪</p>
              <p className="text-gray-500 mb-4">
                Aún no has creado ningún evento
              </p>
              <Link
                to="/create-event"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Crear mi primer evento
              </Link>
            </div>
          )}
        </section>
      )}

      {tab === "registrations" && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Eventos en los que te registraste
          </h2>

          {loadingRegs ? (
            <Loader />
          ) : registrations && registrations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-4xl mb-3">🎟️</p>
              <p className="text-gray-500 mb-4">
                No estás registrado en ningún evento
              </p>
              <Link
                to="/events"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Explorar eventos
              </Link>
            </div>
          )}
        </section>
      )}
    </motion.div>
  );
}
