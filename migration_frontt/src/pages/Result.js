import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";
import { migration_result } from "./testdata.js";

const Result = ({ logout }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");

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
        <div className="card" style={{ width: "900px" }}>
          <div className="card-body w-100" style={{ paddingLeft: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2
                className="card-title"
                style={{ whiteSpace: "nowrap", margin: "0 auto" }}
              >
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
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Table Name
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Completeness
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Accuracy
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Revalidate?
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Remigrate?
                  </th>
                </tr>
              </thead>
              <tbody>
                {migration_result.map((data, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ whiteSpace: "nowrap" }}>
                      {index + 1}
                    </th>
                    <td style={{ whiteSpace: "nowrap" }}>{data.tableName}</td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        paddingLeft: "20px",
                        alignItems: "center",
                      }}
                    >
                      {data.completeness ? (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          style={{ width: "20px", height: "20px" }}
                        />
                      )}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        paddingLeft: "20px",
                        alignItems: "center",
                      }}
                    >
                      {data.accuracy ? (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          style={{ width: "20px", height: "20px" }}
                        />
                      )}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
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
                      style={{
                        whiteSpace: "nowrap",
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
                ))}
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
