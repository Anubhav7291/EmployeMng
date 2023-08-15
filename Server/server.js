import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import multer from "multer";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173",],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND  password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ role :'admin' }, "jwt-secret", { expiresIn: "1d" });
      res.cookie("token", token);

      return res.json({ Status: "Success" });
    } else {
      console.log(result, req.body.email, req.body.password);
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.post("/employeelogin", (req, res) => {
  const sql = "SELECT * FROM employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          
          if (!response) {
            console.log(result)
            const id = result[0].id;
            const token = jwt.sign({ role: "employee", id: result[0].id }, "jwt-secret", { expiresIn: "1d" });
            res.cookie("token", token);
            return res.json({ Status: "Success", id: result[0].id});
          } else {
            return res.json({ Error: "password err" });
          }
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.get("/adminCount", (req, res) => {
  const sql = "Select count(id) as admin from users";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Err" });
    return res.json(result);
  });
});

app.get("/employeeCount", (req, res) => {
  const sql = "Select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Err" });
    return res.json(result);
  });
});
app.get("/salarySum", (req, res) => {
  const sql = "Select sum(salary) sumOfSalary from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Err" });
    return res.json(result);
  });
});
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json({ Error: " You are not Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret", (err, decoded) => {
      if (err) return res.json({ Error: "Wrong token" });
      req.role = decoded.role;
      req.id = decoded.id
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id});
});

app.get('/employee/:id', (req,res) => {
  const sql = "SELECT * from employee where id = ?";
  const id = req.params.id;
  con.query(sql, [id],(err, result) => {
    if (err) return res.json({ Error: "Get employee" });
    return res.json({ Status: "Success", Result: result });
  });
})

app.get("/getEmployees", (req, res) => {
  const sql = "SELECT * from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json({ Status: "Success", result: result });
  });
});

app.post("/create", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO employee (`name`,`email`, `address`, `password`, `image`, `salary`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error" });
    const values = [
      req.body.name,
      req.body.email,
      req.body.address,
      hash,
      req.file.filename,
      req.body.salary,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json({ Status: "Success" });
    });
  });
});

app.get("/get/:id", (req, res) => {
  const sql = "SELECT * from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get employee" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.param.id;
  const sql = "UPDATE employee set salary = ? WHERE id = ?";
  con.query(sql, [req.body.salary, id], (err, result) => {
    if (err) return res.json({ Error: "Error" });
    return res.json({ Status: "Success" });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
