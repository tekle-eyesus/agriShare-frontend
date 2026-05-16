import { TabButton } from "./Tab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "investors", label: "Investors List" },
  { id: "updates", label: "Updates Timeline" },
  { id: "reviews", label: "Reviews" },
  { id: "payouts", label: "Payouts" },
  { id: "analytics", label: "Analytics" },
];

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-base-200 border-b overflow-x-auto">
      <div className="flex gap-2 p-2 min-w-max">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            value={tab.id}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
