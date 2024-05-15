const express = require("express")
const router = express.Router()
const routes = require("./api/v1/routes/index.route")

const app = express()
app.use(require("cors")())
app.use(express.json())
app.use("/api/v1", routes)

module.exports = app