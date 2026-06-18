"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO (Phase 2): wire this up to an API route, email service, or CRM
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative bg-charcoal py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold">
          Get In Touch
        </p>
        <h2 className="mb-12 text-center font-display text-4xl uppercase text-white md:text-5xl">
          Join The Stage
        </h2>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-body text-white/80"
          >
            Thank you. Your message has been received — our team will be in
            touch soon.
          </motion.p>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-8 md:grid-cols-2"
          >
            <Field label="Full Name" name="fullName" type="text" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Country & Role" name="countryRole" type="text" />

            <div className="md:col-span-2">
              <label className="mb-2 block font-heading text-xs uppercase tracking-widest2 text-white/60">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full resize-none border-0 border-b border-white/20 bg-transparent py-2 font-body text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-sm bg-gold px-8 py-4 font-heading text-sm uppercase tracking-widest2 text-black transition-transform hover:scale-[1.02] md:col-span-2 md:w-auto md:justify-self-start"
            >
              Send Message
            </button>
          </motion.form>
        )}

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-white/10 pt-12">
          <p className="font-heading text-xs uppercase tracking-widest2 text-white/40">
            Follow Beauty Nations
          </p>
          <div className="flex gap-6">
            {/* TODO: Replace # with the official Instagram URL */}
            <a
              href="https://www.instagram.com/beautynations.world/"
              aria-label="Instagram"
              className="text-white/60 transition-colors hover:text-gold"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:info@beautynations.com"
              aria-label="Email"
              className="text-white/60 transition-colors hover:text-gold"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-heading text-xs uppercase tracking-widest2 text-white/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-0 border-b border-white/20 bg-transparent py-2 font-body text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
