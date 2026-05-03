function Row({ icon: Icon, label, value, success, warning }) {
  return (
    <div className="flex items-center gap-3 bg-base-200 p-2.5 rounded-xl">
      <div
        className={`w-8 h-8 rounded-lg grid place-items-center ${success ? "bg-success/15 text-success" : warning ? "bg-warning/15 text-warning" : "bg-primary/10 text-primary"}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}

export default Row;
