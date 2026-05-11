import { EventCard } from "./EventCard";
import { SkeletonCard } from "../ui/Skeleton";

export function EventList({ events, loading, emptyMessage = "No hay eventos disponibles" }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}
