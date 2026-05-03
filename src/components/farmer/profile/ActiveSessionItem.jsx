function ActiveSessionItem({
  device,
  location,
  browser,
  lastActive,
  isCurrent,
}) {
  return (
    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 p-4 border border-base-200 rounded-lg">
      <div>
        <div className="flex items-center gap-2 font-medium">
          {device}
          {isCurrent && (
            <span className="badge badge-success badge-sm">Current</span>
          )}
        </div>
        <div className="text-sm text-base-content/60">
          {location} • {browser}
        </div>
        <div className="mt-1 text-xs text-base-content/50">
          Last active: {lastActive}
        </div>
      </div>
      {!isCurrent && (
        <button className="btn-outline btn btn-error btn-sm">Revoke</button>
      )}
    </div>
  );
}

export default ActiveSessionItem;
