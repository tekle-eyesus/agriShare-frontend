import { CheckCircle } from "lucide-react";
import { TabContent } from "./Tab";
import { DistributionRow } from "./Rows";
import { pastDistributions } from "../../../mock-data/farmer/listingDetail";

function PayoutTab({ activeTab }) {
  return (
    <TabContent value="payouts" activeTab={activeTab}>
      <div className="shadow-lg mb-6 alert alert-success">
        <CheckCircle className="w-5 h-5" />
        <div>
          <h3 className="font-bold">Upcoming Payout</h3>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-3">
            <div>
              <div className="opacity-75 text-xs">Next Distribution</div>
              <div className="font-semibold">May 15, 2026</div>
            </div>
            <div>
              <div className="opacity-75 text-xs">Estimated Amount</div>
              <div className="font-semibold text-lg">28,500 ETB</div>
            </div>
            <div>
              <div className="opacity-75 text-xs">Eligible Investors</div>
              <div className="font-semibold">24</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg">Past Distributions</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount Distributed</th>
                <th className="px-4 py-3">Investors</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pastDistributions.map((dist) => (
                <DistributionRow key={dist.id} distribution={dist} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TabContent>
  );
}

export default PayoutTab;
