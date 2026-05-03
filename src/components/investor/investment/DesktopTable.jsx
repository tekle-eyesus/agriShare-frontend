import { Card, StatusBadge } from "../shared";
import { ExternalLink } from "lucide-react";
import { formatETB } from "../../../utils/format";

function DesktopTable({ filtered, setOpen }) {
  return (
    <Card className="hidden md:block mt-4 p-0 overflow-hidden" hover={false}>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Listing</th>
              <th>Shares</th>
              <th>Invested</th>
              <th>Current value</th>
              <th>ROI</th>
              <th>Next payout</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr
                key={i.id}
                className="cursor-pointer hover"
                onClick={() => setOpen(i)}
              >
                <td className="font-semibold">{i.listingTitle}</td>
                <td>{i.shares}</td>
                <td>{formatETB(i.amountInvested)}</td>
                <td className="font-semibold">{formatETB(i.currentValue)}</td>
                <td
                  className={
                    i.roi >= 0
                      ? "text-success font-semibold"
                      : "text-error font-semibold"
                  }
                >
                  +{i.roi}%
                </td>
                <td className="text-xs">{i.nextPayout || "—"}</td>
                <td>
                  <StatusBadge status={i.status} />
                </td>
                <td>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default DesktopTable;
