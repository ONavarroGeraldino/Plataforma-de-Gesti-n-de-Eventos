import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categoryColors = {
  tecnologia: "bg-blue-100 text-blue-800",
  taller: "bg-green-100 text-green-800",
  networking: "bg-purple-100 text-purple-800",
  hackathon: "bg-orange-100 text-orange-800",
  conferencia: "bg-indigo-100 text-indigo-800",
  social: "bg-pink-100 text-pink-800",
};

const categoryLabels = {
  tecnologia: "Tecnología",
  taller: "Taller",
  networking: "Networking",
  hackathon: "Hackathon",
  conferencia: "Conferencia",
  social: "Social",
};

export function EventCard({ event, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/events/${event.id}`}
        className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full"
      >
        <div className="h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                categoryColors[event.category] || "bg-gray-100 text-gray-800"
              }`}
            >
              {categoryLabels[event.category] || event.category}
            </span>
            <span className="text-xs text-gray-500">
              {event.attendees}/{event.capacity} asistentes
            </span>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {event.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>📅 {event.date}</span>
            <span>⏰ {event.time}</span>
            <span>📍 {event.location}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
