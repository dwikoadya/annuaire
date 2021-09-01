var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const firebase = require("firebase");


const { graphqlHTTP } = require("express-graphql");

const cors = require("cors");

const config = {
  apiKey: "AIzaSyDeyDBVFypd0IDqJym12n0vqQe9KZtL4dI",
  authDomain: "bukutelepon-9da20.firebaseapp.com",
  databaseURL: "https://bukutelepon-9da20.firebaseio.com/",
  projectId: "bukutelepon-9da20",
  storageBucket: "bukutelepon-9da20.appspot.com",
  messagingSenderId: "539140774742",
};
firebase.initializeApp(config);
 
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("*", cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

const phoneSchema = require("./graphql").phoneSchema;
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: phoneSchema,
    rootValue: global,
    graphiql: true,
  })
);

module.exports = app;
