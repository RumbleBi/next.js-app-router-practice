import type { BookData } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link
      href={`/book/${id}`}
      className="primary-sub flex gap-[15px] border-b px-[10px] py-[20px] text-black no-underline"
    >
      <Image
        alt={`도서 ${title}의 표지 이미지`}
        src={coverImgUrl}
        width={80}
        height={105}
      />
      <div>
        <div className="font-bold">{title}</div>
        <div className="break-keep">{subTitle}</div>
        <br />
        <div className="primary-main">
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
