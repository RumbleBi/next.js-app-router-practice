"use client";

import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" disabled={isPending} />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" disabled={isPending} />
          <button type="submit" disabled={isPending}>
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
