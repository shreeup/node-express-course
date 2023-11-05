console.log("Express Tutorial");
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
var cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(express.static("./methods-public"));
app.use(cookieParser());

const logger = function (req, res, next) {
  console.log(
    `METHOD: ${req.method}, URL: ${
      req.originalUrl
    }. The time now is ${new Date().toTimeString()}`
  );
  next();
};

const auth = function (req, res, next) {
  console.log("Inside Auth Middleware");
  if (req.cookies.name) req.user = req.cookies.name;
  else res.status(401).json({ success: false, message: "Unauthorized" });
  console.log(`Cookie is set`);
  next();
};
// app.get("/", logger, (req, res) => {
//   console.log("From logger! using first method");
// });
app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});
app.get("/api/v1/products", (req, res) => {
  res.json({
    message: "Displaying the products from our catalog",
    product: products,
  });
});

app.get("/api/v1/products/:productID", (req, res) => {
  let pid = parseInt(req.params["productID"]);
  let chosen = products.find((p) => p.id == pid);
  if (!chosen)
    res.json({
      message: `That product was not found.`,
    });
  else
    res.json({
      message: `You have chosen product with id - ${pid}`,
      product: chosen,
    });
});

app.get("/api/v1/query", (req, res) => {
  let search = req.query.search;
  let limit = req.query.limit;
  let costlimit = req.query.costlimit;
  let filtered = products;
  if (filtered && search)
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.desc.toLowerCase().includes(search)
    );
  if (filtered && limit && filtered.length > limit)
    filtered = filtered.slice(0, limit);

  if (filtered && costlimit);
  filtered = filtered.filter((p) => p.price <= costlimit);

  res.json({
    message: `These are the products you are looking for`,
    product: filtered,
  });
});

app.get("/api/v1/products", (req, res) => {
  res.json({
    message: "Displaying the products from our catalog",
    product: products,
  });
});

app.use("/api/v1/people", peopleRouter);

app.post("/logon", (req, res) => {
  if (req.body.name) {
    res.cookie("name", req.body.name);
    res.status(201).json({ success: true, message: `Hello ${req.body.name}` });
  } else
    res.status(400).json({ success: false, message: "Please provide a name" });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ success: true, message: `Logged off!` });
});

app.get("/test", auth, (req, res) => {
  res.status(200).json({ success: true, message: `Welcome ${req.user}` });
});

app.all("*", (req, res) => {
  res.send("I caught you in 'ALL' route. This page is not found");
});

app.listen(3009, () => {
  console.log("App is listening on post 3009");
});
