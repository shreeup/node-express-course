const EventEmitter = require("events");

const emitter = new EventEmitter();

setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);

emitter.on("timer", (msg) => console.log(msg));

const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is: ", msg);
};

doWait();
emitter.emit("happens", "Hello World!");

emitter.on("minesweeper", (slot) => {
  if (slot % 2 == 0) console.log(`You clicked on even block - ${slot}`);
  else console.log("You clicked on uneven block");
});

emitter.emit("minesweeper", [Math.floor(Math.random() * 10)]);
