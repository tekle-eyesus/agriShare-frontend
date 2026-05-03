import { Card } from "../../investor/Shared";
import Documents from "./Documents";
import Financial from "./Financial";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Updates from "./Updates";

const TABS = ["Overview", "Financial", "Updates", "Reviews", "Documents"];

function Tabs({ tab, listing, setTab, avgRating }) {
  return (
    <Card className="p-0 overflow-hidden" hover={false}>
      <div
        role="tablist"
        className="gap-1 bg-base-100 p-2 border-base-200 border-b rounded-none overflow-x-auto tabs tabs-boxed scrollbar-thin"
      >
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            onClick={() => setTab(t)}
            className={`tab tab-sm ${tab === t ? "tab-active bg-primary! text-primary-content!" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-5 sm:p-6">
        {tab === "Overview" && <Overview listing={listing} />}

        {tab === "Financial" && <Financial listing={listing} />}

        {tab === "Updates" && <Updates />}

        {tab === "Reviews" && <Reviews avgRating={avgRating} />}

        {tab === "Documents" && <Documents />}
      </div>
    </Card>
  );
}

export default Tabs;
