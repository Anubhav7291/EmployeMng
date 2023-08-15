import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  DashBoard from "./Dashboard"
import Employee from "./Employee";
import Home from "./Home";
import Profile from "./Profile";
import AddEmployee from "./AddEmployee"
import Edit from "./Edit";
import Start from "./Start";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeLogon from "./EmployeeLogin";
//testing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/employee" element={<Employee />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create" element={<AddEmployee />}/>
        <Route path="/employeeEdit/:id" element={<Edit />}/>
        <Route path="/start" element={<Start />}/>
        <Route path="/employeelogin" element={<EmployeeLogon />}/>
        <Route path="/employeedetail/:id" element={<EmployeeDetail />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
