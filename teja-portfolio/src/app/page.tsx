import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />

      <Section id="about" title="About">
        <p className="text-foreground/80 max-w-3xl">
          I’m a full‑stack developer with a strong eye for UI/UX. I design and build end‑to‑end products using React, Next.js, TypeScript, Node.js, and modern cloud tooling. I care deeply about accessibility, performance, and motion that supports clarity.
        </p>
      </Section>

      <Section id="skills" title="Skills">
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {[
            "React, Next.js (App Router)",
            "TypeScript, Node.js, Express",
            "Tailwind CSS, Framer Motion",
            "PostgreSQL, Prisma, REST/GraphQL",
            "Testing: Jest, Playwright",
            "CI/CD, Docker, Vercel/Netlify",
          ].map((s) => (
            <li key={s} className="rounded-md border border-foreground/10 px-3 py-2 bg-background/50">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <a
              key={i}
              href="#contact"
              className="block rounded-xl border border-foreground/10 p-5 bg-background/60 hover:shadow-sm hover:-translate-y-1 transition-transform"
            >
              <div className="aspect-video rounded-lg bg-foreground/10 mb-4" />
              <h3 className="font-medium">Project {i}</h3>
              <p className="text-foreground/70 text-sm mt-1">Short description of the project, tech used, and outcomes.</p>
            </a>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <ContactForm />
      </Section>

      <Footer />
    </div>
  );
}

function ContactForm() {
  async function action(data: FormData): Promise<void> {
    "use server";
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
    } catch {
      // Swallow; consider logging in real-world usage
    }
  }

  return (
    <form action={action} className="grid gap-4 max-w-xl">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input name="name" className="mt-1 w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40" />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input type="email" name="email" className="mt-1 w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40" />
      </div>
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea name="message" rows={5} className="mt-1 w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40" />
      </div>
      <button className="h-11 rounded-md bg-foreground text-background font-medium">Send</button>
      <p className="text-sm text-foreground/60">This form sends to a demo endpoint. Replace with your email service.</p>
    </form>
  );
}
