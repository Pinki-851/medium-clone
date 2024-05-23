import { EditableContent } from "@/components/story/editable";

export default function page() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <EditableContent />
    </main>
  );
}
