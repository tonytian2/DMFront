import React from "react";
import "../pages/CSS/TableColumns.css";

const TableColumns = ({ table, columns }) => {
  return (
    <div className="table-columns-container">
      <div className="card" style={{ width: "250px", height: "600px" }}>
        <div className="card-body w-100" style={{ padding: "20px 20px" }}>
          <h3
            className="card-title text-center"
            style={{ whiteSpace: "nowrap" }}
          >
            {table}
          </h3>
          <div className="table-responsive-sm">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    Columns
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {columns.map((columnName, index) => (
                  <tr key={index}>
                    <td scope="row">{columnName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableColumns;
