import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});

  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBookmarkList() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`http://localhost:4000/bookmarks/`);

        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`http://localhost:4000/bookmarks/${id}`);

      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/bookmarks/`,
        newBookmark
      );
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/bookmarks/${id}`
      );

      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        getBookmark,
        isLoading,
        currentBookmark,
        bookmarks,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
