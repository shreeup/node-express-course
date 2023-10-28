const { writeFile, readFile } = require("fs").promises;
writeFile("./temporary/fileD.txt", "Line1 \n", { flag: "a+" })
  .then(() => {
    return writeFile("./temporary/fileD.txt", "Line2 \n", { flag: "a+" });
  })
  .then(() => {
    return writeFile("./temporary/fileD.txt", "Line3 \n", { flag: "a+" });
  })
  .then(() => {
    return readFile("./temporary/fileD.txt", {
      encoding: "utf8",
      flag: "r",
    });
  })
  .then((filedata) => {
    console.log(filedata);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
