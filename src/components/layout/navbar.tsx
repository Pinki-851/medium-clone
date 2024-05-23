import { Logo } from "@/assets/icons/logo";
import { UserButton } from "@clerk/nextjs";
import { Search, SquarePen } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className=' w-full px-8 py-2 border-b-[1px] space-x-3 flex justify-between items-center'>
      <div className='flex justify-start items-center gap-[.8rem]'>
        <Link
          href={"/"}
          passHref
        >
          <Logo className='w-[4rem] h-[4rem]' />
        </Link>
        <div className='flex justify-start items-center gap-[.4rem]'>
          <Search
            width={15}
            height={15}
            className='opacity-80 '
          />
          <input
            type='text'
            placeholder='Search...'
            className='focus:outline-none text-[1.4rem]'
          />
        </div>
      </div>

      <div className='flex justify-start items-center gap-[.8rem]'>
        <div className='flex justify-start items-center gap-[.8rem]'>
          <SquarePen
            width={20}
            height={20}
            className='opacity-70 hover:opacity-100 ease-in duration-100 cursor-pointer'
          />
          <p className='text-[1.4rem]'>Write</p>
        </div>
        <UserButton signInUrl='/' />
      </div>
    </header>
  );
}
