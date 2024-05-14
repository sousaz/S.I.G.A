const app = require("./src/app")
const User = require("./src/api/v1/models/User")
const connect = require("./src/config/mongo")

const port = process.env.PORT || 3000

const init = app.listen(port, () => console.log("Server is running..."));

connect(init)

