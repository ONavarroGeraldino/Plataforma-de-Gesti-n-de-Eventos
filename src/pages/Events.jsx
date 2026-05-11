import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useEvents } from "../hooks/useEvents";
import { EventList } from "../components/events/EventList";

const categories = [
  { value: "", label: "Todas" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "taller", label: "Taller" },
  { value: "networking", label: "Networking" },
  { value: "hackathon", label: "Hackathon" },
  { value: "conferencia", label: "Conferencia" },
  { value: "social", label: "Social" },
];

export function Events() {
  const { events, loading } = useEvents();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => {
      const matchSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || e.category === category;
      return matchSearch && matchCategory;
    });
  }, [events, search, category]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Eventos</h1>
        <p className="text-gray-600">
          Descubre eventos tecnológicos, talleres y más.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <EventList
        events={filtered}
        loading={loading}
        emptyMessage={
          search || category
            ? "No se encontraron eventos con esos filtros"
            : "No hay eventos disponibles"
        }
      />
    </motion.div>
  );
}
