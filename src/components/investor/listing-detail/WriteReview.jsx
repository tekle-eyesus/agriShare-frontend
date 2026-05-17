import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";

function WriteReview({ listingId }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const { investor } = useAPI();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => investor.postReview({ data, listingId }),
    onSuccess: () => {
      toast.success("Review submitted");
      setText("");
      setRating(5);
      queryClient.invalidateQueries(["listing-reviews", listingId]);
    },
    onError: () => {
      toast.error("Failed to submit review");
    }
  });

  const submit = () => {
    if (text.trim().length < 5) {
      toast.error("Please write at least 5 characters");
      return;
    }
    mutate({ rating, comment: text });
  };

  return (
    <div className="bg-base-100 p-4 border border-base-200 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-sm">Write a review</p>
        <select 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
          className="select select-bordered select-xs"
        >
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        maxLength={500}
        placeholder="Share your experience with this listing…"
        className="rounded-xl w-full text-sm textarea textarea-bordered"
        disabled={isPending}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-[11px] text-muted-foreground">
          {text.length}/500
        </span>
        <button
          onClick={submit}
          disabled={!text.trim() || isPending}
          className="btn btn-primary btn-sm"
        >
          {isPending ? "Posting..." : "Post review"}
        </button>
      </div>
    </div>
  );
}

export default WriteReview;
