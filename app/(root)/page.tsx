import BookOverview from "@/components/BookOverview";
import BookList from "@/components/ui/BookList";
import { sampleBooks } from "@/constants";
import { checkDb } from "@/lib/test";

export default function Home() {
  checkDb();
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
