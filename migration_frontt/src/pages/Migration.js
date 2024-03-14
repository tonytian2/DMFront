import React from "react";
import { useNavigate } from "react-router-dom";
import { db_ecommerce_data } from "./testdata.js";

const Migration = () => {
  const navigate = useNavigate();

  function handleMigrate() {
    // Start migration by calling backend

    // Redirect to Result.js after migration
    navigate("/result");
  }

  return (
    <div className="home">
      <div className="form-container">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-body w-75" style={{ margin: "auto" }}>
            <h2 className="card-title" style={{ whiteSpace: "nowrap" }}>
              Local Database
            </h2>
            <table class="table">
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
        </div>
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
