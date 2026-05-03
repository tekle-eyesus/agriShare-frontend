import Modal from "../Modal";
import { AlertTriangle, Send } from "lucide-react";

function RiskModal({ active, setActive }) {
  return (
    <Modal
      open={!!active}
      onClose={() => setActive(null)}
      title="Send alert to farmer"
      size="md"
    >
      {active && (
        <div className="space-y-4 p-6">
          <div className="flex items-start gap-3 bg-warning/10 p-3 border border-warning/30 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
            <div>
              <p className="font-semibold text-sm">{active.title}</p>
              <p className="mt-0.5 text-muted-foreground text-xs">
                {active.farmer} • {active.days} days remaining
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Template
            </label>
            <select
              className="rounded-xl w-full select-bordered select"
              value={tpl}
              onChange={(e) => {
                setTpl(e.target.value);
                setMsg(TEMPLATES.find((t) => t.id === e.target.value).body);
              }}
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Message
            </label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={5}
              className="rounded-xl w-full text-sm textarea textarea-bordered"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button className="normal-case btn btn-ghost">Preview</button>
            <button className="gap-2 normal-case btn btn-primary">
              <Send className="w-4 h-4" /> Send notification
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default RiskModal;
