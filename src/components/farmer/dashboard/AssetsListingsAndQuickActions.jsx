import { Link } from "react-router-dom";
import { Card } from "../Shared";
import { BadgeCheck, List, Sprout, Wallet } from "lucide-react";
import StatTile from "./StatTile";

function AssetsListingsAndQuickActions({ stats }) {
  return (
    <div className="gap-6 grid grid-cols-1 xl:grid-cols-2 mt-6">
      <div className="space-y-6 xl:col-span-2">
        {/* Assets */}
        <Card className="p-5" hover={false}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Assets</h3>
              <p className="text-muted-foreground text-xs">
                Your registered farming assets.
              </p>
            </div>
            <Link
              to="/farmer/assets"
              className="gap-1 border btn-outline btn btn-sm"
            >
              <Sprout className="w-3.5 h-3.5" />
              View All
            </Link>
          </div>
          <div className="gap-3 grid grid-cols-3">
            <StatTile label="Total" value={stats.assets.total} tone="primary" />
            <StatTile
              label="Verified"
              value={stats.assets.verified}
              tone="success"
            />
            <StatTile
              label="Pending"
              value={stats.assets.pending}
              tone="warning"
            />
          </div>
        </Card>

        {/* Listings */}
        <Card className="p-5" hover={false}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Listings</h3>
              <p className="text-muted-foreground text-xs">
                Tokenized investment offers.
              </p>
            </div>
            <Link
              to="/farmer/listings"
              className="gap-1 border btn-outline btn btn-sm"
            >
              <List className="w-3.5 h-3.5" />
              Manage
            </Link>
          </div>
          <div className="gap-3 grid grid-cols-3">
            <StatTile
              label="Total"
              value={stats.listings.total}
              tone="primary"
            />
            <StatTile
              label="Active"
              value={stats.listings.active}
              tone="info"
            />
            <StatTile
              label="Completed"
              value={stats.listings.completed}
              tone="success"
            />
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="p-5" hover={false}>
          <h3 className="mb-4 font-display font-bold text-lg">Quick Actions</h3>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
            {[
              {
                to: "/farmer/assets",
                label: "Manage Assets",
                icon: Sprout,
                color: "bg-primary/10 text-primary",
              },
              {
                to: "/farmer/listings",
                label: "Listings",
                icon: List,
                color: "bg-info/10 text-info",
              },
              {
                to: "/farmer/verification",
                label: "Verification",
                icon: BadgeCheck,
                color: "bg-warning/10 text-warning",
              },
              {
                to: "/farmer/wallet",
                label: "Wallet",
                icon: Wallet,
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
      </div>
    </div>
  );
}

export default AssetsListingsAndQuickActions;
