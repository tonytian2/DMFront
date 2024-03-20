import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";
// import { migration_result } from "./testdata.js";

const Result = ({ logout }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    // Access data from localStorage
    const combinedTable = localStorage.getItem("combinedTable");
    const combinedTableJSON = JSON.parse(combinedTable);
    setTableData(combinedTableJSON);
  }, []);

  const handleToggle = () => {};

  const handleRemigrate = () => {
    setLoadingMessage("Migrating");
    setShowProgress(true);
    //set 2 second timeout
    setTimeout(() => {
      setShowProgress(false);
      setShowValidation(true);
    }, 2000);
  };

  const handleRevalidate = () => {
    setShowValidation(true);
  };

  const handleCloseModalB = () => {
    setShowProgress(false);
  };

  const handleCloseModalC = () => {
    setShowValidation(false);
  };

  const handleValidation = (inputPercentage) => {
    console.log(`Validation started with percentage: ${inputPercentage}`);
    setShowValidation(false);
    setLoadingMessage("Validating");
    setShowProgress(true);

    setTimeout(() => {
      setShowProgress(false);
    }, 2000);
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
                        <td
                          className="nowrap"
                          style={{
                            paddingLeft: "20px",
                            alignItems: "center",
                          }}
                        >
                          {tableData.completeness ? (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className="form-icon icon-green"
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
                        </td>
                        <td
                          className="nowrap"
                          style={{
                            paddingLeft: "20px",
                            alignItems: "center",
                          }}
                        >
                          {tableData.accuracy ? (
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className="form-icon icon-green"
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
                            ({tableData.accuracyPercentage.toFixed(2)}%)
                          </span>
                        </td>
                        <td
                          className="nowrap"
                          style={{
                            paddingLeft: "20px",
                            alignItems: "center",
                          }}
                        >
                          <input
                            className="form-check-input border-3"
                            style={{ width: "20px", height: "20px" }}
                            type="checkbox"
                            value=""
                            id="revalidate-checkbox"
                            onChange={handleToggle}
                          />
                        </td>
                        <td
                          className="nowrap"
                          style={{
                            paddingLeft: "20px",
                            alignItems: "center",
                          }}
                        >
                          <input
                            className="form-check-input border-3"
                            style={{ width: "20px", height: "20px" }}
                            type="checkbox"
                            value=""
                            id="remigrate-checkbox"
                            onChange={handleToggle}
                          />
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="button-container d-flex justify-content-end gap-3">
          <button type="submit" className="button" onClick={handleRevalidate}>
            Revalidate
          </button>
          <button type="submit" className="button" onClick={handleRemigrate}>
            Remigrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
