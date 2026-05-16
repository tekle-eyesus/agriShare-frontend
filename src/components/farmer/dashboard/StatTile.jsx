function StatTile({ label, value, tone }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  };
  return (
    <div className="p-4 border border-base-300 rounded-xl text-center">
      <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <div
        className={`mt-2 inline-flex items-center justify-center w-12 h-12 rounded-xl ${tones[tone]} font-display font-bold text-xl`}
      >
        {value}
      </div>
    </div>
  );
}

export default StatTile;
