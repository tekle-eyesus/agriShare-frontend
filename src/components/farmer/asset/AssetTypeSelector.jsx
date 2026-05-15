import { Tractor, PawPrint } from "lucide-react";

const AssetTypeSelector = ({ value, onChange }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="font-medium label-text">Asset Type *</span>
      </label>
      <div className="flex sm:flex-row flex-col gap-4">
        <label
          className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 flex-1 ${
            value === "farmland"
              ? "bg-primary/10 border-2 border-primary shadow-sm"
              : "bg-base-200 border-2 border-transparent hover:border-primary/30"
          }`}
        >
          <input
            type="radio"
            value="farmland"
            checked={value === "farmland"}
            onChange={() => onChange("farmland")}
            className="radio radio-primary"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Tractor className="w-5 h-5 text-primary" />
              <span className="font-medium">Farmland</span>
            </div>
            <div className="mt-1 text-xs text-base-content/60">
              Agricultural land, crop farms, plantations
            </div>
          </div>
        </label>

        <label
          className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 flex-1 ${
            value === "livestock"
              ? "bg-primary/10 border-2 border-primary shadow-sm"
              : "bg-base-200 border-2 border-transparent hover:border-primary/30"
          }`}
        >
          <input
            type="radio"
            value="livestock"
            checked={value === "livestock"}
            onChange={() => onChange("livestock")}
            className="radio radio-primary"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-primary" />
              <span className="font-medium">Livestock</span>
            </div>
            <div className="mt-1 text-xs text-base-content/60">
              Cattle, goats, sheep, poultry, and other animals
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default AssetTypeSelector;
