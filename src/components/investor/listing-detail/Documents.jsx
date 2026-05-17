import { FileText, ChevronRight } from "lucide-react";

function Documents({ listing }) {
  const documents = listing?.documents || listing?.asset?.documents || [];

  if (documents.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        No documents available for this listing.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((d, i) => {
        const ext = d.url ? d.url.split('.').pop().toUpperCase() : 'DOC';
        return (
          <a
            key={i}
            href={d.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:bg-base-200 p-3 border border-base-200 rounded-xl transition-colors cursor-pointer"
          >
            <div className="place-items-center grid bg-error/10 rounded-lg w-9 h-9 text-error">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{d.name || `Document ${i + 1}`}</p>
              <p className="text-[11px] text-muted-foreground">{ext}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </a>
        );
      })}
    </div>
  );
}

export default Documents;
