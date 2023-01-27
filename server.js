require("dotenv").config();
const http = require("http");
const app = require("./app/app.js");

const PORT = process.env.PORT || 5050;
const server = http.createServer(app);

require("./DB/DatabaseConnection.js");
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
