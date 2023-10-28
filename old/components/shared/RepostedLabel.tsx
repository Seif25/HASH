"use client";

import { motion } from "framer-motion";
import { Repeat2 } from "lucide-react";

export default function RepostedLabel({ label }: { label: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, color: "rgba(230, 235, 240, 0.5)" }}
      animate={{ opacity: 1, color: "rgb(34 197 94)" }}
      transition={{ duration: 2 }}
      className="italic font-bold flex items-center gap-1"
    >
      <Repeat2 size={"20px"} className="text-green-500" />
      {label}
    </motion.p>
  );
}
