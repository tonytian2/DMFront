import React from "react";
import { migration_result } from "./testdata.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const Result = () => {
  function handleToggle() {}

  return (
    <div className="home">
      <div className="form-container">
        <div className="card" style={{ width: "900px" }}>
          <div className="card-body w-75" style={{ margin: "auto" }}>
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
                        verticalAlign: "middle",
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
                        verticalAlign: "middle",
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
                      }}
                    >
                      <div class="form-check">
                        <input
                          class="form-check-input border-3"
                          style={{ width: "20px", height: "20px" }}
                          type="checkbox"
                          value=""
                          id="revalidate-checkbox"
                          onChange={handleToggle}
                        />
                      </div>
                    </td>
                    <td style={{ whiteSpace: "nowrap", paddingLeft: "20px" }}>
                      <div class="form-check">
                        <input
                          class="form-check-input border-3"
                          style={{ width: "20px", height: "20px" }}
                          type="checkbox"
                          value=""
                          id="remigrate-checkbox"
                          onChange={handleToggle}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="button-container d-flex justify-content-end gap-3">
          <button type="submit" className="button">
            Revalidate
          </button>
          <button type="submit" className="button">
            Remigrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
