// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Employee() {
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployees")
      .then((res) => setResult(res.data.result))
      .catch((err) => err);
  },[]);
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center">
        <div>
          <h3>Eployee List</h3>
        </div>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Emplyee
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Address</th>
            <th>email</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {result.map((val) => {
            return (
              <tr key="index">
                <td>{val.name}</td>
                <td><img src={`http://localhost:8081/images/` + val.image}/></td>
                <td>{val.address}</td>
                <td>{val.email}</td>
                <td>{val.salary}</td>
                <td>
                <Link to={`/employeeEdit/` + val.id} className="btn btn-primary">Edit</Link>
                <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
