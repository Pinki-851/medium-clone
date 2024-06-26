"use client";
import { Logo } from "@/assets/icons/logo";
import { UserButton } from "@clerk/nextjs";
import { Search, SquarePen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function Navbar() {
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

        <div className='flex justify-start items-center gap-[.8rem]'>
          <div
            className='flex justify-start items-center gap-[.8rem] cursor-pointer'
            onClick={() => {
              router.push("/story");
            }}
          >
            <SquarePen
              width={20}
              height={20}
              className='opacity-70 hover:opacity-100 ease-in duration-100 cursor-pointer'
            />
            <p className='text-[1.4rem]'>Write</p>
          </div>
          <UserButton signInUrl='/' />
        </div>
      </nav>
    </header>
  );
}
