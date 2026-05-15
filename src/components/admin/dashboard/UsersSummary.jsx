import SummaryTable from "./SummaryTable";

function UsersSummary({ users }) {
  const rows = [
    { label: "Total", value: users.total },
    { label: "Active", value: users.active },
    { label: "Inactive", value: users.inactive },
    { label: "Farmers", value: users.farmers },
    { label: "Investors", value: users.investors },
    { label: "Admins", value: users.admins },
  ];
  return <SummaryTable title="User Breakdown" rows={rows} />;
}

export default UsersSummary;
