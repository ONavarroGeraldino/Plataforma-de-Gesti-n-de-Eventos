import { useState, useEffect, useCallback } from "react";
import {
  fetchEvents,
  fetchEventById,
  createEvent,
  registerForEvent,
  fetchMyRegistrations,
  fetchMyEvents,
  deleteEvent,
} from "../lib/api";
import { useFetch } from "./useFetch";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return { events, loading, error, refetch: loadEvents };
}

export function useEventDetail(id) {
  return useFetch(() => fetchEventById(id));
}

export function useCreateEvent() {
  return useFetch((data, email) => createEvent(data, email));
}

export function useRegisterForEvent() {
  return useFetch((eventId, userName, userEmail) =>
    registerForEvent(eventId, userName, userEmail)
  );
}

export function useMyRegistrations(email) {
  return useFetch(() => fetchMyRegistrations(email));
}

export function useMyEvents(email) {
  return useFetch(() => fetchMyEvents(email));
}

export function useDeleteEvent() {
  return useFetch((id, email) => deleteEvent(id, email));
}
