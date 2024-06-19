import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { ClipboardPaste } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const LanguageList = [
  { lang: "Javascript", value: "Javascript" },
  { lang: "Python", value: "python" },
  { lang: "Java", value: "java" },
];
export function CodeBlock() {
  const [language, setLanguage] = useState<string>("javascript");
  const [code, setCode] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true,
    }).value;
    setHighlightedCode(highlighted);
  }, [language, code]);

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (e: ChangeEvent<HTMLAreaElement | any>) => {
    e.preventDefault();
    setCode(e.currentTarget?.value || "");
  };

  const handlePaste = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      setCode((prevCode) => prevCode + clipboardData);
    } catch (error) {
      console.log("clipboard error", error);
    }
  };
  console.log("", language, highlightedCode, code);
  return (
    <div className='w-full'>
      <div className='prose w-full relative bg-gray-50 rounded-sm p-5 focus:outline-none'>
        <div>
          <select
            contentEditable={false}
            className='bg-gray-100 border-dotted border-[.2rem] rounded-sm p-1 text-neutral-700'
            defaultValue={language}
            onChange={handleLanguageChange}
          >
            {LanguageList.map((val) => {
              return (
                <option
                  key={val.value}
                  value={val.value}
                >
                  {val.lang}
                </option>
              );
            })}
          </select>
        </div>
        <textarea
          contentEditable={false}
          className='focus:outline-none p-2 w-full'
          onChange={handleCodeChange}
          onPaste={handlePaste}
          // value={code}
        />
        <button
          onClick={handlePaste}
          className='absolute top-2 right-2 cursor-pointer'
        >
          <ClipboardPaste />
        </button>
        <div
          className={`language-${language} text-[1.4rem] block overflow-auto p-3 focus:outline-none`}
        >
          <div
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
        {/* <div
            className={`language-${language} text-base block overflow-auto p-3 focus:outline-none`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{ whiteSpace: "pre-wrap" }}
          ></div> */}
      </div>
      <p data-p-placeholder='Write your code...'></p>
    </div>
  );
}
