import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEventDetail, useRegisterForEvent, useDeleteEvent } from "../hooks/useEvents";
import { EventDetail } from "../components/events/EventDetail";
import { SkeletonDetail } from "../components/ui/Skeleton";

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fetchedEvent, loading, error, execute: load } = useEventDetail(id);
  const { execute: register, loading: registering } = useRegisterForEvent();
  const { execute: remove, loading: deleting } = useDeleteEvent();
  const [msg, setMsg] = useState(null);

  const event = msg?.type === "success" && fetchedEvent
    ? { ...fetchedEvent, attendees: fetchedEvent.attendees + 1 }
    : fetchedEvent;

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <SkeletonDetail />;

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-gray-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate("/events")}
          className="text-indigo-600 hover:underline font-medium"
        >
          Volver a eventos
        </button>
      </div>
    );
  }

  if (!fetchedEvent) return null;

  const handleRegister = async (eventId, userName, userEmail) => {
    setMsg(null);
    try {
      await register(eventId, userName, userEmail);
      setMsg({ type: "success", text: "¡Te has registrado exitosamente!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Error al registrarse" });
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await remove(eventId, fetchedEvent.organizer);
      navigate("/dashboard");
    } catch {
    }
  };

  return (
    <EventDetail
      event={event}
      message={msg}
      onRegister={handleRegister}
      registering={registering}
      onDelete={handleDelete}
      deleting={deleting}
    />
  );
}
