import { BadgeCheck, MapPin, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { RiskBadge, StatusBadge } from "../../investor/Shared";
import { useState, useEffect } from "react";

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

  const title = listing?.pitchTitle || "";
  const type = listing?.asset?.type || "unknown";
  const riskLevel = "medium";
  const status = listing?.status || "active";
  const farmer = listing?.farmer?.name || "Farmer";
  const location = listing?.asset?.location ? `${listing.asset.location.region || ""}, ${listing.asset.location.zone || ""}` : "Unknown location";
  const farmerVerified = listing?.farmer?.verifiedAt != null;

  return (
    <div className="relative bg-base-300 rounded-2xl h-56 sm:h-72 lg:h-80 overflow-hidden group">
      <img
        src={images[currentIndex]}
        alt={title}
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
          <div className="bottom-24 left-0 absolute flex justify-center w-full gap-1 z-10">
            {images.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-neutral/85 via-neutral/30 to-transparent pointer-events-none" />
      <div className="bottom-0 absolute inset-x-0 p-5 sm:p-6 text-white pointer-events-none">
        <div className="flex flex-wrap gap-2 mb-2 pointer-events-auto">
          <StatusBadge status={status} />
          <StatusBadge status={type} />
          <RiskBadge level={riskLevel} />
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl pointer-events-auto">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-white/90 text-sm pointer-events-auto">
          <span className="flex items-center gap-1.5">
            {farmer}
            {farmerVerified && (
              <BadgeCheck className="w-4 h-4 text-info" />
            )}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </span>
        </div>
      </div>
      <button
        className="top-4 right-4 absolute bg-white/90 border-0 text-neutral btn btn-sm btn-circle z-10"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Hero;
