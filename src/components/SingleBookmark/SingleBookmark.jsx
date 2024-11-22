import React, { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkProvider";
import { useParams } from "react-router-dom";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } =
    useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <p>Loading ...</p>;

  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
    </div>
  );
}

export default SingleBookmark;
