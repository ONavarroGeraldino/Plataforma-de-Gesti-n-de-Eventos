# Plataforma de Gestión de Eventos 🎪

Aplicación web para crear, descubrir y gestionar eventos tecnológicos. Construida con **React 19**, **Vite 8**, **Tailwind CSS 4**, **Framer Motion**, **React Router** y **React Hook Form + Zod**.

## ✨ Características

- **Exploración de eventos** — Página principal con eventos destacados y listado completo.
- **Búsqueda y filtros** — Filtrado por nombre, descripción y categoría (Tecnología, Taller, Networking, Hackathon, Conferencia, Social).
- **Creación de eventos** — Formulario con validación mediante Zod y React Hook Form (título, descripción, fecha, hora, ubicación, categoría, capacidad, imagen).
- **Registro a eventos** — Los usuarios autenticados pueden registrarse; control de capacidad y detección de duplicados.
- **Dashboard personal** — Panel con dos pestañas: "Mis eventos" (creados) y "Mis registros" (eventos a los que te registraste).
- **Detalle de evento** — Vista completa con información, imagen destacada y acciones según el rol.
- **Autenticación** — Registro e inicio de sesión con persistencia en `localStorage`.
- **Roles** — El creador del evento puede eliminarlo; los demás usuarios pueden registrarse.
- **Validación con Zod** — Esquemas de validación para login, registro y formulario de eventos.
- **Animaciones** — Transiciones suaves con Framer Motion (cards, páginas, skeletons).
- **Datos semilla** — 4 eventos precargados al iniciar la app por primera vez.
- **Persistencia local** — Todos los datos (eventos, usuarios, registros) se almacenan en `localStorage`.
- **Diseño responsive** — Adaptable a móvil y escritorio con Tailwind CSS.

## 🛠️ Tecnologías y Herramientas

| Herramienta          | Versión | Propósito                              |
|----------------------|---------|----------------------------------------|
| React                | 19      | UI y lógica de componentes             |
| Vite                 | 8       | Bundler y dev server rápido            |
| Tailwind CSS         | 4       | Estilos utilitarios                    |
| Framer Motion        | 12      | Animaciones de componentes             |
| React Router DOM     | 7       | Enrutamiento SPA (BrowserRouter)       |
| React Hook Form      | 7       | Manejo de formularios                  |
| Zod                  | 4       | Validación de esquemas                 |
| @hookform/resolvers  | 5       | Integración Zod + React Hook Form      |
| ESLint               | 10      | Linter de código                       |

## 🚀 Scripts

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Previsualiza la build
npm run lint     # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx        # Formulario de inicio de sesión
│   │   └── RegisterForm.jsx     # Formulario de registro
│   ├── events/
│   │   ├── EventCard.jsx        # Tarjeta de evento con categoría y asistentes
│   │   ├── EventDetail.jsx      # Vista detallada del evento
│   │   ├── EventForm.jsx        # Formulario de creación/edición de evento
│   │   └── EventList.jsx        # Grid de eventos con estado vacío
│   ├── layout/
│   │   ├── Layout.jsx           # Layout principal con Navbar y Footer
│   │   ├── Navbar.jsx           # Barra de navegación con enlaces y auth
│   │   └── Footer.jsx           # Footer informativo
│   └── ui/
│       ├── Button.jsx           # Botón reutilizable con variantes y loading
│       ├── Input.jsx            # Input/Select/Textarea con label y error
│       └── Skeleton.jsx         # Esqueletos de carga (card y detalle)
├── context/
│   └── AuthContext.jsx          # Contexto de autenticación
├── hooks/
│   ├── useAuth.js               # Hook para consumir AuthContext
│   ├── useEvents.js             # Hooks para operaciones CRUD de eventos
│   └── useFetch.js              # Hook genérico de fetching
├── lib/
│   ├── api.js                   # API simulada con localStorage (datos semilla)
│   └── validations.js           # Esquemas Zod (login, register, event)
├── pages/
│   ├── Home.jsx                 # Landing con hero y eventos destacados
│   ├── Events.jsx               # Listado completo con búsqueda y filtros
│   ├── CreateEvent.jsx          # Página de creación de evento
│   ├── EventDetailPage.jsx      # Página de detalle con registro/eliminación
│   ├── Dashboard.jsx            # Panel personal con mis eventos y registros
│   ├── Login.jsx                # Página de inicio de sesión
│   └── Register.jsx             # Página de registro
├── App.jsx                      # Punto de entrada con routing y AuthProvider
├── main.jsx                     # Renderizado principal
└── index.css                    # Estilos base Tailwind
```
