function Field({ label, type = "text", defaultValue }) {
  return (
    <div>
      <label className="font-semibold text-xs uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 border border-gray-100 focus:border-gray-400 dark:border-gray-800 dark:focus:border-green-800 outline-0 w-full input input-bordered input-sm"
      />
    </div>
  );
}

export default Field;
