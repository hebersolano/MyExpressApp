const app = require("./app");
const PORT = app.get("port");

app.listen(PORT, function () {
  console.log(`Listening http://localhost:${PORT}/`);
});
