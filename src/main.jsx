import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import BookmarkProvider from "./context/BookmarkProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </React.StrictMode>
  </BrowserRouter>
);
