import React from "react";

const TableColumns = ({ table, columns }) => {
  return (
    <div className="card" style={{ width: "300px" }}>
      <div className="card-body w-100" style={{ padding: "50px 30px" }}>
        <h3 className="card-title text-center" style={{ whiteSpace: "nowrap" }}>
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
  );
};

export default TableColumns;
