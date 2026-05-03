import { PageHeader, Card } from "../../components/admin/shared";

export default function SystemLogs() {
  const logs = [
    {
      level: "info",
      msg: "Edge function `process-refund` executed",
      at: "2026-04-29 14:22:11",
    },
    {
      level: "warn",
      msg: "API latency spike on /listings/:id (p95 = 412ms)",
      at: "2026-04-29 13:55:02",
    },
    {
      level: "info",
      msg: "Backup completed (487 MB)",
      at: "2026-04-29 12:00:00",
    },
    {
      level: "error",
      msg: "Failed Fayda API verification — retried successfully",
      at: "2026-04-29 10:14:33",
    },
    {
      level: "info",
      msg: "Block sync up to #4,521,345",
      at: "2026-04-29 09:00:00",
    },
    {
      level: "info",
      msg: "Deployment v2.4.1 succeeded",
      at: "2026-04-28 18:30:11",
    },
  ];
  return (
    <>
      <PageHeader
        title="System Logs"
        subtitle="Application, blockchain and edge function logs (last 24 hours)."
      />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th>Level</th>
                <th>Message</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i}>
                  <td>
                    <span
                      className={`badge badge-sm font-bold uppercase ${
                        l.level === "error"
                          ? "badge-error"
                          : l.level === "warn"
                            ? "badge-warning"
                            : "badge-info"
                      }`}
                    >
                      {l.level}
                    </span>
                  </td>
                  <td className="text-sm">{l.msg}</td>
                  <td className="font-mono text-muted-foreground text-xs">
                    {l.at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
