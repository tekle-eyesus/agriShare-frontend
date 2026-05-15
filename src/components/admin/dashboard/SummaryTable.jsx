import { formatNumber } from "../../../utils/format";
import { Card } from "../shared";

function SummaryTable({ title, rows }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 font-display font-bold text-lg">{title}</h3>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex justify-between items-center py-2 border-base-200 last:border-0 border-b"
          >
            <span className="text-muted-foreground text-sm">{r.label}</span>
            <span className="font-semibold tabular-nums text-sm">
              {typeof r.value === "number" ? formatNumber(r.value) : r.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SummaryTable;
