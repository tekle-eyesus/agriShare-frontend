import { KeyRound } from "lucide-react";
import { Card } from "../Shared";
import Field from "./Field";

function SecuritySection() {
  return (
    <div className="space-y-4">
      <Card className="p-6" hover={false}>
        <h3 className="mb-1 font-display font-bold text-lg">Change password</h3>
        <p className="mb-5 text-muted-foreground text-xs">
          Choose a strong password you don't use elsewhere.
        </p>
        <div className="space-y-3">
          <Field label="Current password" type="password" />
          <Field label="New password" type="password" />
          <Field label="Confirm new password" type="password" />
        </div>
        <div className="flex justify-end mt-5">
          <button className="gap-2 btn btn-primary btn-sm">
            <KeyRound className="w-4 h-4" />
            Update password
          </button>
        </div>
      </Card>
      <Card className="p-6" hover={false}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-display font-bold text-lg">
              Two-factor authentication
            </h3>
            <p className="mt-1 text-muted-foreground text-xs">
              Add a second layer of security to your account.
            </p>
          </div>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </Card>
      <Card className="p-6" hover={false}>
        <h3 className="mb-3 font-display font-bold text-lg">Active sessions</h3>
        <div className="space-y-2">
          {[
            {
              device: "Chrome — MacBook Pro",
              loc: "Addis Ababa",
              last: "now",
              current: true,
            },
            {
              device: "Safari — iPhone",
              loc: "Addis Ababa",
              last: "2 days ago",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-xl"
            >
              <div>
                <p className="font-semibold text-sm">
                  {s.device}{" "}
                  {s.current && (
                    <span className="ml-1 badge badge-success badge-xs">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {s.loc} · {s.last}
                </p>
              </div>
              {!s.current && (
                <button className="text-error btn btn-ghost btn-xs">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SecuritySection;
