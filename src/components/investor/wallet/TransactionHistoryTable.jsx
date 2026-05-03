import { Card, StatusBadge } from "../../investor/Shared";
import { formatETB } from "../../../utils/format";

function TransactionHistoryTable({ slice, page, pages, setPage }) {
  return (
    <Card className="mt-4 p-0 overflow-hidden" hover={false}>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
              <th>Status</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((t) => (
              <tr key={t.id}>
                <td className="text-xs whitespace-nowrap">{t.date}</td>
                <td>
                  <StatusBadge status={t.type} />
                </td>
                <td
                  className={`text-right font-bold ${t.amount > 0 ? "text-success" : "text-error"}`}
                >
                  {t.amount > 0 ? "+" : ""}
                  {formatETB(Math.abs(t.amount))}
                </td>
                <td>
                  <StatusBadge status={t.status} />
                </td>
                <td className="font-mono text-muted-foreground text-xs">
                  {t.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-base-200 border-t text-xs">
          <span className="text-muted-foreground">
            Page {page} of {pages}
          </span>
          <div className="join">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="join-item btn btn-xs"
            >
              «
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`join-item btn btn-xs ${page === i + 1 ? "btn-primary" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="join-item btn btn-xs"
            >
              »
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default TransactionHistoryTable;
