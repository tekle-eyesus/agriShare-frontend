import { Card } from "../shared";
import { Search } from "lucide-react";

const STATUSES = ["All", "active", "funded", "completed", "refunded"];
const TYPES = ["All", "Farmland", "Livestock"];

function FilterCard({ search, setSearch, status, setStatus, type, setType }) {
  return (
    <Card className="p-4" hover={false}>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4">
        <label className="flex items-center gap-2 sm:col-span-2 input input-sm input-bordered">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search investment…"
            className="bg-transparent outline-none grow"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="capitalize select-bordered select-sm select"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select-bordered select-sm select"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
}

export default FilterCard;
