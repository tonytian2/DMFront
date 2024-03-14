import React from "react";
import { migration_result } from "./testdata.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import ProgressModal from "./Modal/LoadingModal";
import ValidationModal from "./Modal/ValidationModal";

const Result = () => {
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Migrating");

  function handleToggle() {}

  const handleRemigrate = () => {
    setLoadingMessage("Migrating");
    setShowProgress(true);
    //set 5 second timeout
    setTimeout(() => {
      setShowProgress(false);
      setShowValidation(true);
    }, 5000);
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
        <div className="card" style={{ width: "900px" }}>
          <div className="card-body w-100" style={{ paddingLeft: "50px" }}>
            <h2 className="card-title" style={{ whiteSpace: "nowrap" }}>
              Migration Result
            </h2>
            <table class="table">
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
                        class="form-check-input border-3"
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
                        class="form-check-input border-3"
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
