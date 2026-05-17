import { Card, StatusBadge } from "../Shared";
import { formatETB } from "../../../utils/format";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Hero({ listing }) {
  const photos = listing?.asset?.photos || [];
  const images = photos.length > 0 ? photos.map(p => p.url) : ["https://placehold.co/600x400?text=No+Image"];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const next = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }
  const prev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  const daysLeft = Math.ceil(
    (new Date(listing.investmentDeadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return (
    <Card className="mb-6 overflow-hidden" hover={false}>
      <div className="relative bg-base-200 aspect-21/9 sm:aspect-3/1 overflow-hidden group">
        <img
          src={images[currentIndex]}
          alt={listing.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prev}
              className="top-1/2 left-4 absolute bg-base-100/50 hover:bg-base-100 opacity-0 group-hover:opacity-100 p-2 border-0 rounded-full transition-all -translate-y-1/2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next}
              className="top-1/2 right-4 absolute bg-base-100/50 hover:bg-base-100 opacity-0 group-hover:opacity-100 p-2 border-0 rounded-full transition-all -translate-y-1/2"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="bottom-6 left-0 absolute flex justify-center w-full gap-1 z-10">
              {images.map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-neutral/70 to-transparent pointer-events-none" />
        <div className="right-0 bottom-0 left-0 absolute p-5 sm:p-6 text-white pointer-events-none">
          <div className="flex items-center gap-2 mb-2 pointer-events-auto">
            <StatusBadge status={listing.status} />
            <span className="opacity-80 text-xs">
              Asset: {listing?.asset?.name || "Unknown Asset"}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl pointer-events-auto">
            {listing.pitchTitle}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-base-200 border-t divide-x divide-base-200">
        <Stat
          label="Goal Raised"
          value={`${listing?.investmentProgressPercent?.toFixed(2) || 0}%`}
        />
        <Stat
          label="Total Invested"
          value={formatETB(listing?.totalInvestedBirr || 0)}
        />
        <Stat label="Investors" value={12} />
        <Stat
          label="Days Remaining"
          value={daysLeft > 0 ? `${daysLeft}` : "—"}
        />
      </div>
    </Card>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 text-center">
      <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 font-display font-bold text-lg sm:text-xl">{value}</p>
    </div>
  );
}

export default Hero;
