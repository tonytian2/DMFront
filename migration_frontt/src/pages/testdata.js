export const db_ecommerce_data = [
  {
    tableName: "Suppliers",
    rowTotal: "1000",
    columns: ["SupplierID", "CompanyName", "ContactName", "Country"],
  },
  {
    tableName: "Products",
    rowTotal: "2000",
    columns: ["ProductID", "ProductName", "SupplierID", "CategoryID", "Price"],
  },
  {
    tableName: "Categories",
    rowTotal: "2000",
    columns: ["CategoryID", "CategoryName", "Description"],
  },
  {
    tableName: "Orders",
    rowTotal: "3000",
    columns: ["OrderID", "CustomerID", "OrderDate", "TotalAmount"],
  },
  {
    tableName: "OrderItems",
    rowTotal: "3000",
    columns: ["OrderItemID", "OrderID", "ProductID", "Quantity", "Price"],
  },
  {
    tableName: "Customers",
    rowTotal: "2000",
    columns: ["CustomerID", "FirstName", "LastName", "Email", "Address"],
  },
  {
    tableName: "Shippers",
    rowTotal: "2000",
    columns: ["ShipperID", "CompanyName", "ContactName", "Phone"],
  },
  {
    tableName: "Payments",
    rowTotal: "2000",
    columns: ["PaymentID", "OrderID", "Amount", "PaymentDate"],
  },
  {
    tableName: "Reviews",
    rowTotal: "2000",
    columns: ["ReviewID", "ProductID", "CustomerID", "Rating", "Comment"],
  },
  {
    tableName: "Shipping",
    rowTotal: "2000",
    columns: ["ShippingID", "OrderID", "ShipperID", "TrackingNumber", "Status"],
  },
  {
    tableName: "Employees",
    rowTotal: "1500",
    columns: ["EmployeeID", "FirstName", "LastName", "Position", "Salary"],
  },
  {
    tableName: "Inventory",
    rowTotal: "2500",
    columns: ["ProductID", "Quantity", "Location"],
  },
  {
    tableName: "Promotions",
    rowTotal: "1800",
    columns: ["PromotionID", "Name", "StartDate", "EndDate", "Discount"],
  },
  {
    tableName: "Returns",
    rowTotal: "1200",
    columns: ["ReturnID", "OrderID", "Reason", "ReturnDate"],
  },
  {
    tableName: "Analytics",
    rowTotal: "2200",
    columns: ["AnalyticsID", "PageViews", "Visitors", "ConversionRate"],
  },
];

export const migration_result = [
  {
    tableName: "Suppliers",
    completeness: true,
    accuracy: true,
  },
  {
    tableName: "Products",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Categories",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Orders",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Orders Items",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Customers",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Shippers",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Payments",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Reviews",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Shipping",
    completeness: false,
    accuracy: false,
  },
  {
    tableName: "Employees",
    completeness: true,
    accuracy: true,
  },
  {
    tableName: "Inventory",
    completeness: true,
    accuracy: false,
  },
  {
    tableName: "Promotions",
    completeness: false,
    accuracy: true,
  },
  {
    tableName: "Returns",
    completeness: true,
    accuracy: false,
  },
  {
    tableName: "Analytics",
    completeness: true,
    accuracy: true,
  },
];
