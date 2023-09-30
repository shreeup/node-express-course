const { writeFile, readFile } = require("fs").promises;
const writer = async () => {
  try {
    await writeFile(
      "./temporary/fileC.txt",
      "Line1 \n Line2 \n Line3 \n",
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
  } catch (err) {
    console.log("An error occurred: ", err);
  }
};
const reader = async () => {
  try {
    const filedata = await readFile("./temporary/fileC.txt", {
      encoding: "utf8",
      flag: "r",
    });
    console.log(filedata);
  } catch (err) {
    console.log("An error occurred: ", err);
  }
};
const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (err) {
    console.log("An error occurred: ", err);
  }
};
readWrite();
