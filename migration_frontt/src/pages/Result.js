import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";
import "./CSS/MigrationAndResult.css";
import ErrorModal from "./Modal/ErrorModal";
import TickModal from "./Modal/SuccessModal";

// import { migration_result } from "./testdata.js";

const Result = ({ logout }) => {
  const navigate = useNavigate();
  const [showProgressModel, setShowProgressModel] = useState(false);
  const [showValidationModel, setShowValidationModel] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");
  const [tableData, setTableData] = useState({});
  const [selectedRevalidateTables, setselectedRevalidateTables] = useState([]);
  const [selectedRemigrateTables, setselectedRemigrateTables] = useState([]);
  const [remigrateOrRevalidate, setRemigrateOrRevalidate] = useState("");
  const [errorMessage, setErrorMessage] = useState("This is an error message");
  const [showErrorModal, setErrorModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);

  useEffect(() => {
    // Access combinedTable from localStorage
    const combinedTable = localStorage.getItem("combinedTable");
    const combinedTableJSON = JSON.parse(combinedTable);
    setTableData(combinedTableJSON);
  }, []);

  const handleRevalidateTableSelection = (tableName, isChecked) => {
    if (isChecked) {
      setselectedRevalidateTables((prevSelectedTables) => [
        ...prevSelectedTables,
        tableName,
      ]);
    } else {
      setselectedRevalidateTables((prevSelectedTables) =>
        prevSelectedTables.filter((name) => name !== tableName)
      );
    }
  };

  const handleRemigrateTableSelection = (tableName, isChecked) => {
    if (isChecked) {
      setselectedRemigrateTables((prevSelectedTables) => [
        ...prevSelectedTables,
        tableName,
      ]);
    } else {
      setselectedRemigrateTables((prevSelectedTables) =>
        prevSelectedTables.filter((name) => name !== tableName)
      );
    }
  };

  const handleCloseSuccess = () => {
    setSuccessModal(false);
  };
  const handleCloseModalA = () => {
    setErrorModal(false);
  };
  const handleRemigrate = async () => {
    setLoadingMessage("Migrating");
    setShowProgressModel(true);

    try {
      const remigrateTablesApi = `http://localhost:4999/v1/migrate_tables`;
      const selectedRemigrateTablesObject = { tables: selectedRemigrateTables };
      console.log(selectedRemigrateTablesObject);

      const response = await fetch(remigrateTablesApi, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRemigrateTablesObject),
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);

      if (response.ok) {
        setShowProgressModel(false);
        setShowValidationModel(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setErrorModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during migration.");
      setErrorModal(true);
    }
  };

  const handleRevalidate = async (inputPercentage) => {
    setShowValidationModel(false);
    setLoadingMessage("Validating");
    setShowProgressModel(true);

    try {
      const completenessApi = `http://localhost:4999/v1/firstValidation/completeness`;
      const accuracyApi = `http://localhost:4999/v1/firstValidation/accuracy/${inputPercentage}`;
      const selectedRevalidateTablesObject =
        remigrateOrRevalidate === "remigrate"
          ? {
              tables: selectedRemigrateTables,
            }
          : { tables: selectedRevalidateTables };

      console.log(selectedRevalidateTablesObject);

      const completenessResponse = await fetch(completenessApi, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRevalidateTablesObject),
      });

      const accuracyResponse = await fetch(accuracyApi, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRevalidateTablesObject),
      });

      if (completenessResponse.ok && accuracyResponse.ok) {
        const completenessData = await completenessResponse.json();
        const accuracyData = await accuracyResponse.json();
        const newCombinedTable = {};

        const oldCombinedTable = JSON.parse(
          localStorage.getItem("combinedTable")
        );

        Object.entries(completenessData).forEach(([table, data]) => {
          newCombinedTable[table] = {
            completeness: data["completeness"] === 1 ? true : false,
            completenessPercentage: data["completeness"] * 100,
            accuracy: accuracyData[table]?.accuracy === 100 ? true : false,
            accuracyPercentage: accuracyData[table]?.accuracy,
          };
        });

        Object.entries(newCombinedTable).forEach(([table, data]) => {
          oldCombinedTable[table] = data;
        });

        localStorage.setItem("combinedTable", JSON.stringify(oldCombinedTable));

        navigate("/result");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during validation.");
      setErrorModal(true);
    }
  };

  const handleCloseModalB = () => {
    setShowProgressModel(false);
  };

  const handleCloseModalC = () => {
    setShowValidationModel(false);
  };
  const handleUpdate = async () => {
    setLoadingMessage("Updating");
    setShowProgressModel(true);

    try {
      const migrateUpdateApi = `http://localhost:4999/v1/migrate_updates`;
      const validateCompletenessUpdateApi = `http://localhost:4999/v1/secondValidation/completeness`
      const validateAccuracyUpdateApi = `http://localhost:4999/v1/secondValidation/accuracy`
      const AllTablesObject = { tables: Object.keys(tableData) };
      
      console.log(AllTablesObject)


      
      const mResponse = await fetch(migrateUpdateApi, {
        method: "POST",
        credentials: "include",
      });     
    

      const VCResponse = await fetch(validateCompletenessUpdateApi, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AllTablesObject),
      });

      const VAResponse = await fetch(validateAccuracyUpdateApi, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(AllTablesObject),
      });

      if (mResponse.ok) {
        const mm = await mResponse.json();
        console.log(mm)
        mm.updated_tables.forEach(item => {
          const key = Object.keys(item)[0]; // Get the key name from the item
          const updatedKey = `(Updated) ${key} `; // Generate the updated key name
        
          // Check if the updated key exists in the tabledata
          if (tableData.hasOwnProperty(key)) {
            // Rename the key in the tabledata and assign the corresponding value
            tableData[updatedKey] = tableData[key];
            delete tableData[key]; // Remove the old key
          }
        });
        localStorage.setItem('tableData', JSON.stringify(tableData));
      }
      
      
      setShowProgressModel(false);
      setSuccessModal(true);
      console.log(mResponse.text);
      console.log(VCResponse.json());


      
    } catch (error) {
      console.error("Error:", error);
      setShowProgressModel(false);
      setErrorMessage("An error occurred during validation.");
      setErrorModal(true);
    }
    console.log(tableData)

  };

  return (
    <div className="home">
      {showErrorModal && (
        <ErrorModal message={errorMessage} closeModal={handleCloseModalA} />
      )}

      {showSuccessModal && <TickModal closeModal={handleCloseSuccess} />}
      {showProgressModel && (
        <ProgressModal
          progress={50}
          closeModal={handleCloseModalB}
          msg={loadingMessage}
        />
      )}
      {showValidationModel && (
        <ValidationModal
          closeModal={handleCloseModalC}
          onValidate={handleRevalidate}
        />
      )}
      <div className="form-container">
        <div className="card" style={{ width: "1000px" }}>
          <div className="card-body w-100" style={{ paddingLeft: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2 className="card-title nowrap" style={{ margin: "0 auto" }}>
                Migration Result
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

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="nowrap">
                    Table Name
                  </th>
                  <th scope="col" className="nowrap">
                    Completeness
                  </th>
                  <th scope="col" className="nowrap">
                    Accuracy
                  </th>
                  <th scope="col" className="nowrap">
                    Revalidate?
                  </th>
                  <th scope="col" className="nowrap">
                    Remigrate?
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {tableData &&
                  Object.entries(tableData).map(
                    ([tableName, tableData], index) => (
                      <tr key={index}>
                        <th scope="row" className="nowrap">
                          {index + 1}
                        </th>
                        <td className="nowrap">{tableName}</td>
                        <td>
                          <div className="nowrap result-form-item">
                            {tableData.completeness ? (
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                className={
                                  tableName.startsWith("(Updated)")
                                    ? "form-icon icon-updated"
                                    : "form-icon icon-green"
                                }
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="form-icon icon-red"
                              />
                            )}
                            <span
                              className={
                                tableData.completenessPercentage === 100
                                  ? "inherit"
                                  : "text-red"
                              }
                              style={{
                                marginLeft: "5px",
                                fontSize: "9px",
                              }}
                            >
                              ({tableData.completenessPercentage}%)
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="nowrap result-form-item">
                            {tableData.accuracy ? (
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                className={
                                  tableName.startsWith("(Updated)")
                                    ? "form-icon icon-updated"
                                    : "form-icon icon-green"
                                }
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="form-icon icon-red"
                              />
                            )}
                            <span
                              className={
                                tableData.accuracyPercentage === 100
                                  ? "inherit"
                                  : "text-red"
                              }
                              style={{
                                marginLeft: "5px",
                                fontSize: "9px",
                              }}
                            >
                              ({tableData.accuracyPercentage}%)
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="nowrap result-form-item">
                            <input
                              className="form-check-input border-3 form-checkbox"
                              type="checkbox"
                              value=""
                              id={`revalidate-checkbox-${index}`}
                              onChange={(e) =>
                                handleRevalidateTableSelection(
                                  tableName,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <div className="nowrap result-form-item">
                            <input
                              className="form-check-input border-3 form-checkbox"
                              type="checkbox"
                              value=""
                              id={`remigrate-checkbox-${index}`}
                              onChange={(e) =>
                                handleRemigrateTableSelection(
                                  tableName,
                                  e.target.checked
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="button-container d-flex justify-content-end gap-3">
          <button
            type="submit"
            className="button"
            onClick={() => {
              handleUpdate();
            }}
          >
            Final Update
          </button>
          <button
            type="submit"
            className="button"
            onClick={() => {
              setRemigrateOrRevalidate("revalidate");
              setShowValidationModel(true);
            }}
          >
            Revalidate
          </button>
          <button
            type="submit"
            className="button"
            onClick={() => {
              setRemigrateOrRevalidate("remigrate");
              handleRemigrate();
            }}
          >
            Remigrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
