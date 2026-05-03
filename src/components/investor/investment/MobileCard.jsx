import { formatETB } from "../../../utils/format";
import { Card, StatusBadge } from "../shared";
import Box from "./Box";

function MobileCard({ filtered, setOpen }) {
  return (
    <div className="md:hidden gap-3 grid grid-cols-1 mt-4">
      {filtered.map((i) => (
        <Card key={i.id} className="p-4" hover={false}>
          <div className="flex justify-between items-start">
            <p className="pr-2 font-semibold">{i.listingTitle}</p>
            <StatusBadge status={i.status} />
          </div>
          <div className="gap-2 grid grid-cols-2 mt-3 text-xs">
            <Box label="Shares" value={String(i.shares)} />
            <Box label="Invested" value={formatETB(i.amountInvested)} />
            <Box
              label="Current value"
              value={formatETB(i.currentValue)}
              accent
            />
            <Box label="ROI" value={`+${i.roi}%`} success />
          </div>
          <button
            onClick={() => setOpen(i)}
            className="mt-3 btn-outline w-full btn btn-sm"
          >
            View details
          </button>
        </Card>
      ))}
    </div>
  );
}

export default MobileCard;
