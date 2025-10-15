import { useState } from "react";
import "./App.css"; // Import CSS file

function App() {
  const [employees] = useState([
    { name: "Vijay", department: "IT", salary: 50000 },
    { name: "Anita", department: "HR", salary: 45000 },
    { name: "Rahul", department: "Finance", salary: 60000 },
    { name: "Sneha", department: "Marketing", salary: 55000 },
    { name: "Kiran", department: "Operations", salary: 48000 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sort employees based on sortConfig
  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Handle header click
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Function to render arrow for current sorted column
  const renderArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{renderArrow("name")}
            </th>
            <th onClick={() => handleSort("department")}>
              Department{renderArrow("department")}
            </th>
            <th onClick={() => handleSort("salary")}>
              Salary{renderArrow("salary")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>₹{emp.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
