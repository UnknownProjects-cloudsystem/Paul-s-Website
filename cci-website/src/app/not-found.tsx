import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center justify-center px-5 pt-24 text-center">
      <div>
        <p className="label-eyebrow justify-center">
          <span className="h-px w-6 bg-gold" />
          404
        </p>
        <h1 className="heading-xl mt-4">Off the Trail</h1>
        <p className="body-lg mx-auto mt-5 max-w-md">
          We couldn&apos;t find that page. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
