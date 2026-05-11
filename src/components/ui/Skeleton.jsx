import { motion } from "framer-motion";

export function Skeleton({ className = "" }) {
  return (
    <motion.div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-40" />
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
