import { Megaphone } from "lucide-react";
import { TabContent } from "./Tab";
import { UpdateCardModified } from "./Cards";
import { Card, EmptyState } from "../Shared";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";
import toast from "react-hot-toast";

function UpdatesTab({
  activeTab,
  setPostOpen,
  setDeleteOpen,
  setEditingUpdate,
  setDeletingUpdate,
  listingId,
}) {
  const { farmer } = useAPI();
  const queryClient = useQueryClient();
  const { data: updatesData } = useSuspenseQuery({
    queryKey: ["listing-updates", listingId],
    queryFn: () => farmer.getListingUpdates({ listingId }),
  });
  const updates = updatesData?.data?.updates || [];

  const handleDeleteUpdate = (update) => {
    setDeletingUpdate(update);
    setDeleteOpen(true);
  };

  return (
    <TabContent value="updates" activeTab={activeTab}>
      <div>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setPostOpen(true)}
            className="gap-2 btn btn-primary btn-sm"
          >
            <Megaphone className="w-4 h-4" />
            Post New Update
          </button>
        </div>
        {updates.length === 0 ? (
          <Card className="p-0" hover={false}>
            <EmptyState
              title="No updates yet"
              message="Post your first update to keep investors engaged."
              icon={Megaphone}
            />
          </Card>
        ) : (
          <div className="relative">
            {updates.map((u) => (
              <UpdateCardModified
                key={u._id}
                u={u}
                setEditingUpdate={setEditingUpdate}
                onDelete={handleDeleteUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </TabContent>
  );
}

export default UpdatesTab;
