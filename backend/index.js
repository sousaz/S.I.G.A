const app = require("./app")
const connect = require("./src/config/mongo")
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")

const port = process.env.PORT || 3000

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const init = app.listen(port, () => console.log(`Server is running on port ${port}`));

connect(init)





