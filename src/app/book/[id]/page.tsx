import { BookData, ReviewData } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();
  return {
    title: `${book.title}`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title}`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
  }
  const book: BookData = await response.json();
  const { title, coverImgUrl, author, subTitle, publisher, description } = book;

  return (
    <section className="flex flex-col gap-[10px]">
      <div
        className="relative flex justify-center bg-cover bg-center bg-no-repeat p-5"
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <span
          className="absolute left-0 top-0 h-full w-full bg-black opacity-70"
          aria-hidden={true}
        ></span>
        <Image
          className="z-[1] h-full max-h-[350px]"
          alt={`도서 ${title}의 표지 이미지`}
          src={coverImgUrl}
          width={240}
          height={300}
        />
      </div>
      <div className="text-lg font-bold">{title}</div>
      <div className="primary-main">{subTitle}</div>
      <div className="primary-main">
        {author} | {publisher}
      </div>
      <div className="primary-sub whitespace-pre-line rounded-[5px] p-[15px] leading-normal">
        {description}
      </div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: { tags: [`review-${bookId}`] },
    }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section className="flex flex-col gap-[10px]">
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="gap-50px flex-col">
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
