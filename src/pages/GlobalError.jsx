import { AlertTriangle, Home, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";

const GlobalError = ({ error, resetErrorBoundary }) => {
  return (
    <main
      role="alert"
      aria-live="assertive"
      className="relative bg-gradient-field h-screen overflow-hidden text-cream"
    >
      {/* ambient art */}
      <div className="absolute inset-0 opacity-60 pointer-events-none topo" />
      <div
        className="-top-40 left-1/2 absolute rounded-full w-[520px] h-[520px] -translate-x-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(36 78% 54% / 0.35) 0%, transparent 60%)",
        }}
      />
      <div
        className="bottom-0 absolute inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(36 78% 64% / 0.5), transparent)",
        }}
      />

      <div className="flex justify-center items-center h-full">
        <section className="z-10 relative place-items-center grid mx-auto px-6 pb-20 max-w-3xl min-h-[70vh] text-center">
          <div>
            <div
              className="place-items-center grid bg-cream/10 backdrop-blur mx-auto mb-8 rounded-2xl ring-1 ring-cream/15 w-20 h-20 animate-float-up"
              style={{ animationDelay: "0ms" }}
            >
              <AlertTriangle
                className="w-9 h-9 text-harvest"
                strokeWidth={1.75}
              />
            </div>

            <p
              className="mb-4 font-medium text-harvest text-xs uppercase tracking-[0.24em] animate-float-up"
              style={{ animationDelay: "80ms" }}
            >
              Something went wrong
            </p>

            <h1
              className="font-display font-semibold text-4xl sm:text-6xl leading-tight animate-float-up"
              style={{ animationDelay: "140ms" }}
            >
              Our fields hit{" "}
              <span className="text-harvest italic">unexpected weather.</span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-xl text-cream/75 text-base sm:text-lg animate-float-up"
              style={{ animationDelay: "220ms" }}
            >
              We ran into a problem loading this part of the page. Your data is
              safe.
            </p>
            {/* actions */}
            <div
              className="flex sm:flex-row flex-col justify-center items-center gap-3 mt-10 animate-float-up"
              style={{ animationDelay: "380ms" }}
            >
              <button
                onClick={resetErrorBoundary}
                className="flex items-center gap-2 bg-secondary shadow-glow text-field-deep text-white btn"
              >
                <RotateCw className="w-4 h-4" />
                Try again
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 bg-primary hover:bg-cream/10 border-cream/20 text-cream btn"
              >
                <Home className="w-4 h-4" />
                Go to homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GlobalError;
