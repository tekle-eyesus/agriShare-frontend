function FilterChips({ activeFilter, onFilterChange }) {
  const filters = ["all", "farmland", "livestock", "pending", "verified"];

  const getFilterLabel = (filter) => {
    if (filter === "all") return "All Assets";
    if (filter === "farmland") return "🌾 Farmland";
    if (filter === "livestock") return "🐄 Livestock";
    if (filter === "pending") return "⏳ Pending";
    if (filter === "verified") return "✓ Verified";
    return filter;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`btn btn-sm ${activeFilter === filter ? "btn-primary" : "btn-outline"}`}
        >
          {getFilterLabel(filter)}
        </button>
      ))}
    </div>
  );
}

export default FilterChips;
