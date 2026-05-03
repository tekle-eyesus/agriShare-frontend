import { Calendar, Users, ArrowRight } from "lucide-react";

function UpcomingPayout() {
  return (
    <div className="bg-base-100 shadow-md border border-base-200 card">
      <div className="p-6 card-body">
        <h3 className="mb-4 font-semibold text-lg card-title">
          Upcoming Payouts
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-base-content/60">
              Next Distribution
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">May 15, 2026</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-base-content/60">
              Estimated Amount
            </span>
            <span className="font-semibold text-primary text-lg">
              28,500 ETB
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-base-content/60">Investors</span>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold text-sm">69</span>
            </div>
          </div>
        </div>
        <div className="my-2 divider"></div>
        <button className="btn-outline w-full btn btn-sm">
          View History
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default UpcomingPayout;
