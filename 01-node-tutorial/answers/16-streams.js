const { writeFile, readFile } = require("fs").promises;
const { createReadStream } = require("fs");
const Stream = require("stream");
const readableStream = new Stream.Readable();

let counter = 0;

const readable = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 5000,
});

readable.on("data", (chunk) => {
  console.log(`chunk length is: ${chunk.length}`);
  counter += 1;
});

readable.on("end", (chunk) => {
  console.log(`number of chunks is: ${counter}`);
});

readable.on("error", (err) => {
  console.log(` error while processing ${err}`);
});
