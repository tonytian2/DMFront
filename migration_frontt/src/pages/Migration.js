import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProgressModal from "./Modal/progressModal";
import ValidationModal from "./Modal/ValidationModal";
import TableColumns from "../components/TableColumns";
import ErrorModal from "./Modal/ErrorModal";
import "./CSS/Migration.css";
import "./CSS/MigrationAndResult.css";
// import { db_ecommerce_data } from "./testdata.js";

const Migration = ({ logout }) => {
  const navigate = useNavigate();
  const [showProgressModel, setShowProgressModel] = useState(false);
  const [progressModelProgress, setProgressModelProgress] = useState(0);
  const [showValidationModel, setShowValidationModel] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");
  const [dbContents, setDbContents] = useState({});
  const [onHoverTableWithColumns, setOnHoverTableWithColumns] = useState("");
  const [errorMessage, setErrorMessage] = useState("This is an error message");
  const [showErrorModal, setErrorModal] = useState(false);

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
          setErrorMessage("Failed to fetch contents");
          setErrorModal(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchContents();
  }, []);

  const handleMigrateAll = async () => {
    setShowProgressModel(true);


    
    try {
      const migrateAllApi = `http://localhost:4999/v1/migrate_all`;
      const historyApi = `http://localhost:4999/v1/create_history`

      const historyResponse = await fetch(historyApi, {
        method: "GET",
        credentials: "include",
      });

      const eventSource = new EventSource(migrateAllApi, {
        withCredentials: true,
      });

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.finished_data) {
          setProgressModelProgress(100);
          eventSource.close();
          setShowProgressModel(false);
          setShowValidationModel(true);
        }
        if (data.progress) {
          setProgressModelProgress(data.progress);
        } else if (data.error) {
          // must be error
          const errorData = data.error;
          setErrorMessage(errorData);
          eventSource.close();
        }
      };
      eventSource.onerror = (error) => {
        console.error("Error:", error);
        setErrorMessage(error);
        eventSource.close();
      };
    } catch (error) {
      console.error("Error:", error);
      setShowProgressModel(false);
      setErrorMessage("An error occurred during migration.");
      setErrorModal(true);
    }
  };

  const handleValidation = async (inputPercentage) => {
    setShowValidationModel(false);
    setLoadingMessage("Validating");
    setShowProgressModel(true);

    try {
      const completenessApi = `http://localhost:4999/v1/firstValidation/completeness`;
      const accuracyApi = `http://localhost:4999/v1/firstValidation/accuracy/${inputPercentage}`;

      const completenessResponse = await fetch(completenessApi, {
        method: "GET",
        credentials: "include",
      });

      const accuracyResponse = await fetch(accuracyApi, {
        method: "GET",
        credentials: "include",
      });

      if (completenessResponse.ok && accuracyResponse.ok) {
        const completenessData = await completenessResponse.json();
        const accuracyData = await accuracyResponse.json();
        const combinedTable = {};

        Object.entries(completenessData).forEach(([table, data]) => {
          combinedTable[table] = {
            completeness: data["completeness"] === 1 ? true : false,
            completenessPercentage: data["completeness"] * 100,
            accuracy: accuracyData[table]?.accuracy === 100 ? true : false,
            accuracyPercentage: accuracyData[table]?.accuracy,
          };
        });

        localStorage.setItem("combinedTable", JSON.stringify(combinedTable));

        navigate("/result");
      }
    } catch (error) {
      console.error("Error:", error);
      setShowProgressModel(false);
      setErrorMessage("An error occurred during validation.");
      setErrorModal(true);
    }
  };

  const handleCloseModalA = () => {
    setErrorModal(false);
  };
  const handleCloseModalB = () => {
    setShowProgressModel(false);
  };

  const handleCloseModalC = async () => {
    //set accuracy =0
    const completenessApi = `http://localhost:4999/v1/firstValidation/completeness`;
    const completenessResponse = await fetch(completenessApi, {
      method: "GET",
      credentials: "include",
    });
    const completenessData = await completenessResponse.json();

    const combinedTable = {};
    Object.entries(completenessData).forEach(([table, data]) => {
      combinedTable[table] = {
        completeness: data["completeness"] === 1 ? true : false,
        completenessPercentage: data["completeness"] * 100,
        accuracy: false,
        accuracyPercentage: 0,
      };
    });
    localStorage.setItem("combinedTable", JSON.stringify(combinedTable));

    navigate("/result");
  };

  const handleOnHoverTable = (event) => {
    const table = event.target.parentNode.querySelector(".nowrap").textContent;
    const tableWithColumns = { [table]: dbContents.metadata[table].columns };

    setOnHoverTableWithColumns(tableWithColumns);
  };

  return (
    <div className="home">
      {showErrorModal && (
        <ErrorModal message={errorMessage} closeModal={handleCloseModalA} />
      )}
      {showProgressModel && (
        <ProgressModal
          progress={progressModelProgress}
          closeModal={handleCloseModalB}
          msg={loadingMessage}
        />
      )}
      {showValidationModel && (
        <ValidationModal
          closeModal={handleCloseModalC}
          onValidate={handleValidation}
        />
      )}
      <div
        style={{
          display: "flex",
          position: "relative",
        }}
      >
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
            <button type="submit" className="button" onClick={handleMigrateAll}>
              Migrate
            </button>
          </div>
        </div>
        {onHoverTableWithColumns && (
          <div style={{ position: "absolute", left: "680px" }}>
            <TableColumns
              table={Object.keys(onHoverTableWithColumns)[0]}
              columns={Object.values(onHoverTableWithColumns)[0]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Migration;
