import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db_ecommerce_data } from "./testdata.js";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";

import "./CSS/Migration.css";

const Migration = () => {
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");
  const [dbContents, setDbContents] = useState({});

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(
          "http://localhost:4999/v1/metadata/source",
          {
            method: "GET",
            credentials: "include", // Include credentials in the request
          }
        );

        if (response.ok) {
          const data = await response.text();
          const jsonData = JSON.parse(data);
          setDbContents(jsonData);
        } else {
          console.error("Failed to fetch contents");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchContents();
  });

  function handleMigrate() {
    // Start migration by calling backend

    // Redirect to Result.js after migration
    setShowProgress(true);
    // Set 5 second timeout
    setTimeout(() => {
      setShowProgress(false);
      setShowValidation(true);
    }, 5000);
  }

  const handleCloseModalB = () => {
    setShowProgress(false);
  };

  const handleCloseModalC = () => {
    navigate("/result");
  };

  const handleValidation = (inputPercentage) => {
    // Validation logic goes here
    console.log(`Validation started with percentage: ${inputPercentage}`);
    // Potentially close modal after validation
    setShowValidation(false);
    setLoadingMessage("Validating");
    setShowProgress(true);

    setTimeout(() => {
      navigate("/result");
    }, 5000);
  };

  return (
    <div className="home">
      {showProgress && (
        <ProgressModal
          progress={50}
          closeModal={handleCloseModalB}
          msg={loadingMessage}
        />
      )}
      {showValidation && (
        <ValidationModal
          closeModal={handleCloseModalC}
          onValidate={handleValidation}
        />
      )}
      <div className="form-container">
        <div className="card" style={{ width: "600px" }}>
          <div className="card-body w-100" style={{ paddingLeft: "50px" }}>
            <h2 className="card-title" style={{ whiteSpace: "nowrap" }}>
              Local Database
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Table Name
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    No. of rows
                  </th>
                </tr>
              </thead>
              <tbody>
                {dbContents.metadata &&
                  Object.entries(dbContents.metadata).map(
                    ([tableName, tableData], index) => (
                      <tr key={tableName}>
                        <th scope="row">{index + 1}</th>
                        <td style={{ whiteSpace: "nowrap" }}>{tableName}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {tableData.rows}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="form-container">
        <div className="card" style={{ width: "600px" }}>
          <div className="card-body w-100" style={{ paddingLeft: "50px" }}>
            <h2 className="card-title" style={{ whiteSpace: "nowrap" }}>
              Local Database
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Table Name
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    No. of rows
                  </th>
                </tr>
              </thead>
              <tbody>
                {db_ecommerce_data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ whiteSpace: "nowrap" }}>
                      {index + 1}
                    </th>
                    <td style={{ whiteSpace: "nowrap" }}>{data.tableName}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{data.rowTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        <div className="button-container">
          <button type="submit" className="button" onClick={handleMigrate}>
            Migrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Migration;
