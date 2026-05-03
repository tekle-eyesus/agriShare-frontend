import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, UserPlus, Eye, Send } from "lucide-react";
import {
  PageHeader,
  Card,
  StatusBadge,
  EmptyState,
} from "../../components/admin/shared";
import Modal from "../../components/admin/Modal";
import { USERS } from "../../mock-data/admin/data";
import UserProfileModal from "../../components/admin/user-management/UserProfileModal";

export default function UserManagement() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [active, setActive] = useState(null);
  const [invite, setInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const filtered = useMemo(
    () =>
      USERS.filter((u) => {
        if (
          q &&
          !`${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase())
        )
          return false;
        if (role !== "All" && u.role !== role) return false;
        return true;
      }),
    [q, role],
  );

  return (
    <>
      <PageHeader
        title="User Management"
        subtitle="1,247 total users — 892 farmers, 342 investors, 13 admins. 12 new this week."
        actions={
          <button
            onClick={() => setInvite(true)}
            className="gap-2 normal-case btn btn-sm btn-primary"
          >
            <UserPlus className="w-3.5 h-3.5" /> Invite user
          </button>
        }
      />

      <Card className="flex sm:flex-row flex-col gap-2 mb-4 p-3">
        <label className="flex flex-1 items-center gap-2 rounded-lg input input-sm input-bordered">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email…"
            className="bg-transparent outline-none text-sm grow"
          />
        </label>
        <div className="join">
          {["All", "Farmer", "Investor", "Admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`join-item btn btn-sm normal-case ${role === r ? "btn-primary" : "btn-outline"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No users match"
            message="Try a different search."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th className="hidden md:table-cell">Status</th>
                  <th className="hidden lg:table-cell">Joined</th>
                  <th className="hidden lg:table-cell">Last active</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-base-200/60"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="rounded-full w-9 text-primary-content gradient-primary">
                            <span className="font-bold text-xs">
                              {u.name
                                .split(" ")
                                .map((s) => s[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{u.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={u.role} />
                    </td>
                    <td className="hidden md:table-cell">
                      <input
                        type="checkbox"
                        defaultChecked={u.status === "active"}
                        className="toggle toggle-primary toggle-sm"
                      />
                    </td>
                    <td className="hidden lg:table-cell text-muted-foreground text-sm">
                      {u.joined}
                    </td>
                    <td className="hidden lg:table-cell text-muted-foreground text-sm">
                      {u.lastActive}
                    </td>
                    <td>
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setActive(u)}
                          className="gap-1 normal-case btn btn-ghost btn-xs"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <UserProfileModal active={active} setActive={setActive} />

      <Modal
        open={invite}
        onClose={() => setInvite(false)}
        title="Invite new admin"
        size="sm"
      >
        <div className="space-y-4 p-6">
          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Email
            </label>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              type="email"
              placeholder="name@agrishare.et"
              className="rounded-xl w-full input input-bordered"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Role
            </label>
            <select className="rounded-xl w-full select-bordered select">
              <option>Admin</option>
              <option>Super Admin</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Message (optional)
            </label>
            <textarea
              rows={3}
              className="rounded-xl w-full text-sm textarea textarea-bordered"
              placeholder="Welcome message…"
            />
          </div>
          <button className="gap-2 w-full normal-case btn btn-primary">
            <Send className="w-4 h-4" /> Send invitation
          </button>
        </div>
      </Modal>
    </>
  );
}
