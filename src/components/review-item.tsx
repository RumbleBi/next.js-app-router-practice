import { ReviewData } from "@/types";
import ReviewItemDeleteButton from "./review-item-delete-button";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className="flex flex-col gap-[5px] px-0 py-[15px]">
      <div className="text-sm">{author}</div>
      <div className="primary-sub rounded-[5px] px-[10px] py-[15px]">
        {content}
      </div>
      <div className="primary-main flex gap-[10px] text-sm">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div className="cursor-pointer">
          <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  );
}
