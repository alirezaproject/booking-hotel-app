import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkProvider";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();
  const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";

  useEffect(() => {
    if (!lat || !lng) return;

    async function getLocation() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a city . please click on somewhere else"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        setGeoCodingError(null);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getLocation();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <p>Loading ...</p>;
  if (geoCodingError) return <p>{geoCodingError}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
  

    await createBookmark(newBookmark);

    navigate("/bookmark");
  };

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="CityName">CityName</label>
          <input
            type="text"
            name="cityName"
            id="CityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="Country">Country</label>
          <input
            type="text"
            name="Country"
            id="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary" type="submit">
            Add New Bookmark
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
