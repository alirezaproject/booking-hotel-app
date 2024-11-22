import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import { Route, Routes } from "react-router-dom";
import HotelsProvider from "./context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkProvider from "./context/BookmarkProvider";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmark" element={<BookmarkLayout />}>
          <Route index element={<Bookmark />} />
          <Route path=":id" element={<SingleBookmark />} />
          <Route path="add" element={<AddNewBookmark />} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
