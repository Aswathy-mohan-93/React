import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ItemDetails from "../ItemDetails/ItemDetails";
import '../HomePage/Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchtext] = useState("");
  const location = useLocation();

  const fetchDataFromUrl = async (pageNumber) => {
    setLoading(true);
    const url = `https://randomuser.me/api/?results=10&page=${pageNumber}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData((prevData) => [...prevData, ...result.results]);
      setLoading(false);
    } catch (error) {
      setError("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromUrl(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= scrollHeight * 0.7 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const searchTextChanged = (event) => {
    setSearchtext(event.target.value);
  };

  const filteredData = data.filter((user) => {
    const searchtext = searchText.toLowerCase();
    return (
      user.name.first.toLowerCase().includes(searchtext) ||
      user.name.last.toLowerCase().includes(searchtext) ||
      user.location.city.toLowerCase().includes(searchtext)
    );
  });

  const shouldHideSearchBox = location.pathname.includes("/userDetails");

  if (!Array.isArray(filteredData) || filteredData.length === 0) {
    return  (
      <div className="Home">
        {!shouldHideSearchBox && (
          <div className="Home">
            <h2>ROBOFRIENDS</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <input
              type="text"
              className="search-box"
              placeholder="Search Robot Name...."
              value={searchText}
              onChange={searchTextChanged}
            />
            <div className="separator"></div>
          </div>
        )}
      </div>
    );
  }

  const cardViewClicked = (data) => {
    navigate("/userDetails/${data}", { state: { values: data } });
  };

  return (
    <div className="Home">
      {!shouldHideSearchBox && (
        <div className="Home">
          <h2>ROBOFRIENDS</h2>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <input
            type="text"
            className="search-box"
            placeholder="Search Robot Name...."
            value={searchText}
            onChange={searchTextChanged}
          />
          <div className="separator"></div>
          <div className="card-container">
            {filteredData.map((user, index) => {
              return (
                <div
                  key={index}
                  className="card"
                  onClick={() => cardViewClicked(user)}
                >
                  <img
                    src={`https://robohash.org/${user.name.first}`}
                    alt={user.name.first}
                  />
                  <h3>
                    {user.name.title} {user.name.first} {user.name.last}
                  </h3>
                  <p>
                    {user.location.city}, {user.location.state}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Routes>
        <Route path="/userDetails/:data" element={<ItemDetails />} />
      </Routes>
    </div>
  );
};

export default Homepage;
