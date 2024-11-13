import { BookData } from "@/types";
import style from "./page.module.css";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string | string[] } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`);
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const book: BookData = await response.json();
  const { title, coverImgUrl, author, subTitle, publisher, description } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image alt="123" src={coverImgUrl} width={200} height={100} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
