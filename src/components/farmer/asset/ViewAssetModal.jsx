import Modal from "../Modal";
import { StatusBadge } from "./Badges";

function ViewAssetModal({ asset, onClose }) {
  console.log(asset);
  //TODO: make the images carousole
  return (
    <Modal open={!!asset} onClose={onClose} title={asset?.name} size="lg">
      {asset && (
        <div className="p-6 overflow-clip">
          <div className="gap-2 grid grid-cols-1 md:grid-cols-2 mb-4">
            {asset?.photos.map((p, i) => (
              <img
                key={i}
                src={p.url}
                alt=""
                className="bg-base-200 rounded-xl w-full object-cover aspect-4/3"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <StatusBadge status={asset.type} />
            <StatusBadge status={asset.status} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">{asset.description}</p>
          </div>

          <div className="gap-3 grid grid-cols-2 mt-4 text-sm">
            <div className="bg-base-200 p-3 rounded-xl">
              <p className="text-[11px] text-muted-foreground uppercase">
                Location
              </p>
              <p className="mt-1 font-semibold">
                {asset.location.region}, {asset.location.zone}
              </p>
              <p className="text-muted-foreground text-xs">
                {asset.location.woreda} · {asset.location.kebele}
              </p>
            </div>
            <div className="bg-base-200 p-3 rounded-xl">
              <p className="text-[11px] text-muted-foreground uppercase">
                {asset.type === "farmland" ? "Size" : "Quantity"}
              </p>
              <p className="mt-1 font-semibold">
                {asset.type === "farmland"
                  ? `${asset.farmlandDetails.sizeHa} hectares`
                  : `${asset.livestockDetails.quantity} heads`}
              </p>
              {asset.type === "farmland" && (
                <p className="text-muted-foreground text-xs">
                  {asset.farmlandDetails.soilType} ·{" "}
                  {asset.farmlandDetails.waterSource}
                </p>
              )}
              {asset.type === "livestock" && (
                <p className="text-muted-foreground text-xs">
                  {asset.livestockDetails.breed}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ViewAssetModal;
