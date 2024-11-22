import React from "react";
import { useBookmark } from "../../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  if (isLoading) return <p>Loading...</p>;
  if (!bookmarks.length) return <p>there is no bookmark location</p>;

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  return (
    <div>
      <h2>Bookmark List</h2>

      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  currentBookmark.id == item.id && "current-bookmark"
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong>&nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
