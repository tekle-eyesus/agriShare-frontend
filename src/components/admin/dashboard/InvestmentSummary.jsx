import SummaryTable from "./SummaryTable";
import { formatETB } from "../../../utils/format";

function InvestmentSummary({ investments }) {
  const rows = [
    { label: "Total Contracts", value: investments.totalContracts },
    { label: "Active Contracts", value: investments.activeContracts },
    { label: "Completed Contracts", value: investments.completedContracts },
    { label: "Refunded Contracts", value: investments.refundedContracts },
    {
      label: "Gross Investment",
      value: formatETB(investments.grossInvestmentBirr),
    },
    {
      label: "Refunded Amount",
      value: formatETB(investments.refundedAmountBirr),
    },
  ];
  return <SummaryTable title="Investment Summary" rows={rows} />;
}

export default InvestmentSummary;
