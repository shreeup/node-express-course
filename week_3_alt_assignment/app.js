const app = require("./stuffThatYouCanIgnore"); // take my word for it :)

app.get("/", (_, res) =>
  res.send(`
  <h1>Hi!</h1><a href="/widget">Visit /widget to get started!</a>
`)
);

const STYLE = `
<style>
.w3-light-grey{ color :black !important;background-color:#f1f1f1 !important}
.w3-container, .w3-panel {
    padding: 0.01em 16px;
}
.w3-green, .w3-hover-green:hover {
    color: #fff!important;
    background-color: #4CAF50!important;
}
</style>`;

app.get("/widget", (_, res) =>
  res.send(`
  ${STYLE}
 <div class="container">
  <h2>Progress Bar</h2>

  <div class="w3-light-grey">
    <div id="myBar" class="w3-container w3-green" style="height:24px;width:0%">
    </div>
  </div>

  <p id="myP">Current Progress <span id="demo">0</span> </p>

  <button class="w3-button w3-light-grey" onclick="move();">Click Me</button> 
</div>
<script>
 var width = 0;
function move() {
  var elem = document.getElementById("myBar");   
  if (width >= 10) {
      width=0;
      document.getElementById("myP").innerHTML = "Restarted the Progress";
    } else {
      width++; 
      elem.style.width = width*10 + '%'; 
      document.getElementById("myP").innerHTML = "Current Progress <span id='demo'>0</span>";
      document.getElementById("demo").innerHTML = width*10 + '%';
    }
}
</script>
`)
);

app.listen(3000);
