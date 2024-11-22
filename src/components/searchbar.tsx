"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="mb-5 flex gap-[10px]">
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className="primary-main flex-1 rounded-[5px] border p-[15px]"
      />
      <button
        onClick={onSubmit}
        className="w-20 cursor-pointer rounded-[5px] border-none bg-sky-400 text-white"
      >
        검색
      </button>
    </div>
  );
}
