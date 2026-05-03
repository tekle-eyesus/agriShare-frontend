import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  Trash2,
  ShoppingCart,
  DollarSign,
  MessageSquare,
  Star,
  Filter,
} from "lucide-react";
import { PageHeader, Card, EmptyState } from "../../components/investor/Shared";
import { NOTIFICATIONS as INITIAL } from "../../mock-data/investor/data";

const TYPES = ["All", "investment", "distribution", "update", "review"];
const READ_FILTER = ["All", "Unread", "Read"];

const ICONS = {
  investment: ShoppingCart,
  distribution: DollarSign,
  update: MessageSquare,
  review: Star,
};
const COLORS = {
  investment: "bg-info/10 text-info",
  distribution: "bg-success/10 text-success",
  update: "bg-warning/10 text-warning",
  review: "bg-accent/10 text-accent",
};

export default function Notifications() {
  const [list, setList] = useState(INITIAL);
  const [type, setType] = useState("All");
  const [read, setRead] = useState("All");

  const filtered = useMemo(
    () =>
      list.filter(
        (n) =>
          (type === "All" || n.type === type) &&
          (read === "All" || (read === "Unread" ? !n.read : n.read)),
      ),
    [list, type, read],
  );

  const markRead = (id) =>
    setList(list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAll = () => setList(list.map((n) => ({ ...n, read: true })));
  const deleteAll = () => setList([]);

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Stay up to date with investments, distributions, and farmer updates."
        actions={
          <>
            <button onClick={markAll} className="gap-2 btn-outline btn btn-sm">
              <Check className="w-4 h-4" />
              Mark all read
            </button>
            <button
              onClick={deleteAll}
              className="gap-2 text-error btn btn-ghost btn-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </>
        }
      />

      <Card className="p-4" hover={false}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 font-semibold text-muted-foreground text-xs">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </div>
          <div className="join">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`join-item btn btn-xs capitalize ${type === t ? "btn-primary" : "btn-outline"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="ml-auto join">
            {READ_FILTER.map((r) => (
              <button
                key={r}
                onClick={() => setRead(r)}
                className={`join-item btn btn-xs ${read === r ? "btn-primary" : "btn-outline"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="mt-4 p-0" hover={false}>
          <EmptyState
            title="You're all caught up"
            message="No notifications match these filters."
            icon={Bell}
          />
        </Card>
      ) : (
        <div className="space-y-2 mt-4">
          {filtered.map((n) => {
            const Icon = ICONS[n.type] || Bell;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => markRead(n.id)}
                className={`bg-base-100 rounded-2xl border p-4 flex gap-3 cursor-pointer transition-all hover:shadow-card ${
                  !n.read
                    ? "border-primary/40 bg-primary/2"
                    : "border-base-300"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${COLORS[n.type] || "bg-base-200"}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{n.title}</p>
                    {!n.read && (
                      <span className="bg-primary rounded-full w-2 h-2" />
                    )}
                  </div>
                  <p className="mt-0.5 text-muted-foreground text-sm">
                    {n.message}
                  </p>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    {n.at}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
