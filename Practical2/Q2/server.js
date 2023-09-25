const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fs = require('fs');

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use(cookieParser());

const sessionPath = path.join(__dirname, 'data');
const myusername = "Hiten";
const mypassword = "123";

app.get("/", (req, res) => {
  if (req.session.userid) {
    res.send(`Welcome ${myusername} <a href="/logout">click to logout</a>`);
  } else {
    res.sendFile("views/index.html", { root: __dirname });
  }
});

app.post("/user", (req, res) => {
  if (req.body.username == myusername && req.body.password == mypassword) {
    req.session.userid = req.body.username;
    saveSessionToFile(req.sessionID, req.session);
    res.send(`<h1 style="color:red">Hey welcome ${myusername}</h1><a href="/logout">click to logout</a>`);
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(8000, () => {
  console.log(`Server running at http://localhost:8000`);
});

function saveSessionToFile(sessionID, sessionData) {
  const sessionFile = path.join(sessionPath, `${sessionID}.json`);
  fs.writeFileSync(sessionFile, JSON.stringify(sessionData), 'utf-8');
}
