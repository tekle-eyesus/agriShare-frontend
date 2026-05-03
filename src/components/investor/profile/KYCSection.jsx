import { BadgeCheck } from "lucide-react";
import { Card, StatusBadge } from "../Shared";

function KYCSection() {
  return (
    <Card className="p-6" hover={false}>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="font-display font-bold text-lg">KYC verification</h3>
          <p className="mt-1 text-muted-foreground text-xs">
            Required for investments above 50,000 ETB.
          </p>
        </div>
        <StatusBadge status="pending" />
      </div>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
        <Upload label="Government-issued ID (Fayda)" />
        <Upload label="Proof of address" />
      </div>
      <div className="mt-4 py-2 text-xs alert alert-info">
        <BadgeCheck className="w-4 h-4" />
        Verification typically takes 1–3 business days.
      </div>
    </Card>
  );
}

function Upload({ label }) {
  return (
    <div className="p-5 border-2 border-base-300 hover:border-primary border-dashed rounded-xl text-center transition-colors cursor-pointer">
      <p className="font-semibold text-sm">{label}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        PNG, JPG or PDF · max 5MB
      </p>
      <button className="mt-3 btn-outline btn btn-xs">Choose file</button>
    </div>
  );
}

export default KYCSection;
