const fs = require("fs");

fs.writeFileSync("./temporary/fileA.txt", "Line1 \n");
fs.writeFileSync("./temporary/fileA.txt", "Line2 \n", { flag: "a+" });
fs.writeFileSync("./temporary/fileA.txt", "Line3 \n", { flag: "a+" });

const filedata = fs.readFileSync("./temporary/fileA.txt", {
  encoding: "utf8",
  flag: "r",
});

// Display the file data
console.log(filedata);
