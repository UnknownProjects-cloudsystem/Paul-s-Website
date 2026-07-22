"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const serviceTypes = [
  "Private Dog Training",
  "Puppy Training",
  "Basic Obedience",
  "Advanced Obedience",
  "Behaviour Training",
  "E-Collar Training",
  "Service Dog Training",
  "Therapy Dog Training",
  "Scent / Detection Training",
  "Search and Rescue Introduction",
  "Personal Protection",
  "Corporate K9 Consultation",
  "Detector Dog Evaluation",
  "Patrol Dog Evaluation",
  "Other",
];

const concerns = [
  "Pulling on leash",
  "Reactivity",
  "Aggression concerns",
  "Poor recall",
  "Jumping",
  "Biting / nipping",
  "Separation anxiety",
  "Fearfulness",
  "No obedience foundation",
  "Service / therapy support",
  "Corporate K9 evaluation",
  "Other",
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  area: string;
  preferredContact: string;
  serviceCategory: string;
  dogName: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  spayedNeutered: string;
  trainingLevel: string;
  serviceType: string;
  concern: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
};

const initial: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  area: "",
  preferredContact: "Phone",
  serviceCategory: "Private",
  dogName: "",
  breed: "",
  age: "",
  weight: "",
  gender: "",
  spayedNeutered: "",
  trainingLevel: "",
  serviceType: "",
  concern: "",
  message: "",
  consent: false,
  company: "",
};

const steps = ["Owner", "Your Dog", "Training Need", "Details"];

const fieldBase =
  "w-full rounded-lg border border-white/15 bg-charcoal/60 px-4 py-3 text-sm text-soft-white placeholder:text-fog focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";
const labelBase =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-fog";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelBase}>
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validateStep(s: number): string | null {
    if (s === 0) {
      if (!form.area.trim()) return "Please enter your full address.";
      if (!form.firstName.trim() || !form.lastName.trim())
        return "Please enter your first and last name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email))
        return "Please enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length < 10)
        return "Please enter a valid phone number.";
      if (!form.city.trim()) return "Please enter your city or town.";
    }
    if (s === 1) {
      if (!form.breed.trim()) return "Please enter your dog's breed (or 'mixed').";
    }
    if (s === 2) {
      if (!form.serviceType) return "Please select a service type.";
    }
    return null;
  }

  function next() {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateStep(2);
    if (err) {
      setError(err);
      setStep(2);
      return;
    }
    if (!form.consent) {
      setError("Please agree to be contacted so we can respond to your inquiry.");
      return;
    }
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending your inquiry. Please call or text us at 905 427 4142."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="card-surface p-8 text-center sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-6 heading-md">Inquiry Received</h3>
        <p className="mx-auto mt-3 max-w-md text-silver">
          Thank you, {form.firstName}. Your training inquiry has been sent and
          Paul will be in touch shortly. For anything urgent, call or text{" "}
          <a href="tel:+19054274142" className="text-gold">
            905 427 4142
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8" noValidate>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                    i <= step
                      ? "border-gold bg-gold text-charcoal"
                      : "border-white/20 text-fog"
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-[0.65rem] font-semibold uppercase tracking-wide sm:block",
                    i <= step ? "text-gold" : "text-fog"
                  )}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "mx-2 h-px flex-1 transition-colors",
                    i < step ? "bg-gold" : "bg-white/15"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(e) => set("company", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Step 0 — Owner */}
      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name" required>
            <input className={fieldBase} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="First name" />
          </Field>
          <Field label="Last Name" required>
            <input className={fieldBase} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Last name" />
          </Field>
          <Field label="Email" required>
            <input type="email" className={fieldBase} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
          </Field>
          <Field label="Phone" required>
            <input type="tel" className={fieldBase} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="905 555 1234" />
          </Field>
          <Field label="City / Town" required>
            <input className={fieldBase} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Oshawa" />
          </Field>
          <Field label="Full Address" required>
  <input
    className={fieldBase}
    value={form.area}
    onChange={(e) => set("area", e.target.value)}
    placeholder="e.g. 123 Main Street, Ajax, ON"
  />
</Field>
          <Field label="Preferred Contact Method">
            <select className={fieldBase} value={form.preferredContact} onChange={(e) => set("preferredContact", e.target.value)}>
              <option>Phone</option>
              <option>Text</option>
              <option>Email</option>
            </select>
          </Field>
          <Field label="Service Type">
            <select className={fieldBase} value={form.serviceCategory} onChange={(e) => set("serviceCategory", e.target.value)}>
              <option value="Private">Private (my own dog)</option>
              <option value="Corporate">Corporate / Working K9</option>
            </select>
          </Field>
        </div>
      )}

      {/* Step 1 — Dog */}
      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Dog's Name">
            <input className={fieldBase} value={form.dogName} onChange={(e) => set("dogName", e.target.value)} placeholder="Dog's name" />
          </Field>
          <Field label="Breed" required>
            <input className={fieldBase} value={form.breed} onChange={(e) => set("breed", e.target.value)} placeholder="e.g. German Shepherd / mixed" />
          </Field>
          <Field label="Age">
            <input className={fieldBase} value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="e.g. 6 months" />
          </Field>
          <Field label="Weight">
            <input className={fieldBase} value={form.weight} onChange={(e) => set("weight", e.target.value)} placeholder="e.g. 30 kg / 65 lb" />
          </Field>
          <Field label="Gender">
            <select className={fieldBase} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
              <option value="">Select…</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </Field>
          <Field label="Spayed / Neutered">
            <select className={fieldBase} value={form.spayedNeutered} onChange={(e) => set("spayedNeutered", e.target.value)}>
              <option value="">Select…</option>
              <option>Yes</option>
              <option>No</option>
              <option>Not sure</option>
            </select>
          </Field>
          <Field label="Current Training Level">
            <select className={fieldBase} value={form.trainingLevel} onChange={(e) => set("trainingLevel", e.target.value)}>
              <option value="">Select…</option>
              <option>None</option>
              <option>Some basics</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </Field>
        </div>
      )}

      {/* Step 2 — Training need */}
      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Service Type" required>
            <select className={fieldBase} value={form.serviceType} onChange={(e) => set("serviceType", e.target.value)}>
              <option value="">Select a service…</option>
              {serviceTypes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Main Concern">
            <select className={fieldBase} value={form.concern} onChange={(e) => set("concern", e.target.value)}>
              <option value="">Select…</option>
              {concerns.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {/* Step 3 — Details */}
      {step === 3 && (
        <div className="space-y-4">
          <Field label="Tell us about your dog & goals">
            <textarea
              className={cn(fieldBase, "min-h-[140px] resize-y")}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="What's happening with your dog and what would you like help with?"
            />
          </Field>
          <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-charcoal/40 p-4">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-1 h-4 w-4 accent-gold"
            />
            <span className="text-xs leading-relaxed text-silver">
              I agree that Caissie Canine Instruction may contact me by phone,
              text message or email regarding my inquiry.{" "}
              <span className="text-gold">*</span>
            </span>
          </label>
        </div>
      )}

      {error && (
        <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {/* Nav buttons */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-ghost">
            ← Back
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="btn-gold">
            Continue →
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="btn-gold disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Book a Training Assessment"}
          </button>
        )}
      </div>
    </form>
  );
}
