import { useState } from "react";
import toast from "react-hot-toast";

function WriteReview() {
  const [text, setText] = useState("");
  const submit = () => {
    if (text.trim().length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }
    toast.success("Review submitted");
    setText("");
  };
  return (
    <div className="bg-base-100 p-4 border border-base-200 rounded-xl">
      <p className="mb-2 font-semibold text-sm">Write a review</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="Share your experience with this listing…"
        className="rounded-xl w-full text-sm textarea textarea-bordered"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-[11px] text-muted-foreground">
          {text.length}/500
        </span>
        <button
          onClick={submit}
          disabled={!text.trim()}
          className="btn btn-primary btn-sm"
        >
          Post review
        </button>
      </div>
    </div>
  );
}

export default WriteReview;
