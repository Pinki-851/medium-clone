"use client";
import { Logo } from "@/assets/icons/logo";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function StoryNavbar() {
  const router = useRouter();
  return (
    <header className=' w-full px-8 h-[5.6rem] py-2 border-b-[1px] space-x-3 flex justify-between items-center'>
      <nav className='w-full justify-center items-center flex gap-[55%]'>
        <div className='flex justify-start items-center gap-[.8rem]'>
          <Link
            href={"/"}
            passHref
          >
            <Logo className='w-[4rem] ' />
          </Link>
          <div className='flex justify-start items-center gap-[.4rem] rounded-[2rem] w-full h-full p-[1rem] bg-[#F9F9F9]'>
            <Search
              width={15}
              height={15}
              className='opacity-80 '
            />
            <input
              type='text'
              placeholder='Search...'
              className='focus:outline-none text-[1.4rem] bg-transparent'
            />
          </div>
        </div>

        <div className='flex justify-start items-center space-x-2'>
          <button
            className='flex duration-100 ease-in text-[1.4rem] justify-start items-center  cursor-pointer bg-green-600 hover:bg-green-700 text-white hover:opacity-100 opacity-90 px-4 py-2 rounded-[2rem]'
            onClick={() => {
              router.push("/story");
            }}
          >
            Publish
          </button>
          <UserButton signInUrl='/' />
        </div>
      </nav>
    </header>
  );
}
