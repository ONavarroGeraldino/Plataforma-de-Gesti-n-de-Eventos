import { motion } from "framer-motion";

export function Input({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-colors
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
        `}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export function Select({
  label,
  name,
  register,
  error,
  options,
  placeholder,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        {...register(name)}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-colors
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
        `}
      >
        <option value="">{placeholder || "Seleccionar..."}</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 4,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-colors resize-vertical
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
