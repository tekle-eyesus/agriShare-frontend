import { useState } from "react";
import { Star } from "lucide-react";

function ReviewForm({ initial, onSubmit }) {
  const [rating, setRating] = useState(initial?.rating ?? 5);
  const [text, setText] = useState(initial?.text ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(rating, text);
      }}
      className="space-y-4 p-6"
    >
      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Rating
        </label>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`${n} stars`}
            >
              <Star
                className={`w-7 h-7 ${n <= rating ? "fill-warning text-warning" : "text-base-300"}`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Your review (20–1000 chars)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          minLength={20}
          maxLength={1000}
          className="mt-1.5 w-full text-sm textarea textarea-bordered"
          rows={5}
          placeholder="Share your experience…"
        />
        <p className="mt-1 text-[10px] text-muted-foreground text-right">
          {text.length}/1000
        </p>
      </div>
      <button
        type="submit"
        disabled={text.length < 20}
        className="w-full btn btn-primary"
      >
        {initial ? "Update review" : "Submit review"}
      </button>
    </form>
  );
}

export default ReviewForm;
