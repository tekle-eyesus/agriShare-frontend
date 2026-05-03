import { FileText, ChevronRight } from "lucide-react";

function Documents() {
  return (
    <div className="space-y-2">
      {[
        "Land certificate.pdf",
        "Insurance policy.pdf",
        "Audited financials Q1 2026.pdf",
        "Cooperative agreement.pdf",
      ].map((d) => (
        <a
          key={d}
          className="flex items-center gap-3 hover:bg-base-200 p-3 border border-base-200 rounded-xl transition-colors cursor-pointer"
        >
          <div className="place-items-center grid bg-error/10 rounded-lg w-9 h-9 text-error">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{d}</p>
            <p className="text-[11px] text-muted-foreground">PDF · 1.2 MB</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </a>
      ))}
    </div>
  );
}

export default Documents;
