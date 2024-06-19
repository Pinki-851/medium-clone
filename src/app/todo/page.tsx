"use client";
import { useEffect, useState } from "react";

export default function Todo() {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=10`
    );
    const finalres = await res.json();
    console.log("final", finalres);
    setData(finalres);
  }

  function handleDelete(id: string | number) {
    const afterremoveData = data?.filter((val: any) => {
      return val?.id != id;
    });

    setData(afterremoveData);
  }

  console.log(search);
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full'>
        <h1 className=' text-[1.6rem] text-gray-900'>ToDO</h1>

        <input
          type='search'
          className='h-[4rem] w-[20rem] border-gray-600 p-[1rem]'
          placeholder='Search...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className='flex justify-center items-start gap-[2rem] w-full flex-wrap'>
        {data
          ?.filter((val: any) => val?.title.includes(search))
          ?.map((val: any) => {
            return (
              <div
                key={val?.id}
                className='w-[20rem] h-[20rem] flex space-y-2 justify-center items-center flex-col border-[1px] border-gray-600'
              >
                <button
                  className='bg-blue-600 w-[10rem] h-[2rem]'
                  onClick={() => {
                    handleDelete(val?.id);
                  }}
                >
                  remove
                </button>
                <h3>{val?.id}</h3>
                <p>{val?.title}</p>
                <div className='w-[2rem] h-[2rem] rounded-full bg-gray-700'></div>
              </div>
            );
          })}
      </div>
    </>
  );
}
