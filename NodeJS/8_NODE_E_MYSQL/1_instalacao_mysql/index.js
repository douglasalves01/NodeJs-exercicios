import express from "express";
import exphbs from "express-handlebars";
import mysql from "mysql2";

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("home");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "companhiaaerea",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao MySQl");

  app.listen(3000);
});
