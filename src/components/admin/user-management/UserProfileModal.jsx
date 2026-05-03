import { formatETB } from "../../../utils/format";
import Modal from "../Modal";
import { StatusBadge } from "../shared";

function UserProfileModal({ active, setActive }) {
  return (
    <Modal
      open={!!active}
      onClose={() => setActive(null)}
      title="User profile"
      size="lg"
    >
      {active && (
        <div className="space-y-5 p-6">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="rounded-full w-16 text-primary-content gradient-primary">
                <span className="font-bold text-xl">
                  {active.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl">{active.name}</h3>
              <p className="text-muted-foreground text-sm">{active.email}</p>
              <div className="flex gap-2 mt-1.5">
                <StatusBadge status={active.role} />
                <StatusBadge status={active.status} />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Role
            </p>
            <div className="flex items-center gap-2">
              <select
                defaultValue={active.role}
                className="rounded-lg select-bordered select-sm select"
              >
                <option>Farmer</option>
                <option>Investor</option>
                <option>Admin</option>
              </select>
              <button className="normal-case btn btn-sm btn-primary">
                Update role
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Financial
            </p>
            <div className="gap-2 grid grid-cols-3">
              <div className="bg-base-200 p-3 rounded-xl">
                <p className="font-semibold text-[10px] text-muted-foreground uppercase">
                  Wallet
                </p>
                <p className="mt-0.5 font-bold text-sm">{formatETB(54_200)}</p>
              </div>
              <div className="bg-base-200 p-3 rounded-xl">
                <p className="font-semibold text-[10px] text-muted-foreground uppercase">
                  {active.role === "Farmer" ? "Total raised" : "Total invested"}
                </p>
                <p className="mt-0.5 font-bold text-sm">
                  {formatETB(active.role === "Farmer" ? 480_000 : 215_000)}
                </p>
              </div>
              <div className="bg-base-200 p-3 rounded-xl">
                <p className="font-semibold text-[10px] text-muted-foreground uppercase">
                  Credits
                </p>
                <p className="mt-0.5 font-bold text-sm">42</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Recent activity
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "Logged in from Addis Ababa",
                "Updated profile photo",
                "Invested 25,000 ETB in Teff Farm",
                "Withdrew 10,000 ETB",
              ].map((a, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-base-200 p-2.5 rounded-lg"
                >
                  <span>{a}</span>
                  <span className="text-muted-foreground text-xs">
                    {i + 1}d ago
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-base-300 border-t">
            <button className="btn-outline normal-case btn btn-sm">
              Reset password
            </button>
            <button className="btn-outline normal-case btn btn-sm btn-warning">
              Suspend
            </button>
            <button className="ml-auto btn-outline normal-case btn btn-sm btn-error">
              Delete account
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default UserProfileModal;
