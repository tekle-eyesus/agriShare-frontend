import { UPDATES_TIMELINE } from "../../../mock-data/investor/data";
import { Calendar } from "lucide-react";

function Updates() {
  return (
    <div className="space-y-5">
      {UPDATES_TIMELINE.map((u) => (
        <div key={u.id} className="relative pl-4 border-primary/30 border-l-2">
          <span className="top-1 -left-[7px] absolute bg-primary rounded-full ring-4 ring-base-100 w-3 h-3" />
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3" />
            {u.date}
          </div>
          <p className="mt-1 font-semibold">{u.title}</p>
          <p className="mt-1 text-muted-foreground text-sm">{u.body}</p>
          {u.images.length > 0 && (
            <div className="gap-2 grid grid-cols-2 mt-3">
              {u.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="rounded-lg object-cover aspect-video"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Updates;
