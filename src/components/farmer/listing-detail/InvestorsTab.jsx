import { Download } from "lucide-react";
import { InvestorRow } from "./Rows";
import { TabContent } from "./Tab";
import { mockInvestors } from "../../../mock-data/farmer/listingDetail";

function InvestorsTab({ activeTab }) {
  return (
    <TabContent value="investors" activeTab={activeTab}>
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="font-semibold text-lg">
          Investor List ({mockInvestors.length} investors)
        </h3>
        <button className="gap-2 btn-outline btn btn-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th className="px-4 py-3">Investor Name</th>
              <th className="px-4 py-3">Shares Owned</th>
              <th className="px-4 py-3">Amount Invested</th>
              <th className="px-4 py-3">Date Invested</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockInvestors.map((investor) => (
              <InvestorRow key={investor.id} investor={investor} />
            ))}
          </tbody>
        </table>
      </div>
    </TabContent>
  );
}

export default InvestorsTab;
