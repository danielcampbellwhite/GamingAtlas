import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-atlas flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-bold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">
        This page is off the map
      </h1>
      <p className="mt-3 max-w-md text-slate-400">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        Let&rsquo;s get you back to exploring gaming history.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/timeline" className="btn-ghost">
          Explore the timeline
        </Link>
      </div>
    </section>
  );
}
