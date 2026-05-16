function Row({ label, value, icon: Icon, mono, capitalize }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={`font-semibold truncate inline-flex items-center gap-1.5 ${mono ? "font-mono text-xs" : ""} ${capitalize ? "capitalize" : ""}`}
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
        {value}
      </span>
    </div>
  );
}
export default Row;
