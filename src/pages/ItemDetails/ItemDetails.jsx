import React from "react";
import { useLocation } from "react-router-dom";
import '../ItemDetails/ItemDetails.css';

const ItemDetails = () => {
  const location = useLocation();
  const { values } = location.state || {};

  const selectedData = values ? JSON.stringify(values) : "No data available";
  let parsedData = null;

  try {
    parsedData = selectedData ? JSON.parse(selectedData) : null;
  } catch (error) {
    return <div>No data available or error in parsing JSON</div>;
  }

  return (
    <div className="card-details">
      <img
        className="card-img"
        src={`https://robohash.org/${parsedData.name.first}`}
        alt={parsedData.name.first}
      />
      <div className="card-content">
        <h1>
          {parsedData.name.title} {parsedData.name.first} {parsedData.name.last}
        </h1>
        <p>
          <strong>Gender: {parsedData.gender}</strong>
        </p>
        <p>
          <strong>Age: {parsedData.dob.age}</strong>
        </p>
        <p>
          <strong>
            City: {parsedData.location.city}, State: {parsedData.location.state}
          </strong>
        </p>
        <p>
          <strong>Country:{parsedData.location.country}</strong>
        </p>
        <p>
          <strong>Email: {parsedData.email}</strong>
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
