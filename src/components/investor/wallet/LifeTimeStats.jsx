import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { WALLET } from "../../../mock-data/investor/data";
import { Card } from "../Shared";
import Row from "./Row";
import { formatETB } from "../../../utils/format";

function LifeTimeStats() {
  return (
    <Card className="p-5" hover={false}>
      <h3 className="mb-3 font-display font-bold">Lifetime stats</h3>
      <div className="space-y-3">
        <Row
          icon={ArrowDownLeft}
          label="Total deposited"
          value={formatETB(WALLET.totalDeposited)}
        />
        <Row
          icon={ArrowUpRight}
          label="Total withdrawn"
          value={formatETB(WALLET.totalWithdrawn)}
        />
        <Row
          icon={TrendingUp}
          label="Total earned"
          value={formatETB(WALLET.totalEarned)}
          success
        />
        <Row
          icon={AlertCircle}
          label="Pending distributions"
          value={formatETB(WALLET.pendingDistributions)}
          warning
        />
      </div>
    </Card>
  );
}

export default LifeTimeStats;
