function Field({ label, type = "text", defaultValue }) {
  return (
    <div>
      <label className="font-semibold text-xs uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 w-full input input-bordered input-sm"
      />
    </div>
  );
}

export default Field;
