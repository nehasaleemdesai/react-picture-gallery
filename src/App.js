import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import searchImages from "./api";
import ImageList from "./components/ImageList";

function App() {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false); // Prevent multiple calls

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      if (isBottom && !loading) {
        setPageNumber((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (term) {
        setLoading(true);
        const result = await searchImages(term, pageNumber);
        setImages((prev) => (pageNumber === 1 ? result : [...prev, ...result]));
        setLoading(false);
      }
    };
    fetchMoreImages();
  }, [pageNumber, term]);

  const handleSubmit = async (newTerm) => {
    setTerm(newTerm);
    setPageNumber(1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
    </div>
  );
}

export default App;
