import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams("");

  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.rooms;

  const { isLoading, data: hotels } = useFetch(
    "http://localhost:4000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);

  async function getHotel(id) {
    try {
      setIsLoadingCurrentHotel(true);
      const { data } = await axios.get(`http://localhost:4000/hotels/${id}`);

      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        currentHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
