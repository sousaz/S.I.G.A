const app = require("./app")
const connect = require("./src/config/mongo")

const port = process.env.PORT || 3000

const init = app.listen(port, () => console.log(`Server is running on port ${port}`));

connect(init)


