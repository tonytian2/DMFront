import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";
import TableColumns from "../components/TableColumns";
import "./CSS/Migration.css";
import "./CSS/MigrationAndResult.css";
// import { db_ecommerce_data } from "./testdata.js";

const Migration = ({ logout }) => {
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");
  const [dbContents, setDbContents] = useState({});
  const [onHoverTableWithColumns, setOnHoverTableWithColumns] = useState("");
  const [migrateErrorMessage, setMigrateErrorMessage] = useState("");
  const [validateErrorMessage, setValidateErrorMessage] = useState("");

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
  }, []);

  const handleMigrate = async () => {
    setShowProgress(true);
    try {
      const response = await fetch("http://localhost:4999/v1/migrate_all", {
        method: "GET",
        credentials: "include",
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);

      if (response.ok) {
        setShowProgress(false);
        setShowValidation(true);
      } else {
        const errorData = await response.json();
        setMigrateErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMigrateErrorMessage("An error occurred during migration.");
    }
  };

  const handleCloseModalB = () => {
    setShowProgress(false);
  };

  const handleCloseModalC = () => {
    navigate("/result");
  };

  const handleValidation = async (inputPercentage) => {
    setLoadingMessage("Validating");
    setShowProgress(true);

    try {
      const completenessUrl =
        "http://localhost:4999/v1/validation/completeness";
      const accuracyUrl = `http://localhost:4999/v1/validation/accuracy/${inputPercentage}`;

      const completenessResponse = await fetch(completenessUrl, {
        method: "GET",
        credentials: "include",
      });

      const accuracyResponse = await fetch(accuracyUrl, {
        method: "GET",
        credentials: "include",
      });

      if (completenessResponse.ok && accuracyResponse.ok) {
        const completenessData = await completenessResponse.json();
        const accuracyData = await accuracyResponse.json();

        const combinedTable = completenessData.map((item) => {
          const accuracyItem = accuracyData.find(
            (accItem) => accItem.tableName === item.tableName
          );

          return {
            tableName: item.tableName,
            completeness: item.completeness === 1 ? true : false,
            accuracy: accuracyItem?.accuracy === 100 ? true : false,
            percentage: accuracyItem?.accuracy === 100 ? inputPercentage : 0,
          };
        });

        localStorage.setItem("combinedTable", JSON.stringify(combinedTable));

        // Log the results
        console.log("Combined table:", combinedTable);

        navigate("/result");
      }
    } catch (error) {
      console.error("Error:", error);
      setValidateErrorMessage("An error occurred during validation.");
    }
  };

  const handleOnHoverTable = (event) => {
    const table = event.target.parentNode.querySelector(".nowrap").textContent;
    const tableWithColumns = { [table]: dbContents.metadata[table].columns };

    setOnHoverTableWithColumns(tableWithColumns);
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
      <div style={{ display: "flex" }}>
        <div className="form-container">
          <div className="card" style={{ width: "600px" }}>
            <div className="card-body w-100" style={{ padding: "20px 30px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h2 className="card-title nowrap" style={{ margin: "0 auto" }}>
                  Local Database
                </h2>
                <button
                  className="icon-button"
                  onClick={() => logout()}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="exit-icon"
                  />
                </button>
              </div>
              <div className="table-responsive-sm">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="nowrap">
                        Table Name
                      </th>
                      <th scope="col" className="nowrap">
                        No. of rows
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {dbContents.metadata &&
                      Object.entries(dbContents.metadata).map(
                        ([tableName, tableData], index) => (
                          <tr key={tableName} onMouseEnter={handleOnHoverTable}>
                            <th scope="row">{index + 1}</th>
                            <td className="nowrap">{tableName}</td>
                            <td className="nowrap">{tableData.rows}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="button" onClick={handleMigrate}>
              Migrate
            </button>
          </div>
        </div>
        {onHoverTableWithColumns && (
          <TableColumns
            table={Object.keys(onHoverTableWithColumns)[0]}
            columns={Object.values(onHoverTableWithColumns)[0]}
          />
        )}
      </div>
    </div>
  );
};

export default Migration;

/* <div className="form-container">
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
        </div> */
