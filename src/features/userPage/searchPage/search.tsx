import { useParams } from "react-router-dom";

export function Search() {
  const { query } = useParams();

  return (
    <div>Search result for: {query}</div>
  );
}
