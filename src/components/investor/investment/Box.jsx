function Box({ label, value, accent, success }) {
  return (
    <div className="bg-base-200 p-3 rounded-xl">
      <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
      <p
        className={`text-sm font-bold mt-0.5 capitalize ${accent ? "text-primary" : success ? "text-success" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

export default Box;
