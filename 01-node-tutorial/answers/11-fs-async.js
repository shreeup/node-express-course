const fs = require("fs");

fs.writeFile("./temporary/fileB.txt", "Line1 \n", (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    // here you write your next line
  }
});
fs.writeFile(
  "./temporary/fileB.txt",
  "Line2 \n",
  { flag: "a+" },
  (err, result) => {
    console.log("at point 2");
    if (err) {
      console.log("This error happened: ", err);
    } else {
      // here you write your next line
    }
  }
);
fs.writeFile(
  "./temporary/fileB.txt",
  "Line3 \n",
  { flag: "a+" },
  (err, result) => {
    console.log("at point 3");
    if (err) {
      console.log("This error happened: ", err);
    } else {
      // here you write your next line
    }
  }
);
