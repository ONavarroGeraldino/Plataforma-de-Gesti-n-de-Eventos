import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EventForm } from "../components/events/EventForm";
import { useCreateEvent } from "../hooks/useEvents";
import { useAuth } from "../hooks/useAuth";

export function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { execute: create, loading } = useCreateEvent();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (data) => {
    try {
      await create(data, user.email);
      navigate("/dashboard");
    } catch {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <EventForm onSubmit={handleSubmit} loading={loading} />
    </motion.div>
  );
}
