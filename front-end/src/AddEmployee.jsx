import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    image: "",
    salary: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("image", data.image);
    formData.append("salary", data.salary);
    axios
      .post("http://localhost:8081/create", formData)
      .then(() => navigate("/employee"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            name="address"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">
            Select Image
          </label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
