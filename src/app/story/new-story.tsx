"use client";

export default function NewStory() {
  return (
    <div>
      <div
        id='editable'
        className='w-[80rem] text-[1.6rem]'
        contentEditable
        suppressContentEditableWarning
      />
    </div>
  );
}
