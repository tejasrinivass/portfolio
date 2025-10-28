"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="pt-24 sm:pt-32 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-8 sm:grid-cols-2 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight"
          >
            Teja Srinivas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 text-lg text-foreground/80"
          >
            Full‑stack developer crafting delightful UI/UX with robust, scalable backends.
          </motion.p>
          <div className="mt-8 flex gap-3">
            <a href="#projects" className="inline-flex h-11 items-center rounded-md bg-foreground text-background px-5 text-sm font-medium hover:opacity-90">
              View Projects
            </a>
            <a href="#contact" className="inline-flex h-11 items-center rounded-md border border-foreground/20 px-5 text-sm font-medium hover:bg-foreground/5">
              Contact Me
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-video rounded-xl border border-foreground/10 bg-[radial-gradient(ellipse_at_top,theme(colors.foreground/12),transparent_60%)]"
        />
      </div>
    </section>
  );
}
