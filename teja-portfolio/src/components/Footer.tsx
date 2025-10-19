export function Footer() {
  return (
    <footer className="border-t border-foreground/10 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-sm text-foreground/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Teja Srinivas. All rights reserved.</p>
        <p>Built with Next.js, Tailwind, and Framer Motion.</p>
      </div>
    </footer>
  );
}
