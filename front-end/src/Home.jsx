// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [salary, setSalary] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:8081/adminCount").then((res) => {
        console.log(res)
      setAdminCount(res.data[0].admin)
    }).catch(err => err);

    axios.get("http://localhost:8081/employeeCount").then((res) => {
        console.log(res)
        setEmployeeCount(res.data[0].employee)
    }).catch(err => err);

    axios.get("http://localhost:8081/salarySum").then((res) => {
        console.log(res)
        setSalary(res.data[0].sumOfSalary)
    }).catch(err => err);
  }, []);
  return (
    <>
      <div className="p-3 d-flex justify-content-around">
        <div className="p-3 border shado-sm">
          <p>ADMIN</p>
          <hr />
          <p>Total : {adminCount}</p>
        </div>
        <div className="p-3 border shado-sm">
          <p>Employee</p>
          <hr />
          <p>Total : {employeeCount} </p>
        </div>
        <div className="p-3 border shado-sm">
          <p>Salary</p>
          <hr />
          <p>Total : {salary}</p>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of ADMINs</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>Admin</td>
                <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
