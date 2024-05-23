/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Code, Image, MoreHorizontal, Plus } from "lucide-react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { ReactNode, useEffect, useRef, useState } from "react";

export function EditableContent() {
  const editContentRef = useRef<HTMLDivElement>(null);
  const [openTools, setOpenTools] = useState(false);
  useEffect(() => {
    console.log(editContentRef.current?.innerText);
  }, [editContentRef]);

  useEffect(() => {
    console.log("window", typeof window?.document);
    if (typeof window?.document !== "undefined") {
      const editor = new MediumEditor(".editable", {
        elementsContainer: document.getElementById("container") as HTMLElement,
      });
    }
  });

  return (
    <main
      id='container'
      className='max-w-[80rem] mx-auto relative font-mono mt-8'
    >
      <div
        id='editable'
        className='w-[80rem] text-[1.6rem] p-[1rem] max-w-[80rem] prose'
        contentEditable
        suppressContentEditableWarning
        ref={editContentRef}
      >
        <h1
          data-h1-placeholder='Title'
          className='font-medium'
        ></h1>
        <p data-p-placeholder='Write your story...'></p>
      </div>

      <div className='relative'>
        <button
          className='border-neutral-500 rounded-full border-[1px] p-1'
          onClick={() => {
            setOpenTools(!openTools);
          }}
          title='tools'
        >
          <Plus
            className={`duration-300 ease-linear ${
              openTools ? "rotate-90" : ""
            }`}
          />
        </button>
        <div
          className={`flex justify-center items-center space-x-4  ${
            openTools ? "visible " : "invisible"
          } absolute top-0 left-[6rem]`}
        >
          <SpanContainer openTools={openTools}>
            {" "}
            <Image
              className='opacity-60 text-orange-800'
              size={20}
            />
            <input
              type='file'
              accept='image/*'
              style={{ display: "none" }}
            />
          </SpanContainer>
          <SpanContainer
            openTools={openTools}
            className='delay-75'
          >
            <MoreHorizontal size={20} />
          </SpanContainer>
          <SpanContainer
            openTools={openTools}
            className='delay-100'
          >
            <Code size={20} />
          </SpanContainer>
        </div>
      </div>
    </main>
  );
}
const SpanContainer = ({
  openTools,
  children,
  className = "",
}: {
  openTools: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`border-[1px] cursor-pointer border-green-500 rounded-full p-[6px]  block ${
        openTools ? "scale-100 visible" : "scale-0 invisible"
      } ease-linear duration-100 ${className && className}`}
    >
      {children}
    </span>
  );
};
