import { StatusBadge } from "../Shared";

function StepOne({
  verifiedAssets,
  selectedAsset,
  setSelectedAsset,
  setValue,
}) {
  console.log(verifiedAssets[0]);
  return (
    <div>
      <h3 className="font-display font-bold text-lg">Select an Asset</h3>
      <p className="mb-4 text-muted-foreground text-xs">
        Only verified assets can be tokenized. A 20-credit listing fee applies
        on submission.
      </p>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
        {verifiedAssets.map((a) => (
          <label
            key={a._id}
            className={`cursor-pointer rounded-xl border-2 p-3 flex gap-3 transition-all ${
              selectedAsset === a._id
                ? "border-primary bg-primary/5"
                : "border-base-300 hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              name="asset"
              className="sr-only"
              checked={selectedAsset === a._id}
              onChange={() => {
                setSelectedAsset(a._id);
                setValue("assetId", a._id);
              }}
            />
            <img
              src={a?.photos[0]?.url}
              alt=""
              className="bg-base-200 rounded-lg w-20 h-20 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{a.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">
                {a.location.region}
              </p>
              <div className="flex gap-1 mt-1">
                <StatusBadge status={a.type} />
                <StatusBadge status="verified" />
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default StepOne;
