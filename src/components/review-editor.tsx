"use client";

import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section className="mt-[10px]">
      <form className="flex flex-col gap-[5px]" action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          className="primary-main box-border h-full w-full resize-y rounded-[5px] border p-[10px]"
          required
          name="content"
          placeholder="리뷰 내용"
          disabled={isPending}
        />
        <div className="flex justify-end gap-[5px]">
          <input
            required
            name="author"
            placeholder="작성자"
            disabled={isPending}
            className="primary-main box-border rounded-[5px] border p-[10px]"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-20 cursor-pointer rounded-[5px] border-none bg-amber-400 p-[10px]"
          >
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
