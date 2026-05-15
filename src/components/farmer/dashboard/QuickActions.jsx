import { Link } from "react-router-dom";
import { Card } from "../Shared";
import { List, Megaphone, Sprout, Users } from "lucide-react";

function QuickActions() {
  return (
    <Card className="p-5" hover={false}>
      <h3 className="mb-4 font-display font-bold text-lg">Quick Actions</h3>
      <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
        {[
          {
            to: "/farmer/assets",
            label: "Create Asset",
            icon: Sprout,
            color: "bg-primary/10 text-primary",
          },
          {
            to: "/farmer/listings",
            label: "New Listing",
            icon: List,
            color: "bg-info/10 text-info",
          },
          {
            to: "/farmer/updates",
            label: "Post Update",
            icon: Megaphone,
            color: "bg-warning/10 text-warning",
          },
          {
            to: "/farmer/investors",
            label: "View Investors",
            icon: Users,
            color: "bg-accent/10 text-accent",
          },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.to}
              to={a.to}
              className="hover:shadow-card p-4 border border-base-300 hover:border-primary rounded-xl text-center transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl ${a.color} grid place-items-center mx-auto mb-2`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-semibold text-xs">{a.label}</p>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickActions;
