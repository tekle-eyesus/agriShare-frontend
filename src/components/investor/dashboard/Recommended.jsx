import { Link } from "react-router-dom";
import { formatETB } from "../../../utils/format";
import { Card, RiskBadge, StatusBadge } from "../shared";
import { ArrowUpRight } from "lucide-react";

export default function Recommended({recommended}) {
  return (
    <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-lg">Recommended for you</h3>
            <p className="text-xs text-muted-foreground">Based on your investment history</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {recommended.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="aspect-video bg-base-200 relative overflow-hidden">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <StatusBadge status={listing.type} />
                  <RiskBadge level={listing.riskLevel} />
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold truncate">{listing.title}</p>
                <p className="text-xs text-muted-foreground">{listing.farmer}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-base-200 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Expected ROI</p>
                    <p className="text-sm font-bold text-primary">{listing.roi}%</p>
                  </div>
                  <div className="bg-base-200 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Min</p>
                    <p className="text-sm font-bold">{formatETB(listing.minInvestment)}</p>
                  </div>
                </div>
                <Link to={`/investor/marketplace/${listing.id}`} className="btn btn-primary btn-sm w-full mt-3 gap-1">
                  Invest now <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
  )
}
