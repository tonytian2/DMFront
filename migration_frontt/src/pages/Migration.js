import React from "react";

const Migration = () => {
  const db_ecommerce_data = [
    {
      tableName: "Suppliers",
      rowTotal: "1000",
    },
    {
      tableName: "Products",
      rowTotal: "2000",
    },
    {
      tableName: "Categories",
      rowTotal: "2000",
    },
    {
      tableName: "Orders",
      rowTotal: "3000",
    },
    {
      tableName: "Orders Items",
      rowTotal: "3000",
    },
    {
      tableName: "Customers",
      rowTotal: "2000",
    },
    {
      tableName: "Shippers",
      rowTotal: "2000",
    },
    {
      tableName: "Payments",
      rowTotal: "2000",
    },
    {
      tableName: "Reviews",
      rowTotal: "2000",
    },
    {
      tableName: "Shipping",
      rowTotal: "2000",
    },
  ];

  return (
    <div className="home">
      <div className="form-container">
        <div className="card" style={{ width: "40rem" }}>
          <div className="card-body" style={{ margin: "auto" }}>
            <h5 className="card-title" style={{ whiteSpace: "nowrap" }}>
              Local Database
            </h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    table name
                  </th>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    no. of rows
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
      </div>
    </div>
  );
};

export default Migration;
