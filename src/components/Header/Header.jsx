import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range/";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { UseAuth } from "../../context/AuthProvider";
function Header() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [destination, setDestination] = useState(
    searchParams.get("destination") ?? ""
  );
  const [openOptions, setOpenOptions] = useState("");
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const [openDate, setOpenDate] = useState(false);

  return (
    <div className="header">
      <NavLink to="/bookmark">Bookmarks</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where are you going ?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            adult {options.adult} &bull; children {options.children} &bull; room{" "}
            {options.rooms}
          </div>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              options={options}
              handleOptions={handleOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="rooms"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, false)}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, true)}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, Logout } = UseAuth();
  const handleLogout = () => {
    Logout();
    navigate("/");
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="">
          <span>{user.name}</span>
          <button onClick={handleLogout}>
            <HiLogout className="icon" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </>
  );
}
