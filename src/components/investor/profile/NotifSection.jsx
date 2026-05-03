import { Card } from "../Shared";

function NotifSection() {
  const prefs = [
    {
      label: "Investment confirmations",
      desc: "When your investment is processed",
    },
    { label: "Distribution alerts", desc: "When you receive a payout" },
    { label: "Farmer updates", desc: "Posts from farmers you invested in" },
    { label: "Refund status", desc: "Updates on your refund requests" },
    {
      label: "Marketing communications",
      desc: "Tips, success stories, newsletters",
    },
  ];
  return (
    <Card className="p-6" hover={false}>
      <h3 className="mb-5 font-display font-bold text-lg">
        Notification preferences
      </h3>
      <div className="space-y-3">
        {prefs.map((p, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-base-200 p-3 rounded-xl"
          >
            <div>
              <p className="font-semibold text-sm">{p.label}</p>
              <p className="text-muted-foreground text-xs">{p.desc}</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="toggle toggle-primary toggle-sm"
                />
                Email
              </label>
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={i !== 4}
                  className="toggle toggle-primary toggle-sm"
                />
                In-app
              </label>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default NotifSection;
