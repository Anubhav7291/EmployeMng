import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        setData({
          ...data,
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
          address: res.data.Result[0].address,
          salary: res.data.Result[0].salary,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/update/"+id, data)
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
            value={data.name}
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
            value={data.email}
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
            value={data.salary}
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
            value={data.address}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
