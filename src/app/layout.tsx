import "./globals.css";
import Link from "next/link";
import { BookData } from "@/types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="mx-auto min-h-screen max-w-[600px] bg-white p-4 shadow-md">
          <header className="h-[60px] text-lg font-bold leading-[60px]">
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main className="pt-2">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if (!response.ok) {
    return <footer className="py-24 text-gray-500">제작 @winterlood</footer>;
  }
  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer className="py-12 text-gray-500">
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
  );
}
