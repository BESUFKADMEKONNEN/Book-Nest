import BookOverview from "@/components/BookOverview";
import BookList from "@/components/ui/BookList";
import { sampleBooks } from "@/constants";

export default function Home() {
  return (
    <>
      <BookOverview  {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
