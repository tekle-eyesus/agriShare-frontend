import SummaryTable from "./SummaryTable";

function ListingsSummary({ listings }) {
  const rows = [
    { label: "Active", value: listings.active },
    { label: "Funded", value: listings.funded },
    { label: "Completed", value: listings.completed },
    { label: "Cancelled", value: listings.cancelled },
    { label: "Failed", value: listings.failed },
    { label: "Refunded", value: listings.refunded },
  ];
  return <SummaryTable title="Listings Breakdown" rows={rows} />;
}

export default ListingsSummary;
