export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-white/10 bg-ink-900/40">
      <div className="container-atlas py-14 sm:py-16">
        {eyebrow && (
          <p className="chip mb-4">
            <span aria-hidden className="mr-2 text-atlas-300">
              ◆
            </span>
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-slate-400">{description}</p>
        )}
      </div>
    </div>
  );
}
