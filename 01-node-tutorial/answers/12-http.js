const http = require("http");

const host = "localhost";
const port = 3000;

const requestListener = function (req, res) {
  if (req.url === "/") {
    res.end("slash");
  } else if (req.url === "/about") {
    res.end("about");
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `);
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
