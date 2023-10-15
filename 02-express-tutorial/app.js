console.log("Express Tutorial");
const { products } = require("./data");
const express = require("express");
const app = express();
app.use(express.static("./public"));
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

  if (filtered && costlimit)
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
app.all("*", (req, res) => {
  res.send("I caught you in 'ALL' route. This page is not found");
});

app.listen(3009, () => {
  console.log("App is listening on post 3009");
});
