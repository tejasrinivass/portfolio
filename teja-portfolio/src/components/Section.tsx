"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id={id} className={cn("scroll-mt-24 py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight"
        >
          {title}
        </motion.h2>
        <motion.div
          ref={ref}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-10"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
