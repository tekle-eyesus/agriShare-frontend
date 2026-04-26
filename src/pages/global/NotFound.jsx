import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  //   throw new Error("HII");
  return (
    <main className="relative bg-gradient-cream h-screen overflow-hidden text-foreground">
      <div className="absolute inset-0 pointer-events-none topo" />
      <div className="absolute inset-0 opacity-40 pointer-events-none grain" />
      <div className="flex justify-center items-center h-full">
        <section className="z-10 relative place-items-center grid mx-auto px-6 pt-12 sm:pt-20 pb-32 max-w-5xl text-center">
          <span
            className="inline-flex items-center gap-2 bg-card shadow-soft mb-6 px-4 py-1.5 border border-border rounded-full font-medium text-muted-foreground text-xs uppercase tracking-[0.18em] animate-float-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="rounded-full w-1.5 h-1.5" />
            Error 404 · Page not found
          </span>

          <h1
            className="font-display font-semibold text-[clamp(5rem,18vw,11rem)] text-field leading-[0.85] animate-float-up"
            style={{ animationDelay: "80ms" }}
          >
            4<span className="text-harvest italic">0</span>4
          </h1>

          <p
            className="mt-6 max-w-xl font-display text-field text-2xl sm:text-3xl leading-snug animate-float-up"
            style={{ animationDelay: "160ms" }}
          >
            This plot of land hasn't been cultivated yet.
          </p>
          <p
            className="mt-3 max-w-md text-muted-foreground text-base animate-float-up"
            style={{ animationDelay: "220ms" }}
          >
            The page you're looking for may have been moved, harvested, or never
            planted. Let's get you back to fertile ground.
          </p>

          <div
            className="flex sm:flex-row flex-col items-center gap-3 mt-10 animate-float-up"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 shadow-elevated text-cream btn btn-secondary"
            >
              <Home className="w-4 h-4" />
              Back to homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
