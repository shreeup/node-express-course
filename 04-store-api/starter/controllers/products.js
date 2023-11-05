const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(2);
  res.status(200).json({ products });
};
const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const query = {};
  if (featured) {
    query.featured = featured === "true" ? true : false;
  }
  if (company) {
    query.company = company;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|=|<=|>=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        query[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(query);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
