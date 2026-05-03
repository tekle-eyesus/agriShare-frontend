import { Card } from "../Shared";
import { CreditCard, Plus } from "lucide-react";

function PaymentSection() {
  const methods = [
    { type: "Telebirr", name: "+251 911 234 567", default: true },
    { type: "Chapa", name: "yodit@agri.et", default: false },
    { type: "Bank — CBE", name: "1000123456789", default: false },
  ];
  return (
    <Card className="p-6" hover={false}>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="font-display font-bold text-lg">Payment methods</h3>
          <p className="mt-1 text-muted-foreground text-xs">
            Manage your saved payment methods.
          </p>
        </div>
        <button className="gap-2 btn btn-primary btn-sm">
          <Plus className="w-4 h-4" />
          Add new
        </button>
      </div>
      <div className="space-y-2">
        {methods.map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-3 hover:bg-base-200 p-3 border border-base-200 rounded-xl transition-colors"
          >
            <div className="place-items-center grid bg-primary/10 rounded-lg w-10 h-10 text-primary">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{m.type}</p>
              <p className="text-muted-foreground text-xs truncate">{m.name}</p>
            </div>
            {m.default && (
              <span className="badge badge-success badge-sm">Default</span>
            )}
            <button className="btn btn-ghost btn-xs">Edit</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default PaymentSection;
