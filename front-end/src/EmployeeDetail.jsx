import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => err);
  },[]);
  return <div>
    {employee?.name}
  </div>;
}

export default EmployeeDetail;
