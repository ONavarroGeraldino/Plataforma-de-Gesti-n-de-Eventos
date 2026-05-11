const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const STORAGE_EVENTS = "event_platform_events";
const STORAGE_REGISTRATIONS = "event_platform_registrations";

function getStoredEvents() {
  const data = localStorage.getItem(STORAGE_EVENTS);
  return data ? JSON.parse(data) : [];
}

function setStoredEvents(events) {
  localStorage.setItem(STORAGE_EVENTS, JSON.stringify(events));
}

function getStoredRegistrations() {
  const data = localStorage.getItem(STORAGE_REGISTRATIONS);
  return data ? JSON.parse(data) : [];
}

function setStoredRegistrations(regs) {
  localStorage.setItem(STORAGE_REGISTRATIONS, JSON.stringify(regs));
}

const seedEvents = [
  {
    id: "1",
    title: "Conferencia de Tecnología 2026",
    description: "Una conferencia sobre las últimas tendencias en tecnología, inteligencia artificial y desarrollo de software.",
    date: "2026-06-15",
    time: "09:00",
    location: "Centro de Convenciones, Ciudad de México",
    category: "tecnologia",
    capacity: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    organizer: "admin@ejemplo.com",
    attendees: 0,
  },
  {
    id: "2",
    title: "Taller de React Avanzado",
    description: "Aprende patrones avanzados de React, performance optimization y server components.",
    date: "2026-07-20",
    time: "10:00",
    location: "Coworking Space, Monterrey",
    category: "taller",
    capacity: 50,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    organizer: "admin@ejemplo.com",
    attendees: 0,
  },
  {
    id: "3",
    title: "Networking para Developers",
    description: "Evento de networking para desarrolladores de todas las especialidades.",
    date: "2026-08-05",
    time: "18:00",
    location: "Restaurante La Terraza, Guadalajara",
    category: "networking",
    capacity: 100,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    organizer: "admin@ejemplo.com",
    attendees: 0,
  },
  {
    id: "4",
    title: "Hackathon: Innovación Social",
    description: "Un hackathon de 48 horas para crear soluciones tecnológicas con impacto social.",
    date: "2026-09-10",
    time: "08:00",
    location: "Innovation Hub, Puebla",
    category: "hackathon",
    capacity: 200,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    organizer: "admin@ejemplo.com",
    attendees: 0,
  },
];

if (!localStorage.getItem(STORAGE_EVENTS)) {
  setStoredEvents(seedEvents);
}

export async function fetchEvents() {
  await delay(800);
  return getStoredEvents();
}

export async function fetchEventById(id) {
  await delay(500);
  const events = getStoredEvents();
  const event = events.find((e) => e.id === id);
  if (!event) throw new Error("Evento no encontrado");
  return event;
}

export async function createEvent(eventData, userEmail) {
  await delay(600);
  const events = getStoredEvents();
  const newEvent = {
    ...eventData,
    id: Date.now().toString(),
    organizer: userEmail,
    attendees: 0,
  };
  events.push(newEvent);
  setStoredEvents(events);
  return newEvent;
}

export async function registerForEvent(eventId, userName, userEmail) {
  await delay(400);
  const events = getStoredEvents();
  const event = events.find((e) => e.id === eventId);
  if (!event) throw new Error("Evento no encontrado");
  if (event.attendees >= event.capacity) throw new Error("Evento lleno");

  const registrations = getStoredRegistrations();
  const already = registrations.find(
    (r) => r.eventId === eventId && r.email === userEmail
  );
  if (already) throw new Error("Ya estás registrado en este evento");

  registrations.push({ eventId, userName, userEmail });
  setStoredRegistrations(registrations);

  event.attendees += 1;
  setStoredEvents(events);
  return { success: true };
}

export async function fetchMyRegistrations(userEmail) {
  await delay(600);
  const registrations = getStoredRegistrations();
  const myRegs = registrations.filter((r) => r.email === userEmail);
  const events = getStoredEvents();
  return myRegs
    .map((r) => events.find((e) => e.id === r.eventId))
    .filter(Boolean);
}

export async function fetchMyEvents(userEmail) {
  await delay(600);
  const events = getStoredEvents();
  return events.filter((e) => e.organizer === userEmail);
}

export async function deleteEvent(eventId, userEmail) {
  await delay(400);
  let events = getStoredEvents();
  const event = events.find((e) => e.id === eventId);
  if (!event) throw new Error("Evento no encontrado");
  if (event.organizer !== userEmail) throw new Error("No autorizado");
  events = events.filter((e) => e.id !== eventId);
  setStoredEvents(events);
  return { success: true };
}

export async function loginUser(email, password) {
  await delay(800);
  if (!email || !password) throw new Error("Credenciales inválidas");
  return {
    name: email.split("@")[0],
    email,
    token: "mock-jwt-token",
  };
}

export async function registerUser(name, email, password) {
  await delay(800);
  return {
    name,
    email,
    token: "mock-jwt-token",
  };
}
