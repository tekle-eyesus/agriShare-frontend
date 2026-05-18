import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Eye, Loader2 } from "lucide-react";
import {
  PageHeader,
  Card,
  StatusBadge,
  EmptyState,
} from "../../components/admin/shared";
import UserProfileModal from "../../components/admin/user-management/UserProfileModal";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";
import { useIntersectionObserver } from "../../hook/useIntersectionObserver";

export default function UserManagement() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [active, setActive] = useState(null);
  const { admin } = useAPI();
  
  const { data: usersData, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["users", role],
    queryFn: ({ pageParam = 1 }) => admin.getAllUsers({ role: role !== "All" ? role.toLowerCase() : undefined, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.page < lastPage.data?.pages ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });

  const users = usersData?.pages.flatMap(page => page.data?.users || []) || [];

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        if (
          q &&
          !`${u.firstName} ${u.lastName} ${u.email}`
            .toLowerCase()
            .startsWith(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [q, users],
  );

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      <PageHeader
      // title="User Management"
      // subtitle={`${totalCount} total users`}
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
          {["All", "farmer", "investor", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`join-item btn btn-sm normal-case ${role === r ? "btn-primary" : "btn-outline"}`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
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
                    key={u._id}
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
                              {`${u.firstName} ${u.lastName}`
                                .split(" ")
                                .map((s) => s[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {u.firstName} {u.lastName}
                          </p>
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
                        defaultChecked={u.isActive}
                        className="toggle toggle-primary toggle-sm"
                      />
                    </td>
                    <td className="hidden lg:table-cell text-muted-foreground text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="hidden lg:table-cell text-muted-foreground text-sm">
                      {u.updatedAt
                        ? new Date(u.updatedAt).toLocaleDateString()
                        : "-"}
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
            <div
              ref={loadMoreRef}
              className="flex justify-center p-4 min-h-[40px]"
            >
              {isFetchingNextPage ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : hasNextPage ? (
                <span className="text-sm text-muted-foreground">
                  Scroll for more
                </span>
              ) : null}
            </div>
          </div>
        )}
      </Card>

      <UserProfileModal active={active} setActive={setActive} />
    </>
  );
}
