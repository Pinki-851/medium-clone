/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Code, Image as LucideImage, MoreHorizontal, Plus } from "lucide-react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CodeBlock } from "./code-block";
import { ImgComponent } from "./img-component";

export function EditableContent() {
  const editContentRef = useRef<HTMLDivElement>(null);
  const [openTools, setOpenTools] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [saving, setSaving] = useState(false);

  const [buttonPositio, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  // useEffect(() => {
  //   console.log(editContentRef.current?.innerText);
  // }, [editContentRef]);

  useEffect(() => {
    if (typeof window.document !== "undefined") {
      const editor = new MediumEditor(".editable", {
        elementsContainer: document.getElementById("container") as HTMLElement,
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h2",
            "h3",
            "quote",
          ],
          diffLeft: 0,
        },
      });
      return () => {
        editor.destroy();
      };
    }
  }, []);

  function getCaretPosition() {
    let x = 0;
    let y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection() as Selection;
      if (selection?.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();
        const react = range.getClientRects()[0];
        if (react) {
          x = react.left;
          y = react.top - 180;
        }
      }
    }
    return { x, y };
  }

  useEffect(() => {
    const handleBtnPosition = () => {
      const { x, y } = getCaretPosition();
      setButtonPosition({ top: y, left: -50 });
    };
    window.addEventListener("input", handleBtnPosition);
  }, []);

  function handleInput() {
    inputRef?.current?.click();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setOpenTools(false);
      const localImageUrl = URL.createObjectURL(file);
      const ImgComponentContainer = (
        <ImgComponent
          imageUrl={localImageUrl}
          file={file}
        />
      );
      const wrapperdiv = document.createElement("div");
      const root = createRoot(wrapperdiv);
      root.render(ImgComponentContainer);
      editContentRef.current?.appendChild(wrapperdiv);
    }
  }

  const insertcodeBlock = () => {
    setOpenTools(false);
    const CodeBlockComp = <CodeBlock />;

    const wrapperdiv = document.createElement("div");
    const root = createRoot(wrapperdiv);
    root.render(CodeBlockComp);
    editContentRef.current?.appendChild(wrapperdiv);
  };

  return (
    <main
      id='container'
      className='max-w-[80rem] w-full mx-auto relative font-mono mt-8'
    >
      <p className='absolute top-[7rem] opacity-30'>
        {saving ? "Saving..." : "Saved"}
      </p>
      <div
        id='editable'
        className='w-full text-[1.6rem] p-[1rem] max-w-[80rem] prose'
        contentEditable
        suppressContentEditableWarning
        ref={editContentRef}
      >
        <h1
          data-h1-placeholder='Title'
          className='font-semibold'
        ></h1>
        <p data-p-placeholder='Write your story...'></p>
      </div>

      <div
        className={`z-10`}
        style={{
          position: "relative",
          top: buttonPositio.top,
          left: buttonPositio.left,
        }}
      >
        <button
          className='border-neutral-500 rounded-full border-[1px] p-1'
          onClick={() => {
            setOpenTools(!openTools);
          }}
          title='tools'
        >
          <Plus
            className={`duration-300 ease-linear ${
              openTools ? "rotate-[135deg]" : ""
            }`}
          />
        </button>
        <div
          className={`flex justify-center items-center space-x-4  ${
            openTools ? "visible " : "invisible"
          } absolute top-0 left-[6rem]`}
        >
          <SpanContainer
            openTools={openTools}
            onClickHandler={() => {
              handleInput();
            }}
          >
            {" "}
            <LucideImage
              className='opacity-60 text-orange-800'
              size={20}
            />
            <input
              ref={inputRef}
              type='file'
              accept='image/*'
              style={{ display: "none" }}
              onChange={(e) => {
                handleInputChange(e);
              }}
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
            onClickHandler={() => insertcodeBlock()}
          >
            <Code size={20} />
          </SpanContainer>
        </div>

        {inputRef?.current !== null && (
          <div>
            {/* <Image
              src={""}
              alt='image' 
            />*/}
          </div>
        )}
      </div>
    </main>
  );
}
const SpanContainer = ({
  openTools,
  children,
  className = "",
  onClickHandler,
}: {
  openTools: boolean;
  children: ReactNode;
  className?: string;
  onClickHandler?: () => void;
}) => {
  return (
    <span
      className={`border-[1px] bg-white cursor-pointer border-green-500 rounded-full p-[6px]  block ${
        openTools ? "scale-100 visible" : "scale-0 invisible"
      } ease-linear duration-100 ${className && className}`}
      onClick={() => {
        onClickHandler?.();
      }}
    >
      {children}
    </span>
  );
};
